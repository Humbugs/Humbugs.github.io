var JSE = require('jekyll-store-engine');
var B = require('big.js');
var money = require('../helpers/money');

JSE.Actions.loadProducts.preEmit = function(args) {
	setDisplayPrice(args.products);
  return args;
};

function setDisplayPrice(products) {
	products.forEach(function(product) {
		product.displayPrice = money(product.price);

		if(product.purchase_option === '1') {
			product.price = +B(product.price).div(100);
			product.cost_price = +B(product.cost_price).div(100);
			product.displayPrice = product.displayPrice + '/100g';
		}
	});
}
