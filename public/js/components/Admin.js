var React = require('react');
var ReactRouter = require('react-router');
var Admin = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      adminTab: 'user',
      UsersList: []
    }
  },

  handleUserClicked: function() {
    this.setState({adminTab: 'user'})
  },

  handleProductClicked: function() {
    this.setState({adminTab: 'product'})
  },

  componentWillMount: function () {
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "http://localhost:7770/api/users/listUser",
      "method": "GET",
      "headers": {
        "token": getCookie("token"),
        "cache-control": "no-cache"
      }
    }

    $.ajax(settings).done(function (response) {
      this.setState({
        UsersList: response.response
      })
    }.bind(this));
  },

  render: function() {
    flag = this.state.adminTab;
    var tab = '';
    var active = {
      borderBottom: '4px solid #6694ff',
    }
    var unactive = {
      borderBottom: 'none',
    }
    if (flag === 'user') {
      var ListUser = this.state.UsersList.map(function (user, i) {
        return (
          <tr className="tb"  key={i+1}>
            <td >{user.username}</td>
            <td >{user.email}</td>
            <td >{user.phone}</td>
            <td >{user.address}</td>
            <td >{user.active === true ? 'Hoạt động' : 'Tạm dừng'}</td>
            <td >
              <button>Change</button>
            </td>
          </tr>
        )
      })
      tab = (
          <div className="table-responsive">
            <table id="user-table" className="table table-hover ">
              <tbody>
                <tr id="th">
                  <th >Tên đại diện</th>
                  <th >Email</th>
                  <th >Số điện thoại</th>
                  <th >Địa chỉ</th>
                  <th >Trạng thái</th>
                  <th> </th>
                </tr>
                {ListUser}
              </tbody>
            </table>
          </div>
      )
    }
  else {
    tab = (
      <div>
        <div className="table-responsive">
          <table id="user-table" className="table table-hover ">
            <tr id="th">
              <td >Tên sản phẩm</td>
              <td >Danh mục</td>
              <td >Tình trạng</td>
              <td >Giá hiện tại</td>
              <td >Giá cao nhất</td>
              <td >Người đấu giá</td>
              <td >Còn lại</td>
            </tr>
            <tr className="tb">
              <td >Iphone 7</td>
              <td >Điện thoại</td>
              <td >Đang đấu giá</td>
              <td >11 400 000đ</td>
              <td >20 100 000đ</td>
              <td >phamtrantri@gmail.com</td>
              <td >4 ngày 3:11:12</td>
              <td></td>
            </tr>
            <tr className="tb">
              <td >Iphone 7</td>
              <td >Điện thoại</td>
              <td >Đang đấu giá</td>
              <td >11 400 000đ</td>
              <td >20 100 000đ</td>
              <td >phamtrantri@gmail.com</td>
              <td >4 ngày 3:11:12</td>
              <td></td>
            </tr>
          </table>
        </div>
      </div>
    )
  }
  return (
    <div className="container">
      <div className="row"></div>
      <div className="col-md-12 padding">
        <ul className="admin-tab">
          <li><button className="dropbtn" style={(flag==='user')? active : unactive} onClick={this.handleUserClicked}>Thành viên</button></li>
          <li><button className="dropbtn" style={(flag==='product')? active : unactive} onClick={this.handleProductClicked}>Sản phẩm</button></li>
        </ul>
      </div>
      <div className="col-md-12 padding">
        {tab}
      </div>
    </div>
  )
}
});
module.exports = Admin
