import axios from 'axios'
import history from '../history'

const GET_CART = 'GET_CART'
const GET_ITEMS = 'GET_ITEMS'
const ADD_ORDER_ITEM = 'ADD_ORDER_ITEM'

const getCart = cart => {
  return {
    type: GET_CART,
    cart
  }
}

const getItems = items => {
  return {
    type: GET_ITEMS,
    items
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

export const requestCheckout = orderId => async dispatch => {
  try {
    console.log('request checkout called with ', orderId)
    const res = await axios.post('/api/users/checkout', {orderId})
    dispatch(getCart(res.data))
  } catch (err) {
    console.error(err)
  }
}

const defaultCart = {order: {}, items: []}

export default function(state = defaultCart, action) {
  switch (action.type) {
    case GET_CART:
      return {...state, order: action.cart}
    case GET_ITEMS:
      return {...state, items: action.items}
    default:
      return state
  }
}
