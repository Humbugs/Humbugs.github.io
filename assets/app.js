---
---

{% include_relative _js/compiled.js %}

// Settings
accounting.settings.currency = {{ site.accounting | replace: '=>', ':' }};
PAYMILL_PUBLIC_KEY = '{{ site.paymillPublicKey }}';
JSE.Actions.setTrackingId({ id: '{{ site.tracking_id }}' });
JSE.Actions.setPaymentOptions({{ site.payment | replace: '=>', ':' }});
JSE.Actions.setPackHook({ hook: 'http://127.0.0.1:4567/pack' });

// Data
loadJSON('{{ site.baseurl }}/products.json', function(products){
  JSE.Actions.loadProducts({ products: products });
});

JSE.Actions.loadCountries({
  countries: {{ site.data.countries | replace: '=>', ':' }}
});

JSE.Actions.loadDeliveryMethods({
  methods: {{ site.data.delivery-methods | replace: '=>', ':' }}
});
