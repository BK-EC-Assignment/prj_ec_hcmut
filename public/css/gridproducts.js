import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "border": {
        "border": "solid 1px black"
    },
    "padding-none": {
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0
    },
    "grid-header": {
        "fontSize": 20,
        "color": "#1a1a1a",
        "marginTop": 40,
        "marginRight": 0,
        "marginBottom": 20,
        "marginLeft": 0,
        "borderBottom": "solid 1px  #595959"
    },
    "grid-products": {
        "fontFamily": "Arial, sans-serif"
    },
    "grid-figure:hover": {
        "borderBottom": "4px solid #6694ff"
    },
    "grid-figure": {
        "lineHeight": 25,
        "height": 347,
        "border": "1px solid #ececec",
        "background": "white"
    },
    "title": {
        "height": 75,
        "fontSize": 15,
        "fontWeight": "bold",
        "overflow": "hidden",
        "color": "#333"
    },
    "title:hover": {
        "textDecoration": "underline"
    },
    "price": {
        "fontSize": 17,
        "color": "#e60000",
        "fontWeight": "bold"
    },
    "due": {
        "color": "#404040",
        "fontSize": 13
    },
    "rewardImage": {
        "height": 200
    },
    "thumbnail_wrapper": {
        "borderBottom": "1px solid #d6d6d6",
        "textAlign": "center"
    },
    "thumbnail_wrapper::before": {
        "content": "''",
        "height": "100%",
        "display": "inline-block",
        "verticalAlign": "middle"
    },
    "thumbnail_wrapper> img": {
        "maxWidth": "100%",
        "maxHeight": "100%",
        "display": "inline-block",
        "verticalAlign": "middle"
    },
    "thumbnailDes:hover rewardImage": {
        "display": "none"
    }
});
