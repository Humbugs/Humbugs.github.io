var JSE = require('jekyll-store-engine');
var SuperAgent = require('superagent');

if(document.getElementById('basket-page')) {
  JSE.Actions.checkoutStep({ step: 1 });
  SuperAgent.get('{{ site.wake_up }}').end();
}
