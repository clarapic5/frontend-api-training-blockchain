import React, { Component } from 'react';
import { Button } from 'components';

class UserProfile extends Component {

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

  isButtonCommunityClicked() {
    this.props.changeCommunityPressed(this.state.isPressed);
  }

  render() {
    // Extract data nameuser from props
    const { name } = this.props;
    return (
      <div className="UserProfile">
        <div className="title">Sports Activity Manager EOS</div>

        <div className="welcome">
          <span>WELCOME</span>
        </div>
        <div className="username">
          <span>{name}</span>
        </div>
        <div className="description">Please enter the activity you want to register in your system data.</div>

        <div className="buttons">
          <Button onClick={this.isButtonImportClicked.bind(this)} className="green">IMPORT</Button>
        </div>
        <div className="buttons">
          <Button onClick={this.isButtonActivitiesClicked.bind(this)} className="green">MY ACTIVITIES</Button>
        </div>
        <div className="buttons">
          <Button onClick={this.isButtonCommunityClicked.bind(this)} className="green">COMMUNITY</Button>
        </div>
      </div>
    )
  }
}

export default UserProfile;
