import React, { Component } from "react";
import axios from "axios";

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.getUsers = this.getUsers.bind(this);

    this.state = {
      username: "",
      users: [],
      isLoaded: false,
    };
  }

  componentDidMount() {
    axios.get("http://localhost:5000/users").then((res) => {
      this.setState({ users: res.data, isLoaded: true });
    });
  }

  getUsers() {
    console.log("sfs");
    return (
      <ul>
        {
        this.state.users.forEach((item) => {
          (<li>dgdgd</li>)
        })
        }
      </ul>
    );
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault(e);
    const user = {
      username: this.state.username,
    };

    console.log(user);

    axios
      .post("http://localhost:5000/users/add", user)
      .then((res) => console.log(res.data));

    this.setState({
      username: "",
    });
  }

  render() {
    return (
      <div>
        <h3>Create New User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <input
              className="form-control"
              required
              type="text"
              value={this.state.username}
              onChange={this.onChangeUsername}
            ></input>
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Create User"
              className="btn btn-primary"
            ></input>
          </div>
        </form>
        <div>{this.state.isLoaded ? this.getUsers() : ""}</div>
      </div>
    );
  }
}
