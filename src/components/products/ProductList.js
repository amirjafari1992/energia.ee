import React, { useEffect } from 'react'
import ProductItem from './ProductItem'
import { Link } from 'react-router-dom'
import {
    handleGetProducts,
    handleGetBasketItems,
} from '../../actions/itemsActions'
import { connect } from 'react-redux'

const ProductList = props => {
    const { products, basket_count, handleGetBasketItems } = props

    useEffect(() => {
        props.handleGetProducts()
    }, [])

    const edibleItems = products.filter(product => !product.is_donation)
    const edibleItemsHTML = edibleItems.map((product, index) => (
        <ProductItem
            handleGetBasketItems={handleGetBasketItems}
            product={product}
            key={index}
        />
    ))

    const donationItems = products.filter(product => product.is_donation)
    const donationItemsHTML = donationItems.map((product, index) => (
        <ProductItem
            handleGetBasketItems={handleGetBasketItems}
            product={product}
            key={index}
        />
    ))

    return (
        <div className="container">
            <div className="c-productItems">
                <div className="c-productItems__box mb-3">
                    <h3 className="c-productItems__title card-title">
                        Edible Items
                    </h3>
                    <div className="row">{edibleItemsHTML}</div>
                </div>
                <div className="c-productItems__box mb-3">
                    <h3 className="c-productItems__title card-title">
                        Donation Items
                    </h3>
                    <div className="row">{donationItemsHTML}</div>
                </div>
            </div>
            <Link to="/checkout">
                <button className="btn btn-success float-right">
                    Checkout
                </button>
            </Link>
            <Link to="/cart">
                <button
                    className="btn btn-primary float-right"
                    style={{ marginRight: '10px' }}
                >
                    View Cart{' '}
                    <span className="badge badge-light">{basket_count}</span>
                </button>
            </Link>
            <br />
            <br />
            <br />
        </div>
    )
}
const mapStateToProps = state => ({
    products: state.app.products,
    basket_count: state.app.basket_count,
})

export default connect(mapStateToProps, {
    handleGetProducts,
    handleGetBasketItems,
})(ProductList)
