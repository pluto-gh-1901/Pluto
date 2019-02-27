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
    // this.props.requestCart(this.props.id)
    console.log('PROPS::', this.props)
    // const cartItems = await axios.get('/api/users/cart')
    // this.setState({cartItems: cartItems.data})
  }
  // handleChange = event => {}
  render() {
    let items,
      total = 0
    if (this.state.cartItems) {
      items = this.state.cartItems.map((product, index) => {
        total += product.price * product.quantity
        return (
          <div key={product.id}>
            <h2>{product.name}</h2>
            <img src={product.image} width="128" height="128" />
            <p>
              Quantity:{' '}
              <input
                type="number"
                value={this.state.cartItems[index].quantity}
                onChange={this.handleChange}
              />
            </p>
            <p>Price: {product.price}</p>
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
    requestCart: () => dispatch(requestCart())
  }
}

const mapState = state => {
  return {
    id: state.user.id,
    cart: state.cart
  }
}

export default connect(mapState, mapDispatch)(Cart)
