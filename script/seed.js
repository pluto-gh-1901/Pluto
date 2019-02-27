'use strict'

const db = require('../server/db')
const {User, Product, Order, OrderItem} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  const vegetabes = await Promise.all([
    Product.create({
      name: 'broccoli',
      imageUrl:
        'https://cdn1.medicalnewstoday.com/content/images/articles/266/266765/two-heads-of-broccoli.jpg'
    }),
    Product.create({
      name: 'carrot',
      imageUrl:
        'https://cms.splendidtable.org/sites/default/files/styles/w2000/public/ThinkstockPhotos-507126001_0.jpg?itok=_hsOnNh3'
    })
  ])

  const order = await Promise.all([
    Order.create({userId: 1, status: 'delivered'}),
    Order.create({userId: 1, status: 'cart'})
  ])
  const orderitems = await Promise.all([
    OrderItem.create({orderId: 1, productId: 1, quantity: 1}),
    OrderItem.create({orderId: 2, productId: 1, quantity: 10}),
    OrderItem.create({orderId: 2, productId: 2, quantity: 4})
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${vegetabes.length} users`)
  console.log(`seeded ${order.length} users`)
  console.log(`seeded ${orderitems.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
