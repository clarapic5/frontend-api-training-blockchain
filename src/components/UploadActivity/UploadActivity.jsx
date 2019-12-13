import React, { Component } from 'react';
import { ApiService } from 'services';
import axios, { post } from 'axios';
import { Button } from 'components';

class UploadActivity extends Component {

  constructor() {
    super();
    this.state = {
      selectedFile: null,
      activities: []
    };
   }


   //GET FILE! OK
  onChangeHandler = event => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    })
  }

  //COMO GUARDAR??
  onClickHandler = () => {
    const data = new FormData()
    data.append('file', this.state.selectedFile)
    console.log(this.state.selectedFile)
   // axios.post("http://localhost:8000/upload", data, {
   // })
    //  .then(res => { 
      //  console.log(res.statusText)
     // })
  }
    

  //OBTIENE ARRAY DE LA URL! OK
   componentWillMount() {
    axios.get('https://api.myjson.com/bins/asc4k') // JSON File Path
      .then( response => {
        this.setState({
        activities: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
   }

  render() {
    const activities = this.state.activities;
    console.log(activities);
    console.log("mee he ejecutadoo");
    return (
      <div className="UploadActivity">
        <div className="title">Sports Activity Manager EOS</div>
        <div className="description">Please select the file .FIT to import</div>
        <form name="form" >
        <input type="file" name="file" onChange={this.onChangeHandler} />
        <button type="button" onClick={this.onClickHandler}>Upload</button>
          <div className="bottom">
            <Button  type="submit" className="green">
              {"Back"}
            </Button>
          </div>
        </form>
        </div>
        )
      }
    }
    
    
    
export default UploadActivity