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
          <span>WELCOME</span>
        </div>
        <div className="username">
          <span>{ name }</span>
        </div>
        <div className="description">Please enter the activity you want to register in your system data.</div>
       
        <div className="buttons">
          <Button onClick={this.sayHello} className="green">IMPORT</Button>
        </div>
      </div>
    )
  }
}

export default PlayerProfile;
