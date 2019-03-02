import axios from 'axios'
import history from '../history'

const GET_CART = 'GET_CART'
const ADD_ORDER_ITEM = 'ADD_ORDER_ITEM'

const getCart = cart => {
  return {
    type: GET_CART,
    cart
  }
}

const addOrderItem = orderInfo => {
  return {
    type: ADD_ORDER_ITEM,
    orderInfo
  }
}

export const orderItemInput = orderInfo => async dispatch => {
  try {
    console.log('called orderItemInput with ', orderInfo)
    const res = await axios.put('/api/orderItem', {orderInfo})
    dispatch(addOrderItem(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const requestCart = id => async dispatch => {
  try {
    console.log('request cart called with ', id)
    const res = await axios.post('/api/users/cart', {userId: id})
    dispatch(getCart(res.data))
  } catch (err) {
    console.error(err)
  }
}

const defaultCart = {}

export default function(state = defaultCart, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart
    default:
      return state
  }
}
