/*!

=========================================================
* Material Dashboard PRO React - v1.7.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import {
  primaryColor,
  warningColor,
  dangerColor,
  successColor,
  infoColor,
  roseColor,
  grayColor,
  whiteColor
} from "assets/jss/material-dashboard-pro-react.jsx";

const badgeStyle = {
  badge: {
    borderRadius: "12px",
    padding: "5px 12px",
    textTransform: "uppercase",
    fontSize: "10px",
    fontWeight: "700",
    lineHeight: "1",
    color: whiteColor,
    textAlign: "center",
    verticalAlign: "baseline",
    display: "inline-block"
  },
  primary: {
    backgroundColor: primaryColor[0]
  },
  warning: {
    backgroundColor: warningColor[0]
  },
  danger: {
    backgroundColor: dangerColor[0]
  },
  success: {
    backgroundColor: successColor[0]
  },
  info: {
    backgroundColor: infoColor[0]
  },
  rose: {
    backgroundColor: roseColor[0]
  },
  gray: {
    backgroundColor: grayColor[0]
  }
};

export default badgeStyle;
