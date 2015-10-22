var React = require('react');
var Reflux = require('reflux');
var JSE = require('jekyll-store-engine');
var I = require('seamless-immutable');

var TaxonomiesMenu = React.createClass({
  mixins: [Reflux.connect(JSE.Stores.Products)],

  toggleTaxonomy: function(taxonomy) {
    taxonomy = this.state.taxonomy == taxonomy ? null : taxonomy;
    this.setState({ taxonomy: taxonomy });
  },

  taxons: function() {
    var that = this;
    return Object.keys(this.state.products).reduce(function(taxons, name) {
      return taxons.concat(that.state.products[name][that.state.taxonomy] || []);
    }, []).filter(function(v, i, self) { return self.indexOf(v) === i; });
  },

  toggleTaxon: function(taxon) {
    var selected = this.selected();
    var index = selected.indexOf(taxon);
    index >= 0 ? selected.splice(index, 1) : selected.push(taxon);
    this.updateFilter(selected);
    this.state[this.state.taxonomy] = selected;
    this.setState(this.state);
  },

  selected: function(taxon) {
    return this.state[this.state.taxonomy] || [];
  },

  updateFilter: function(selected) {
    if(selected.length === 0) {
      JSE.Actions.removeDisplayFilter({ name: this.state.taxonomy });
    } else {
      JSE.Actions.setDisplayFilter({
        name: this.state.taxonomy,
        filter: JSE.Filters.Contains(this.state.taxonomy, selected)
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
        { taxons.length === 0 ? null : (
            <div id='taxons-menu'>
              <ul>
                {
                  taxons.map(function(taxon, i) {
                    return (
                      <li onClick={this.toggleTaxon.bind(this, taxon)}
                          className={selected.indexOf(taxon) >= 0 ? 'selected' : null}
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
