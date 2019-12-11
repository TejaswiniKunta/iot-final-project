import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Redirect } from 'react-router-dom'


class App extends Component {
    constructor(props) {
        super(props);
        this.state = { apiResponse: "",
      redirection: false,
      message:""};
    }

    callAPI() {
        fetch("http://localhost:9000/testAPI")
            .then(res => res.text())
            .then(res => this.setState({ apiResponse: res }))
            .catch(err => err);
    }

    componentDidMount() {
        this.callAPI();
    }

    handleAllowButton(e) {
      if (e) {
        e.preventDefault();
      }

      fetch("http://localhost:9000/users/1")
          .then(res => res.text())
          .then(res => this.setState({ redirection: true, message:"Welcome" }))
          .catch(err => err);
    }

    handleDenyButton(e) {
      if (e) {
        e.preventDefault();
      }

      fetch("http://localhost:9000/users/0")
          .then(res => res.text())
          .then(res => this.setState({ redirection: true,message:"Stranger" }))
          .catch(err => err);
    }


    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Who is at the door?</h1>
                </header>
                <img src={`data:image/png;base64,${this.state.apiResponse}`} className = "img_spacing" width="600" height="300"/>
                {this.state.redirection? <div>{this.state.message}</div>:
                  <div><button className= "button" type="button" onClick={this.handleAllowButton.bind(this)}>Allow</button>
                      <button className= "button" type="button" onClick={this.handleDenyButton.bind(this)}>Deny</button>
                      </div>}

            </div>
        );
    }
}

export default App;
