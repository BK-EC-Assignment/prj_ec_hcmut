var React = require('react');
var EditPassword = require('../components/EditPassword');

var HandleEditPassword = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitalState: function () {
    return ({
      password: ''
    })
  },

  handleOldPass: function (e) {
    this.setState({
      oldpassword: e.target.value
    })
  },

  handleNewPass: function (e) {
    this.setState({
      password: e.target.value
    })
  },

  handleConfirm: function (e) {
    this.setState({
      confirm: e.target.value
    })
  },

  handleSubmitUser: function (e) {
    e.preventDefault();
    var token = getCookie('token')
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "http://localhost:7770/api/users/changePassword?token=" + token,
      "method": "PUT",
      "headers": {
        "cache-control": "no-cache",
        "content-type": "application/x-www-form-urlencoded"
      },
      "data": {
        "oldpassword": this.state.oldpassword,
        "newpassword": this.state.password,
        "confirm": this.state.confirm
      }
    }

    $.ajax(settings).done(function (response) {
      if (response.meta.code === 200) {
        PNotify.removeAll();
          new PNotify({
            title: 'Success',
            text: 'Change password success',
            type: 'success',
            stack: false,
            delay: 2000
          });
          this.context.router.push({
            pathname: '/login',
          })
      } else {
        PNotify.removeAll();
          new PNotify({
            title: 'Error',
            text: 'Please check your input',
            type: 'error',
            stack: false,
            delay: 2000
          });
      }
    }.bind(this));
  },

  render: function () {
    return (
      <EditPassword
        onSubmitUser={this.handleSubmitUser}
        onOldPass={this.handleOldPass}
        onNewPass={this.handleNewPass}
        onConfirm={this.handleConfirm} />
    );
  }
});

module.exports = HandleEditPassword;
