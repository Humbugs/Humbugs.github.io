var B = require('big.js');
var JSE = require('jekyll-store-engine');
var t = JSE.Stores.Basket;
var m = JSE.Utils.mapping;

t.subscriptions[1].stop();
t.listenTo(JSE.Actions.setItem, setItem);

function setItem(args) {
  var item = t.basket[args.name] || t.products[args.name];
  var previousQuantity = item.quantity || 0;

  if(item.purchase_option === '1') {
    if(0 < args.quantity && args.quantity < 100) {
      args.quantity = previousQuantity >= 100 ? 0 : 100;
    }
  }

  var subtotal = +B(item.price).times(args.quantity);
  item = item.merge({ quantity: args.quantity, subtotal: subtotal });
  t.basket = t.basket.merge(m(args.name, item));
  t.update();
}