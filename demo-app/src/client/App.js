import React, { Component, Fragment } from 'react';
import './app.css';

export default class App extends Component {
  state = {
    nodeInformation: ''
  };

  componentDidMount() {
    fetch('/version')
      .then(res => res.json())
      .then((info) => {
        this.setState(() => ({
          nodeInformation: info,
        }));
      });
  }

  render() {
    const { nodeInformation } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col border border-primary">
            {nodeInformation
              ? (
                <Fragment>
                  <h1> Node Information </h1>
                  <p> Name: {nodeInformation.appName} </p>
                  <p> Version:{nodeInformation.appVersion}</p>
                  <p> Latest Milestone:{nodeInformation.latestMilestone}</p>
                  <p> Coordinator Address:{nodeInformation.coordinatorAddress}</p>
                  <p> Demo App Name:{nodeInformation.app_name}</p> 
                  <p> Demo App Version:{nodeInformation.app_version}</p>
                  <a href="/getAllLogs">Get All Transactions </a>
                </Fragment>
              )
              : <h1>Loading.. please wait!</h1>}
          </div>
        </div>
      </div>
    );
  }
}
