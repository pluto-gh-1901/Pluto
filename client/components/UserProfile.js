import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'

class UserProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: props.user.email || ''
    }
  }

  enableInputs() {
    const inputs = document.getElementsByName('email')
    inputs[0].setAttribute('disabled', 'false')
  }

  render() {
    const {email} = this.state
    return (
      <div className="welcomeContainer">
        <div className="subComp">
          <h3>Your Profile</h3>
          <form>
            <div>
              <button type="button" name="edit" onClick={this.enableInputs}>
                Edit This Info
              </button>
            </div>
            <label>
              Email address:
              <div>
                <input
                  className="userEditInput"
                  name="email"
                  type="email"
                  value={email}
                  disabled
                />
              </div>
            </label>
          </form>
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  user: state.user
})

export default connect(mapState, null)(UserProfile)
