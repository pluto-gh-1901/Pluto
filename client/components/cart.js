import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  requestCart,
  requestCheckout,
  removeItem,
  setTotalSub
} from '../store/cart'

class Cart extends Component {
  constructor() {
    super()
    this.getProductInfo = this.getProductInfo.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
  }
  total = 0

  getProductInfo(productId) {
    return this.props.cart.currentOrder.products.filter(x => {
      return x.id === productId
    })
  }

  deleteItem(productId, quantity, price) {
    console.log('start props ', this.props)
    let orderId = this.props.cart.currentOrder.id
    let info = {productId, orderId}
    this.props.removeItem(info)
    let newTotal = this.props.cart.currentOrder.total - quantity * price
    let updateInfo = {total: newTotal, orderId}
    this.props.setTotalSub(updateInfo)
    console.log('end props ', this.props)
    this.props.requestCart(this.props.id)
  }

  componentDidMount() {
    this.props.requestCart(this.props.id)
    console.log(this.props)
  }

  render() {
    let total = 0
    let items = this.props.cart.orderItems || []
    if (this.props.cart.currentOrder) {
      total = this.props.cart.currentOrder.total
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
                  <button
                    type="button"
                    onClick={() =>
                      this.deleteItem(item.productId, item.quantity, item.price)
                    }
                  >
                    remove
                  </button>
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
    requestCart: id => dispatch(requestCart(id)),
    removeItem: info => dispatch(removeItem(info)),
    setTotalSub: total => dispatch(setTotalSub(total))
  }
}

const mapState = state => {
  return {
    id: state.user.id,
    cart: state.cart
  }
}

export default connect(mapState, mapDispatch)(Cart)
