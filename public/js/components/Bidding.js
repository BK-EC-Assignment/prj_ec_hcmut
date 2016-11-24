var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var Bidding = React.createClass({
  render: function() {
    var products = (
      <div className="col-md-12 col-sm-12 col-xs-12 category-product">
        <div className="col-md-6 col-sm-6 col-xs-6 main-left">
          <div className="col-md-5 col-sm-4 rewardImage thumbnail_wrapper">
            <img src='../public/js/images/photo02.jpg' alt="#"/>
          </div>
          <div className="col-md-7 col-sm-8">
            <h4>Iphone 7</h4>
            <text>Tình trạng: <label>Mới</label></text>
            <text>Nơi bán: <label>TP.HCM</label></text>
            <text>Người bán: <label>Clark John</label></text>
          </div>
        </div>
        <div className="col-md-2 col-sm-2 col-xs-2 category-bid-price">
          phamtrantri
        </div>
        <div className="col-md-2 col-sm-2 col-xs-2 category-expected-price">
          2 000đ
        </div>
        <div className="col-md-2 col-sm-2 col-xs-2 category-status">
          4 ngày 3:01:02
        </div>
      </div>
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
  								<div className="col-md-2 col-sm-2 col-xs-2 "> NGƯỜI MỚI ĐẤU GIÁ</div>
  								<div className="col-md-2 col-sm-2 col-xs-2 "> BÁN NGAY</div>
  								<div className="col-md-2 col-sm-2 col-xs-2 "> CÒN LẠI</div>
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
