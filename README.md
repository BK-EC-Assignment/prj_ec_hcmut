#### dinh.lq, hiep.vv, quoc.pp, hai.pq, tri.tt
#### team intern

# GeeksGoGive
-----------

3G-stand for Geeks Go Give- is a tool to boost culture of a company. This app using [OrientDB](http://orientdb.com/), [Express](http://expressjs.com/), [Seneca](http://senecajs.org/), [React](https://facebook.github.io/react/) and [NodeJs](https://nodejs.org/en/).

## Quickstart
```
npm install -g standard
npm install
npm start
```
**Note:** Make sure your OrientDB is running.
## Available Commands
 - `npm run start` - starts the development server.
 - `npm run test` - start the test runner after start server.
## Config
1. Account [sendgrid](https://sendgrid.com/)
- username: `geekgogive`
- password: `geekup3G@`
2. Account admin [3G](http://prj_3g.geekup.vn/)
- email: `3gadmin@geekup.vn`
- password: `12345678`
3. Setup Cronjob
```
crontab -e
min hour date month year `which node` <your_file>
example:
0 0 1 * * `which node` ~/Prj_3G/bin/reset.js
crontab -l
```

## Data Structure

### Vertex
1. `Users` - to store information and status of users.
 - `email` - email of user.
 - `password` - password and salt of user was hashed.
 - `username` - username of user (get default by information before '@' of email.
 - `pointgive` - points to give for others (default 100 pts in a month).
 - `pointrecv` - user's points were received from others. It's will be used to redeem some rewards in system.
 - `rolename` - user's role in system.
 - `token` - it used to active email of user. After that, this token will be removed.
 - `salt` - it will be blend with user password
 - `active` - check user active email or not
 - `enable` - check user status is disable or not
2. `Login` - to store user's login information on all device
 - `email` - email of user login
 - `token` - token of login session
 - `active` - it used to disable token
3. `Reset` - to store user's request forgot password
- `email` - email of user login
- `token` - This token will be sent to user's email to verify request reset password
- `createat` - It's used to check expiry time of token (10 minutes)
4. `Rewards` - to store rewards's information
- `name` - name of reward
- `picture` - url to load reward's picture
- `point` - points to redeem reward
- `description` - description of reward
- `date` - the date which reward was created
- `enable` - check reward available or notA.

### Edge
 1. `haslogin` - the lightweight edge to connect `Users` and `Login` vertex
 2. `redeem` - the edge to connect `Users` and `Rewards`, to store users redeem information
- `date` - date which user redeem reward
- `status` - status of reward after redeem
 3. `sendmessage` the edge to connect `Users` and `Users`, to store message users send each others
- `point` - the points which an user send to an user
- `message` - the message which an user send to an user
- `date` - the date which message was sent.

### Connect database on server
`url`: [Database OrientDB](http://192.168.1.12:2480/studio/index.html#/).

**Note Input:**
 1. `Database:` 3G_Web
 2. `User:` root
 3. `Password:` geekup

## File Structure
```
.
├── bin // to start server and setup cronjob
├── helper // to setup libraries and integrate slack
│   └── config // to config mail service
├── lib // include APIs
├── models // to setup database
├── modules // to hanlde APIs lib
│   ├── add_reward_module
│   ├── add_user_csv_modules
│   ├── add_user_modules
│   │   └── config
│   ├── change_password_modules
│   ├── change_user_redeem_status_modules
│   ├── change_user_status_modules
│   ├── edit_reward_modules
│   ├── get_completion_redeem_modules
│   ├── get_handle_redeem_modules
│   ├── get_list_rewards_modules
│   ├── get_list_users_modules
│   ├── get_message_modules
│   ├── get_points_modules
│   ├── get_user_rewards_modules
│   ├── get_users_status_modules
│   ├── givepoint_mc_modules
│   ├── give_points_modules
│   ├── init_user_modules
│   ├── login_modules
│   ├── logout_modules
│   ├── lucky_wheel_modules
│   ├── recover_password_modules
│   │   └── config
│   ├── redeem_modules
│   ├── remove_reward_modules
│   ├── search_redeem_modules
│   └── search_users_modules
├── public // All public contents go here
│   ├── css
│   │   └── square
│   ├── font
│   ├── fonts
│   ├── images
│   ├── js
│   ├── lib
│   └── uploads
├── routes // to setup url
├── src // to setup server
├── test // include all unit test of APIs
└── views // include html pages
```

### modules
- `add_reward_module` // This is the module to be called when admin require to add a new reward card, it saves the image file, che the input information and then add new reward card to database.  
- `add_user_csv_modules` // This folder contain all file that is used in `lib/add_user_csv_API.js`, It reuse add_user_module to add each email to database and send email to them
- `add_user_modules` // This folder contain all file that is used in `lib/add_user_API.js` such as database-adding module, MailContent generating modules...
 - `config` // This folder contain configuration files for new account setting and some configuration for creating activate email (mailfrom, subject...)
- `change_password_modules` // This folder contain all file that is used in `lib/change_password_API.js`. Switch old password and return new password
- `change_user_redeem_status_modules` // This module used to change redeem status among peding, ready and received
- `change_user_status_modules` // This folder contain all file that is used in `lib/get_users_status_API.js`. Switch user status and return new status
- `edit_reward_modules` // This folder contain all file that is used in `lib/rewards_API.js` with method PUT.
- `get_completion_redeem_modules` // This folder include files to get rewards which user was redeemed and received. It used in `lib/get_completion_redeem_API.js`
- `get_handle_redeem_modules` // This folder include files to get rewards which user was redeemed but not handled yet. It used in `lib/handle_redeem_API.js`
- `get_list_rewards_modules` // This folder include files to get all rewards to users redeem. It used in `lib/rewards_API.js`
- `get_list_users_modules` // This folder include files to get all users in database. It used in `lib/get_list_users_API.js`
- `get_message_modules` // This folder include files to get content message of users sent to others. It used in `lib/get_message_API.js`
- `get_points_modules` // This folder include files to get points to give and points to redeem of user. It used in `lib/get_points_API.js`
- `get_user_rewards_modules` // This folder contain all file that is used in `lib/get_users_rewards_API.js`. Return list user's rewards
- `give_points_modules` // This folder contain all file that is used in `lib/givepoint_API.js` and `helper/sendSlack.js`.
- `givepoint_mc_modules` // This folder contain all file that is used in `givepoint_multiple_receiver_API.js`. This module is used to give points to some users (give points to 1 user is a special case of this)
- `init_user_modules` // This folder include files to set password for the first time user login. It used in `lib/init_user_API.js`
- `login_modules` // This folder include files to check information of user to login. It used in `lib/login_API.js`
- `logout_modules` // This folder include files to disable login token of user. It used in `lib/logout_API.js`
- `lucky_wheel_modules` // This folder include files to hanlde luckywheel
- `recover_password_modules` // This folder include files to hanlde request forgot password of users
 - `config` // setup mail config
- `redeem_modules` // This folder contain all file that is used in `lib/redeem_API.js` and `helper/redeemSlack.js`
- `remove_reward_modules` // This folder include files to disable rewards
- `search_redeem_modules` // This folder contain all file that is used in `lib/search_redeem_API.js`. Feature only API and not UI.
- `search_users_modules` // This folder contain all file that is used in `lib/search_users_API.js`. Feature only API and not UI.

### public
- `css` // This folder contains all CSS file
 - `square` // This folder contains style of checkbox libary
- `font` // This folder contains font that uses in whole Layout content
- `fonts` // This folder contains fonts that libary use
- `images` // This folder contains all images, icons of Website
- `js` // This folder contains all javascript files to render Layout
- `lib` // This folder contains all javascript libaries
- `uploads` // This folder contains images that user upload to Website
# prj_ec_hcmut
