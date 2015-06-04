var React = require('react');
var Reflux = require('reflux');
var JSE = require('jekyll-store-engine');

var AddToBasket = React.createClass({
  mixins: [
    Reflux.connect(JSE.Stores.Products),
    require('../mixins/Products')
  ],
  render: function() {
    return <ul>{this.products([this.state.products[this.props.name]])}</ul>;
  }
});

module.exports = AddToBasket;