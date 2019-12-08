import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'components';

// Services and redux
import { UserAction } from 'actions';
import { ApiService } from 'services';

class Activity extends Component {

  constructor(props) {

    super(props);
    // Form username, key and just a message to control errors sintaxis
    this.state = {
      form: {
       // username: '',
       // key: '',
        error: '',
      },
    }
    // Bind
  //  this.handleChange = this.handleChange.bind(this);
   // this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Update the React state with the user data  
 /* handleChange(event) {
    const { name, value } = event.target;
    const { form } = this.state;

    this.setState({
      form: {
        ...form,
        [name]: value,
        error: '',
      },
    });
  }*/

  //Sends a login transaction to the blockchain
  handleSubmit(event) {
    // Hide data from the url browser
    event.preventDefault();
    
   // const { form } = this.state;
    //const { setUser } = this.props;

    // Send a login transaction to the blockchain by calling the ApiService
    return ApiService.insert(13,1,1,1,1,1,1,1,1,1)
      .then(() => {
       // setUser({ name: form.username });  // If it successes, save the username to redux store
      })
      .catch(err => {
        this.setState({ error: err.toString() }); // Otherwise, save the error state for displaying the message
        localStorage.setItem("error", err);
      });
  }

  render() {
    // Extract data from state
    const { error } = this.state;

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
