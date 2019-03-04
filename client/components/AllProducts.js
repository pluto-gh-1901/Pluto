import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {requestProducts} from '../store/product'

class AllProducts extends Component {
  constructor() {
    super()
    // this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.requestProducts()
  }

  render() {
    const currentProducts = this.props.products || []
    return currentProducts[0] ? (
      <div id="allProducts">
        <h1>All Vegetables</h1>
        <div className="productNames">
          {currentProducts.map(product => (
            <div key={product.id}>
              <Link to={`/products/${product.id}`}>
                <h3>{product.name}</h3>
                <img className="productImg" src={product.imageUrl} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    ) : (
      <p>There are no current vegetables in the database</p>
    )
  }
}

const mapState = state => {
  return {
    products: state.product.products
  }
}

const mapDispatch = dispatch => {
  return {
    requestProducts: () => dispatch(requestProducts())
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
