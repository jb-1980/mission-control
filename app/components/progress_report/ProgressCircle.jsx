import React from 'react'
import {Surface, Group, Shape, Text} from 'react-art'
import Circle from 'react-art/shapes/circle';
import colorScheme from '../../constants/colors';

export default class ProgressCircle extends React.Component {
  constructor(props){
    super(props)
    this.polarToCartesian = this.polarToCartesian.bind(this);
    this.parametizeArc = this.parametizeArc.bind(this);
    this.findAngle = this.findAngle.bind(this);
  }

  polarToCartesian(x,y,radius,angle){
    return [x+(radius*Math.sin(angle)),y-(radius*Math.cos(angle))]
  }

  parametizeArc(x,y,radius,startAngle,endAngle){
    const start = this.polarToCartesian(x,y,radius,startAngle);
    const end = this.polarToCartesian(x,y,radius,endAngle);
    const arcsweep = Math.abs(endAngle - startAngle) <= Math.PI ? 0 : 1;

    return "M "+start[0]+','+start[1]+" A "+radius+','+radius+" 0 "+arcsweep+',1 '+end[0]+','+end[1];
  }

  findAngle(num){
    return num === 1 ? 1.9999999*Math.PI : 2*Math.PI*num;
  }

  render(){
    const {tasks} = this.props;

    const colors = colorScheme[this.props.colors] || colorScheme[window.MC.userProfile.colors];

    var progressArcs, progress;
    if(tasks.length === 0){
      this.progress = 0;
      this.progressArcs = [
        <Shape
          key={0}
          stroke={"#ddd"}
          strokeWidth={10}
          strokeCap={"square"}
          d={this.parametizeArc(70,70,65,0,1.999999*Math.PI)} />
      ]
    }
    else{
      var angles = {
        'mastery3': {count:0,stroke: colors.mastery3},
        'mastery2': {count:0,stroke: colors.mastery2},
        'mastery1': {count:0,stroke: colors.mastery1},
        'practiced': {count:0,stroke: colors.practiced},
        'unstarted': {count:0,stroke:'#ddd'}
      }

      tasks.forEach(task =>{
        if(task.mastery_level){
          angles[task.mastery_level].count++
        }
        else{
          angles['unstarted'].count++
        }

      })

      let start_angle = 0;
      let end_angle = 0;
      this.progressArcs = ['mastery3','mastery2','mastery1','practiced','unstarted']
        .map((task,i) => {
          start_angle = end_angle;
          end_angle += (angles[task].count)/tasks.length;
          let start = this.findAngle(start_angle);
          let end = this.findAngle(end_angle);
          let path = this.parametizeArc(70,70,65,start,end);

          return (
            <Shape
              key={i}
              stroke={angles[task].stroke}
              strokeWidth={10}
              strokeCap={"square"}
              d={path} />
          );
      })
      // found at https://khanacademy.zendesk.com/hc/en-us/articles/210934888-How-are-the-percentages-on-my-Student-Progress-report-calculated-
      this.progress = (4*angles['mastery3'].count + 3*angles['mastery2'].count +
                       2*angles['mastery1'].count + angles['practiced'].count)/(4.0*tasks.length)
    }
    return (
      <Surface
        width={140}
        height={140}
        style={{cursor: 'pointer'}}>
        <Group x={0} y={0}>
          {this.progressArcs}
        </Group>
        <Group x={70} y={70}>
          <Circle fill={"#fff"} radius={60}/>
        </Group>
        <Text
          fill={colors.mastery3}
          font='34px "Arial"'
          x={70}
          y={40}
          alignment={"center"}>
          {Math.round(this.progress*100)+'%'}
        </Text>
        <Text
          fill={colors.mastery3}
          font='18px "Arial"'
          x={70}
          y={70}
          alignment={"center"}>
          progress
        </Text>
      </Surface>
    )
  }
}
