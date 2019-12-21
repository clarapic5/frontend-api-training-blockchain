import React, { Component } from 'react';
import { Button, App } from 'components';
import { ApiService } from 'services';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/';
const MySwal = withReactContent(Swal);

class UploadActivity extends Component {
	constructor(props) {
		super(props);
		this.state = {
			files: [],
			fileUrls: [],
			extension: ' ',
			activities: [],
			goBack: false,
			message: ''
		}
		this.uploadFiles = this.uploadFiles.bind(this);
		this.showAlertSuccess = this.showAlertSuccess.bind(this);
		this.showAlertFailure = this.showAlertFailure.bind(this);
		this.goBack = this.goBack.bind(this);

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
				extension: file.name
			})
			// Make an AJAX upload request using Axios
			axios.post(BASE_URL + 'upload', data)
				.then(response => {
					this.setState({ fileUrl: [response.data.fileUrls, ...this.state.fileUrls] });
					//this.showAlertSuccess();
					//Call
					setTimeout(this.componentWillMount(), 60000)

				})
		});

		// Once all the files are uploaded 
		axios.all(uploaders)
		.then(() => {
			console.log('done');
		   })
		   .catch(err => 
			//alert(err.message)
			this.showAlertFailure()
		   )
	}

	componentWillMount() {
		const ext = this.state.extension;
		console.log(ext);
		console.log(BASE_URL + 'uploads/' + ext);
		let url = BASE_URL + 'uploads/' + ext;
		axios.get(url) // JSON File Path
			.then(response => {
				this.setState({
					activities: response.data,
				});
				//Call
				this.handleSubmit();
			})
			.catch(function (error) {
				console.log(error);
			});
	}



	handleSubmit(event) {
		console.log("submiiiit!!");
		const activities = this.state.activities;
		console.log(activities);
		console.log(activities.activityid);
		return ApiService.insert
			(	activities.activityid,
				activities.duration,
				activities.distance,
				activities.speed1,
				activities.speed2,
				activities.speed3,
				activities.speed4,
				activities.speed5,
				activities.speed6,
				activities.speed7,
				activities.avg_speed,
				activities.altitude,
				activities.hrate1,
				activities.hrate2,
				activities.hrate3,
				activities.hrate4,
				activities.hrate5,
				activities.hrate6,
				activities.hrate7,
				activities.avg_hrate,
				activities.calories,
				activities.weather,
				activities.temperature  )
			.then(response => {
				this.showAlertSuccess();
				console.log("success!!");
			})
			.catch(err => {
				localStorage.setItem("error", err);
				this.showAlertFailure();
			});
	}

	showAlertSuccess() {
		MySwal.fire(
			'Success!',
			'The transaction has been realized',
			'success'
		)
	}

	showAlertFailure() {
		MySwal.fire({
			icon: 'error',
			title: 'Oops...',
			text: 'Something went wrong!',
		  })
	}
	goBack() {
		this.setState({
			goBack: true
		});
	}

	/*render() {
		return (
			<div className="UploadActivity">
				<div className="title">Sports Activity Manager EOS</div>
				<div className="description">Please select the file .FIT to import</div>
				<form name="form" >
					<div className="col-sm-4">
						<input type="file" name="file" onChange={this.selectFiles} />
					</div>
					{this.state.message ? <p className="text-info">{this.state.message}</p> : ''}
				
					<div className="col-sm-4">
						<div className="bottom">
							<br /><br /><br /><br /><br /><br />
							<Button className="btn btn-primary" value="Submit" className="green" onClick={this.uploadFiles}>
								{"SUMBIT"}
							</Button>
							<Button className="btn btn-primary" value="Submit" className="green" onClick={this.showAlertSuccess}>
								{"ALERT"}
							</Button>
						</div>
					</div>
				<br /><br /><br /><br /><hr /><br />
					<div className="bottom">
						<Button type="submit" className="green">
							{"Back"}
						</Button>
					</div>
				</form>
			</div>
		)
	}
}*/



	render() {

		const goBack = this.state.goBack;
		if (goBack) return <App />
		return (
			<div className="UploadActivity">
				<div>
					<br />
					<div className="col-sm-12">
						<div className="title">Sports Activity Manager EOS</div>
						<div className="description">Please select the file .FIT to import</div>
						<div className="col-sm-4">
							<input className="form-control " type="file" onChange={this.selectFiles} multiple />
						</div>
						{this.state.message ? <p className="text-info">{this.state.message}</p> : ''}
						<br /><br /><br />
						<div className="col-sm-4">
							<Button className="btn btn-primary" value="Submit" className="green" onClick={this.uploadFiles}>
								{"SUMBIT"}
							</Button>
						</div>
					</div>
					<br /><br /><br /><br /><hr /><br />
					<div className="bottom">
						<Button type="submit" className="green" onClick={this.goBack}>
							{"Back"}
						</Button>
					</div>
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
			</div>
		);
	}
}

export default UploadActivity; 			