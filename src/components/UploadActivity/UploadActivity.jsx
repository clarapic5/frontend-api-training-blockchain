import React, { Component } from 'react';
import { Button } from 'components';
import { ApiService } from 'services';

class UploadActivity extends Component {

  constructor(props) {

    super(props);
    this.state = {
      activities: []
    };
 
    this.handleSubmit = this.handleSubmit.bind(this);
  }



  handleSubmit(event) {
    event.preventDefault();
    
    return ApiService.insert(2,1,1,1,1,1,1,1,1,1)
      .catch(err => {
        localStorage.setItem("error", err);
      });
  }

  render() {
    return (
      <div className="UploadActivity">
        <div className="title">Sports Activity Manager EOS</div>
        <div className="description">Please use the Account Name and Private Key generated in the beginning to log into the system.</div>
          <div className="bottom">
            <Button onClick={this.handleSubmit.bind(this)} type="submit" className="green">
              {"PUT"}
            </Button>
          </div>
      
      </div>
    )
  }
}
export default UploadActivity;
