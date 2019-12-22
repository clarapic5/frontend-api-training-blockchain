import React, { Component } from 'react';
import { connect } from 'react-redux';
import { UserAction } from 'actions';
import { ApiService } from 'services';
import { UserProfile, UploadActivity } from 'components';
import { UserActivities, SharedActivities} from 'components';


class Menu extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isPressed: false,
      isActivityPressed: false,
      isCommunityPressed: false
    };

    this.loadUser = this.loadUser.bind(this);
    this.loadUser();
  }

  onChangeButtonPressed() {
    this.setState({
      isPressed: true
    });
  }

  
  onChangeActivityButtonPressed() {
    this.setState({
      isActivityPressed: true
    });
  }

  onChangeCommunityButtonPressed() {
    this.setState({
      isCommunityPressed: true
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
    const { user: { name } } = this.props;

    if (this.state.isPressed) return (<section className="Menu"><UploadActivity/></section>)
    if (this.state.isActivityPressed) return (<UserActivities/> )
    if (this.state.isCommunityPressed) return(<SharedActivities/>)
    else
      return (<section className="Menu">
        <UserProfile
          name={name}
          changePressed={this.onChangeButtonPressed.bind(this)}
          changeActivityPressed = {this.onChangeActivityButtonPressed.bind(this)}
          changeCommunityPressed = {this.onChangeCommunityButtonPressed.bind(this)}
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
export default connect(mapStateToProps, mapDispatchToProps)(Menu);

