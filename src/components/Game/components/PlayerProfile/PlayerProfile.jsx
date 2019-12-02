import React, { Component } from 'react';
// Components
import { Button } from 'components';

class PlayerProfile extends Component {

  constructor(props) {
    super(props);
    this.sayHello = this.sayHello.bind(this);
  }

  sayHello() {
    alert('Hello!');
  }


  render() {
    // Extract data and event functions from props
    const { name, winCount, lostCount, onStartGame } = this.props;

    // Display welcome message,
    //         buttons for login / start game,
    //         number of winning and losing
    return (
      <div className="PlayerProfile">
        <div className="title">Elemental Battles - powered by EOSIO</div>
        <div className="welcome">
          <span>Welcome</span>
        </div>
        <div className="username">
          <span>{ name }</span>
        </div>
        <div className="record">
          <p>Your Current Record</p>
          <span>Win <span className="count">{ winCount }</span></span>
          <span> | </span>
          <span>Lost <span className="count">{ lostCount }</span></span>
        </div>
        <div className="buttons">
          <Button onClick={this.sayHello} className="green">IMPORT</Button>
        </div>
      </div>
    )
  }
}

export default PlayerProfile;
