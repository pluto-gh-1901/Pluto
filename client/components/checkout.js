import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import axios from 'axios'
import {requestOrder, recieveEmptyCart} from '../store/cart'

const encriptCardNumber = cardNum => {
  if (cardNum.length < 16) {
    return cardNum
  }
  return (
    cardNum
      .toString()
      .slice(0, 11)
      .replace(/[0-9]/g, '*') + cardNum.toString().slice(12)
  )
}

class Checkout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      address: '',
      email: props.user.email || '',
      cardNumber: props.user.cardNumber || '',
      legalName: props.user.legalName || '',
      shipping: props.user.shipping || ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.requestOrder(this.props.user.id)
  }

  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }

  handleSubmit(evt) {
    evt.preventDefault()

    this.props.cart.status = 'processing'
    // Debugger

    this.props.recieveEmptyCart()

    // !!dispatch(recieveEmptyCart())
    // change state order to processing
    // dispatch empty object: new thunk creator receive {}
    // go to home page
  }

  render() {
    const {cart, user} = this.props
    const {email, cardNumber, legalName, shipping} = this.state

    return (
      <form onSubmit={this.handleSubmit}>
        <h2>{`You will be paying a total of ${cart.total}`}</h2>
        <div>Please enter your address</div>
        <label>
          Shipping information:
          <input
            value={shipping}
            name="shipping"
            type="text"
            onChange={this.handleChange}
            required
          />
        </label>
        <label>
          Email address:
          <input
            value={email}
            name="email"
            type="email"
            onChange={this.handleChange}
            required
          />
        </label>
        <label>
          Card Number:
          <input
            value={encriptCardNumber(cardNumber)}
            name="cardNumber"
            type="text"
            onChange={this.handleChange}
            required
          />
        </label>
        <label>
          Card Holder:
          <input
            value={legalName}
            name="legalName"
            type="text"
            onChange={this.handleChange}
            required
          />
        </label>
        <button>Submit</button>
      </form>
    )
  }
}

const mapState = state => ({
  cart: state.cart,
  user: state.user
})

const mapDispatch = dispatch => ({
  requestOrder: id => dispatch(requestOrder(id)),
  recieveEmptyCart: () => dispatch(recieveEmptyCart())
})

export default connect(mapState, mapDispatch)(Checkout)
