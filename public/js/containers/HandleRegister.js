var React = require('react');
var SignUp = require('../components/SignUp')

var HandleRegister = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitalState: function () {
    return ({
      username: '',
      email: '',
      password: '',
      address: '',
      phone: ''
    })
  },

  handleName: function (e) {
    this.setState({
      username: e.target.value
    })
  },

  handleEmail: function (e) {
    this.setState({
      email: e.target.value
    })
  },

  confirmPass: function (e) {
    this.setState({
      confirmPass: e.target.value
    })
  },

  handlePass: function (e) {
    this.setState({
      password: e.target.value
    })
  },

  address: function (e) {
    this.setState({
      address: e.target.value
    })
  },

  phone: function (e) {
    this.setState({
      phone: e.target.value
    })
  },

  handleSubmitUser: function (e) {
    if (this.state.password != this.state.confirmPass) {
      PNotify.removeAll();
      new PNotify({
        type: 'error',
        title: 'Error!',
        text: 'Password not match'
      })

      this.context.router.push({
        pathname: '/signup',
      })
    } else {
      var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:7770/api/users/register",
        "method": "POST",
        "headers": {
          "cache-control": "no-cache",
          "content-type": "application/x-www-form-urlencoded"
        },
        "data": {
          "username": this.state.username,
          "email": this.state.email,
          "password": this.state.password,
          "address": this.state.address,
          "phone": this.state.phone
        }
      }
      $.ajax(settings).done(function (response) {
        if (response.meta.code === 200) {
          PNotify.removeAll();
          new PNotify({
            type: 'success',
            title: 'Successful',
            text: response.meta.message
          })

          this.context.router.push({
            pathname: '/login',
          })
        } else {
          PNotify.removeAll();
          new PNotify({
            type: 'error',
            title: 'Error!',
            text: response.meta.message
          })
        }

      });
    }
  },

  render: function () {
    return (
      <SignUp
        onSubmitUser={this.handleSubmitUser}
        onUpdateName={this.handleName}
        onUpdateUser={this.handleEmail}
        onPassWord={this.handlePass}
        onConfirmPass={this.confirmPass}
        onAddress={this.address}
        onPhone={this.phone} />
    );
  }
});

module.exports = HandleRegister;
