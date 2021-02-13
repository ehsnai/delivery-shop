
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Moment from 'moment'

import classnames from 'classnames';
import {
  ListWrapper,
  WrapperX,
  SearchInput,
  SearchWrapper,
  SearchIcon,
  CustomNavItem,
  CustomNavLink,
  CustomTabContent,
  WizardWrapper,
  OrderBWrapper,
  ArrowOrderIcon,
  StockInput,
  StockCountInput

} from './Styles';

import {
  getOrders,
  confirmOrder
} from 'containers/HomePage/actions';

import FilterButton from '../filterButton'
import searchImage from './images/search-icon.png'
import arrowLeft from './images/arrowLeft.png'
import {formatter} from '../../utils/formater'


import {
  Row,
  Col,
  FormGroup, 
  Label, 
  Input,
  Button, 
  CardHeader, 
  CardFooter, 
  CardBody,
  CardImgOverlay,
  CardImg,
  CardLink,
  CardTitle, 
  CardText,
  Card,
  Table,
  ListGroup, ListGroupItem,Alert,Badge,
  TabContent, TabPane, Nav, NavItem, NavLink,
  Toast, ToastBody, ToastHeader

} from 'reactstrap'

import CustomCard from '../customCard'
import MenuIcon from '../../images/menu.png'

import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";

import winkIcon from '../../images/wink.png'

 class Order extends React.Component{

  constructor(props){
    super()

    this.state = {
      activeTab: 1
    };

  }

  componentWillMount(){
    this.props.onGetOrderClick()
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  handleConfirm(id){
    console.log("order id", id)
    let oType = 'confirm'
    this.props.onConfirmOrder({id, oType})
  }

  handleCancel(id){
    let oType = 'cancel'
    this.props.onConfirmOrder({id, oType})
  }


  render(){

    let {orders} = this.props.orders
    console.log("orders in orders", this.props.orders)
    let subTotal = 0

    return (
      
      <ListWrapper>

        <WrapperX>

              <h5 className="mb-4 mt-0">
                My Orders
              </h5>

              <Row className="m-0 p-0">
                <Col xs="12" sm="9" className="m-0 p-0">

                  <SearchWrapper type={this.props.type}>
                    <SearchInput 
                        placeholder={this.props.text}
                        onChange={this.handleChangeSearch}
                    
                    />
                    <SearchIcon
                        type={this.props.type}
                        searchImage={searchImage}
                    />
                  </SearchWrapper>

                </Col>

                <Col xs="12" sm="3" className="m-0 p-0">

                  <FormGroup className="ml-3">
                    <Input 
                    type="select"
                    onChange={this.handleSelect}
                    name="sortFilter" 
                    id="sortFilter">
                      <option disabled>Select Filter</option>
                      <option value="all">All</option>
                      <option value="upcoming" >Upcoming</option>
                      <option value="complete" >Complete</option>
                      <option value="cancel" >Canceled</option>
                    </Input>
                  </FormGroup>

                </Col>

              </Row>

              <Row className="m-0 p-0">

                <Col xs="12" sm="12" className="m-0 p-0">
                  <div className="mb-3 d-flex">
                    <span className="font-12">Completed & Canceled</span>
                    <span className="font-12 ml-auto text-muted">{this.props.orders.length} Order</span>
                  </div>
                </Col>

              </Row>

              <Row className="m-0 p-0">


              {this.props.orders.length < 1 &&

                <Alert color="info">
                  Your Order is empty
                </Alert>

              }

                <Col xs="12" sm="4" lg="3" className="m-0 p-0">

                {this.props.orders &&

                  <Nav tabs>

                      {this.props.orders.map((order,i)=>(

                        <CustomNavItem>
                          <CustomNavLink
                            className={classnames({ active: this.state.activeTab == i+1 })}
                            onClick={() => { this.toggle(i+1); }}
                          >

                            <ArrowOrderIcon bg={arrowLeft} />

                            <Toast  className="bg-danger">
                              <ToastHeader>
                                {Moment(order.createTimestamp).format("MMM")}, {Moment(order.createTimestamp).format("YYYY")}
                              </ToastHeader>
                              <ToastBody>
                                {Moment(order.createTimestamp).format("DD")}
                              </ToastBody>
                            </Toast>

                            <OrderBWrapper>
                              <p className="mb-1 mt-2">{`#${order.orderNumber}`}</p>
                              <p className="text-muted mb-0">{order.cart} Product</p>
                              <p className="text-muted mb-1 d-none">$123.00</p>
                              <Badge href="#" color="info">{order.orderStatus}</Badge>
                            </OrderBWrapper>

                          </CustomNavLink>

                        </CustomNavItem>
                    
                      ))

                    }

                  </Nav>

                }
                
                </Col>

                <Col xs="12" sm="8" lg="9" className="m-0 p-0">

                  {this.props.orders.length > 0 &&

                  <CustomTabContent activeTab={this.state.activeTab}>

                    {this.props.orders.map((order,i)=>(

                    <TabPane tabId={i+1}>

                      <Row>
                        <Col sm="12">

                          <WizardWrapper>

                            <div className="wizard-navbar">
                              <ul className="wizard-steps">
                                <li className={order.orderStep == 1 ? 'active' : 'completed'}><a href="#tab2-1" data-toggle="tab"><span>1</span>Confirming Order</a></li>
                                <li className={order.orderStep == 2 ? 'active' : order.orderStep < 2 ? '': 'completed'}><a href="#tab2-2" data-toggle="tab"><span>2</span>Order is being prepared</a></li>
                                <li className={order.orderStep == 3 ? 'active' : order.orderStep < 3 ? '': 'completed'}><a href="#tab2-3" data-toggle="tab"><span>3</span>Awaiting driver</a></li>
                                <li className={order.orderStep == 4 ? 'active' : order.orderStep < 4 ? '': 'completed'}><a href="#tab2-4" data-toggle="tab"><span>4</span>Driver on route</a></li>
                              </ul>
                            </div>   

                          </WizardWrapper>



                          {order.orderStatus == 'cancel' &&
                            <Alert color="warning" className="text-center">
                              <h3>Canceled</h3>
                              <span className="font-12">Aug 15, 2019 2:30 PM</span>
                            </Alert>
                          }

                          {order.orderStatus == 'confirm' &&

                          <Alert color="info" className="text-center">
                            <h3>Prepared</h3>
                            <span className="font-12">Aug 13, 2019 12:30 PM</span>
                          </Alert>

                          }

                          {order.orderStatus == 'order' &&

                          <Alert color="info" className="text-center">
                            <h3>Confirm Your Order</h3>
                            <span className="font-12">{Moment(order.createTimestamp).format("lll")}</span>
                          </Alert>

                          }


                          <hr className="my-2" />

                          <address className="my-4 font-12">
                            <span className="text-muted">Delivery Address :</span> 18 David Cohn Circle, Markham On L6E 1A7<br/> 
                            <span className="text-muted">Payment Methods :</span>{order.orderPaymentMethod}<br/>
                            <span className="text-muted">Dispatch Time  :</span> {order.orderDispatchTime}<br/>
                            <span className="text-muted">Phone :</span> 4561234654<br/>
                            <span className="text-muted">Note :</span> {order.orderText}
                          </address>

                          <Table responsive className="cart-table">

                            <thead>
                              <tr>
                                <th width="30%">ITEM</th>
                                <th width="25%">STOCK</th>
                                <th width="20%">QTY</th>
                                <th width="25%">AMOUNT</th>
                              </tr>
                            </thead>

                            <tbody>

                              { order.orderCart.map((item, j)=>(

                                  subTotal += item.price,


                                  <tr key={item.itemId + j}>

                                    <td>
                                      {item.itemName}
                                    </td>
                                    <td>
                                      {item.priceId &&

                                      <span>{item.priceId}</span>

                                      }

                                    </td>
                                    <td>
                                      {item.count}
                                    </td>
                                    <td >
                                      {item.price}
                                    </td>
                                
                                  </tr>

                              ))}

                            <tr>
                              <td></td>
                              <td colspan="4">
                                <Row>
                                <Col xs="6" className="text-right">
                                  <span className="d-block">Subtotal</span>
                                  <span className="d-block">Tax</span>
                                  <span className="d-block">Delivery</span>
                                </Col>
                                <Col xs="6">
                                  <span className="d-block">{formatter.format(subTotal)}</span>
                                  <span className="d-block">{formatter.format(subTotal * 0.09)}</span>
                                  <span className="d-block">{formatter.format(subTotal * 0.04)}</span>
                                </Col>
                                </Row>
                              </td>
                            </tr>

                            <tr>
                              <td></td>
                              <td colspan="4">
                              <Row>
                                <Col xs="6" className="text-right">
                                  <h6 className="d-block m-0">Total</h6>
                                </Col>
                                <Col xs="6">
                                  <h6  className="d-block m-0">{formatter.format(subTotal + (subTotal * 0.09) + (subTotal * 0.04))}</h6>
                                </Col>
                                </Row>

                              </td>
                            </tr>

                            </tbody>

                          </Table>

                        </Col>

                        <Col sm="12">

                          {order.orderStatus == 'order' &&

                          <React.Fragment>
                            <hr className="my-2" />
                            
                            <Button block color="info" onClick={()=>this.handleConfirm(order._id)}>Confirm</Button>
                            <Button block color="primary" onClick={()=>this.handleCancel(order._id)}>Cancel</Button>
                          </React.Fragment>
                          
                          }
                        </Col>
                      </Row>
                  
                    </TabPane>
                  
                    ))

                  }
                  </CustomTabContent>

                  }

                </Col>


              </Row>

        </WrapperX>

      </ListWrapper>

    )
  }

}

Order.propTypes = {
  onGetOrderClick: PropTypes.func,
  onConfirmOrder : PropTypes.func

};

const mapStateToProps = createStructuredSelector({
});

export function mapDispatchToProps(dispatch) {
  return {
    onGetOrderClick      : () => dispatch(getOrders()),
    onConfirmOrder       : (data) => dispatch(confirmOrder(data)),

  };
}

export default connect(
  null,
  mapDispatchToProps,
)(Order);

