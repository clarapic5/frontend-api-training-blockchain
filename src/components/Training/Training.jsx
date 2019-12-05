import React, { Component } from 'react';
import { connect } from 'react-redux';
// Services and redux
import { UserAction } from 'actions';
import { ApiService } from 'services';
import {UserProfile} from 'components';

class Training extends Component {

  constructor(props) {
    super(props);
    
    // Bind 
    this.loadUser = this.loadUser.bind(this);
    // Call
    this.loadUser();
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
    const { user: { name } } = this.props;

    return (
      <section className="Training">
        <UserProfile
          name={name}
        />
      </section>
    )
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

