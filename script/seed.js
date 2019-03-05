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
      cardNumber: '1234567890120984',
      legalName: 'Cody',
      shipping: 'NY, New York'
    }),
    User.create({
      email: 'murphy@email.com',
      password: '123',
      cardNumber: '1234567890114759',
      legalName: 'Andy',
      shipping: 'IL, Chicago'
    })
  ])

  const vegetabes = await Promise.all([
    Product.create({
      name: 'Broccoli',
      imageUrl:
        'https://www.producemarketguide.com/sites/default/files/Commodities.tar/Commodities/broccoli_commodity-page.png',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam molestie nisl id egestas dignissim. Nullam turpis lorem, malesuada vitae fringilla a, pharetra maximus nibh. Sed id lectus ac mauris venenatis vulputate in nec erat. Pellentesque fringilla, ligula congue tempus molestie, ipsum nisl rhoncus ante, a sagittis sapien urna efficitur lectus. Vestibulum sollicitudin pharetra elit, a bibendum nibh feugiat id. Praesent efficitur, lorem non aliquet varius, tellus velit efficitur massa, et aliquam mi tortor at massa. Integer quis lacus ac risus hendrerit laoreet. Sed eu mauris pellentesque, pulvinar eros nec, viverra nulla. Vestibulum a ultricies ex. Integer bibendum ac enim non aliquet. Pellentesque aliquam ante vitae interdum eleifend.',
      inventory: 8,
      price: 799,
      tags: ['vegetable']
    }),
    Product.create({
      name: 'Carrot',
      imageUrl:
        'https://purepng.com/public/uploads/large/purepng.com-carrotscarrotvegetablesfreshdeliciousefoodhealthycarrots-481521740717jmglq.png',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam molestie nisl id egestas dignissim. Nullam turpis lorem, malesuada vitae fringilla a, pharetra maximus nibh. Sed id lectus ac mauris venenatis vulputate in nec erat. Pellentesque fringilla, ligula congue tempus molestie, ipsum nisl rhoncus ante, a sagittis sapien urna efficitur lectus. Vestibulum sollicitudin pharetra elit, a bibendum nibh feugiat id. Praesent efficitur, lorem non aliquet varius, tellus velit efficitur massa, et aliquam mi tortor at massa. Integer quis lacus ac risus hendrerit laoreet. Sed eu mauris pellentesque, pulvinar eros nec, viverra nulla. Vestibulum a ultricies ex. Integer bibendum ac enim non aliquet. Pellentesque aliquam ante vitae interdum eleifend.',
      inventory: 6,
      price: 269,
      tags: ['vegetable']
    }),
    Product.create({
      name: 'Tomato',
      imageUrl:
        'http://www.petersfruit.com/application/files/6214/4623/8977/featured-vegetables-01.jpg',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam molestie nisl id egestas dignissim. Nullam turpis lorem, malesuada vitae fringilla a, pharetra maximus nibh. Sed id lectus ac mauris venenatis vulputate in nec erat. Pellentesque fringilla, ligula congue tempus molestie, ipsum nisl rhoncus ante, a sagittis sapien urna efficitur lectus. Vestibulum sollicitudin pharetra elit, a bibendum nibh feugiat id. Praesent efficitur, lorem non aliquet varius, tellus velit efficitur massa, et aliquam mi tortor at massa. Integer quis lacus ac risus hendrerit laoreet. Sed eu mauris pellentesque, pulvinar eros nec, viverra nulla. Vestibulum a ultricies ex. Integer bibendum ac enim non aliquet. Pellentesque aliquam ante vitae interdum eleifend.',
      inventory: 30,
      price: 599,
      tags: ['berry']
    }),
    Product.create({
      name: 'Strawberries',
      imageUrl: 'http://pngimg.com/uploads/strawberry/strawberry_PNG2601.png',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam molestie nisl id egestas dignissim. Nullam turpis lorem, malesuada vitae fringilla a, pharetra maximus nibh. Sed id lectus ac mauris venenatis vulputate in nec erat. Pellentesque fringilla, ligula congue tempus molestie, ipsum nisl rhoncus ante, a sagittis sapien urna efficitur lectus. Vestibulum sollicitudin pharetra elit, a bibendum nibh feugiat id. Praesent efficitur, lorem non aliquet varius, tellus velit efficitur massa, et aliquam mi tortor at massa. Integer quis lacus ac risus hendrerit laoreet. Sed eu mauris pellentesque, pulvinar eros nec, viverra nulla. Vestibulum a ultricies ex. Integer bibendum ac enim non aliquet. Pellentesque aliquam ante vitae interdum eleifend.',
      inventory: 23,
      price: 429,
      tags: ['berry']
    }),
    Product.create({
      name: 'Grapefruit',
      imageUrl:
        'https://www.yourlocalfruitshop.com.au/wp-content/uploads/2016/10/grapefruit.jpg',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam molestie nisl id egestas dignissim. Nullam turpis lorem, malesuada vitae fringilla a, pharetra maximus nibh. Sed id lectus ac mauris venenatis vulputate in nec erat. Pellentesque fringilla, ligula congue tempus molestie, ipsum nisl rhoncus ante, a sagittis sapien urna efficitur lectus. Vestibulum sollicitudin pharetra elit, a bibendum nibh feugiat id. Praesent efficitur, lorem non aliquet varius, tellus velit efficitur massa, et aliquam mi tortor at massa. Integer quis lacus ac risus hendrerit laoreet. Sed eu mauris pellentesque, pulvinar eros nec, viverra nulla. Vestibulum a ultricies ex. Integer bibendum ac enim non aliquet. Pellentesque aliquam ante vitae interdum eleifend.',
      inventory: 6,
      price: 499,
      tags: ['fruit']
    }),
    Product.create({
      name: 'Pineapple',
      imageUrl:
        'https://www.pngarts.com/files/3/Pineapple-PNG-Image-Background.png',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam molestie nisl id egestas dignissim. Nullam turpis lorem, malesuada vitae fringilla a, pharetra maximus nibh. Sed id lectus ac mauris venenatis vulputate in nec erat. Pellentesque fringilla, ligula congue tempus molestie, ipsum nisl rhoncus ante, a sagittis sapien urna efficitur lectus. Vestibulum sollicitudin pharetra elit, a bibendum nibh feugiat id. Praesent efficitur, lorem non aliquet varius, tellus velit efficitur massa, et aliquam mi tortor at massa. Integer quis lacus ac risus hendrerit laoreet. Sed eu mauris pellentesque, pulvinar eros nec, viverra nulla. Vestibulum a ultricies ex. Integer bibendum ac enim non aliquet. Pellentesque aliquam ante vitae interdum eleifend.',
      inventory: 8,
      price: 699,
      tags: ['fruit']
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${vegetabes.length} vegetabes`)
  // console.log(`seeded ${order.length} order`)
  // console.log(`seeded ${orderitems.length} orderitems`)
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
