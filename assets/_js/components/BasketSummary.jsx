var React = require('react');
var Reflux = require('reflux');
var JSE = require('jekyll-store-engine');
var money = require('../helpers/money');

var BasketSummary = React.createClass({
  mixins: [Reflux.connect(JSE.Stores.Order)],

  render: function() {
    var total = this.state.order.totals.price;
    return (
      <a href={this.props.link}>
        <i className='fa fa-shopping-cart'></i>
        <span>{money(total)}</span>
      </a>
    );
  }
});

module.exports = BasketSummary;
