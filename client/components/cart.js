import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {requestCart, requestCheckout} from '../store/cart'

class Cart extends Component {
  constructor() {
    super()
    this.getProductInfo = this.getProductInfo.bind(this)
  }

  getProductInfo(productId) {
    return this.props.cart.order.currentOrder.products.filter(x => {
      return x.id === productId
    })
  }

  componentDidMount() {}

  // handleChange = event => {}
  render() {
    let items = this.props.cart.order.orderItems || []
    let total = 0
    if (items.length) {
      items.map(product => {
        total += product.price * product.quantity
      })
    }
    if (items) {
      return (
        <div>
          <div>
            {items.map(item => {
              console.log('item is ', item)
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
      //     return (
      //       items.map(product => )
      //       <div key={product.product.id}>
      //         <h2>{product.product.name}</h2>
      //         <img src={product.product.imageUrl} width="128" height="128" />
      //         <p>
      //           Quantity:{' '}
      //           <input
      //             type="number"
      //             value={cart.orderItems[index].quantity}
      //             onChange={this.handleChange}
      //           />
      //         </p>
      //         <p>Price: {product.product.price}</p>
      //         {/* Functionality still needed for Remove button */}
      //         <button>Remove</button>
      //       </div>
      //     )
      //   })
      // }
      // return (
      //   <div>
      //     <h1> This is your cart </h1>
      //     {/* <div id="cartItems">{items}</div> */}
      //     <p>Total: ${total/100}</p>
      //     <Link to="/checkout">
      //       <button>Checkout</button>
      //     </Link>
      //   </div>
      // )
      // }
      return <div>cart is empty, add some veggies to your cart</div>
    }
  }
}

const mapDispatch = dispatch => {
  return {
    requestCheckout: id => dispatch(requestCheckout(id))
  }
}

const mapState = state => {
  return {
    id: state.user.id,
    cart: state.cart
  }
}

export default connect(mapState, mapDispatch)(Cart)
