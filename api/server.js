'use strict'

const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const cors = require('cors')
const bodyParser = require('body-parser')
const { Product } = require('./db')
const { User } = require('./db')
const { Order } = require('./db')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

///////////////////////////////
// Getting the product items
///////////////////////////////

app.get('/api/products', async (req, res) => {
    const products = await Product.find()
    res.send(products)
})

///////////////////////////////
// Updating the products amount and submiting the order
///////////////////////////////

app.put('/api/products', async (req, res) => {
    const { items, username, user_id } = req.body
    const test = []

    for (var i = 0; i < items.length; i++) {
        Product.findByIdAndUpdate(
            obj._id,
            {
                $set: {
                    available_quantity: 45,
                },
            },
            { new: true }
        )
    }
    const newOrder = new Order({
        username: req.body.username,
        user_id: req.body.user_id,
        items: req.body.items,
    })

    const result = await newOrder.save()
    res.send(result)
})

///////////////////////////////
// Getting the basket items
///////////////////////////////

app.post('/api/products', async (req, res) => {
    const items = await Product.find()
    let products = [],
        id = null
    let cart = JSON.parse(req.body.cart)
    if (!cart) return res.json(products)
    for (var i = 0; i < items.length; i++) {
        id = items[i]._id.toString()
        if (cart.hasOwnProperty(id)) {
            const newData = {
                ...items[i]._doc,
                qty: cart[id],
            }
            products.push(newData)
        }
    }
    return res.json(products)
})

///////////////////////////////
/// Authentication
///////////////////////////////

app.post('/api/auth', async (req, res) => {
    let user = await User.find({
        username: req.body.username,
        password: req.body.password,
    })
    if (user.length) {
        // create a token using user name and password vaild for 2 hours
        let token_payload = {
            name: user[0].username,
            password: user[0].password,
        }
        let token = jwt.sign(token_payload, 'jwt_secret_password', {
            expiresIn: '2h',
        })
        let response = {
            message: 'Token Created, Authentication Successful!',
            token: token,
        }
        // return the information including token as JSON
        return res.status(200).json(response)
    } else {
        return res
            .status('409')
            .json(`Authentication failed. ${req.body.username} not found.`)
    }
})

const PORT = 5000
app.listen(PORT)
console.log('api runnging on port ' + PORT + ': ')
