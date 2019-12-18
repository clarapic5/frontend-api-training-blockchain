import React, { Component } from 'react';

class ActivityView extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isPressed: false,
    }
  }

 

  render() {
    // Extract data nameuser from props
    const { name } = this.props;
    return (
      <div className="ActivityView">
        <div className="title">Sports Activity Manager EOS</div>
      

      </div>
    )
  }
}

export default ActivityView;
