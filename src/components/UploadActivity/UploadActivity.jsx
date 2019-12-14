import React, { Component } from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/';

class UploadActivity extends Component {
	constructor(props) {
		super(props);
		this.state = {
			files: [],
			fileUrls: [],
			extension: ' ',
			activities: [],
			message: ''
		}
		this.componentWillMount = this.componentWillMount.bind(this);
	}

	selectFiles = (event) => {
		let files = [];
		for (var i = 0; i < event.target.files.length; i++) {
			files[i] = event.target.files.item(i);
		}
		files = files.filter(file => file.name.match(/\.(json)$/))
		let message = `${files.length} valid file(s) selected`
		this.setState({ files, message })
	}

	uploadFiles = () => {
		const uploaders = this.state.files.map(file => {
			const data = new FormData();
			data.append("image", file, file.name);
			this.setState({
				extension: file.lastModified + '-' + file.name
			})
			// Make an AJAX upload request using Axios
			axios.post(BASE_URL + 'upload', data)
				.then(response => {
					this.setState({ fileUrl: [response.data.fileUrls, ...this.state.fileUrls] });
				})
		});

		// Once all the files are uploaded 
		axios.all(uploaders).then(() => {
			console.log('done');
		}).catch(err => alert(err.message));
	}

	componentWillMount() {
		/*	const ext = this.state.extension;
			console.log(ext);
			console.log(BASE_URL + 'uploads/' + ext);
			let url = 'https://api.myjson.com/bins/asc4k';
			axios.get(url) // JSON File Path
				.then(response => {
					this.setState({
						activities: response.data
					});
				})
				.catch(function (error) {
					console.log(error);
				});*/
		
		// Once all the files are uploaded 
	}

	render() {
		return (
			<div>
				<br />
				<div className="col-sm-12">
					<h1>Image Uploader</h1><hr />
					<div className="col-sm-4">
						<input className="form-control " type="file" onChange={this.selectFiles} multiple />
					</div>
					{this.state.message ? <p className="text-info">{this.state.message}</p> : ''}
					<br /><br /><br />
					<div className="col-sm-4">
						<button className="btn btn-primary" value="Submit" onClick={this.uploadFiles}>Submit</button>
					</div>
					<br /><br /><br />
					<div className="col-sm-4">
						<button className="btn btn-primary" value="Submit" onClick={this.componentWillMount}>Mount</button>
					</div>
				</div>
				<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><hr /><br />
				<div className="row col-lg-12">
					{
						this.state.fileUrls.map((url, i) => (
							<div className="col-lg-2" key={i}>
								<img src={BASE_URL + url} className="img-rounded img-responsive" alt="not available" /><br />
							</div>
						))
					}
				</div>
			</div>
		);
	}
}

export default UploadActivity; 			