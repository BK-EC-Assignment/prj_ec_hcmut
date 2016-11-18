var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var Single = React.createClass({
	getInitialState: function() {
		return {
			token: getCookie('token'),
			flag: 'img',
			bidtime: '16:00:10',
			picture: '',
			name: '',
			description: '',
			cost_min: '',
			cost_expected: '',
			date: '',
			cost: '',
			deadline: '',
			timeline: ''
		}
	},
	handleStopWatch: function() {
		var bidtime = this.state.bidtime;
		var timeArr = bidtime.split(':');
		var second = timeArr[2], minute = timeArr[1], hour = timeArr[0];
		var time = this.countdownTime(hour, minute, second);
		var joinTime = time.hour.toString().concat(':').concat(time.minute).concat(':').concat(time.second);
		this.setState({bidtime: joinTime});
		setTimeout(this.handleStopWatch,1000);

	},

	countdownTime: function(hour, minute, second) {
		second = second - 1;
		if (second == -1) {
			second = 59;
			minute = minute - 1;
			if (minute == -1) {
				minute = 59;
				hour = hour-1;
			}
		}
		if (second.toString().length == 1) {
			second = '0' + second;
		}
		if (minute.toString().length == 1) {
			minute = '0' + minute;
		}
		return {hour, minute, second};
	},

	handleInfoClicked: function() {
		this.setState({flag: 'info'});
	},

	handleImgClicked: function() {
		this.setState({flag: 'img'});
	},

	componentDidMount: function () {
		this.handleStopWatch();
		var self = this
		var query = this.props.location.query
		var settings = {
		  "async": true,
		  "crossDomain": true,
		  "url": "http://localhost:7770/api/product/detail?id=" + query.id,
		  "method": "GET",
		  "headers": {
				"content-type": "application/x-www-form-urlencoded",
		    "cache-control": "no-cache"
		  }
		}

		$.ajax(settings).done(function (response) {
			this.setState({
				picture: response.response.data.data.picture,
				name: response.response.data.data.name,
				description: response.response.data.data.discription,
				deadline: response.response.data.data.deadline,
				cost_min: response.response.data.data.cost_min,
				cost_expected: response.response.data.data.cost_expected
			});
		}.bind(this));
	},

	HandleCost: function (e) {
		this.setState({
			cost: e.target.value
		})
	},

	submitAuction: function () {
		var query = this.props.location.query
		if (getCookie('token') === null) {
			PNotify.removeAll();
			console.log('warning')
			new PNotify({
				type: 'warning',
				title: 'Auction Field',
				text: 'Please Login System'
			})
		} else {
			var settings = {
			  "async": true,
			  "crossDomain": true,
			  "url": "http://localhost:7770/api/users/auction",
			  "method": "POST",
			  "headers": {
			    "token": getCookie('token'),
			    "cache-control": "no-cache",
			    "content-type": "application/x-www-form-urlencoded"
			  },
			  "data": {
			    "cost": this.state.cost,
			    "productID": "#13:" + query.id
			  }
			}

			$.ajax(settings).done(function (response) {
				if (response.meta.code === 200) {
					console.log('success')
					PNotify.removeAll();
					new PNotify({
						type: 'success',
						title: 'Successful',
						text: response.meta.message
					})
				} else {
					PNotify.removeAll();
					console.log('error')
					new PNotify({
						type: 'error',
						title: 'Auction Field',
						text: response.meta.message
					})
				}
			});
		}

	},

	render: function() {
		var self = this
		var flag = this.state.flag;
		var tab = '';
		var active = {
			borderBottom: '4px solid #6694ff',
		}
		var unactive = {
			borderBottom: 'none',
		}

		if (flag === 'info') {
			tab = (<div> <div>
				<label>Thông tin chung</label>
				<ul className="single-info">
					<li>AAAA BBB</li>
					<li>AAAA BBB</li>
					<li>AAAA BBB</li>
				</ul>
			</div>
			<div>
				<label>Đặc tính sản phẩm</label>
				<ul className="single-info">
					<li>AAAA BBB</li>
					<li>AAAA BBB</li>
					<li>AAAA BBB</li>
				</ul>
			</div></div>);
		}
		else {
			tab = (
				<div>
						<figure className="single-figure border">
							<img src="../public/js/images/photo02.jpg"/>
						</figure>
						<figure className="single-figure border">
							<img src="../public/js/images/photo07.jpg"/>
						</figure>
				</div>);
			}
			/////// Handle CountDown Clock /////////
			var end = new Date(this.state.deadline*1000);
	    var _second = 1000;
	    var _minute = _second * 60;
	    var _hour = _minute * 60;
	    var _day = _hour * 24;
	    var timer;

	    function showRemaining() {
	        var now = new Date();
	        var distance = end - now;
	        if (distance < 0) {

	            clearInterval(timer);
	            document.getElementById('countdown').innerHTML = 'EXPIRED!';
							// document.getElementById('btn-bid').style.display = 'none';
	            return;
	        }
	        var days = Math.floor(distance / _day);
	        var hours = Math.floor((distance % _day) / _hour);
	        var minutes = Math.floor((distance % _hour) / _minute);
	        var seconds = Math.floor((distance % _minute) / _second);

					if (days != 0) {
						document.getElementById('countdown').innerHTML = days + ' ngày ';
						document.getElementById('countdown').innerHTML += hours + ':';
						document.getElementById('countdown').innerHTML += minutes + ':';
						document.getElementById('countdown').innerHTML += seconds;
					} else {
						document.getElementById('countdown').innerHTML = hours + ':';
						document.getElementById('countdown').innerHTML += minutes + ':';
						document.getElementById('countdown').innerHTML += seconds;
					}
	    }

	    timer = setInterval(showRemaining, 1000);

			//////////////////////////////////////////////////////////////////////////
		return (

				<div id ="single" className="container">
					<div className="row">
						<div className="col-md-12 col-sm-12 col-xs-12 padding">
							<ol className="breadcrumb">
	  							<li><Link to="/">Trang chủ</Link></li>
									<li><Link to="/category">Đồ điện tử</Link></li>
									<li className="active">Đèn học</li>
							</ol>
						</div>
						<div id="single-wrap" className="col-md-12">
							<div id="single-left" className="col-md-3">
								<figure>
									<img src={this.state.picture} alt="#"/>
								</figure>

							</div>
							<div id="single-main" className="col-md-6">
								<div id="main-top" className="col-md-12">
									<div id="single-title" className="col-md-12">
										<label>{this.state.name}</label>
									</div>
									<div id="single-price" className="col-md-9">
										<span>{this.state.cost_min} $</span>
									</div>
									<div id="single-expected-price" className="col-md-3">
										<span>Giá kỳ vọng</span><br/>
										<span>{this.state.cost_expected} $</span>
									</div>
								</div>
								<div id="main-middle" className="col-md-12">
									<div id="single-step" className="col-md-12">
										<label>Bước giá hiện tại: 1000 đ</label>
									</div>
									<div id="single-step-btn" className="col-md-12">
										<button className="btn btn-success">-</button>
										<input className="form-control"
											type="text"
											onChange={this.HandleCost} />
										<button className="btn btn-success">+</button>
										<button id="btn-bid" className="btn btn-default" onClick={this.submitAuction}>ĐẤU GIÁ</button>
									</div>
								</div>
								<div id="main-bottom" className="col-md-12">
									<div id="single-time" className="col-md-12">
										<span>Bắt đầu: 11/6/2016 9:30</span>
										<span>Kết thúc: </span>
									</div>
									<div id="single-status" className="col-md-12">
										<span>Tình trạng: Nguyên vẹn</span>
										<span>Nơi bán: Đại học Bách Khoa</span>
										<span>Người bán: <a href="#">Phạm Trần Trí</a></span>
									</div>
								</div>

							</div>
							<div id="single-right" className="col-md-3 ">
								<div id="right-top" className="col-md-12 ">
									<header>ĐẤU GIÁ KẾT THÚC TRONG</header>
									<span><div id="countdown"></div></span>
								</div>
								<div id="right-middle" className="col-md-12 ">
									<header>LỊCH SỬ ĐẤU GIÁ</header>
									<ul>
										<li>
											<span className="username">Phạm Trần Trí</span>
											<span className="bidding-time">11/6/2016 12:12</span>
										</li>
										<li>
											<span className="username">Lương Quốc Dinh</span>
											<span className="bidding-time">11/6/2016 12:11</span>
										</li>
										<li>
											<span className="username">Lương Quốc Dinh</span>
											<span className="bidding-time">11/6/2016 12:09</span>
										</li>
										<li>
											<span className="username">Lương Quốc Dinh</span>
											<span className="bidding-time">11/6/2016 12:08</span>
										</li>
										<li>
											<span className="username">Lương Quốc Dinh</span>
											<span className="bidding-time">11/6/2016 12:03</span>
										</li>
									</ul>
									<div className="col-md-12">
										<span><a href="#">Xem tất cả</a></span>
									</div>
								</div>
							</div>
							<div id="single-intro" className="col-md-12 padding">
								<div className="col-md-12 padding intro-header">
									<ul id="single-intro-header">
										<li><button className="dropbtn" style={(flag === 'info')? active: unactive} onClick={this.handleInfoClicked}>Giới thiệu</button></li>
										<li><button className="dropbtn" style={(flag === 'img')? active: unactive}onClick={this.handleImgClicked}>Hình ảnh</button></li>
									</ul>
								</div>
								<div className="col-md-12">
									{tab}
								</div>
							</div>
						</div>
					</div>
				</div>
			)
		}

	});

module.exports = Single;
