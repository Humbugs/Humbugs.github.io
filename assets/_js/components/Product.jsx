var React = require('react');
var JSE = require('jekyll-store-engine');
var Quantity = require('./Quantity.jsx');
var money = require('../helpers/money');
var LazyLoad = require('../vendor/LazyLoad');

var Product = React.createClass({
  addToBasket: function() {
    JSE.Actions.setItem({ name: this.props.item.name, quantity: 1 });
  },
  addToFavourites: function() {
    JSE.Actions.favourite({ name: this.props.item.name });
  },
  removeFromFavourites: function() {
    JSE.Actions.removeFromFavourites({ name: this.props.item.name });
  },
  render: function() {
    var item = this.props.item;
    return (
      <li className='product'>
        <a href={'{{ site.baseurl }}' + item.url}>
          <LazyLoad>
            <img src={'{{ site.image_prefix }}' + item.image} alt={item.name} />
          </LazyLoad>
        </a>
        <div className={item.quantity ? 'details added' : 'details' }>
          <div>
            {
              item.quantity ? <Quantity item={item} /> :
                <button type='button' className='add-button' onClick={this.addToBasket}>
                  <i className='add'></i>
                  Add To Basket
                </button>
            }
            {
              item.subtotal ?
                <div className='subtotal-or-basket-link'>
                  <div className='subtotal'>{money(item.subtotal)}</div>
                  <a className='basket-link' href='{{site.baseurl}}/basket'>
                    <i className='fa-shopping-cart' />Go to Basket
                  </a>
                </div> :
                null
            }
            {
              this.props.inFavourites ?
                <i className='favourited' onClick={this.removeFromFavourites}></i> :
                <i className='favourite' onClick={this.addToFavourites}></i>
            }
          </div>
          <div className='product-name'>{item.name}</div>
          <div className='product-price'>
            {money(item.display_price)}
            { item.purchase_option == '1' ? '/100g' : null}
          </div>
        </div>
      </li>
    );
  }
});

module.exports = Product;
