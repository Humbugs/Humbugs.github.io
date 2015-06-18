var accounting = require('accounting');

function money(amount) {
  return isNumeric(amount) && accounting.formatMoney(amount);
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}


module.exports = money;
