import React, { Component } from 'react';
import { connect } from 'react-redux';
// Services and redux
import { UserAction } from 'actions';
import { ApiService } from 'services';
import { UserProfile, Activity } from 'components';
import ViewTable from '../ViewTable/ViewTable';


class Training extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      isPressed: false
   };


    // Bind 
    this.loadUser = this.loadUser.bind(this);
    //this.onChangeIsPressed = this.onChangeIsPressed.bind(this);
    // Call
    this.loadUser();
  }

  onChangeButtonPressed() {
    this.setState({
      isPressed: true
    });
  }


  //Read json user
  loadUser() {
    // Extract setUser from UserActrion
    const { setUser, user: { name } } = this.props;

    //Extract data user from the blockchain calling ApiService
    return ApiService.getUserByName(name).then(user => {
      setUser({
       
      });
    });
  }


  render() {
    // Extract user data from local store
    const { user: { name} } = this.props;
  
    if (this.state.isPressed) return (<section className="Training"><ViewTable /></section>)
    else
      return (<section className="Training">
        <UserProfile
          name={name}
          changePressed={this.onChangeButtonPressed.bind(this)}
        />
      </section>)
  }

}

// Map all state to component props 
const mapStateToProps = state => state;

// Map the following action to props
const mapDispatchToProps = {
  setUser: UserAction.setUser,
};

// Export a redux connected component
export default connect(mapStateToProps, mapDispatchToProps)(Training);

