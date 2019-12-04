import React, { Component } from 'react';
import { Button } from 'components';

class UserProfile extends Component {

  constructor(props) {
    super(props);
    this.sayHello = this.sayHello.bind(this);
  }

  sayHello() {
    alert('Hello!');
  }


  render() {
    // Extract data nameuser from props
    const { name} = this.props;
   
    return (
      <div className="UserProfile">
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

export default UserProfile;
