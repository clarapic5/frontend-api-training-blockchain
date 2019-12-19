import React, { Component } from 'react';
import { Button, App, ActivityView } from 'components';
import { ApiService } from 'services';

class UserActivities extends Component {

    constructor(props) {
        super(props);

        this.state = {
            activities: [],
            activitySelected: null,
            clickOn: false,
            goBack: false
        };
        // Bind
        this.loadActivity = this.loadActivity.bind(this);
        this.goBack = this.goBack.bind(this);
        this.viewActivity = this.viewActivity.bind(this);
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
    renderTableData() {
        const userActivities = this.state.activities.filter(activity =>
            activity.username === localStorage.getItem("user_account"));

        return userActivities.map((activity, index) => {
            const { activityid, username, training_time, distance,
                speed, altitude, heart_rate, calories, incline,
                cadence, temperature } = activity //destructuring


            return (
                <tr key={activityid}>
                    <td>{activityid}</td>
                    <td>{username}</td>
                    <td>{training_time} sec</td>
                    <td>{distance} km </td>
                    <td>{speed} km/h</td>
                    <td>{altitude} m</td>
                    <td>{heart_rate} bpm</td>
                    <td>{calories} kcal</td>
                    <td>{incline} %</td>
                    <td>{cadence} rpm</td>
                    <td>{temperature} °C</td>
                    <ta font-size= '38px' value="VIEW" onClick={() => this.viewActivity(activity)}>👁</ta>
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
        if (goBack) return <App />
        if (clickOn) return (<ActivityView />)
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
                                        <th>Activityid</th>
                                        <th>Username</th>
                                        <th>Time</th>
                                        <th>Distance</th>
                                        <th>Speed</th>
                                        <th>Altitude</th>
                                        <th>Heart rate</th>
                                        <th>Calories</th>
                                        <th>Incline</th>
                                        <th>Cadence</th>
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
