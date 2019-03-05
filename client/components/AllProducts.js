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
      <div className="containerDiv">
        <h1>All Produce</h1>
        <div className="allProducts">
          <div className="products">
            {currentProducts.map(product => (
              <div key={product.id}>
                <Link to={`/products/${product.id}`}>
                  <div className="productName">
                    <h3>{product.name}</h3>
                  </div>
                  <img className="productImg" src={product.imageUrl} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    ) : (
      <p>There is currently no produce in the database</p>
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
