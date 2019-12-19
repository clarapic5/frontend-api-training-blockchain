import React, { Component } from 'react';
import { Button, UserActivities } from 'components';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, } from 'recharts';
import heartRate from './images/heart-rate.png';
import speed from './images/symbol-run.png';

const heartRateData = [
  {
    name: '', bmp: 100,
  },
  {
    name: '', bmp: 140,
  },
  {
    name: '', bmp: 110,
  },
  {
    name: '10 min', bmp: 150,
  },
  {
    name: '', bmp: 142,
  },
  {
    name: '', bmp: 100,
  },
  {
    name: '', bmp: 130,
  },
];


const speedData = [
  {
    name: '', speed: 5,
  },
  {
    name: '', speed: 6,
  },
  {
    name: '', speed: 5,
  },
  {
    name: '10 min', speed: 7,
  },
  {
    name: '', speed: 8,
  },
  {
    name: '', speed: 5,
  },
  {
    name: '', speed: 8,
  },
];

class ActivityView extends Component {

  constructor(props) {
    super(props);

    this.state = {
      goBack: false
    }
    //Bind
    this.goBack = this.goBack.bind(this);
  }


  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/xqjtetw0/';

  goBack() {
    this.setState({
      goBack: true
    });
  }
  render() {
    const goBack = this.state.goBack;
    if (goBack) return <UserActivities />
    return (
      <div className="ActivityView">
        <center> <img src={heartRate} alt="symbol heart rate" /></center>
        <LineChart
          width={500}
          height={300}
          data={heartRateData}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="bmp" stroke="#DB1227" activeDot={{ r: 8 }} />
        </LineChart>
        <center> <img src={speed} alt="symbol speed" /></center>
        <LineChart
          width={500}
          height={300}
          data={speedData}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="speed" stroke="#129E2A" activeDot={{ r: 8 }} />
        </LineChart>
        
        <div class="bottom"><button class="Button green" type="submit" onClick={this.goBack} >Back</button></div>
      </div>
    )
  }
}

export default ActivityView;
