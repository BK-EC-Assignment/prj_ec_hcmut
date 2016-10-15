var React = require('react');
var PropTypes = React.PropTypes;

function SignUp (props) {
  return (
    <div>
    <div className="panel panel-default text-center" id="main">
      <div className="panel-heading"><h3 className="panel-title"><strong>Đăng ký</strong></h3></div>
        <div className="panel-body">
         <form role="form" onSubmit={props.onSubmitUser}>
          <div className="form-group">
            <label className="labelLogin">Tên đăng nhập</label>
            <input type="text"
                   className="form-control inputlogin"
                   placeholder="Chỉ cho phép kí tự và số"
                   onChange={props.onUpdateName}
                   value={props.username}
                    />
          </div>
          <div className="form-group">
            <label className="labelLogin">Email</label>
            <input type="email"
                   className="form-control inputlogin"
                   placeholder="Nhập email"
                   onChange={props.onUpdateUser}
                   value={props.email}
                   />
          </div>
          <div className="form-group">
            <label className="labelLogin">Mật khẩu</label>
            <input type="password"
                   className="form-control inputlogin"
                   placeholder="Ít nhất 8 kí tự"
                   onChange={props.onPassWord}
                   value={props.password}
                   />
          </div>
          <div className="form-group">
            <label className="labelLogin">Nhập lại mật khẩu</label>
            <input type="password"
                   className="form-control inputlogin"
                   placeholder="Nhập lại mật khẩu"
                   onChange={props.onConfirmPass}
                   value={props.confirmPass}
                   />
          </div>

          <div className="form-group">
            <label className="labelLogin">Địa chỉ</label>
            <input type="text"
                   className="form-control inputlogin"
                   placeholder="Địa chỉ"
                   onChange={props.onAddress}
                   value={props.address}
                   />
          </div>
          <button type="submit" className="btn btn-sm btn-default">Hoàn tất</button>
        </form>
      </div>
    </div>
    </div>
  )
}

SignUp.PropTypes = {
  onSubmitUser: PropTypes.func.isRequired,
  onUpdateName: PropTypes.func.isRequired,
  onUpdateUser: PropTypes.func.isRequired,
  onConfirmPass: PropTypes.func.isRequired,
  onPassWord: PropTypes.func.isRequired,
  onAddress: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  confirmPass: PropTypes.string.isRequired,
  address: PropTypes.string.address
}


module.exports = SignUp;
