import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {requestCart, requestCheckout} from '../store/cart'

class Cart extends Component {
  constructor() {
    super()
    this.getProductInfo = this.getProductInfo.bind(this)
  }
  total = 0

  getProductInfo(productId) {
    return this.props.cart.order.currentOrder.products.filter(x => {
      return x.id === productId
    })
  }

  componentDidMount() {
    this.props.requestCart(this.props.id)
  }

  render() {
    let total = 0
    let items = this.props.cart.order.orderItems || []
    if (this.props.cart.order.currentOrder) {
      total = this.props.cart.order.currentOrder.total
    }
    if (items) {
      return (
        <div>
          <div>
            {items.map(item => {
              let product = this.getProductInfo(item.productId)[0]
              return (
                <div key={item.productId}>
                  <h2>{product.name}</h2>
                  <img src={product.imageUrl} width="128" height="128" />
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: {item.price / 100}</p>
                </div>
              )
            })}
          </div>
          <div className="total">
            <h2>Total: ${total / 100}</h2>
            <Link to="/checkout">
              <button type="button">Checkout</button>
            </Link>
          </div>
        </div>
      )
    } else {
      return <div>cart is empty, add some veggies to your cart</div>
    }
  }
}

const mapDispatch = dispatch => {
  return {
    requestCheckout: id => dispatch(requestCheckout(id)),
    requestCart: id => dispatch(requestCart(id))
  }
}

const mapState = state => {
  return {
    id: state.user.id,
    cart: state.cart
  }
}

export default connect(mapState, mapDispatch)(Cart)
