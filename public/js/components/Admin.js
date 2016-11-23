var React = require('react');
var ReactRouter = require('react-router');
var Admin = React.createClass({
  getInitialState: function() {
    return {
      adminTab: 'user'
    }
  },
  handleUserClicked: function() {
    this.setState({adminTab: 'user'})
  },
  handleProductClicked: function() {
    this.setState({adminTab: 'product'})
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
      tab = (
        <div className="table-responsive">
          <table id="user-table" className="table table-hover ">
            <tr id="th">
              <td >ID</td>
              <td >Tên đại diện</td>
              <td >Email</td>
              <td >Số điện thoại</td>
              <td >Địa chỉ</td>
              <td >Vai trò</td>
            </tr>
            <tr className="tb">
              <td >581969e99b696</td>
              <td >triphamtran</td>
              <td >a@a.com</td>
              <td >01225417247</td>
              <td >21</td>
              <td ><select>
                <option>Thành viên</option>
                <option>Quản trị viên</option>
              </select>
            </td>
          </tr>
          <tr className="tb">
            <td >581969e99b696</td>
            <td >triphamtran</td>
            <td >a@a.com</td>
            <td >01225417247</td>
            <td >21</td>
            <td ><select>
              <option>Thành viên</option>
              <option>Quản trị viên</option>
            </select>
          </td>
        </tr>

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
