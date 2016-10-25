var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;


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
                   />
          </div>
          <div className="form-group">
            <label className="labelLogin">Mật khẩu mới</label>
            <input type="password"
                   className="form-control inputlogin"
                   placeholder="Nhập mật khẩu mới"
                   />
          </div>
          <div className="form-group">
            <label className="labelLogin">Nhập lại mật khẩu mới</label>
            <input type="password"
                   className="form-control inputlogin"
                   placeholder="Nhập lại mật khẩu mới"
                   />
          </div>
          <button type="submit" className="btn btn-sm btn-default">Xác nhận</button>
        </form>

      </div>
    </div>
  )
};

module.exports = EditPassword;
