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

  render() {
    const {product} = this.props

    return (
      <div>
        <img src={product.imageUrl} />
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
        <Link to="/cart">
          <button>Buy</button>
        </Link>
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
