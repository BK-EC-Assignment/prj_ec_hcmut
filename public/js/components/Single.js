var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var Single = React.createClass({
	getInitialState: function() {
		return {
			flag: 'img',
		}
	},
	handleInfoClicked: function() {
		this.setState({flag: 'info'});
	},
	handleImgClicked: function() {
		this.setState({flag: 'img'});
	},
	render: function() {
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
									<img src="../public/js/images/photo01.jpg"/>
								</figure>

							</div>
							<div id="single-main" className="col-md-6">
								<div id="main-top" className="col-md-12">
									<div id="single-title" className="col-md-12">
										<label>Đèn học chống cận cho bé</label>
									</div>
									<div id="single-price" className="col-md-9">
										<span>70 000 đ</span>
									</div>
									<div id="single-expected-price" className="col-md-3">
										<span>Giá kỳ vọng</span><br/>
										<span>0 đ</span>
									</div>
								</div>
								<div id="main-middle" className="col-md-12">
									<div id="single-step" className="col-md-12">
										<label>Bước giá hiện tại: 1000 đ</label>
									</div>
									<div id="single-step-btn" className="col-md-12">
										<button className="btn btn-success">-</button>
										<input className="form-control"/>
										<button className="btn btn-success">+</button>
										<button id="btn-bid" className="btn btn-default">ĐẤU GIÁ</button>
									</div>
								</div>
								<div id="main-bottom" className="col-md-12">
									<div id="single-time" className="col-md-12">
										<span>Bắt đầu: 11/6/2016 9:30</span>
										<span>Kết thúc: 11/6/2016 12:30 </span>
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
									<span>16:41:30</span>
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
