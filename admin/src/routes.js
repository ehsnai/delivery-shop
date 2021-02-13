
import Dashboard from "views/Dashboard/Dashboard.jsx";
import UserList  from "views/Users/UserList.jsx";
import User      from "views/Users/User.jsx";
import LoginPage from "views/Auth/LoginPage.jsx";

import Product      from "views/Product/Product.jsx";
import ProductList  from "views/Product/ProductList.jsx";

import Order          from "views/Order/Order.jsx";
import OrderList      from "views/Order/OrderList.jsx";
import DeliveryList   from "views/Delivery/DeliveryList.jsx";
import TicketList   from "views/Tickets/TicketList.jsx";
import Coupon          from "views/Promotions/Coupon.jsx";
import CouponList      from "views/Promotions/CouponList.jsx";


// @material-ui/icons
import Apps from "@material-ui/icons/Apps";
import DashboardIcon from "@material-ui/icons/Dashboard";
import BarChart from "@material-ui/icons/BarChart";
import UserIcon from "@material-ui/icons/PermIdentity";
import ShopingCart from "@material-ui/icons/ShoppingBasket";
import Widgets from "@material-ui/icons/Widgets";
import Ticket from "@material-ui/icons/LocalHospital";
import Gifts from "@material-ui/icons/CardGiftcard";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: DashboardIcon,
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/statistics",
    name: "Statistics",
    icon: BarChart,
    component: Dashboard,
    layout: "/admin"
  },

  {
    collapse: true,
    name: "Product & Stock",
    icon: ShopingCart,
    state: "productCollapse",
    views: [
      {
        path: "/product",
        name: "New product",
        mini: "O",
        component: Product,
        layout: "/admin"
      },
      {
        path: "/listProduct",
        name: "Product List",
        mini: "O",
        component: ProductList,
        layout: "/admin"
      },
    ]
  },

  {
    collapse: true,
    name: "Orders",
    icon: Widgets,
    state: "orderCollapse",
    views: [
      {
        path: "/newOrder",
        name: "new order",
        mini: "O",
        component: Order,
        layout: "/admin"
      },
      {
        path: "/orderList",
        name: "Orders",
        mini: "O",
        component: OrderList,
        layout: "/admin"
      },

      {
        path: "/deliveryList",
        name: "Delivery",
        mini: "O",
        component: DeliveryList,
        layout: "/admin"
      },
    ]
  },
  {
    path: "/tickets",
    name: "Tickets",
    icon: Ticket,
    component: TicketList,
    layout: "/admin"
  },
  {
    collapse: true,
    name: "Promotions",
    icon: Gifts,
    state: "promotionCollapse",
    views: [
      {
        path: "/newCoupon",
        name: "Coupon",
        mini: "O",
        component: Coupon,
        layout: "/admin"
      },
      {
        path: "/CouponList",
        name: "CouponList",
        mini: "O",
        component: CouponList,
        layout: "/admin"
      },

    ]
      
  },

  {
    collapse: true,
    name: "Users Management",
    icon: UserIcon,
    state: "userCollapse",
    views: [
      {
        path: "/listUser",
        name: "List Of User",
        mini: "O",
        component: UserList,
        layout: "/admin"
      },
      {
        path: "/newUser",
        name: "Add New User",
        mini: "U",
        component: User,
        layout: "/admin"
      },
      {
        path: "/login",
        name: "Login Page",
        invisible: true,
        rtlMini: "هعذا",
        component: LoginPage,
        layout: "/auth"
      },
    ]
  },






];
export default dashRoutes;
