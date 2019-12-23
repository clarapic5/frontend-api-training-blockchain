import React, { Component } from 'react';
import { Button, App, ActivityView } from 'components';
import { ApiService } from 'services';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal);

class UserActivities extends Component {

    constructor(props) {
        super(props);

        this.state = {
            activities: [],
            activitySelected: null,
            clickOn: false,
            goBack: false,
            refresh: false,
        };
        // Bind
        this.loadActivity = this.loadActivity.bind(this);
        this.goBack = this.goBack.bind(this);
        this.viewActivity = this.viewActivity.bind(this);
        this.deleteActivitybyId = this.deleteActivitybyId.bind(this);
        this.shareActivitybyId = this.shareActivitybyId.bind(this);
        this.loadActivity();
    }


    loadActivity = () => {
        return ApiService.getAllActivities()
            .then(data => {
                for (let row of data) {
                    //Case1
                    if (row.distance) {
                        let n = row.distance;
                        let aux = parseFloat(n).toFixed(2);
                        row.distance = aux;
                    }
                    //Case2
                    if (row.speed) {
                        let n = row.speed;
                        let aux = parseFloat(n).toFixed(2);
                        row.speed = aux;
                    }
                    //Case3
                    if (row.temperature) {
                        let n = row.temperature;
                        let aux = parseFloat(n).toFixed(2);
                        row.temperature = aux;
                    }

                }
                this.setState({ activities: data });
            })
            .catch(e => {
                console.error(e);
            })

    }

    deleteActivitybyId(id) {
        MySwal.fire({
            title: 'Are you sure to delete?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                return ApiService.remove(id).then(response => {
                    this.setState({
                        refresh: true
                    });
                    Swal.fire(
                        'Deleted!',
                        'Transaction completed',
                        'success'
                    )

                })
                    .catch(err => {
                        localStorage.setItem("error", err);
                    });
            }
        })
    }

   
    shareActivitybyId(id) {
        MySwal.fire({
            title: 'Are you sure to share?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, share it!'
        }).then((result) => {
            if (result.value) {
                return ApiService.share(id).then(response => {
                    Swal.fire(
                        'Shared!',
                        'Transaction completed',
                        'success'
                    )

                })
                    .catch(err => {
                        localStorage.setItem("error", err);
                    });
            }
        })
    }




renderTableData() {
    const userActivities = this.state.activities.filter(activity =>
        activity.username === localStorage.getItem("user_account"));

    return userActivities.map((activity, index) => {
        const { activityid, username, duration, distance, avg_speed,
            altitude, avg_hrate, calories, weather, temperature } = activity //destructuring


        return (
            <tr key={activityid}>
                <td>{activityid}</td>
                <td>{duration} min</td>
                <td>{distance} km </td>
                <td>{avg_speed}   </td>
                <td>{altitude} m</td>
                <td>{avg_hrate} bpm</td>
                <td>{calories} kcal</td>
                <td>{weather}   </td>
                <td>{temperature} °C</td>
                <ta font-size='38px' value="VIEW" onClick={() => this.viewActivity(activity)}>👁 </ta>
                <ta font-size='38px' value="VIEW" onClick={() => this.deleteActivitybyId(activity.activityid)}>🗑 </ta>
                <ta font-size='38px' value="VIEW" onClick={() => this.shareActivitybyId(activity.activityid)}>⮳</ta>
            </tr>
        )
    })
}

viewActivity(activity) {
    alert(activity.activityid);
    console.log(activity.activityid);
    this.setState({
        clickOn: true,
        activitySelected: activity
    });
}

goBack() {
    this.setState({
        goBack: true
    });
}


render() {
    const goBack = this.state.goBack;
    const clickOn = this.state.clickOn;
    const activitySelected = this.state.activitySelected;
    const refresh = this.state.refresh;

    if (goBack) return <App />
    if (clickOn) return (<ActivityView activitySelected={activitySelected} />)
    if (refresh) return <UserActivities />
    return (
        <div class="App">
            <section class="Menu">
                <div class="App"></div>
                <section>
                    <h1>MY ACTIVITIES</h1>
                    <div class="tbl-header">
                        <div class="title">Sports Activity Manager EOS</div>
                        <table cellpadding="0" cellspacing="0" border="0">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Duration</th>
                                    <th>Distance</th>
                                    <th>AVG Speed</th>
                                    <th>Altitude</th>
                                    <th>AVG H Rate</th>
                                    <th>Calories</th>
                                    <th>Weather</th>
                                    <th>Temperature</th>
                                    <th></th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                    <div class="tbl-content">
                        <table cellpadding="0" cellspacing="0" border="0">
                            <tbody>
                                {this.renderTableData()}
                            </tbody>
                        </table>
                    </div>
                    <br /><br /><br /><br /><hr /><br />
                    <div className="bottom">
                        <Button type="submit" className="green" onClick={this.goBack}>
                            {"Back"}
                        </Button>
                    </div>
                </section>
            </section>
        </div>

    );
}
}

export default UserActivities;
