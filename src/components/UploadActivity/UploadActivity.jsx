import React, { Component } from 'react';
import { Button } from 'components';

// Services and redux
import { ApiService } from 'services';

class UploadActivity extends Component {

  constructor(props) {

    super(props);

    this.state = {

      activities: []
    };
 
    this.handleSubmit = this.handleSubmit.bind(this);
  }



 
  //Sends a login transaction to the blockchain
  handleSubmit(event) {
    // Hide data from the url browser
    event.preventDefault();
    
   // const { form } = this.state;
    //const { setUser } = this.props;

    // Send a login transaction to the blockchain by calling the ApiService
    return ApiService.insert(2,1,1,1,1,1,1,1,1,1)
      .then(() => {
       // setUser({ name: form.username });  // If it successes, save the username to redux store
      })
      .catch(err => {
       // this.setState({ error: err.toString() }); // Otherwise, save the error state for displaying the message
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
