var React = require('react');
var JSE = require('jekyll-store-engine');

var Product = React.createClass({
  addToBasket: function() {
    JSE.Actions.setItem({ name: this.props.product.get('name'), quantity: 1 });
  },
  addToFavourites: function() {
    JSE.Actions.favourite({ name: this.props.product.get('name') });
  },
  removeFromFavourites: function() {
    JSE.Actions.removeFromFavourites({ name: this.props.product.get('name') });
  },
  render: function() {
    var product = this.props.product.toJS();
    return (
      <li className='product'>
        <a href={'{{ site.baseurl }}' + product.url}>
          <img src={'{{ site.image_prefix }}' + product.image} alt={product.name} />
        </a>
        <div className={this.props.inBasket ? 'details added' : 'details' }>
          <div>{product.name} - {product.displayPrice}</div>
          <div className='details-buttons'>
            {
              this.props.inBasket ?
                <i className='added'></i> :
                <i className='add' onClick={this.addToBasket}></i>
            }
            {
              this.props.inFavourites ?
                <i className='favourited' onClick={this.removeFromFavourites}></i> :
                <i className='favourite' onClick={this.addToFavourites}></i>
            }
          </div>
        </div>
      </li>
    );
  }
});

module.exports = Product;
