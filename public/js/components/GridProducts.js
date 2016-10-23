var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var GridProducts = React.createClass({
	getInitialState: function () {
		return {
			productList: []
		}
	},
	componentWillMount: function () {
		var self = this
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
			self.setState({
				productList: response.response
			})
		});
	},

	componentDidMount: function () {
		var self = this
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
			self.setState({
				productList: response.response
			})
		});
	},

	render: function() {
		console.log(this.state.productList)
		var Product = this.state.productList.map(function (product, i) {
			return (
				<div className="col-md-2 col-sm-3 col-xs-6 grid-figure" key={i+1}>
					<Link to="/single">
					<figure>
						<div className="rewardImage thumbnail_wrapper">
							<img src={product.picture} alt="#"/>
						</div>
						<figcaption className="title">{product.name}</figcaption>
						<div className="col-md-8 padding-none">
							<figcaption className="price">{product.cost_min}</figcaption>
						</div>
						<div className="col-md-4 padding-none">
							<figcaption className="due">{product.numDay} ngày</figcaption>
						</div>
					</figure>
					</Link>
				</div>
			)
		}
	)
		return (
			<div className="container grid-products">
				<div className="row">
					<div className="col-md-12 padding-none">
						<header className="grid-header">SẢN PHẨM MỚI</header>
						{Product}
					</div>
				</div>
			</div>
			)
	}
});

module.exports = GridProducts;
