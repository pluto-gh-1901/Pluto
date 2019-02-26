/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Product = db.model('user')

describe('Product model', () => {
  // beforeEach(() => {
  //   return db.sync({force: true})
  // })
  // describe("Validations", () => {
  //   it("requires `name`", async () => {
  //     const product = Product.build();
  //     try {
  //       await product.validate();
  //       throw Error(
  //         "validation was successful but should have failed without `name`"
  //       );
  //     } catch (err) {
  //       expect(err.message).to.contain("name cannot be null");
  //     }
  //   }
  //   )
})
