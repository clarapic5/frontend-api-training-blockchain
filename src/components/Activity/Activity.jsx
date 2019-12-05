import React, { Component } from 'react';
import { Button } from 'components';
import { ApiService } from 'services';

class Activity extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    // Extract data nameuser from props
    const { name } = this.props;

    return (
      <div className="Activity">
        <div className="title">Elemental Battles - powered by EOSIO</div>

        <div className="welcome">
          <span>ACTIVITY</span>
        </div>
        <div className="username">
          <span>{name}</span>
        </div>
        <div className="description">Please enter the activity you want to register in your system data.</div>

      </div>
    )
  }
}

export default Activity;
