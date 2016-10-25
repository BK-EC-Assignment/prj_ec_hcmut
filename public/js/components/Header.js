var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var Header = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitalState: function () {
    return ({
      token: getCookie('token')
    })
  },

  handleLogout: function () {
    var token = getCookie('token')
    if (!token) {
      PNotify.removeAll();
      new PNotify ({
        type: 'error',
        title: 'Error',
        text: 'Token is empty'
      })
    } else {
      axios.post('/api/users/logout', {token: token}).then(function (res) {
        if (res.data.meta.success === 1) {
          deleteAllCookies()
          PNotify.removeAll();
          new PNotify({
            type: 'success',
            title: 'Logout!',
            text: 'Logout Successful!'
          })
          this.context.router.push({
            pathname: '/',
          })
        } else {
          PNotify.removeAll();
          new PNotify({
            type: 'error',
            title: 'Error!',
            text: 'Token is not exist!'
          })
        }
      }.bind(this))
    }
  },

  render: function () {
    var self = this
    var token = getCookie('token')
    function button() {
      if (!token) return (
        <Link to="/login">
          <button type="button" className="btn btn-success" id="login-button">Đăng nhập</button>
        </Link>
      )
      else return (
        <div id="account-div">
          <div id="account-info">
            <img id="account-img" src="../public/js/images/default_user.png"/>
            <span id="account-name">Clark John</span>
              <ul className="account-dropdown">
                <li><Link to="/profile" className="account-profile">Thông tin cá nhân</Link></li>
                <li><Link to="/editpassword" className="account-profile">Chỉnh sửa mật khẩu</Link></li>
                <li><button type="button" onClick={self.handleLogout} id="logout-button" >Đăng xuất</button></li>
              </ul>
          </div>
        </div>
      )
    }
    function navigation() {
      if (!token) return (
        <ul id="tabs">
          <li className="hidden-xs">
            <Link to="/">
              <button className="dropbtn ">Trang chủ</button>
            </Link>
          </li>

          <li>
            <Link to="/single">
              <button className="dropbtn">Đang đấu giá</button>
            </Link>
          </li>
        </ul>
      )
      else return (
        <ul id="tabs">
          <li className="hidden-xs">
            <Link to="/">
              <button className="dropbtn ">Trang chủ</button>
            </Link>
          </li>

          <li>
            <Link to="/single">
              <button className="dropbtn">Đang đấu giá</button>
            </Link>
          </li>
        </ul>
      )
    }
    return (
      <div className="container-fluid">
        <div id="wrapper" className="row">
          <div id="header-container" className="col-md-12 col-sm-12 col-xs-12 padding">
            <div id="deco-nav" className="col-md-12 col-sm-12 col-xs-12"></div>
            <div id="logo" className="col-md-3 col-sm-1">
              <Link to="/">
                <img id="logo" src="../public/js/images/logo.png" alt="HCMUT"/>
              </Link>
            </div>
            <div id="main-search" className="col-md-6 col-sm-5 col-xs-7">
              <div className="form-group">
                <div id="div-search" className="col-md-10 col-sm-10 col-xs-10">
                  <input type="text" className="form-control" id="search-input" placeholder="Tôi muốn mua ..."/>
                </div>
                <div id="div-button" className="col-md-2 col-sm-2 col-xs-2">
                  <button type="button" className="btn btn-success" id="search-button"><i className="glyphicon glyphicon-search"></i></button>
                </div>
              </div>
            </div>
            <div id="side-right" className="col-md-3 col-sm-4 col-xs-3">
                {button()}
            </div>
          </div>
          <div id="navigator" className="col-md-12 col-sm-12 padding">
            <div id="nav-left" className="col-md-3 col-sm-3 col-xs-4">
              <div className="dropdown">
                <button className="dropbtn">Danh mục <i className="glyphicon glyphicon-triangle-bottom"></i></button>
                <div className="dropdown-content">
                  <Link to="/category">Giải trí, Thể thao, Sở thích</Link>
                  <a href="#">Đồ điện tử</a>
                  <a href="#">Đồ gia dụng</a>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-8 col-xs-7">
              {navigation()}
            </div>
            <div className="col-md-3 col-sm-3">
            </div>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = Header;
