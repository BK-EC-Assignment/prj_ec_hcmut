var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var hashHistory = ReactRouter.hashHistory;
var IndexRoute = ReactRouter.IndexRoute;
var Main = require('../components/Main');
var Home = require("../components/Home");
var Login = require('../containers/HandleLogin');
var Single = require('../components/Single');
var Categories = require('../components/Categories');
var SignUp = require('../containers/HandleRegister');
var UserPage = require('../components/UserPage');
var EditPassword = require('../containers/HandleEditPassword');
var Admin = require('../components/Admin');
var Bidding = require('../components/Bidding');
var EditProduct = require('../components/EditProduct');
var AddProduct = require('../containers/HandleAddProduct')
var Search = require('../components/Search')
var routes = (
  <Router history={hashHistory}>
    <Route path='/' component={Main}>
      <IndexRoute component={Home} />
      <Route path='/login' header="Login" component={Login} />
      <Route path='/signup' header="SignUp" component={SignUp}/>
      <Route path='/single/:id' header="Single" component={Single} />
      <Route path="/category/:category" header = "Categories" component={Categories} />
      <Route path="/profile" header = "UserPage" component={UserPage} />
      <Route path="/editpassword" header = "EditPassword" component={EditPassword} />
      <Route path="/admin" header="Admin" component={Admin} />
      <Route path="/bidding" header="Bidding" component={Bidding} />
      <Route path="/edit/:key" header="EditProduct" component={EditProduct} />
      <Route path="/add" header="AddProduct" component={AddProduct} />
      <Route path="/search/:keyword" header="Search" component={Search} />
    </Route>
  </Router>
);

module.exports = routes;
