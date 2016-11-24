var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var PropTypes = React.PropTypes;
var ReactCountdownClock = require('react-countdown-clock')

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
				var end = new Date(product.deadline*1000);
		    var _second = 1000;
		    var _minute = _second * 60;
		    var _hour = _minute * 60;
		    var _day = _hour * 24;
		    var timer;

		    function showRemaining() {
		        var now = new Date();
		        var distance = end - now;
						var countdown = document.getElementsByClassName("countdown")
						var btn_auction = document.getElementsByClassName("btn-auction")
						var productClassName = document.getElementsByClassName("product")
		        if (distance < 0) {
		            clearInterval(timer);
								btn_auction[i].innerHTML = 'EXPIRED!';
								setTimeout(function() {
									productClassName[i].style.display = 'none';
								}, 3000);
								countdown[i].innerHTML = ' ';
		            return;
		        }
		        var days = Math.floor(distance / _day);
		        var hours = Math.floor((distance % _day) / _hour);
		        var minutes = Math.floor((distance % _hour) / _minute);
		        var seconds = Math.floor((distance % _minute) / _second);

						if (days != 0) {
							countdown[i].innerHTML = days + ' ngày ';
							countdown[i].innerHTML += hours + ':';
			        countdown[i].innerHTML += minutes + ':';
			        countdown[i].innerHTML += seconds;
						} else {
							countdown[i].innerHTML = hours + ':';
			        countdown[i].innerHTML += minutes + ':';
			        countdown[i].innerHTML += seconds;
						}
		    }

		    timer = setInterval(showRemaining, 1000);
				return (
					<div className="col-md-3 col-sm-3 col-xs-6 grid-figure product" key={i+1}>
						<figure>
							<div className="rewardImage thumbnail_wrapper">
								<img src={product.picture} alt="#"/>
							</div>
							<figcaption className="title">{product.name}</figcaption>
							<div className="col-md-5 col-sm-5 col-xs-5 padding-none">
								<figcaption className="price">{product.cost_min}</figcaption>
							</div>

							<div className="countdown-container col-md-7 col-sm-7 col-xs-7 padding-none">
								<div className="countdown">

								</div>
							</div>
							<div className="col-md-12 col-sm-12 col-xs-12 padding-none btn-auction">
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
				</div>
			</div>
			)
	}
});

module.exports = GridProducts;
