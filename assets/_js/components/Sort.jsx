var React = require('react');
var JSE = require('jekyll-store-engine');
var ASC = JSE.Filters.Sort.ASC;
var DESC = JSE.Filters.Sort.DESC;

var Sort = React.createClass({
  getInitialState: function() {
    this.filter(this.props.fields[0], ASC);
    return { selected: this.props.fields[0], direction: ASC }
  },
  handleClick: function(field) {
    this.state.selected !== field ?
      this.select(field, ASC) :
      this.switchDirection(field);
  },
  switchDirection: function(field) {
    this.select(field, this.state.direction === ASC ? DESC : ASC);
  },
  select: function(field, direction) {
    this.setState({ selected: field, direction: direction });
    this.filter(field, direction);
  },
  filter: function(field, direction) {
    JSE.Actions.setDisplayFilter({
      name: 'sort',
      filter: JSE.Filters.Sort(field, direction)
    });
  },
  render: function() {
    return (
      <div>
        <span id='sort-label'>Sort by:</span>
        <ul>
          {
            this.props.fields.map(function(field, i) {
              var selected = this.state.selected === field ? 'selected' : '';
              var direction = selected && this.state.direction;
              return (
                <li key={i}
                    onClick={this.handleClick.bind(this, field)}
                    className={selected}>
                  {this.props.labels[i]}
                  <i className={direction}></i>
                </li>
              );
            }, this)
          }
        </ul>
      </div>
    );
  }
});

module.exports = Sort;
