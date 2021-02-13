
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {makeSelectSearch} from 'containers/HomePage/selectors'
import { createStructuredSelector } from 'reselect';

import {SearchInput,SearchWrapper,SearchIcon} from './Styles';
import searchImage from './images/search-icon.png'
import {
  searchChange,
  getFilterList
} from 'containers/HomePage/actions'

class Search extends React.Component {

  constructor(props){
    super()
    this.handleChangeSearch  = this.handleChangeSearch.bind(this)

  }

  handleChangeSearch(evt){
    this.props.onChangeSearch(evt.target.value)
    this.props.onSubmit()
  }

  render(){

    return (

      <SearchWrapper type={this.props.type}>
          <SearchInput 
              placeholder={this.props.text}
              onChange={this.handleChangeSearch}
          
          />
          <SearchIcon
              type={this.props.type}
              searchImage={searchImage}
          />
      </SearchWrapper>

    )
}

  
}

Search.propTypes = {
  onChangeSearch : PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  search : makeSelectSearch(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeSearch      : search => dispatch(searchChange(search)),
    onSubmit           : () => dispatch(getFilterList())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search);

