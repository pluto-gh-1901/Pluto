import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import axios from 'axios'

let totalPrice = 20.1

export class Checkout extends Component {
  render() {
    return (
      <form>
        <h2>You will be paying a total of ${totalPrice}</h2>
        <p>
          Card Holder: <input type="text" name="card-holder" required />
        </p>
        <p>
          Card Number: <input type="text" name="card-number" required />
        </p>
        <p>
          CVV: <input type="text" name="card-number" required max={3} />
        </p>
        <p>
          Expiration Date <input type="month" name="date" required />
        </p>
        <button>Submit</button>
      </form>
    )
  }
}
