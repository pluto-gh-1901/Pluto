import axios from 'axios'
import history from '../history'

const GET_CART = 'GET_CART'
const ADD_ORDER_ITEM = 'ADD_ORDER_ITEM'
const GET_UPDATE = 'GET_UPDATE'

const getCart = cart => {
  return {
    type: GET_CART,
    cart
  }
}

const updateCart = update => {
  return {
    type: GET_UPDATE,
    update
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
    const res = await axios.put('/api/orderItem', {orderInfo})
    dispatch(addOrderItem(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const requestCart = id => async dispatch => {
  try {
    const res = await axios.post('/api/users/cart', {userId: id})
    dispatch(getCart(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const requestCheckout = orderId => async dispatch => {
  try {
    const res = await axios.post('/api/users/checkout', {orderId})
    dispatch(getCart(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const setTotal = info => async dispatch => {
  try {
    let res = await axios.put('/api/users/total', info)
    dispatch(updateCart(res.data))
  } catch (err) {
    console.log(err)
  }
}

const defaultCart = {}

export default function(state = defaultCart, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart
    case GET_UPDATE:
      return action.update
    default:
      return state
  }
}
