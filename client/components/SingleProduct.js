import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import {requestProduct} from '../store/product'
import {orderItemInput, requestCart, setTotal} from '../store/cart'

import '../../public/singleProduct.css'
// import {runInNewContext} from 'vm'

class SingleProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: '',
      inputError: false,
      inputErrorMessage: '',
      displayPopUp: false
    }
    this.addToCart = this.addToCart.bind(this)
    this.setCheckoutTotal = this.setCheckoutTotal.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    const productId = this.props.match.params.productId
    this.props.requestProduct(productId)
    this.props.requestCart(this.props.user.id)
    console.log(this.props.location)
  }

  validateIfNumber(input) {
    if (isNaN(input)) {
      this.setState({
        inputError: true,
        inputErrorMessage: 'Letters are not allowed'
      })
      return false
    } else {
      return true
    }
  }

  validateMaxNumber(input) {
    if (input > 100) {
      this.setState({inputError: true, inputErrorMessage: 'Max is 100'})
    }
  }

  displayPopUp() {
    this.setState({displayPopUp: true}, () => {
      setTimeout(() => {
        this.setState({displayPopUp: false})
      }, 800);
    });
  }

  handleChange(evt) {
    if (!this.validateIfNumber(evt.target.value)) {
      return;
    } else {
      this.setState(
        {
          [evt.target.name]: evt.target.value,
          inputError: false,
          inputErrorMessage: ''
        },
        () => {
          this.validateMaxNumber(this.state.quantity)
        }
      )
    }
  }

  addToCart(evt) {
    evt.preventDefault()
    console.log('the props currently on product page', this.props)
    let orderInfo = {
      productId: this.props.match.params.productId,
      quantity: this.state.quantity,
      price: this.props.product.price,
      orderId: this.props.cart.currentOrder.id
    }
    console.log('order info being sent is ', orderInfo)
    this.props.orderItemInput(orderInfo)
    let total = evt.target.quantity.value * this.props.product.price
    this.setCheckoutTotal(total, evt.target.quantity.value);
    this.displayPopUp();
    this.setState({quantity: ''})
  }

  setCheckoutTotal(total, quantity) {
    if (this.props.cart) {
      let orderId = this.props.cart.currentOrder.id
      let item = this.props.match.params.productId
      let info = {orderId, total, item, quantity}
      this.props.setTotal(info)
    }
  }

  displayPrice = price => price / 100

  render() {
    const {product} = this.props

    return (
      <div className="singleproduct-container">
        {this.state.displayPopUp && (
          <div className="popup">Added to cart</div>
        )}
        <img className="img-single" src={product.imageUrl} />
        <div>
          <h1>{product.name}</h1>
          <p className="description">
            <strong>Description:</strong> {product.description}
          </p>
          <p>
            <strong>Price:</strong> <span>$ </span>{this.displayPrice(product.price)}

          </p>
          {this.props.user.id ? (
            <div>
              <form className="form-container-product" onSubmit={this.addToCart}>
                <div className="quantity">
                  <label htmlFor="quantity">
                    <strong>Quantity:</strong>
                  </label>
                  <input
                    className="input"
                    autoFocus
                    type="text"
                    name="quantity"
                    min="1"
                    value={this.state.quantity}
                    onChange={this.handleChange}
                  />
                  {this.state.inputError && (
                    <div className="err-message">{this.state.inputErrorMessage}</div>
                  )}
                </div>
                <div className="buttons">
                  {this.props.user.id ? (
                    <button type="submit"
                      className={this.state.inputError || !this.state.quantity.length ? "button-add button-disable" : "button-add"}
                      disabled={this.state.inputError || !this.state.quantity.length}>
                      Add to cart
                    </button>
                  ) : (
                    <p>login to purchase</p>
                  )}
                  <Link to="/products">
                    <button type="button" className="button-add">
                      Back to Products
                    </button>
                  </Link>
                </div>
              </form>
            </div>
          ) : (
            <div>
              <h3>For purchasing items, please click to log in!</h3>
              <Link
                to="/login"
                onClick={() => {
                  location.state = this.props.location.pathname
                }}
              >
                <button className="button-add">Login page</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  product: state.product.selectedProduct,
  user: state.user,
  cart: state.cart
})

const mapDispatchToProps = dispatch => ({
  requestProduct: productId => dispatch(requestProduct(productId)),
  orderItemInput: orderInfo => dispatch(orderItemInput(orderInfo)),
  requestCart: id => dispatch(requestCart(id)),
  setTotal: total => dispatch(setTotal(total))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
