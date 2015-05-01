var renderComponent = require('./helpers/renderComponent');

// Layout
renderComponent('basket-summary', require('./components/BasketSummary.jsx'));

// Index
renderComponent('taxonomies', require('./components/TaxonomiesMenu.jsx'));
renderComponent('search', require('./components/SearchBox.jsx'));
renderComponent('sort', require('./components/Sort.jsx'));
renderComponent('display', require('./components/Display.jsx'));
renderComponent('pagination', require('./components/Pagination.jsx'));

// Product
renderComponent('addToBasket', require('./components/AddToBasket.jsx'));
renderComponent('visited', require('./components/Visited.jsx'));

// Basket
renderComponent('basket-page', require('./components/Basket.jsx'));

// Checkout
renderComponent('errors', require('./components/Errors.jsx'));
renderComponent('countries', require('./components/CountriesSelect.jsx'));
renderComponent('delivery', require('./components/DeliverySelect.jsx'));
renderComponent('card', require('./components/Card.jsx'));
renderComponent('order-summary', require('./components/OrderSummary.jsx'));

// Favourites
renderComponent('favourites', require('./components/Favourites.jsx'));
