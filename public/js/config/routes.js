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
    </Route>
  </Router>
);

module.exports = routes;
