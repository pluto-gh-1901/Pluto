import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import axios from 'axios'

let totalPrice = 20.1

class Checkout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      address: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(evt) {
    this.setState({address: evt.target.value})
  }

  render() {
    const {cart} = this.props

    return (
      <form>
        <h2>{`You will be paying a total of ${cart.total}`}</h2>
        <h2>Shipping information</h2>
        <label>
          <textarea onChange={this.handleChange} />
        </label>>
        <p>
          Card Holder: <input type="text" name="card-holder" required />
        </p>
        <p>
          Card Number: <input type="text" name="card-number" required />
        </p>
        <button>Submit</button>
      </form>
    )
  }
}

const mapState = state => ({
  cart: state.cart
})

export default connect(mapState)(Checkout)

// <p>
//   CVV: <input type="text" name="card-number" required max={3} />
// </p>
// <p>
//   Expiration Date <input type="month" name="date" required />
// </p>
