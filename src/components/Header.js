import React from 'react'
import Loading from './common/loading'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../repository'
import { connect } from 'react-redux'
import {
    handleGetBasketItems,
    handleGetProducts,
} from '../actions/itemsActions'

const Header = props => {
    const { basket_count, loading } = props

    const logOut = () => {
        localStorage.removeItem('x-access-token')
    }

    const auth = isAuthenticated()

    React.useEffect(() => {
        let cart = localStorage.getItem('cart')
        if (!cart) return

        props.handleGetProducts()
        props.handleGetBasketItems(cart)
    }, [])

    return (
        <>
            {loading && <Loading />}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        EnergiaShop
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarNavAltMarkup"
                        aria-controls="navbarNavAltMarkup"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div
                        className="collapse navbar-collapse"
                        id="navbarNavAltMarkup"
                    >
                        <div className="navbar-nav">
                            <Link className="nav-item nav-link" to="/">
                                Products
                            </Link>
                            <Link className="nav-item nav-link" to="/cart">
                                Cart{' '}
                                <span className="badge badge-primary">
                                    {basket_count}
                                </span>
                            </Link>
                            {auth ? (
                                <Link
                                    className="nav-item nav-link"
                                    to="/checkout"
                                >
                                    Checkout
                                </Link>
                            ) : (
                                ''
                            )}
                            {auth ? (
                                <a
                                    className="nav-item nav-link"
                                    href="/"
                                    onClick={() => logOut()}
                                >
                                    Log out
                                </a>
                            ) : (
                                <Link
                                    className="nav-item nav-link float-right"
                                    to="/login"
                                >
                                    Log in
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}
const mapStateToProps = state => ({
    basket_count: state.app.basket_count,
    loading: state.app.loading,
})

export default connect(mapStateToProps, {
    handleGetProducts,
    handleGetBasketItems,
})(Header)
