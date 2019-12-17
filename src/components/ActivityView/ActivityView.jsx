import React, { Component } from 'react';
import { Button } from 'components';

class ActivityView extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isPressed: false,
    }
  }

  isButtonImportClicked() {
    this.props.changePressed(this.state.isPressed);
  }
  isButtonActivitiesClicked() {
    this.props.changeActivityPressed(this.state.isPressed);
  }

  render() {
    // Extract data nameuser from props
    const { name } = this.props;
    return (
      <div className="ActivityView">
        <div className="title">Sports Activity Manager EOS</div>

        <div className="welcome">
          <span>ACTIVITY</span>
        </div>
        <div className="username">
          <span>idactivity</span>
        </div>
        <div className="description">This is the view of your activity</div>

      </div>
    )
  }
}

export default ActivityView;
