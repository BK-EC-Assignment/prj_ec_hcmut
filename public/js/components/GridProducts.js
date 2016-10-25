var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var PropTypes = React.PropTypes;

var GridProducts = React.createClass({
	contextTypes: {
    router: React.PropTypes.object.isRequired
  },

	getDefaultProps: function () {
    return({
      productList: []
    })
  },

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
			this.setState({
				productList: response.response
			})
		}.bind(this));
	},

	clickHandler: function (id) {
    this.context.router.push({
      pathname: '/single/' + id.substring(4),
			query: {
				id: id.substring(4)
			}
    })
	},

	render: function() {
		var self = this
		var Product = this.state.productList.map(function (product, i) {
			return (
				<div className="col-md-2 col-sm-3 col-xs-6 grid-figure" key={i+1}>
					<figure>
						<div className="rewardImage thumbnail_wrapper">
							<img src={product.picture} alt="#"/>
						</div>
						<figcaption className="title">{product.name}</figcaption>
						<div className="col-md-8 col-sm-8 col-xs-8 padding-none">
							<figcaption className="price">{product.cost_min}</figcaption>
						</div>
						<div className="col-md-4 col-md-4 col-xs-4 padding-none">
							<figcaption className="due">{product.numDay} ngày</figcaption>
						</div>
						<div className="col-md-12 col-sm-12 col-xs-12 padding-none">
							<button type="button" className="btn btn-primary" onClick={self.clickHandler.bind(self, product.productId)}>ĐẤU GIÁ</button>
						</div>
					</figure>
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
					<div className="col-md-12 padding-none">
						<header className="grid-header">ĐỒ ĐIỆN TỬ</header>
						{Product}
					</div>
				</div>
			</div>
			)
	}
});



module.exports = GridProducts;
