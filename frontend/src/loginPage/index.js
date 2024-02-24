import { Component } from "react";
import { withRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Cookie from "js-cookie";
import "./index.css";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

// Write your code here

class Login extends Component {
  state = { username: "", password: "" };

  loginSuccess = () => {
    const { history } = this.props;
    history.replace("/home");
    window.location.reload(); // Reload the page
  };

  loginFailure = () => {
    alert("Incorrect UserDetails");
  };

  onChangeUsername = async (event) => {
    this.setState({ username: event.target.value });
  };

  onChangePassword = async (event) => {
    this.setState({ password: event.target.value });
  };

  submitBtn = async () => {
    const { username, password } = this.state;
    const userDetails = { username, password };
    console.log(userDetails);
    const url = "http://localhost:3000/login";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(userDetails),
    };
    try {
      const response = await fetch(url, options);
      if (response.ok === true) {
        const { jwtToken } = await response.json();
        console.log(jwtToken);
        Cookie.set("jwt_token", jwtToken, { expires: 1 });
        this.loginSuccess();
      } else {
        console.log("Login f");
        this.loginFailure();
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  registerBtn = async () => {
    const { username, password } = this.state;
    const userDetails = { username, password };
    console.log(userDetails);
    const url = "http://localhost:3000/register";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(userDetails),
    };
    const response = await fetch(url, options);
    if (response.ok === true) {
      alert("Registration SuccesFul");
    } else {
      alert("Registration UnsuccessFul");
    }
    this.setState({ username: "", password: "" });
  };

  render() {
    const { username, password } = this.state;
    return (
      <div className="login-bg-container">
        <div className="login-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="login-page-website-logo"
          />
          <label htmlFor="username">USERNAME</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={this.onChangeUsername}
          />
          <label htmlFor="password">PASSWORD</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={this.onChangePassword}
          />
          <div>
            <button
              type="button"
              className="login-btn btn btn-primary"
              onClick={this.submitBtn}
            >
              Login
            </button>
            <button
              type="button"
              className="login-btn btn btn-primary"
              onClick={this.registerBtn}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
