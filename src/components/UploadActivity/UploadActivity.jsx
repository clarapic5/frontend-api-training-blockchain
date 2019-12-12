import React, { Component } from 'react';
import { ApiService } from 'services';
import axios, { post } from 'axios';
import { Button } from 'components';

class UploadActivity extends Component {

  constructor() {
    super();
    this.state = {
      userList: []
    };
   }
    
   componentWillMount() {
    axios.get('https://api.myjson.com/bins/asc4k') // JSON File Path
      .then( response => {
        this.setState({
        userList: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
   }

  render() {
    const usersList = this.state.userList;
    console.log(usersList);
    console.log("mee he ejecutadoo");
    return (
      <div className="UploadActivity">
        <div className="title">Sports Activity Manager EOS</div>
        <div className="description">Please select the file .FIT to import</div>
        <form name="form" >
          <input type="file" />
          <button type="submit">Upload</button>
          <div className="bottom">
            <Button  type="submit" className="green">
              {"PUT"}
            </Button>
          </div>
        </form>
        </div>
        )
      }
    }
    
    
    
export default UploadActivity