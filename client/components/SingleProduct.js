import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import {requestProduct} from '../store/product'
import {orderItemInput, requestCart, setTotal} from '../store/cart'
// import {runInNewContext} from 'vm'

class SingleProduct extends Component {
  constructor(props) {
    super(props)
    this.addToCart = this.addToCart.bind(this)
    this.setCheckoutTotal = this.setCheckoutTotal.bind(this)
  }

  componentDidMount() {
    const productId = this.props.match.params.productId
    this.props.requestProduct(productId)
    this.props.requestCart(this.props.user.id)
    console.log(this.props.location)
  }

  addToCart(evt) {
    evt.preventDefault()
    console.log('the props currently on product page', this.props)
    let orderInfo = {
      productId: this.props.match.params.productId,
      quantity: evt.target.quantity.value,
      price: this.props.product.price,
      orderId: this.props.cart.currentOrder.id
    }
    console.log('order info being sent is ', orderInfo)
    this.props.orderItemInput(orderInfo)
    let total = evt.target.quantity.value * this.props.product.price
    this.setCheckoutTotal(total)
    evt.target.quantity.value = ''
  }

  setCheckoutTotal(total) {
    if (this.props.cart) {
      let orderId = this.props.cart.currentOrder.id
      let info = {orderId, total}
      this.props.setTotal(info)
    }
  }

  displayPrice = price => price / 100

  render() {
    const {product} = this.props

    return (
      <div>
        <img src={product.imageUrl} />
        <h1>Product: {product.name}</h1>
        <p>Description: {product.description}</p>
        <p>Price: {this.displayPrice(product.price)}</p>
        {this.props.user.id ? (
          <div>
            <form onSubmit={this.addToCart}>
              <div>
                <label htmlFor="quantity">Quantity:</label>
                <input
                  type="text"
                  name="quantity"
                  onChange={this.handleChange}
                />
              </div>
              <Link to="/products">
                <button type="button">Back</button>
              </Link>
              <button type="submit">Buy</button>
            </form>
          </div>
        ) : (
          <div>
            <Link
              to="/login"
              onClick={() => {
                location.state = this.props.location.pathname
              }}
            >
              <section className="loginLink">
                <h3>For purchasing items, please click here to log in!</h3>
              </section>
            </Link>
          </div>
        )}
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
