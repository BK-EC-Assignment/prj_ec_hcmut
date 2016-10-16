var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var UserPage = React.createClass({
  getInitialState: function() {
    return {
      userTab: 'bid',
    }
  },
  handleBidClicked: function() {
    this.setState({userTab: 'bid'});
  },
  handleProfileClicked: function() {
    this.setState({userTab: 'profile'});
  },
  render: function() {
    var flag = this.state.userTab;
    var tab = '';
    var active = {
      borderBottom: '4px solid #6694ff',
    }
    var unactive = {
      borderBottom: 'none',
    }
    if (flag === 'bid') {
      tab = (<div>
        <div className="col-md-3 padding body-bid-img">
          <img src="../public/js/images/photo01.jpg"/>
        </div>
        <div className="col-md-9 user-body-right padding">
          <header>
            <label>
              Ghế sofa trắng
            </label>
            <ul>
              <li><span>Bắt đầu</span> <br/> <span>15/10/2016 10:00</span></li>
              <li><span>Kết thúc</span> <br/> <span>20/10/2016 12:30</span></li>
              <li><span>Người bán</span> <br/> <span>Phạm Trần Trí</span></li>
            </ul>
          </header>
          <div className="list-info">
            <div className="col-md-4 padding list-info-left">
              <span>Giá của tôi </span> <span className="user-price">25 000đ</span>
              <span>Giá bán ngay </span> <span className="expected-price"> 30 000đ</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
  else {
    tab = <div>
      <div className="col-md-3 padding body-avatar">
        <img src="../public/js/images/photo01.jpg"/>
      </div>
      <div className="col-md-9 user-body-right padding">
        <header>
          <label>
            Thông tin cá nhân
          </label>
        </header>
        <div className="col-md-12 user-form">
          <form role="form">
            <div className="form-group col-md-6">
              <label>Họ tên</label>
              <input type="text" className="form-control" placeholder="Họ tên của bạn"/>
            </div>
            <div className="form-group col-md-6">
              <label>Số điện thoại</label>
              <input type="text" className="form-control" placeholder="Số điện thoại của bạn"/>
            </div>
            <div className="form-group col-md-6">
              <label>Email</label>
              <input type="email" className="form-control" placeholder="Email của bạn"/>
            </div>
            <div className="form-group col-md-6">
              <label>Địa chỉ</label>
              <input type="email" className="form-control" placeholder="Địa chỉ nhà"/>
            </div>
          </form>
        </div>
      </div>
    </div>
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-1"></div>
        <div className="col-md-11 col-sm-11 col-xs-11 padding">
          <ol className="breadcrumb">
            <li><Link to="/">Trang chủ</Link></li>
            <li className="active">TriPham</li>
          </ol>
        </div>
        <div className="col-md-1"></div>
        <div className="col-md-10 user-main">
          <div className="col-md-12 padding user-header">
            Trang của tôi
          </div>
          <div className="col-md-12 user-body">
            <div className="col-md-12 padding">
              <ul className="user-body-header">
                <li><button className="dropbtn" style={(flag==='bid')? active : unactive} onClick={this.handleBidClicked}>Đang đấu giá</button></li>
                <li><button className="dropbtn" style={(flag==='profile')? active : unactive} onClick={this.handleProfileClicked}>Thông tin cá nhân</button></li>
              </ul>
            </div>
            <div className="col-md-12 padding user-body-main">
              {tab}
            </div>
          </div>
        </div>
        <div className="col-md-1"></div>
      </div>
    </div>
  )
}
});
module.exports = UserPage;
