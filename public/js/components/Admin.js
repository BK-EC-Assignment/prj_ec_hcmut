var React = require('react');
var ReactRouter = require('react-router');
var PropTypes = React.PropTypes;
var Admin = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      adminTab: 'user',
      UsersList: [],
      productList: []
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

  changeStatus: function (email) {
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "http://localhost:7770/api/users/changeStatus",
      "method": "POST",
      "headers": {
        "token": getCookie('token'),
        "content-type": "application/x-www-form-urlencoded"
      },
      "data": {
        "email": email
      }
    }

    $.ajax(settings).done(function (response) {
      if (response.meta.success === 1) {
        PNotify.removeAll();
          new PNotify({
              title: 'Success!',
              text: 'You have changed ' + email + ' status',
              type: 'success',
              delay: 3000
          });
      }
    });
  },

  componentDidMount: function () {
    var settings = {
		  "async": true,
		  "crossDomain": true,
		  "url": "http://localhost:7770/api/product",
		  "method": "GET",
		  "headers": {
		    "token": getCookie('token'),
		    "cache-control": "no-cache",
		  }
		}

		$.ajax(settings).done(function (response) {
			this.setState({
				productList: response.response
			})
		}.bind(this));
  },

  handleRemove: function (id) {
    var self = this;
    (new PNotify({
        title: 'Confirmation Needed',
        text: 'Are you sure?',
        icon: 'glyphicon glyphicon-question-sign',
        hide: false,
        confirm: {
            confirm: true
        },
        buttons: {
            closer: false,
            sticker: false
        },
        history: {
            history: false
        }
    })).get().on('pnotify.confirm', function() {
      var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:7770/api/product",
        "method": "DELETE",
        "headers": {
          "token": getCookie("token"),
          "content-type": "application/x-www-form-urlencoded"
        },
        "data": {
          "productId": id
        }
      }

      $.ajax(settings).done(function (response) {
        if (response.meta.success === 1) {
          PNotify.removeAll();
            new PNotify({
                title: 'Success!',
                text: "Success!",
                type: 'success',
                delay: 3000
            });
        } else {
          PNotify.removeAll();
            new PNotify({
                title: 'Error',
                text: response.meta.message,
                type: 'error'
            });
        }
      });
    }).on('pnotify.cancel', function() {

    });
  },

  handleEdit: function (id) {
    this.context.router.push({
      pathname: '/edit/' + id.substring(4),
			query: {
				id: id.substring(4)
			}
    })
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
      var self = this;
      var ListUser = this.state.UsersList.map(function (user, i) {
        return (
          <tr className="tb"  key={i+1}>
            <td >{user.username}</td>
            <td >{user.email}</td>
            <td >{user.phone}</td>
            <td >{user.address}</td>
            <td >{user.active === true ? 'Hoạt động' : 'Tạm dừng'}</td>
            <td >
              <button onClick={self.changeStatus.bind(self,user.email)}>{user.active === true ? 'Tạm Dừng' : 'Hoạt động'}</button>
            </td>
          </tr>
        )
      });
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
    var self = this;
    var ListProduct = this.state.productList.map(function (product, i) {
      var categories = ''
      if (product.categories === 'giai-tri') {
        categories = 'Giải Trí'
      } else if (product.categories === 'do-gia-dung') {
        categories = 'Đồ Gia Dụng'
      } else {
        categories = 'Đồ điện tử'
      }
      return (
        <tr className="tb" key={i+1}>
          <td className="rewardImage1 thumbnail_wrapper1"><img src={product.picture} alt="#"/></td>
          <td >{product.name}</td>
          <td >{categories}</td>
          <td >{product.cost_min}</td>
          <td >{product.time}</td>
          <td >
            <button>Chỉnh sửa</button>
          </td>
          <td >
            <button onClick={self.handleRemove.bind(self,product.productId)}>Xóa</button>
          </td>
        </tr>
      )
    });
    tab = (
      <div>
        <div className="table-responsive">
          <table id="user-table" className="table table-hover ">
            <tbody>
              <tr id="th">
                <th >Hình ảnh</th>
                <th >Tên sản phẩm</th>
                <th >Danh mục</th>
                <th >Giá khởi điểm</th>
                <th >Ngày hết hạn</th>
                <th >Chỉnh sửa</th>
                <th >Xóa</th>
              </tr>
              {ListProduct}
            </tbody>
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
