var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var SignUp = React.createClass({
  render: function() {
    return (
      <div>
      <div className="panel panel-default text-center" id="main">
        <div className="panel-heading"><h3 className="panel-title"><strong>Đăng ký</strong></h3></div>
          <div className="panel-body">
           <form role="form">
            <div className="form-group">
              <label className="labelLogin">Tên đăng nhập</label>
              <input type="text"
                     className="form-control inputlogin"
                     placeholder="Chỉ cho phép kí tự và số"
                      />
            </div>
            <div className="form-group">
              <label className="labelLogin">Email</label>
              <input type="email"
                     className="form-control inputlogin"
                     placeholder="Nhập email"
                     />
            </div>
            <div className="form-group">
              <label className="labelLogin">Mật khẩu</label>
              <input type="password"
                     className="form-control inputlogin"
                     placeholder="Ít nhất 8 kí tự"
                     />
            </div>
            <div className="form-group">
              <label className="labelLogin">Nhập lại mật khẩu</label>
              <input type="password"
                     className="form-control inputlogin"
                     placeholder="Nhập lại mật khẩu"
                     />
            </div>
            <button type="submit" className="btn btn-sm btn-default">Hoàn tất</button>
          </form>
        </div>
      </div>
      </div>
    )
  }
});

module.exports = SignUp;
