
import React from 'react';
import PropTypes from 'prop-types';
import {CardWrapper,WrapperX,WrapperY,WrapperZ,WrapperF,CardImg,CardBody,CartHeader,CardPrice,PriceItem,PriceItemY,CardCart,AddToCard,CardProps,CardPropsWrappr,CardPropsItems,CardPropsItem,CatOfItem} from './Styles';
import {Row,Col,CardTitle, CardText, CardImgOverlay, Button,Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import {
  addToCart,
  showValidation,
  getCartItems
} from 'containers/HomePage/actions'
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import {formatter} from '../../utils/formater'


class CastumCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      pieceCount: 1,
      priceId   : 0
    };

    this.toggle               = this.toggle.bind(this);
    this.handleUserValidClick = this.handleUserValidClick.bind(this);
    this.handleStock          = this.handleStock.bind(this)
    this.inCount     = this.inCount.bind(this)
    this.deCount     = this.deCount.bind(this)
    this.handlePrice = this.handlePrice.bind(this)
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  handleUserValidClick(){
   
    const item  = this.props.item
    const itemId  = this.props.item._id
    let count = ''
    const priceId = this.state.priceId
    const sellType = item.sellType

    if (this.props.isValid == 1){
      if(sellType == 'piece'){
        count = this.state.pieceCount
        this.props.onAddToCart({sellType,itemId,count})
      }
      else if(sellType == 'weight'){
        count = 1
        this.props.onAddToCart({sellType,itemId,priceId,count})
      }
      else{
        // do something
      }

      this.props.onGetCartItems()

    }
    else{
      this.props.onValidModalClick()
    }

  }

  handleStock(){

  }

  handlePrice(evt){
    this.setState({
      priceId : evt.target.value
  })

  }

  inCount(){
    const stock = this.state.pieceCount
    this.setState({
        pieceCount : stock +1
    })
  }

  deCount(){
    const stocka = this.state.pieceCount
    if(stocka == 1){

    }
    else{
      this.setState({
        pieceCount : stocka - 1
    })
    }
  }

  render () {

    const {item}       = this.props
    const {pieceCount,priceId} = this.state

    console.log("item",item)
    console.log("satte",this.state)

    return (
      
      <CardWrapper mobile={this.props.mobile}>

        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>

          <ModalHeader toggle={this.toggle}>{item.title}</ModalHeader>

          <ModalBody>

            <CardImg type='cart'  onClick={this.toggle} className="mb-3" style={{backgroundImage:`url(${item.productImage}`}}>

              {item.category.map((category,i)=>(
                <CatOfItem key={i}>{category}</CatOfItem>
              ))}

            </CardImg>

            
            <CardBody className="mb-4">

            {this.props.type == 'weight' &&

            <React.Fragment>

              <CardPrice>

                {
                  item.prices.map((price, i)=>(
                  <PriceItem >
                    <PriceItemY  value={i} className={`priceItem-first ${priceId == i ? "active" : ""}`} onClick={this.handlePrice}>

                    <div className="price-items">
                      <div className="price-title">{price.name}</div>
                      <div className="price-price">{formatter.format(price.price)}</div>
                    </div>

                    </PriceItemY>
                  </PriceItem>

                  ))
                }

              </CardPrice>

              <CardCart>
                                                    
                <AddToCard onClick={this.handleUserValidClick} className="mt-2" outline color="success">
                  add to cart
                </AddToCard>

              </CardCart>

            </React.Fragment>

            }

            {this.props.type == 'piece' &&

            <React.Fragment>

              <CardPrice >
                <div className="potify-tO">
                  <div className="potify-tP">

                    <div className="potify-wF potify-wK">
                      <div className="potify-wO">
                        <button className="potify-wM potify-jo" type="button" onClick={this.deCount}>
                          <svg className="potify-sl" viewBox="0 0 17.83 3">
                            <g id="Layer_2" data-name="Layer 2">
                              <path className="potify-sm" d="M1.5 0h14.83a1.5 1.5 0 1 1 0 3H1.5a1.5 1.5 0 0 1 0-3z" id="Layer_1-2" data-name="Layer 1"></path>
                            </g>
                          </svg>
                        </button>
                      </div>
                      <div className="potify-wN">
                        <div className="potify-wG">{pieceCount} pc</div>
                        <div className="potify-wH">{formatter.format(item.prices * pieceCount)}</div>
                      </div>
                      <div className="potify-wO">
                        <button className="potify-wM potify-jo" type="button"  onClick={this.inCount}>
                          <svg className="potify-sn" viewBox="0 0 17.83 17.83">
                            <g id="Layer_2" data-name="Layer 2">
                              <path className="potify-so" d="M16.33 7.44h-5.89V1.5a1.5 1.5 0 0 0-3 0v5.94H1.5a1.5 1.5 0 0 0 0 3h5.94v5.89a1.5 1.5 0 0 0 3 0v-5.89h5.89a1.5 1.5 0 1 0 0-3z" id="Layer_1-2" data-name="Layer 1"></path>
                            </g>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

              </CardPrice>
              
              <CardCart>

                  {item.stocks == 0 &&
                  <AddToCard onClick={this.handleUserValidClick} className="mt-2" disabled = {pieceCount > item.stocks ? true : false} outline color="warning">
                    out of stock
                  </AddToCard>
                  }

                  {item.stocks != 0 &&
                    <AddToCard onClick={this.handleUserValidClick} className="mt-2" disabled = {pieceCount > item.stocks ? true : false} outline color="success">
                      add to cart
                    </AddToCard>
                  }

              </CardCart>

            </React.Fragment>

            }

            </CardBody>

            <p>
            {item.text.replace(/(<([^>]+)>)/ig,"")}
            </p>

        
        </ModalBody>

        </Modal>

        <WrapperX>
          <WrapperY>
            <WrapperZ mobile={this.props.mobile}>
              <WrapperF>

                <CartHeader className="mb-2">
                    <CardTitle className="mb-1" tag="h5">{item.title}</CardTitle>
                    <span tag="h6">{item.subtitle}</span>
                </CartHeader>

                <CardImg type='cart'  onClick={this.toggle} className="mb-3" style={{backgroundImage:`url(${item.productImage}`}}>

                {item.category.map((category,i)=>(
                <CatOfItem key={i}>{category}</CatOfItem>
                ))}

                </CardImg>


                <CardBody>

                  {this.props.type == 'weight' &&

                  <React.Fragment>

                    <CardPrice>

                      {
                        item.prices.map((price, i)=>(
                        <PriceItem >
                          <PriceItemY  value={i} className={`priceItem-first ${priceId == i ? "active" : ""}`} onClick={this.handlePrice}>
    
                          <div className="price-items">
                            <div className="price-title">{price.name}</div>
                            <div className="price-price">{formatter.format(price.price)}</div>
                          </div>
    
                          </PriceItemY>
                        </PriceItem>
      
                        ))
                      }

                    </CardPrice>

                    <CardCart>
                                                          
                      <AddToCard onClick={this.handleUserValidClick} className="mt-2" outline color="success">
                        add to cart
                      </AddToCard>

                    </CardCart>

                  </React.Fragment>

                  }

                  {this.props.type == 'piece' &&

                  <React.Fragment>

                    <CardPrice >
                      <div className="potify-tO">
                        <div className="potify-tP">

                          <div className="potify-wF potify-wK">
                            <div className="potify-wO">
                              <button className="potify-wM potify-jo" type="button" onClick={this.deCount}>
                                <svg className="potify-sl" viewBox="0 0 17.83 3">
                                  <g id="Layer_2" data-name="Layer 2">
                                    <path className="potify-sm" d="M1.5 0h14.83a1.5 1.5 0 1 1 0 3H1.5a1.5 1.5 0 0 1 0-3z" id="Layer_1-2" data-name="Layer 1"></path>
                                  </g>
                                </svg>
                              </button>
                            </div>
                            <div className="potify-wN">
                              <div className="potify-wG">{pieceCount} pc</div>
                              <div className="potify-wH">{formatter.format(item.prices * pieceCount)}</div>
                            </div>
                            <div className="potify-wO">
                              <button className="potify-wM potify-jo" type="button"  onClick={this.inCount}>
                                <svg className="potify-sn" viewBox="0 0 17.83 17.83">
                                  <g id="Layer_2" data-name="Layer 2">
                                    <path className="potify-so" d="M16.33 7.44h-5.89V1.5a1.5 1.5 0 0 0-3 0v5.94H1.5a1.5 1.5 0 0 0 0 3h5.94v5.89a1.5 1.5 0 0 0 3 0v-5.89h5.89a1.5 1.5 0 1 0 0-3z" id="Layer_1-2" data-name="Layer 1"></path>
                                  </g>
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                    </CardPrice>
                    
                    <CardCart>

                        {item.stocks == 0 &&
                        <AddToCard onClick={this.handleUserValidClick} className="mt-2" disabled = {pieceCount > item.stocks ? true : false} outline color="warning">
                          out of stock
                        </AddToCard>
                        }

                        {item.stocks != 0 &&
                          <AddToCard onClick={this.handleUserValidClick} className="mt-2" disabled = {pieceCount > item.stocks ? true : false} outline color="success">
                            add to cart
                          </AddToCard>
                        }

                    </CardCart>

                  </React.Fragment>

                  }

                </CardBody>

              </WrapperF>

            </WrapperZ>

          </WrapperY>

        </WrapperX>

      </CardWrapper>
      
    )

  }

}

CastumCard.propTypes = {
  onAddToCart : PropTypes.func,
  onLoginModalClick   : PropTypes.func,
  onGetCartItems : PropTypes.func
};

const mapStateToProps = createStructuredSelector({
});

export function mapDispatchToProps(dispatch) {
  return {
    onAddToCart       : value => dispatch(addToCart(value)),
    onValidModalClick : () => dispatch(showValidation()),
    onGetCartItems     : () => dispatch(getCartItems()),

  };
}

export default connect(
  null,
  mapDispatchToProps,
)(CastumCard);

