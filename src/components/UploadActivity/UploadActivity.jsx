import React, { Component } from 'react';
import { ApiService } from 'services';
import axios, { post } from 'axios';
import { Button } from 'components';

class UploadActivity extends Component {

  constructor(props) {
    super(props);
    this.state = {
      file: null,
      activities: []
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  onFormSubmit(e) {
    e.preventDefault() // Stop form submit
    this.fileUpload(this.state.file).then((response) => {
      console.log(response.data);
    })
  }
  onChange(e) {
    this.setState({ file: e.target.files[0] })
  }
  fileUpload(file) {
    const url = 'http://example.com/file-upload';
    const formData = new FormData();
    formData.append('file', file)
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    return post(url, formData, config)
  }

  handleSubmit(event) {
    event.preventDefault();

    return ApiService.insert(31, 1, 1, 1, 1, 1, 1, 1, 1, 1)
      .catch(err => {
        localStorage.setItem("error", err);
      });
  }


  render() {
    return (
      <div className="UploadActivity">
        <div className="title">Sports Activity Manager EOS</div>
        <div className="description">Please select the file .FIT to import</div>
        <form name="form" onSubmit={this.onFormSubmit}>
          <input type="file" onChange={this.onChange} />
          <button type="submit">Upload</button>
          <div className="bottom">
            <Button onClick={this.handleSubmit.bind(this)} type="submit" className="green">
              {"PUT"}
            </Button>
          </div>
        </form>
        </div>
        )
      }
    }
    
    
    
export default UploadActivity