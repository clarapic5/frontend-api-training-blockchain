import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'components';

// Services and redux
import { UserAction } from 'actions';
import { ApiService } from 'services';

class Activity extends Component {

  constructor(props) {

    super(props);

    this.state = {
      activityid: 0,
      username: '',
      time: 0,
      distance: 0,
      activities: []
    };
    // Form username, key and just a message to control errors sintaxis
   // this.state = {
     // form: {
       // username: '',
       // key: '',
      //  error: '',
     // },
    
    // Bind
    this.loadActivity = this.loadActivity.bind(this);
    this.loadActivity();
  //  this.handleChange = this.handleChange.bind(this);
   // this.handleSubmit = this.handleSubmit.bind(this);
  }

  loadActivity= () => {
    return ApiService.getActivityByName()
    .then(data => {
      console.log(data);
      this.setState({activities: data.rows});
    })
    .catch(e=>{
      console.error(e);
    })

  }

  /*loadActivity() {
    console.log("EOOO");
    // Extract `setUser` of `UserAction` and `user.name` of UserReducer from redux
   // const { setUser, user: { name } } = this.props;
    // Send request the blockchain by calling the ApiService,
    // Get the user object and store the `win_count`, `lost_count` and `game_data` object
    return ApiService.getActivityByName().then(activity => {
      this.setState({ activityid: activity.activityid });
      this.setState({ username: activity.username });
      this.setState({ time: activity.training_time});
      this.setState({ distance: activity.distance });
      localStorage.setItem("activityid", activity.activityid);
      localStorage.setItem("user", activity.username);
      localStorage.setItem("time",  activity.training_time);
      localStorage.setItem("distance", activity.distance);
     
      /* setUser({
        win_count: user.win_count,
        lost_count: user.lost_count,
        game: user.game_data,
      });
      // Set the loading state to false for displaying the app
      this.setState({ loading: false });
    });
  }
*/
  //Sends a login transaction to the blockchain
  handleSubmit(event) {
    // Hide data from the url browser
    event.preventDefault();
    
   // const { form } = this.state;
    //const { setUser } = this.props;

    // Send a login transaction to the blockchain by calling the ApiService
    return ApiService.insert(16,1,1,1,1,1,1,1,1,1)
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
   // const { error } = this.state;

    return (
      <div className="Activity">
        <div className="title">Sports Activity Manager EOS</div>
        <div className="description">Please use the Account Name and Private Key generated in the beginning to log into the system.</div>
      
          <div className="bottom">
            <Button onClick={this.handleSubmit.bind(this)} type="submit" className="green">
              {"CONFIRM"}
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
export default Activity;
