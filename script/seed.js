'use strict'

const db = require('../server/db')
const {User, Product, Order, OrderItem} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      email: 'cody@email.com',
      password: '123',
      cardNumber: '1234567890120984'
    }),
    User.create({
      email: 'murphy@email.com',
      password: '123',
      cardNumber: '1234567890114759'
    })
  ])

  const vegetabes = await Promise.all([
    Product.create({
      name: 'broccoli',
      imageUrl:
        'https://www.producemarketguide.com/sites/default/files/Commodities.tar/Commodities/broccoli_commodity-page.png',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam molestie nisl id egestas dignissim. Nullam turpis lorem, malesuada vitae fringilla a, pharetra maximus nibh. Sed id lectus ac mauris venenatis vulputate in nec erat. Pellentesque fringilla, ligula congue tempus molestie, ipsum nisl rhoncus ante, a sagittis sapien urna efficitur lectus. Vestibulum sollicitudin pharetra elit, a bibendum nibh feugiat id. Praesent efficitur, lorem non aliquet varius, tellus velit efficitur massa, et aliquam mi tortor at massa. Integer quis lacus ac risus hendrerit laoreet. Sed eu mauris pellentesque, pulvinar eros nec, viverra nulla. Vestibulum a ultricies ex. Integer bibendum ac enim non aliquet. Pellentesque aliquam ante vitae interdum eleifend.',
      inventory: 8,
      price: 7.99,
      tags: ['vegetable']
    }),
    Product.create({
      name: 'carrot',
      imageUrl:
        'https://cms.splendidtable.org/sites/default/files/styles/w2000/public/ThinkstockPhotos-507126001_0.jpg?itok=_hsOnNh3',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam molestie nisl id egestas dignissim. Nullam turpis lorem, malesuada vitae fringilla a, pharetra maximus nibh. Sed id lectus ac mauris venenatis vulputate in nec erat. Pellentesque fringilla, ligula congue tempus molestie, ipsum nisl rhoncus ante, a sagittis sapien urna efficitur lectus. Vestibulum sollicitudin pharetra elit, a bibendum nibh feugiat id. Praesent efficitur, lorem non aliquet varius, tellus velit efficitur massa, et aliquam mi tortor at massa. Integer quis lacus ac risus hendrerit laoreet. Sed eu mauris pellentesque, pulvinar eros nec, viverra nulla. Vestibulum a ultricies ex. Integer bibendum ac enim non aliquet. Pellentesque aliquam ante vitae interdum eleifend.',
      inventory: 6,
      price: 2.69,
      tags: ['vegetable']
    }),
    Product.create({
      name: 'tomato',
      imageUrl:
        'http://www.petersfruit.com/application/files/6214/4623/8977/featured-vegetables-01.jpg',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam molestie nisl id egestas dignissim. Nullam turpis lorem, malesuada vitae fringilla a, pharetra maximus nibh. Sed id lectus ac mauris venenatis vulputate in nec erat. Pellentesque fringilla, ligula congue tempus molestie, ipsum nisl rhoncus ante, a sagittis sapien urna efficitur lectus. Vestibulum sollicitudin pharetra elit, a bibendum nibh feugiat id. Praesent efficitur, lorem non aliquet varius, tellus velit efficitur massa, et aliquam mi tortor at massa. Integer quis lacus ac risus hendrerit laoreet. Sed eu mauris pellentesque, pulvinar eros nec, viverra nulla. Vestibulum a ultricies ex. Integer bibendum ac enim non aliquet. Pellentesque aliquam ante vitae interdum eleifend.',
      inventory: 30,
      price: 5.99,
      tags: ['berry']
    }),
    Product.create({
      name: 'strawberries',
      imageUrl:
        'https://images.heb.com/is/image/HEBGrocery/article-250/Fruit-and-Vegetable-Sources-2.jpg',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam molestie nisl id egestas dignissim. Nullam turpis lorem, malesuada vitae fringilla a, pharetra maximus nibh. Sed id lectus ac mauris venenatis vulputate in nec erat. Pellentesque fringilla, ligula congue tempus molestie, ipsum nisl rhoncus ante, a sagittis sapien urna efficitur lectus. Vestibulum sollicitudin pharetra elit, a bibendum nibh feugiat id. Praesent efficitur, lorem non aliquet varius, tellus velit efficitur massa, et aliquam mi tortor at massa. Integer quis lacus ac risus hendrerit laoreet. Sed eu mauris pellentesque, pulvinar eros nec, viverra nulla. Vestibulum a ultricies ex. Integer bibendum ac enim non aliquet. Pellentesque aliquam ante vitae interdum eleifend.',
      inventory: 23,
      price: 4.2,
      tags: ['berry']
    }),
    Product.create({
      name: 'grapefruit',
      imageUrl:
        'https://www.yourlocalfruitshop.com.au/wp-content/uploads/2016/10/grapefruit.jpg',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam molestie nisl id egestas dignissim. Nullam turpis lorem, malesuada vitae fringilla a, pharetra maximus nibh. Sed id lectus ac mauris venenatis vulputate in nec erat. Pellentesque fringilla, ligula congue tempus molestie, ipsum nisl rhoncus ante, a sagittis sapien urna efficitur lectus. Vestibulum sollicitudin pharetra elit, a bibendum nibh feugiat id. Praesent efficitur, lorem non aliquet varius, tellus velit efficitur massa, et aliquam mi tortor at massa. Integer quis lacus ac risus hendrerit laoreet. Sed eu mauris pellentesque, pulvinar eros nec, viverra nulla. Vestibulum a ultricies ex. Integer bibendum ac enim non aliquet. Pellentesque aliquam ante vitae interdum eleifend.',
      inventory: 6,
      price: 4.99,
      tags: ['fruit']
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
