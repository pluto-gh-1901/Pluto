import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import axios from 'axios'

import {requestProduct} from '../store/product'
import {orderItemInput, requestCart} from '../store/cart'
import {runInNewContext} from 'vm'

class SingleProduct extends Component {
  constructor(props) {
    super(props)
    this.addToCart = this.addToCart.bind(this)
  }

  componentDidMount() {
    const productId = this.props.match.params.productId
    this.props.requestProduct(productId)
    console.log(this.props.user)
    this.props.requestCart(this.props.user.id)
  }

  addToCart(evt) {
    evt.preventDefault()
    console.log('cart is ', this.props.cart)
    console.log('user is ', this.props.user)
    let orderInfo = {
      productId: this.props.match.params.productId,
      quantity: evt.target.quantity.value,
      price: this.props.product.price,
      orderId: this.props.cart.id
    }
    this.props.orderItemInput(orderInfo)
    evt.target.quantity.value = ''
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
            <input
              type="text"
              name="quantity"
              // value={this.state.quantity}
              onChange={this.handleChange}
            />
          </div>
          <Link to="/products">
            <button>Back</button>
          </Link>
          <button type="submit">Buy</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  product: state.product.selectedProduct,
  user: state.user,
  cart: state.cart.order
})

const mapDispatchToProps = dispatch => ({
  requestProduct: productId => dispatch(requestProduct(productId)),
  orderItemInput: orderInfo => dispatch(orderItemInput(orderInfo)),
  requestCart: id => dispatch(requestCart(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleProduct))
