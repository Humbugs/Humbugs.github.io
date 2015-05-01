var React = require('react');
var Reflux = require('reflux');
var JSE = require('jekyll-store-engine');
var I = require('immutable');

var TaxonomiesMenu = React.createClass({
  mixins: [Reflux.connect(JSE.Stores.Products)],
  toggleTaxonomy: function(taxonomy) {
    taxonomy = this.state.taxonomy == taxonomy ? null : taxonomy;
    this.setState({ taxonomy: taxonomy });
  },
  taxons: function() {
    return this.state.products.reduce(function(taxons, product) {
      return taxons.merge(product.get(this.state.taxonomy) || []);
    }, I.Set(), this);
  },
  toggleTaxon: function(taxon) {
    var selected = this.selected();
    selected = selected.has(taxon) ? selected.delete(taxon) : selected.add(taxon);
    this.updateFilter(selected);
    this.state[this.state.taxonomy] = selected;
    this.setState(this.state);
  },
  selected: function(taxon) {
    return this.state[this.state.taxonomy] || I.Set();
  },
  updateFilter: function(selected) {
    if(selected.isEmpty()) {
      JSE.Actions.removeDisplayFilter({ name: this.state.taxonomy });
    } else {
      JSE.Actions.setDisplayFilter({
        name: this.state.taxonomy,
        filter: JSE.Filters.Contains(this.state.taxonomy, selected.toJS())
      });
    }
  },
  render: function() {
    var taxons = this.taxons().sort();
    var selected = this.selected();
    return (
      <div>
        <div id='taxonomies-menu'>
          <ul>
            {
              this.props.taxonomies.map(function(taxonomy, i) {
                return (
                  <li onClick={this.toggleTaxonomy.bind(this, taxonomy)}
                      className={this.state.taxonomy == taxonomy ? 'selected' : null}
                      key={i}>
                    {this.props.labels[i]}
                  </li>
                );
              }, this)
            }
          </ul>
        </div>
        { taxons.isEmpty() ? null : (
            <div id='taxons-menu'>
              <ul>
                {
                  taxons.map(function(taxon, i) {
                    return (
                      <li onClick={this.toggleTaxon.bind(this, taxon)}
                          className={selected.has(taxon) ? 'selected' : null}
                          key={i}>
                        {taxon}
                      </li>
                    );
                  }, this)
                }
              </ul>
            </div>
          )
        }
      </div>
    );
  }
});

module.exports = TaxonomiesMenu;