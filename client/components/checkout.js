import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import axios from 'axios'
import {requestCart} from '../store/cart'

let totalPrice = 0

class Checkout extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    console.log('props.cart on checkout ', this.props.cart)
    this.props.requestCart(this.props.id)
    if (this.props.cart.order.currentOrder) {
      totalPrice = this.props.cart.order.currentOrder.total / 100
    }
  }

  render() {
    return (
      <form>
        <h2>You will be paying a total of ${totalPrice}</h2>
        <p>
          Card Holder: <input type="text" name="card-holder" required />
        </p>
        <p>
          Card Number: <input type="text" name="card-number" required />
        </p>
        <p>
          CVV: <input type="text" name="card-number" required max={3} />
        </p>
        <p>
          Expiration Date <input type="month" name="date" required />
        </p>
        <button>Submit</button>
      </form>
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

export default connect(mapState, mapDispatch)(Checkout)
