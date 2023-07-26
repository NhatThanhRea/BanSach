import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import profile from "./image/a.png"
import email from "./image/email.jpg"
import pass from "./image/pass.png"

class Login extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      txtUsername: '',
      txtPassword: ''
    };
  }
  render() {
    if (this.context.token === '') {
      return (
        <div className='main'>
          <div className='sub-main'>
            <div>
              <div className='imgs'>
                <div className='container-image'>
                  <img src={profile} alt='proflie' className='profile' />
                </div>

              </div>
              <div>
                <h1>login admin</h1>
                <div>
                  <img src={email} alt='email' className='email' />
                  <input type="text" placeholder="username" className='name' value={this.state.txtUsername} onChange={(e) => { this.setState({ txtUsername: e.target.value }) }} />
                </div>
                <div>
                  <img src={pass} alt='pass' className='pass' />
                  <input type="password" placeholder="username" className='name' value={this.state.txtPassword} onChange={(e) => { this.setState({ txtPassword: e.target.value }) }} />
                </div>
                <input type="submit" value="LOGIN" onClick={(e) => this.btnLoginClick(e)} />
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (<div />);
  }
  // event-handlers
  btnLoginClick(e) {
    e.preventDefault();
    const username = this.state.txtUsername;
    const password = this.state.txtPassword;
    if (username && password) {
      const account = { username: username, password: password };
      this.apiLogin(account);
    } else {
      alert('Please input username and password');
    }
  }
  // apis
  apiLogin(account) {
    axios.post('/api/admin/login', account).then((res) => {
      const result = res.data;
      if (result.success === true) {
        this.context.setToken(result.token);
        this.context.setUsername(account.username);
      } else {
        alert(result.message);
      }
    });
  }
}
export default Login;