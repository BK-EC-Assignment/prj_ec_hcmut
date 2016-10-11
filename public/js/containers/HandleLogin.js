var React = require('react');
var Login = require('../components/Login');

var HandleLogin = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitalState: function () {
    return ({
      email: '',
      password: ''
    })
  },

  handleEmail: function (e) {
    this.setState({
      email: e.target.value
    })
  },

  handlePass: function (e) {
    this.setState({
      password: e.target.value
    })
  },

  handleSubmitUser: function (e) {
    e.preventDefault();
    if (this.state.email === null || this.state.password === null) {
      PNotify.removeAll();
      new PNotify({
        type: 'error',
        title: 'Error',
        text: 'Please fill out both textboxes!'
      })
    } else {
      axios.post('/api/users/login', {email: this.state.email, password: this.state.password})
        .then(function (res) {
          if (res.data.meta.success === 1) {
            this.setState({
              token: res.data.response.user.information.token,
              role: res.data.response.user.information.role,
              email: res.data.response.user.information.email,
              username: res.data.response.user.information.username
            })
            document.cookie = "token = " + this.state.token
            document.cookie = "role = " + this.state.role
            document.cookie = "email = " + this.state.email
            document.cookie = "username = " + this.state.username

            PNotify.removeAll();
            new PNotify({
              type: 'success',
              title: 'Successful',
              text: res.data.meta.message
            })

            this.context.router.push({
              pathname: '/',
            })
          } else {
            PNotify.removeAll();
            new PNotify({
              type: 'error',
              title: 'Error!',
              text: res.data.meta.message
            })
          }
        }.bind(this))
    }
  },

  render: function () {
    return (
      <Login
        onSubmitUser={this.handleSubmitUser}
        onUpdateUser={this.handleEmail}
        onConfirmPass={this.handlePass} />
    );
  }
});

module.exports = HandleLogin;
