import json
import string, random
from datetime import datetime, timedelta
from uuid import uuid4

from flask import render_template,redirect,request,url_for,jsonify
from flask.ext.login import login_user, logout_user, current_user, login_required
from app import app, db, lm

from .oauth import KhanAcademySignIn, KhanAPI
from .models import User, Mission, TaskList, Topics, Task


def id_generator(size=6, chars=string.ascii_uppercase + string.digits):
    """
    Return a useful mission code like "EJ6T9Y".
    """
    return ''.join(random.choice(chars) for __ in range(size))

def create_session():
    '''
    This creates an authenticated session to use for the Khan Academy api.
    '''
    access_token = current_user.access_token
    access_token_secret = current_user.access_token_secret
    return KhanAPI(access_token,access_token_secret)

@lm.user_loader
def load_user(id):
    return User.objects(id=id).first()

@app.route('/')
def index():
    try:
        colors = current_user.colors
    except AttributeError:
        colors = random.choice(['red','pink','teal','orange','blue','bluegrey'])

    if current_user.is_anonymous:

        initialState = False
        user = {
            "is_authenticated": False,
            "colors": colors,
        }
    else:
        initialState = {
            "missions":[json.loads(m.to_json()) for m in current_user.missions]
        }
        user = {
            "is_authenticated": True,
            "kaid": current_user.kaid,
            "nickname": current_user.nickname,
            "colors": colors
        }
    return render_template(
        'index.html',
        userProfile=json.dumps(user),
        initialState = initialState
    )


@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('index'))

@app.route('/mission/create')
@login_required
def create_mission():
    mission_code = id_generator()
    while Mission.objects(code=mission_code).first():
        mission_code = id_generator()
    store = {
        "editing": {
            "isEditing": True,
            "isMissionOwner": True
        },
        "saved": False,
        "title": {"title":""},
        "topics": [],
        "tasks": [],
        "mission_code": mission_code
    }

    try:
        colors = current_user.colors
    except AttributeError:
        colors = random.choice(['red','pink','teal','orange','blue','bluegrey'])

    if current_user.is_anonymous:

        initialState = False
        user = {
            "is_authenticated": False,
            "colors": colors,
        }
    else:
        initialState = {
            "missions":[json.loads(m.to_json()) for m in current_user.missions]
        }
        user = {
            "is_authenticated": True,
            "kaid": current_user.kaid,
            "nickname": current_user.nickname,
            "colors": colors
        }
    return render_template(
        'mission.html',
        userProfile=json.dumps(user),
        initialState = json.dumps(store)
    )

@app.route('/mission/<mission_code>')
@login_required
def mission(mission_code):
    timestamp = current_user.timestamp

    mission = Mission.objects(code=mission_code).first_or_404()
    is_mission_owner =  mission.owner == current_user
    tasks = {}
    for topic in mission.topics:
        for task in topic.tasks:
            tasks[task.name]={
                "id": task.kaid,
                "title": task.title,
                "name": task.name
            }

    store = {
        "editing": {
            "isEditing": False,
            "isMissionOwner": is_mission_owner
        },
        "saved": False,
        "title": {"title":mission.title},
        "topics": [
            {
                "id": str(uuid4()),
                "name": topic.title,
                "tasks":[tasks[t['name']]['id'] for t in topic.tasks]
            } for topic in mission.topics],
        "tasks": list(tasks.values()),
        "mission_code": mission_code
    }

    try:
        colors = current_user.colors
    except AttributeError:
        colors = random.choice(['red','pink','teal','orange','blue','bluegrey'])

    initialState = {
        "missions":[json.loads(m.to_json()) for m in current_user.missions]
    }
    user = {
        "is_authenticated": True,
        "kaid": current_user.kaid,
        "nickname": current_user.nickname,
        "colors": colors
    }

    return render_template(
        'mission.html',
        userProfile=json.dumps(user),
        initialState = json.dumps(store)
    )

@app.route('/profile')
@login_required
def profile():
    try:
        colors = current_user.colors
    except AttributeError:
        colors = random.choice(['red','pink','teal','orange','blue','bluegrey'])

    initialState = {
        "missions":[json.loads(m.to_json()) for m in current_user.missions]
    }
    user = {
        "is_authenticated": True,
        "kaid": current_user.kaid,
        "nickname": current_user.nickname,
        "colors": colors
    }

    return render_template(
        'profile.html',
        userProfile=json.dumps(user),
    )

@app.route('/khan/authorize')
def oauth_authorize():
    if not current_user.is_anonymous:
        return redirect(url_for('index'))
    oauth = KhanAcademySignIn()
    return oauth.authorize()

@app.route('/khan/callback')
def oauth_callback():
    if not current_user.is_anonymous:
        return redirect(url_for('index'))
    oauth = KhanAcademySignIn()
    ka_user, access_token, access_token_secret = oauth.callback()
    print(ka_user)
    print(list(User.objects.all()))
    user = User.objects(kaid=ka_user['kaid']).upsert_one(
        kaid = ka_user['kaid'],
        username = ka_user['username'],
        nickname = ka_user['nickname'],
        access_token = access_token,
        access_token_secret = access_token_secret,
        timestamp = datetime.utcnow()
    )
    login_user(user, True)
    return redirect(url_for('index'))


"""
## API section
## These methods should only return json to be consumed by the react components
"""

@app.route('/api/user')
@login_required
def get_user():
    kapi = create_session()
    ka_user = kapi.get_user_profile()
    return jsonify(ka_user)

@app.route('/api/mission/get/<code>', methods=['GET'])

def get_mission(code):
    mission = Mission.objects(code=code).first()
    if not mission:
        mission_code = id_generator()
        while Mission.objects(code=mission_code).first():
            mission_code = id_generator()
        store = {
            "editing": {
                "isEditing": True,
                "isMissionOwner": True
            },
            "saved": False,
            "title": {"title":""},
            "topics": [],
            "tasks": [],
            "mission_code": mission_code
        }
        return jsonify(store)
    is_mission_owner =  mission.owner == current_user
    tasks = {}
    for topic in mission.topics:
        for task in topic.tasks:
            tasks[task.name]={
                "id": task.kaid,
                "title": task.title,
                "name": task.name
            }
    store = {
        "editing": {
            "isEditing": True,
            "isMissionOwner": True,#is_mission_owner
        },
        "saved": False,
        "title": {"title":mission.title},
        "topics": [
            {
                "id": str(uuid4()),
                "name": topic.title,
                "tasks":[tasks[t['name']]['id'] for t in topic.tasks]
            } for topic in mission.topics],
        "tasks": list(tasks.values()),
        "mission_code": code
    }

    return jsonify(store)

@app.route('/api/tasks/progress', methods=['POST'])
def get_progress_report():
    data = request.get_json()
    tasks = data['tasks']
    kaid = data['kaid']
    user = User.objects(kaid=kaid).first()
    access_token, access_token_secret = user.access_token, user.access_token_secret
    kapi = KhanAPI(access_token,access_token_secret)
    tasks_progress = kapi.get_many_exercises(tasks)
    data = [{
        "id": task['exercise_model']['id'],
        "name": task['exercise_model']['name'],
        "title": task['exercise_model']['title'],
        "mastery_level": task['exercise_progress']['level'],
        "description": task['exercise_model']['translated_description_html']
    } for task in tasks_progress]
    return json.dumps(data)

@app.route('/api/tasklist/<title>',methods=['GET','POST'])
def get_tasks(title):
    tasks = TaskList.objects(title__icontains=title).order_by('title')
    d_tasks = [{'name':t.kaid+'~'+t.name,'title':t.title} for t in tasks]
    return jsonify({'tasks':d_tasks})

@app.route('/api/tasklist/update',methods=['POST'])
def update_task_list():
    kapi = KhanAPI()
    tasks = {
      k['id']:{
        'name':k['name'],
        'title':k['title']
      }
      for k in kapi.get_all_exercises()
    }
    for kaid, task in tasks.items():
        TaskList.objects(kaid=kaid).upsert_one(
            kaid = kaid,
            name = task['name'],
            title = task['title']
        )
    db_tasks = [row.kaid for row in TaskList.objects]
    return jsonify({'db':db_tasks,'tasks':tasks})

@app.route('/api/mission/save', methods=['POST'])
def save_mission():
    data = request.get_json()
    tasks = {
        k['id']: {
            'kaid':k['id'],
            'title':k['title'],
            'name':k['name']
        } for k in data['tasks']
    }
    user = User.objects(kaid=data['kaid']).first()

    mission = Mission.objects(code=data['code']).upsert_one(
        title=data['title']['title'],
        code = data['code'],
        owner = user,
        topics = [Topics(
            title = topic['name'],
            tasks = [Task(
                kaid = tasks[task]['kaid'],
                title = tasks[task]['title'],
                name = tasks[task]['name']
                ) for task in topic['tasks']
            ]
            ) for topic in data['topics']
        ]

    )
    user.modify(upsert=True,add_to_set__missions=mission)
    return jsonify({"mission":{
        'title':mission.title,
        'code': mission.code,
        'owner': mission.owner.nickname},
        'saved':True
    })

@app.route('/api/user/missions')
@login_required
def get_user_mission():
    return jsonify({"missions":current_user.missions})

@app.route('/api/user/mission/join', methods=["POST"])
def join_mission():
    data = request.get_json()
    mission_code = data['mission_code']
    kaid = data['kaid']
    mission = Mission.objects(code=mission_code).first()
    if mission:
        user = User.objects(kaid=kaid).first()
        if mission in user.missions:
            return jsonify({"message":"current"})
        user.modify(upsert=True,add_to_set__missions=mission)
        return jsonify({"message":"success", "mission":mission})
    return jsonify({"message":"error"})

@app.route('/api/user/theme', methods=['POST'])
def set_theme():
    data = request.get_json()
    kaid = data['kaid']
    color = data['color']
    print(color)
    user = User.objects(kaid=kaid).first()
    user.modify(upsert=True,colors=color)
    return jsonify({'message':'Theme saved!'})
