import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import axios from 'axios'

export class Cart extends Component {
  constructor() {
    super()
    this.state = {
      cartItems: []
    }
  }
  async componentDidMount() {
    const cartItems = await axios.get('/api/users/cart')
    this.setState({cartItems: cartItems.data})
  }

  render() {
    let items
    if (this.state.cartItems) {
      console.log(this.state.cartItems)
      items = this.state.cartItems.map(product => (
        <div key={product.id}>
          <h1>{product.name}</h1>
        </div>
      ))
    }
    return (
      <div>
        <h1> This is your cart </h1>
        <div id="cartItems">{items}</div>
      </div>
    )
  }
}
