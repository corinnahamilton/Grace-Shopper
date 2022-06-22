import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteFromCartThunk, getCartThunk,checkoutCartThunk } from '../store/cart';
import EditCart from './EditCart';
import { Button } from "@material-ui/core";
import { Wrapper } from "./Cart.styles";


class Cart extends React.Component {
  constructor() {
    super();
    this.state = {
      total: 0,
      slogan:''
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.props.getCart();
  }

  handleClick(cartId, productId) {
    this.props.deleteFromCart(cartId, productId);
  }
  handleSubmit(cartId) {
    this.props.checkoutCart(cartId);
    this.setState({ slogan: 'Thanks' });
    // this.props.getCart();
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      const products = this.props.products;
      const qty = this.props.cartProduct.map((product) => {
        return product.quantity;
      });

      if (products) {
        const prices = this.props.products.map((product) => {
          return product.price;
        });

        let pricesQty = [];
        for (var i = 0; i < prices.length; i++) {
          pricesQty.push(prices[i] * qty[i]);
        }

        let total = pricesQty.reduce((partialSum, a) => partialSum + a, 0);
        this.setState({ total: total });
      }
    }
  }

  render() {
    const cartProducts = this.props.products;

    return (
     
      <div>
        {cartProducts ? (
          <div>
            <h1>My Cart</h1>
            <div>
              {cartProducts.map((product) => {
                return (
                  <div key={product.id}>
                  <Wrapper>
                    
                    
                    <img src={product.imageURL} width='120' />
                    <h3>
                    <span>
                      {product.brandName} {product.productName}{' '}
                    </span>
                    <span>${product.price}</span>
                    
                    <Button
                      size="medium"
                      variant="contained"
                      color='default'
                      type='button'
                      value={product.id}
                      onClick={() =>
                        this.handleClick(this.props.cart.id, product.id)
                      }
                    >
                      Remove
                    </Button>
                    </h3>
                    <EditCart
                      productId={product.id}
                      cartId={this.props.cart.id}
                    />
                    </Wrapper>
                  </div>
                );
              })}
            </div>
            <h3>Total Price: ${this.state.total}</h3>
            <Link to={`/cart/checkout/${this.props.cart.id}`}>
              <Button 
               size='medium'
               variant="contained"
               color='secondary'
              onClick={()=>this.handleSubmit(this.props.cart.id)}>
                Checkout
              </Button>
            </Link>
          </div>
        ) : (
          <h1>Your Cart is Empty!</h1>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.cartReducer.products,
    user: state.user,
    cart: state.cartReducer,
    cartProduct: state.cartProductReducer,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getCart: () => dispatch(getCartThunk()),
  deleteFromCart: (cartId, productId) =>
    dispatch(deleteFromCartThunk(cartId, productId)),
  checkoutCart: (cartId)=>dispatch(checkoutCartThunk(cartId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
