import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,} from 'recharts';


const data = [
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


const data2 = [
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
      isPressed: false,
    }
  }


  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/xqjtetw0/';

  render() {
    // Extract data nameuser from props
    const { name } = this.props;

    return (
      <div className="ActivityView">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="bmp" stroke="#DB1227" activeDot={{ r: 8 }} />
        </LineChart>

        <LineChart
          width={500}
          height={300}
          data={data2}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="speed" stroke="#F2C42E" activeDot={{ r: 8 }} />
        </LineChart>
        

      </div>
    )
  }
}

export default ActivityView;
