import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props

  return (
    <div className="welcomeContainer">
      <div className="subComp">
        <h3>Welcome, {email}!</h3>
        <p>
          Pluto-Vegetables was launched in February 2019 with one goal: bring
          healthy veggies to the food lovers of New York City. Today,
          Pluto-Vegetables delivers greens that are as good for the soul as they
          are for the body. Sourcing from local farms, Pluto-Vegetables is here
          to keep you feeling good, no matter what.
        </p>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
