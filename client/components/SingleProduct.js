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
  }

  addToCart(evt) {
    evt.preventDefault()
    console.log(this.props)
    let orderInfo = {
      productId: this.props.match.params.productId,
      quantity: evt.target.quantity.value,
      price: this.props.product.price,
      orderId: this.props.cart.currentOrder.id
    }
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
        <form onSubmit={this.addToCart}>
          <div>
            <h1>Product: {product.name}</h1>
            <p>Description: {product.description}</p>
            <p>Price: {this.displayPrice(product.price)}</p>
            <label htmlFor="quantity">Quantity:</label>
            <input type="text" name="quantity" onChange={this.handleChange} />
          </div>
          <Link to="/products">
            <button type="button">Back</button>
          </Link>
          {this.props.user.id ? (
            <button type="submit">Buy</button>
          ) : (
            <p>login to purchase</p>
          )}
        </form>
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
