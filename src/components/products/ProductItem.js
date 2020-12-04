import React from 'react'
import './styles/productItem.scss'

export default class ProductItem extends React.Component {
    constructor(props) {
        super(props)
        const cart = localStorage.getItem('cart')
            ? JSON.parse(localStorage.getItem('cart'))
            : 1

        this.state = {
            cart,
            error: '',
            quantity: cart[this.props.product._id]
                ? cart[this.props.product._id]
                : 1,
        }
    }

    handleInputChange = event =>
        this.setState({ [event.target.name]: event.target.value })

    addToCart = () => {
        const { quantity } = this.state
        const { available_quantity, _id } = this.props.product

        this.setState({ error: '' })

        if (quantity >= 1 && quantity <= available_quantity) {
            let cart = localStorage.getItem('cart')
                ? JSON.parse(localStorage.getItem('cart'))
                : {}
            let id = _id.toString()
            cart[id] = cart[id] ? cart[id] : 0
            let qty = cart[id] + parseInt(this.state.quantity)
            if (available_quantity < qty) {
                cart[id] = available_quantity
            } else {
                cart[id] = qty
            }
            localStorage.setItem('cart', JSON.stringify(cart))
            this.props.handleGetBasketItems()
        } else {
            this.setState({
                error: `please add a valid number between 1 and ${available_quantity}`,
            })
        }
    }

    render() {
        const { product } = this.props
        const { quantity, error } = this.state

        return (
            <div className="col-lg-4 col-md-6 col-12 mb-3">
                <div className="c-productItem card">
                    <div className="c-productItem__wrap card-body">
                        <h4 className="c-productItem__title card-title">
                            {product.name}
                        </h4>
                        <p className="c-productItem__text card-text">
                            {product.description}
                        </p>
                        <h5 className="c-productItem__text card-text">
                            <small>price: </small>
                            {product.available_quantity > 0 ? (
                                `€ ${product.price}`
                            ) : (
                                <span className="badge badge-danger">
                                    {' '}
                                    product is out of stock{' '}
                                </span>
                            )}
                        </h5>
                        <div className="c-productItem__text card-text">
                            <small>Available Quantity: </small>
                            {product.available_quantity}
                        </div>

                        {product.available_quantity > 0 && (
                            <React.Fragment>
                                <div>
                                    <button
                                        className="btn btn-sm btn-success float-right"
                                        onClick={this.addToCart}
                                    >
                                        Add to cart
                                    </button>
                                    <input
                                        type="number"
                                        value={quantity}
                                        name="quantity"
                                        onChange={this.handleInputChange}
                                        className="float-right"
                                        max={
                                            this.props.product
                                                .available_quantity
                                        }
                                        min="1"
                                        style={{
                                            width: '60px',
                                            marginRight: '10px',
                                            borderRadius: '3px',
                                        }}
                                    />
                                </div>
                                {error && (
                                    <div className="alert alert-danger mt-5">
                                        {error}
                                    </div>
                                )}
                            </React.Fragment>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}
