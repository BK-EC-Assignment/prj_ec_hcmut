import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "user-main": {
        "background": "#fff"
    },
    "user-header": {
        "fontSize": 24,
        "color": "#0d0d0d",
        "letterSpacing": -0.5,
        "marginTop": 25
    },
    "user-body": {
        "marginTop": 20
    },
    "user-body-header": {
        "display": "inline-block",
        "listStyle": "none",
        "paddingLeft": 0,
        "width": "100%",
        "borderBottom": "1px solid #e8e8e8"
    },
    "user-body-header li": {
        "display": "inline-block"
    },
    "user-body-header li button": {
        "textAlign": "center",
        "height": 50,
        "fontSize": 15,
        "color": "#0d0d0d",
        "paddingRight": 20,
        "fontFamily": "'Helvetica Neue', Helvetica, Arial, sans-serif"
    },
    "user-body-header li button:hover": {
        "borderBottom": "4px solid #6694ff"
    },
    "user-body-header li button:focus": {
        "border": "none",
        "outline": "none",
        "borderBottom": "4px solid #6694ff"
    },
    "user-body-main": {
        "marginTop": 25
    },
    "user-body-right header label": {
        "fontSize": 22
    },
    "user-body-right header ul": {
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "float": "right"
    },
    "user-body-right ul li": {
        "display": "inline-block",
        "paddingLeft": 30,
        "fontSize": 13,
        "fontWeight": "bold"
    },
    "body-bid-img img": {
        "height": 200,
        "width": 200
    },
    "list-info": {
        "marginTop": 20,
        "lineHeight": 30
    },
    "list-info span": {
        "display": "block"
    },
    "list-info-left": {
        "fontSize": 18
    },
    "user-price": {
        "fontSize": 22,
        "paddingLeft": 10,
        "fontWeight": "bold",
        "color": "#fb4e4a"
    },
    "expected-price": {
        "fontSize": 22,
        "paddingLeft": 10,
        "fontWeight": "bold",
        "color": "#6ECA62"
    },
    "body-avatar img": {
        "width": 160,
        "height": 200
    },
    "user-form": {
        "marginTop": 30
    },
    "user-form label": {
        "marginTop": 20
    },
    "giftNameGroup": {
        "paddingLeft": "5%",
        "paddingRight": "5%"
    },
    "uploadImageGroup": {
        "paddingLeft": "5%",
        "paddingRight": "5%"
    },
    "descriptionGroup": {
        "paddingLeft": "5%",
        "paddingRight": "5%"
    },
    "giftNameGroup input": {
        "border": "1px solid #b3b2b0!important",
        "borderRadius": "5px !important",
        "boxShadow": "0px 1px 4px #b3b2b0 !important"
    },
    "uploadImageGroup btn": {
        "marginTop": "1em !important"
    },
    "uploadImageGroup> col-lg-8": {
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 10
    },
    "uploadImageGroup> col-lg-4": {
        "paddingRight": 30,
        "paddingLeft": 0
    },
    "caption btn": {
        "marginTop": 0
    }
});