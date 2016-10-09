var React = require('react');
var PropTypes = React.PropTypes;

function Login (props) {
  return (
    <div className="panel panel-default text-center" id="main">
      <div className="panel-heading"><h3 className="panel-title"><strong>Sign In </strong></h3></div>
        <div className="panel-body">
         <form role="form" onSubmit={props.onSubmitUser}>
          <div className="form-group">
            <label className="labelLogin">Username or Email</label>
            <input type="email"
                   className="form-control inputlogin"
                   placeholder="Enter email"
                   onChange={props.onUpdateUser}
                   value={props.email} />
          </div>
          <div className="form-group">
            <label className="labelLogin">Password <a href="/sessions/forgot_password">(forgot password)</a></label>
            <input type="password"
                   className="form-control inputlogin"
                   placeholder="Password"
                   onChange={props.onConfirmPass}
                   value={props.password}/>
          </div>
          <button type="submit" className="btn btn-sm btn-default">Sign in</button>
        </form>
      </div>
    </div>
  )
};

Login.PropTypes = {
  onSubmitUser: PropTypes.func.isRequired,
  onUpdateUser: PropTypes.func.isRequired,
  onConfirmPass: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

module.exports = Login;
