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
    
    
    // Bind
    this.loadActivity = this.loadActivity.bind(this);
    this.loadActivity();
  //  this.handleChange = this.handleChange.bind(this);
   // this.handleSubmit = this.handleSubmit.bind(this);
  }

  loadActivity= () => {
    return ApiService.getActivityByName()
    .then(data => {
     //  console.log(data);
      this.setState({activities: data});
    })
    .catch(e=>{
      console.error(e);
    })

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
   // Extract data from state
   const {activities} = this.state;
   if (activities != null && activities.length != 0) {
     console.log("eeeooo");
     console.log(activities);
   }
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

// Map all state to component props (for redux to connect)
//const mapStateToProps = state => state;

// Map the following action to props
/*const mapDispatchToProps = {
  setUser: UserAction.setUser,
};*/

// Export a redux connected component
//export default connect(mapStateToProps, mapDispatchToProps)(Activity);
export default UploadActivity;
