var express = require('express')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var methodOverride = require('method-override')
var seneca = require('seneca')()
var argv = require('optimist').argv
var app = express()
var cors = require('cors')
var routes = require('./../routes/index')
var path = require('path')
var webpack = require('webpack')
var webpackMiddleware = require('webpack-dev-middleware')
var config = require('./../webpack.config.js')

var compiler = webpack(config)

var conf = {
  port: argv.p || 7770
}

app.engine('jsx', require('express-react-views').createEngine())
app.set('port', conf.port)
app.use(cors())
app.use('/public', express.static(path.join(__dirname, './../public')))
app.use('/views', express.static(path.join(__dirname, './../views')))
app.use(webpackMiddleware(compiler))
app.use(cookieParser())
app.use(express.query())
app.use(bodyParser.urlencoded({extended: true}))
app.use(methodOverride())
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(seneca.export('web'))

seneca.use('./../lib/registerAPI')
seneca.use('./../lib/loginAPI')
seneca.use('./../lib/logoutAPI')
seneca.use('./../lib/changePassword')
seneca.use('./../lib/auctionAPI')
seneca.use('./../lib/profileAPI')
seneca.use('./../lib/productAPI')
seneca.use('./../lib/detailProductAPI')
seneca.use('./../lib/getAuctionProductAPI')
seneca.use('./../lib/filterProductAPI')
seneca.use('./../lib/getListUserAPI')


app.use('/', routes)

module.exports = app
