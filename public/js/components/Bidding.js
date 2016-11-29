var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var Bidding = React.createClass({
  getInitialState: function() {
    return {
      listAuction: []
    }
  },

  componentWillMount: function () {
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "http://localhost:7770/api/users/getAuctionUser",
      "method": "GET",
      "headers": {
        "email": getCookie("email"),
      }
    }

    $.ajax(settings).done(function (response) {
      this.setState({
				listAuction: response.response
			});
    }.bind(this));
  },

  render: function() {
    var products = this.state.listAuction.map(function (product, i) {
      var deadline = new Date(product.time*1000)
      var timeline = deadline.getDate() + '/' + (deadline.getMonth()+1) + '/' + deadline.getFullYear() +
                  ' ' + deadline.getHours() + ':' + deadline.getMinutes() + ':' + deadline.getSeconds();
      var categories = ''
      if (product.category === 'giai-tri') {
        categories = 'Giải Trí'
      } else if (product.category === 'do-gia-dung') {
        categories = 'Đồ Gia Dụng'
      } else {
        categories = 'Đồ điện tử'
      }
      return (
        <div className="col-md-12 col-sm-12 col-xs-12 category-product" key={i+1}>
          <div className="col-md-6 col-sm-6 col-xs-6 main-left">
            <div className="col-md-5 col-sm-4 rewardImage thumbnail_wrapper">
              <img src={product.picture} alt="#"/>
            </div>
            <div className="col-md-7 col-sm-8">
              <h4>{product.name}</h4>
              <text>Tình trạng: <label>Mới</label></text>
              <text>Nơi bán: <label>TP.HCM</label></text>
              <text>Người bán: <label>Clark John</label></text>
            </div>
          </div>
          <div className="col-md-3 col-sm-3 col-xs-3 category-bid-price">
            {categories}
          </div>
          <div className="col-md-3 col-sm-3 col-xs-3 category-status">
            {timeline}
          </div>
        </div>
      )
    }
  );
    return (
      <div>
        <div className="container">
  				<div className="row">
  					<div className="col-md-12 col-sm-12 col-xs-12 padding">
  						<ol className="breadcrumb">
    							<li><Link to="/">Trang chủ</Link></li>
  							<li className="active">Đang đấu giá</li>
  						</ol>
  					</div>
  					<div className="col-md-12 col-sm-12 col-xs-12 category-main">
  						<div className="col-md-10 col-sm-10 col-xs-8 padding deco-border">
  							<header>ĐANG ĐẤU GIÁ</header>
  						</div>
  						<div className="col-md-2 col-sm-2 col-xs-4 select deco-border">
  							<select>
  								<option disabled selected>Xếp theo</option>
  								<option>Giá tăng dần</option>
  								<option>Giá giảm dần</option>
  							</select>
  						</div>
  						<div className="wrap col-md-12">
  							<div className="col-md-12 category-main-header">
  								<div className="col-md-6 col-sm-6 col-xs-6"> SẢN PHẨM</div>
  								<div className="col-md-3 col-sm-3 col-xs-3 "> DANH MỤC</div>
  								<div className="col-md-3 col-sm-3 col-xs-3 "> HẠN CUỐI</div>
  							</div>
                  {products}
  						</div>
  					</div>
  				</div>
  			</div>
      </div>
    )
  }
})
module.exports = Bidding
