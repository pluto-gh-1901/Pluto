import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import SingleProduct from './SingleProduct'

import '../../public/navbar.css'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div className="container">
    <h1 className="logo">
      <Link to="/home">Pluto</Link>
    </h1>
    <nav>
      {isLoggedIn ? (
        <div className="navbar-buttons">
          {/* The navbar will show these links after you log in */}
          <div className="navbar">
            <Link to="/products">Products</Link>
          </div>
          <div className="navbar">
            <Link to="/home">Home</Link>
          </div>
          <div className="navbar">
            <Link to="/cart">Cart</Link>
          </div>
          <div className="navbar">
            <Link to="/userProfile">Profile</Link>
          </div>
          <div className="navbar">
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        </div>
      ) : (
        <div className="navbar-buttons">
          {/* The navbar will show these links before you log in */}
          <div className="navbar">
            <Link to="/products">Products</Link>
          </div>
          <div className="navbar">
            <Link to="/login">Login</Link>
          </div>
          <div className="navbar">
            <Link to="/signup">Sign Up</Link>
          </div>
        </div>
      )}
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
