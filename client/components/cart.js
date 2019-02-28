import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {requestCart} from '../store/cart'

class Cart extends Component {
  constructor() {
    super()
  }
  componentDidMount() {
    this.props.requestCart(this.props.id)
  }
  // handleChange = event => {}
  render() {
    let cart = this.props.cart || {}
    let items,
      total = 0
    if (cart.orderItems) {
      items = cart.orderItems.map((product, index) => {
        total += product.product.price * product.product.quantity
        return (
          <div key={product.product.id}>
            <h2>{product.product.name}</h2>
            <img src={product.product.imageUrl} width="128" height="128" />
            <p>
              Quantity:{' '}
              <input
                type="number"
                value={cart.orderItems[index].quantity}
                onChange={this.handleChange}
              />
            </p>
            <p>Price: {product.product.price}</p>
            {/* Functionality still needed for Remove button */}
            <button>Remove</button>
          </div>
        )
      })
    }
    return (
      <div>
        <h1> This is your cart </h1>
        <div id="cartItems">{items}</div>
        <p>Total: {total}</p>
        <Link to="/checkout">
          <button>Checkout</button>
        </Link>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
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
