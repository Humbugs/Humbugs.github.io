var React = require('react');
var JSE = require('jekyll-store-engine');
var money = require('../helpers/money');
var Quantity = require('./Quantity.jsx');

var BasketItem = React.createClass({
  remove: function(e) {
    JSE.Actions.removeItem({ name: this.props.item.name });
  },
  render: function() {
    var item = this.props.item;
    return (
      <tr className='product'>
        <td>
          <a href={'{{ site.baseurl }}' + item.url}>
          <h2>{item.name}</h2>
          <img src={'{{ site.image_prefix }}' + item.image} alt={item.name} />
          </a>
        </td>
        <td>
          {money(item.display_price)}
          { item.purchase_option == '1' ? '/100g' : null}
        </td>
        <td><Quantity item={item} /></td>
        <td>{money(item.subtotal)}</td>
        <td onClick={this.remove}>x</td>
      </tr>
    );
  }
});

module.exports = BasketItem;
