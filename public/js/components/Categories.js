var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var Categories = React.createClass({
	contextTypes: {
    router: React.PropTypes.object.isRequired
  },

	getDefaultProps: function () {
    return({
      listProduct: []
    })
  },

	getInitialState: function() {
		return {
			listProduct: []
		}
	},

	componentDidMount: function () {
		var query = this.props.location.query
		var settings = {
		  "async": true,
		  "crossDomain": true,
		  "url": "http://localhost:7770/api/users/category?category=" + query.category,
		  "method": "GET",
		  "headers": {
		    "cache-control": "no-cache"
		  },
		}

		$.ajax(settings).done(function (response) {
			this.setState({
				listProduct: response.response
			});
		}.bind(this));
	},

	render: function() {
		var Product = this.state.listProduct.map(function (product, i) {
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
					<div className="col-md-2 col-sm-2 col-xs-2 category-bid-price">
						{product.cost_min}
					</div>
					<div className="col-md-2 col-sm-2 col-xs-2 category-expected-price">
						{product.cost_expected}
					</div>
					<div className="col-md-2 col-sm-2 col-xs-2 category-status">
						Đang đấu giá
					</div>
				</div>
			)
		});

		return (
			<div className="container">
				<div className="row">
					<div className="col-md-12 col-sm-12 col-xs-12 padding">
						<ol className="breadcrumb">
  							<li><Link to="/">Trang chủ</Link></li>
							<li className="active">Đồ điện tử</li>
						</ol>
					</div>
					<div className="col-md-12 col-sm-12 col-xs-12 category-main">
						<div className="col-md-10 col-sm-10 col-xs-8 padding deco-border">
							<header>ĐỒ ĐIỆN TỬ</header>
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
								<div className="col-md-2 col-sm-2 col-xs-2 "> GIÁ HIỆN TẠI</div>
								<div className="col-md-2 col-sm-2 col-xs-2 "> BÁN NGAY</div>
								<div className="col-md-2 col-sm-2 col-xs-2 "> CÒN LẠI</div>
							</div>
							{Product}
						</div>
					</div>
				</div>
			</div>
		)
	}
});
module.exports = Categories;
