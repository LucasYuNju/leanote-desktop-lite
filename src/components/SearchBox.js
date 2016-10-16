import React, { Component, PropTypes } from 'react';

import Icon from '../components/Icon';

class SearchBox extends Component {
  static propTypes = {
    placeholder: PropTypes.string,
    search: PropTypes.func,
  };

  static defaultProps = {
    placeholder: 'Search...',
  };
  
  state = {
    input: '',
  }

  handleInputChange = (event) => {
    this.setState({
      input: e.target.value,
    });
  }

  render() {
    return (
      <div className="search-wrapper">
        <Icon
          iconName="magnifying-glass"
        />
        <input
          type="search"
          placeholder={this.props.placeholder}
          value={this.state.input}
          onChange={this.handleInputChange}
        />
      </div>
    );
  }
}

export default SearchBox;
