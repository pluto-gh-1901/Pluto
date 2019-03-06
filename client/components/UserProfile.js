import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {requestEdit} from '../store/user'

class UserProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: props.user.email || '',
      shipping: props.user.shipping || '',
      legalName: props.user.legalName || ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (evt) {
    evt.preventDefault();
    const name = evt.target.name.value
    let email = evt.target.email.value
    const address = evt.target.address.value
    const id = this.props.user.id
    this.props.requestEdit(id, name, email, address)
  }

  enableInputs() {
    const inputs = Array.from(document.getElementsByTagName('input'))
    inputs.forEach(input => input.removeAttribute('disabled'))
  }

  render() {
    const {email, shipping, legalName} = this.state
    return (
      <div className="welcomeContainer">
        <div className="subComp">
          <h3>Your Profile</h3>
          <form action='put' onSubmit={this.handleSubmit}>
            <div>
              <button type="button" name="edit" onClick={this.enableInputs}>
                Edit This Info
              </button>
              <button type="submit">Save Info</button>
            </div>
            <label>
              Your Name:
            </label>
              <div>
                <input
                  className="userEditInput"
                  name="name"
                  type="text"
                  placeholder={legalName || ''}
                  disabled
                />
              </div>
            <label>
              Email address:
            </label>
              <div>
                <input
                  className="userEditInput"
                  name="email"
                  type="email"
                  placeholder={email}
                  disabled
                />
              </div>
            <label>
              Shipping Address:
            </label>
              <div>
                <input
                  className="userEditInput"
                  name="address"
                  type="text"
                  placeholder={shipping || ''}
                  disabled
                />
              </div>
              <button type="submit">Save Info</button>
          </form>
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  user: state.user
})

const mapDispatch = dispatch => {
  return {
    requestEdit: (id, name, email, address) => dispatch(requestEdit(id, name, email, address))
  }
}

export default connect(mapState, mapDispatch)(UserProfile)
