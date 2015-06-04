var React = require('react');
var JSE = require('jekyll-store-engine');

var Quantity = React.createClass({
  set: function(e) {
    JSE.Actions.setItem({
      name: this.props.item.name,
      quantity: e.target.value
    });
  },
  render: function() {
    return this.props.item.purchase_option == 1 ?
            this.weightSelector() :
            <input type='number' value={this.props.item.quantity} onChange={this.set} />
  },
  weightSelector: function() {
    return (
      <div className='weight-selector'>
        <input type='number'
               value={this.props.item.quantity}
               onChange={this.set}
               step='25' />
        <span>g</span>
      </div>
   );
  }
});

module.exports = Quantity;
