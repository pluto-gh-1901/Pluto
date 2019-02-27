/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {requestProducts, requestProduct} from './product'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'
import Product from '../../server/db/models/product'
import app from '../../server/index'

const agent = require('supertest')(app)

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {products: [], selectedProduct: {}}
  let storedProducts

  const productData = [
    {
      name: 'Carrot'
    },
    {
      name: 'Celery'
    }
  ]

  beforeEach(async () => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
    const createdProducts = await Product.bulkCreate(productData)
    storedProducts = createdProducts.map(product => product.dataValues)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('requestProducts', () => {
    it('eventually dispatches the GET_PRODUCTS action', async () => {
      const fakeProducts = [{name: 'carrot'}, {name: 'celery'}]
      mockAxios.onGet('/api/products').replyOnce(200, fakeProducts)
      await store.dispatch(requestProducts())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_PRODUCTS')
      expect(actions[0].products).to.be.deep.equal(fakeProducts)
    })
  })

  // describe('GET `/api/products/:id`', () => {
  //   it('serves up a single product by its `id`', async () => {
  //     const response = await agent
  //       .get('/api/products/2')
  //       .expect(200);
  //     expect(response.body.name).to.equal('Celery');
  //   });
  // });
})
