import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import {requestProduct} from '../store/product'

class SingleProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.addToCart = this.addToCart.bind(this)
  }

  componentDidMount() {
    console.log('id is ', this.props.match.params.productId)
    const productId = this.props.match.params.productId
    this.props.requestProduct(productId)
  }

  handleChange(evt) {
    this.setState({quantity: evt.target.value})
  }

  // handleSubmit(evt) {
  //   evt.preventDefault()
  // }

  addToCart(evt) {
    evt.preventDefault()
    console.log('QUANTITY::', evt)
  }

  render() {
    const {product} = this.props

    return (
      <div>
        <img src={product.imageUrl} />
        <form onSubmit={this.addToCart}>
          <div>
            <h1>Product: {product.name}</h1>
            <p>Description: {product.description}</p>
            <label htmlFor="quantity">
              <input
                type="text"
                name="quantity"
                value={this.state.quantity}
                onChange={this.handleChange}
              />
            </label>
            <p>Quantity:</p>
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
  product: state.product.selectedProduct
})

const mapDispatchToProps = dispatch => ({
  requestProduct: productId => dispatch(requestProduct(productId))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleProduct))
