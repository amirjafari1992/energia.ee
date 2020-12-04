const mongoose = require('mongoose')

///////////////////////////////
// MongoDB connection
///////////////////////////////

mongoose
    .connect(
        'mongodb+srv://admin:7ljgXEISxf67512G@cluster.ya2nh.mongodb.net/energia?retryWrites=true&w=majority'
    )
    .then(() => console.log('conneted to mongoose'))
    .catch(err => console.error('Could not connect to DB', err))

///////////////////////////////
// Schema
///////////////////////////////

//product
const productSchema = new mongoose.Schema({
    name: String,
    available_quantity: Number,
    price: Number,
    description: String,
    is_donation: Boolean,
})

//user
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: String,
})

//order
const orderSchema = new mongoose.Schema({
    username: String,
    user_id: String,
    items: Array,
})

///////////////////////////////
// Model
///////////////////////////////

const Product = mongoose.model('Product', productSchema)
const User = mongoose.model('User', userSchema)
const Order = mongoose.model('Order', orderSchema)

///////////////////////////////
// sample functions for creating user and product on the database
///////////////////////////////

async function createProduct() {
    const product = new Product({
        name: 'Toy',
        available_quantity: 30,
        price: 1,
        description: 'some text...',
        is_donation: true,
    })

    const result = await product.save()
    console.log(result)
}

async function createUser() {
    const user = new User({
        username: 'demo',
        password: '1234',
    })

    try {
        const result = await user.save()
        console.log(result)
    } catch (err) {
        console.log('there is some problem', err)
    }
}

exports.Product = Product
exports.User = User
exports.Order = Order
