from rauth import OAuth1Service
from flask import url_for, request, redirect, session
from .config import CONSUMER_KEY, CONSUMER_SECRET

SERVER_URL = 'http://www.khanacademy.org'

class KhanAcademySignIn:
    def __init__(self):
        self.service = OAuth1Service(
            name='test',
            consumer_key=CONSUMER_KEY,
            consumer_secret=CONSUMER_SECRET,
            request_token_url=SERVER_URL + '/api/auth2/request_token',
            access_token_url=SERVER_URL + '/api/auth2/access_token',
            authorize_url=SERVER_URL + '/api/auth2/authorize',
            base_url=SERVER_URL + '/api/auth2'
        )

    def get_callback_url(self):
        return url_for(
            'oauth_callback',
            _external=True)

    def authorize(self):
        request_token,request_token_secret = self.service.get_request_token(
            params={'oauth_callback': self.get_callback_url()},
            method='POST'
        )
        session['request_token'] = request_token
        session['request_token_secret'] = request_token_secret
        return redirect(self.service.get_authorize_url(request_token))

    def callback(self):
        request_token = session.pop('request_token')
        request_token_secret = session.pop('request_token_secret')

        if 'oauth_verifier' not in request.args:
            return None, None, None
        oauth_session = self.service.get_auth_session(
            request_token,
            request_token_secret,
            data={'oauth_verifier': request.args['oauth_verifier']}
        )
        me = oauth_session.get(SERVER_URL+'/api/v1/user').json()
        access_token = oauth_session.access_token
        access_token_secret = oauth_session.access_token_secret
        return me, access_token, access_token_secret

class KhanAPI:
    authorized = False

    def __init__(self,access_token=None,access_token_secret=None):
        if access_token and access_token_secret:
            self.service = OAuth1Service(
                name='test',
                consumer_key=CONSUMER_KEY,
                consumer_secret=CONSUMER_SECRET,
                request_token_url=SERVER_URL + '/api/auth2/request_token',
                access_token_url=SERVER_URL + '/api/auth2/access_token',
                authorize_url=SERVER_URL + '/api/auth2/authorize',
                base_url=SERVER_URL + '/api/auth2'
            )
            self.session = self.service.get_session((access_token, access_token_secret))
            self.authorized = True
        self.get_resource = self.get

    def get(self, url, params={}):
        if self.authorized:
            return self.session.get(SERVER_URL+url,params=params).json()
        else:
            import requests
            return requests.get(SERVER_URL+url,params=params).json()

    def get_user_profile(self):
        """
        Retrieve the authenticated users profile
        """
        return self.get_resource('/api/v1/user')

    def get_mission(self,mission):
        """
        Retrieve the mission topics and skills for the given mission
        """
        return self.get_resource('/api/internal/user/mission/'+mission)

    def get_all_exercises(self):
        """
        Retrieve all the exercises from Khan Academy. This is big, and can take
        a big to complete. This is used mainly to update TaskList table.
        """
        return self.get_resource('/api/v1/exercises')

    def get_many_exercises(self,exercises):
        """
        Since the api restricts the url length to 2048 characters, and making a
        request for many exercises will often exceed this limit, this function will
        truncate the url below the limit, and tie the responses together.
        """
        exercises.sort()
        out = []
        tmp_lst = []
        params = {'exercises':[]}
        while exercises:
            s=''
            tmp_lst = []
            for exercise in exercises:
                t=s+'&exercises='+exercise
                if len(t)<1500:
                    s+='&exercises='+exercise
                    tmp_lst.append(exercise)
                else:
                    break
            exercises = [ x for x in exercises if x not in tmp_lst]
            url = '/api/v1/user/exercises'
            params['exercises']=tmp_lst
            response = self.get_resource(url,params)
            data = response
            for datum in data:
                out.append(datum)
        return out

    def get_exercise(self, exercise):
        """
        Retrive the exercise data for the given exercise
        """
        return self.get_resource('/api/v1/exercises/'+exercise)
    # def get_energy_points(self,email=''):
    #     url = '/api/v1/user'
    #     params = {'email':email}
    #     response = self.get_resource(self.session,url,params)
    #     data = response
    #     if not data:
    #         return None
    #     user_check = data['key_email']=='http://nouserid.khanacademy.org/9d8c5db3ca6b9280d7ac729c7fdf66aedata'
    #     if user_check and email != 'sequoiachoicemath@gmail.com':
    #         print('false positive')
    #         return None
    #     return data['points']
    #
    # def get_progress_report(self,email,start_date='',end_date=''):
    #     if start_date:
    #         start_date = start_date+'T00:00:00Z'
    #     if end_date:
    #         end_date = end_date+'T00:00:00Z'
    #     if end_date:
    #         response = self.get_resource(
    #             self.session,
    #             '/api/v1/user/exercises/progress_changes',
    #             {'email':email,'dt_start':start_date,'dt_end':end_date}
    #         )
    #     else:
    #         response = self.get_resource(
    #             self.session,
    #             '/api/v1/user/exercises/progress_changes',
    #             {'email':email,'dt_start':start_date}
    #         )
    #     return response
    #
    # def get_students(self):
    #     url = '/api/v1/user/students'
    #     students = self.get_resource(self.session,url,{})
    #     return json.loads(students)
    #
    # def get_indexed_students(self):
    #     url = '/api/v1/user/students'
    #     response = khanapi.get_api_resource(self.session,url,{})
    #     data = json.loads(response)
    #     indexed_data = {}
    #     for indx,d in enumerate(data):
    #         indexed_data[d['key_email']] = indx
    #         indexed_data[d['email']] = indx
    #         indexed_data[d['student_summary']['email']] = indx
    #         for email in d['auth_emails']:
    #             if email.startswith('norm'):
    #                 indexed_data[email[5:]] = indx
    #             else:
    #                 indexed_data[email[4:]] = indx
    #     return data,indexed_data
    #
    # def get_exercise_logs(self,exercise,start_date,end_date,**kwargs):
    #     """
    #     Get specific details on a student progress through an exercise between two dates
    #
    #     :param exercise: the slug of the queried exercise
    #     :param start_date: date string of form 'YYYY-MM-DD'
    #     :param start_date: date string of form 'YYYY-MM-DD'
    #     :param **kwargs: extra params to be added to the url, usually email, userid, or username
    #     :return dict object of exercise data
    #     """
    #     params = {'dt_start':start_date+'T00:00:00Z','dt_end':end_date+'T00:00:00Z'}
    #     for key,value in kwargs.items():
    #         params[key] = value
    #     url = exercise.join(['/api/v1/user/exercises/','/log'])
    #     resource = self.get_resource(self.session,url,params)
    #     return json.loads(resource)
    #
    # def get_exercise_index(self):
    #     """
    #     Get all exercises from khan academy, and return indexed dict of
    #     {id:exercise_dict,...}
    #
    #     """
    #     url = '/api/v1/exercises'
    #     params = {}
    #     resource = self.get_resource(self.session,url,params)
    #     data = {d['id']:d for d in json.loads(resource)}
    #     return data
    #
