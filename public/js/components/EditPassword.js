var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var PropTypes = React.PropTypes;


function EditPassword (props) {
  return (
    <div className="panel panel-default text-center" id="main">
      <div className="panel-heading"><h3 className="panel-title"><strong>Chỉnh sửa mật khẩu </strong></h3></div>
        <div className="panel-body">
         <form role="form" onSubmit={props.onSubmitUser}>
          <div className="form-group">
            <label className="labelLogin">Mật khẩu cũ</label>
            <input type="password"
              className="form-control inputlogin"
              onChange={props.onOldPass}
              value={props.oldpassword} />
          </div>
          <div className="form-group">
            <label className="labelLogin">Mật khẩu mới</label>
            <input type="password"
               className="form-control inputlogin"
               placeholder="Nhập mật khẩu mới"
               onChange={props.onNewPass}
               value={props.password}/>
          </div>
          <div className="form-group">
            <label className="labelLogin">Nhập lại mật khẩu mới</label>
            <input type="password"
               className="form-control inputlogin"
               placeholder="Nhập lại mật khẩu mới"
               onChange={props.onConfirm}
               value={props.confirm}/>
          </div>
          <button type="submit" className="btn btn-sm btn-default">Xác nhận</button>
        </form>

      </div>
    </div>
  )
};

EditPassword.PropTypes = {
  onSubmitUser: PropTypes.func.isRequired,
  onOldPass: PropTypes.func.isRequired,
  onNewPass: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  oldpassword: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  confirm: PropTypes.string.isRequired
}


module.exports = EditPassword;
