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
      address: ''
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

  handleSubmitUser: function (e) {
    if (this.state.email === null || this.state.username === null || this.state.password === null || this.state.address === null) {
      PNotify.removeAll();
      new PNotify({
        type: 'error',
        title: 'Error',
        text: 'Please fill out both textboxes!'
      })
    } else {
      axios.post('/api/users/register', {username: this.state.username, email: this.state.email, password: this.state.password, address: this.state.address})
        .then(function (res) {
          console.log(res)
          if (res.data.meta.success === 1) {
            PNotify.removeAll();
            new PNotify({
              type: 'success',
              title: 'Successful',
              text: res.data.meta.message
            })

            this.context.router.push({
              pathname: '/login',
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
      <SignUp
        onSubmitUser={this.handleSubmitUser}
        onUpdateName={this.handleName}
        onUpdateUser={this.handleEmail}
        onPassWord={this.handlePass}
        onConfirmPass={this.confirmPass}
        onAddress={this.address} />
    );
  }
});

module.exports = HandleRegister;
