import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Training, Login} from 'components';

// Services and redux
import { UserAction } from 'actions';
import { ApiService } from 'services';

class App extends Component {

  constructor(props) {
    super(props);

    // Bind 
    this.getCurrentUser = this.getCurrentUser.bind(this);
    // Call 
    this.getCurrentUser();
  }
  
  //Function to get the user from the browser local storage
  getCurrentUser() {
    const { setUser } = this.props;
    return ApiService.getCurrentUser()
      // If the server return a username
      .then(username => {
        // Save the username to redux
        setUser({ name: username });
      })
      // To ignore 401 console error
      .catch(() => {});
  }


  render() {
    // Extract user data from redux
    const { user: { name } } = this.props;

    // If the username is set in redux, display the Training component
    // If the username is NOT set in redux, display the Login component
    
    if(name) return (<div className="App"><Training /></div>)
    if (!name) return (<div className="App"><Login/></div> ) 
    
    
  }

}



// Map all state to component props (for redux to connect)
const mapStateToProps = state => state;

// Map the following action to props
const mapDispatchToProps = {
  setUser: UserAction.setUser,
};

// Export a redux connected component
export default connect(mapStateToProps, mapDispatchToProps)(App);
