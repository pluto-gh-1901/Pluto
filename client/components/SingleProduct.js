import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import axios from 'axios'

import {requestProduct} from '../store/product'
import {orderItemInput} from '../store/cart'
import {runInNewContext} from 'vm'

class SingleProduct extends Component {
  constructor(props) {
    super(props)
    this.addToCart = this.addToCart.bind(this)
  }

  componentDidMount() {
    console.log('id is ', this.props.match.params.productId)
    const productId = this.props.match.params.productId
    this.props.requestProduct(productId)
  }

  async orderCheck() {
    try {
      const res = await axios.get(`/api/orderItem/${this.props.user.id}`)
      return res.data
    } catch (err) {
      console.log(err)
    }
  }

  //checks for order with status of cart
  //if fount sets orderId to that Id
  //else creates new Order with status of cart

  addToCart(evt) {
    evt.preventDefault()
    let orderInfo = {
      productId: this.props.match.params.productId,
      quantity: evt.target.quantity.value,
      price: this.props.product.price,
      //currently hard coding order id
      // orderId: this.orderCheck()
      orderId: 1
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
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  requestProduct: productId => dispatch(requestProduct(productId)),
  orderItemInput: orderInfo => dispatch(orderItemInput(orderInfo))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleProduct))
