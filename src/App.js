import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom'

import Login from './components/Login'
import Products from './components/products/ProductList'
import Cart from './components/cart/Cart'
import Checkout from './components/Checkout'
import Header from './components/Header'
import store from './store'
import { isAuthenticated } from './repository'

const App = props => {
    const auth = isAuthenticated()

    return (
        <Provider store={store}>
            <Router>
                <div>
                    <Header />
                    <div className="container">
                        <br />
                        <Route exact path="/" component={Products} />
                        <Route exact path="/cart" component={Cart} />
                        <Route exact path="/checkout" component={Checkout} />
                        {!auth ? (
                            <Route exact path="/login" component={Login} />
                        ) : (
                            <Redirect to="/" />
                        )}
                    </div>
                </div>
            </Router>
        </Provider>
    )
}

export default App
