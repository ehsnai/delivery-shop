
import React from 'react';
import PropTypes from 'prop-types';
import {ButtonWrapper,ButtonIcon,ButtonText,ButtonImg,ButtomIconWrapper} from './Styles';

import {
  filterStrainAdd,
  filterStrainRemove,
  filterAdditionalAdd,
  filterAdditionalRemove,
  filterCategoryAdd,
  filterCategoryRemove,
  getFilterList
} from 'containers/HomePage/actions'

import {makeSelectStrains,makeSelectAdditional} from 'containers/HomePage/selectors'
import { createStructuredSelector } from 'reselect';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';

class FilterButton extends React.Component {

  constructor(props){
    super()
    this.handleStrainsFilter = this.handleStrainsFilter.bind(this)
    this.handleAdditionalFilter = this.handleAdditionalFilter.bind(this)
    this.handleCategoryFilter  = this.handleCategoryFilter.bind(this)
  }

  handleStrainsFilter(evt){
    
    if(evt.target.checked === true){
      const strains = evt.target.value
      this.props.onStrainsCheck({strains})

    }
    if(evt.target.checked === false){
      const strains = evt.target.value
      this.props.onStrainsRemove({strains})  
    }
    this.props.onSubmit()
  }

  handleAdditionalFilter(evt){
    
    if(evt.target.checked === true){
      const additional = evt.target.value
      this.props.onAdditionalCheck({additional})
    }
    if(evt.target.checked === false){
      const additional = evt.target.value
      this.props.onAdditionalRemove({additional})  
    }
    
    this.props.onSubmit()
  }

  handleCategoryFilter(evt){
    
    if(evt.target.checked === true){
      const category = evt.target.value
      this.props.onCategoryCheck({category})
    }
    if(evt.target.checked === false){
      const category = evt.target.value
      this.props.onCategoryRemove({category})  
    }
    
    this.props.onSubmit()
  }

  render(){

    if(this.props.group == "categoris"){

      let status = 'inactive'
      let index = this.props.filters.filterBy.category.indexOf(this.props.text)

      if (index !== -1) {
        status = 'active'
      }

      return (
      <ButtonWrapper 
        for={this.props.text}
        status = { status }
        >
          <input 
            id={`${this.props.text}`} 
            className="filterCheckbox" 
            type="checkbox" 
            value={this.props.text} 
            onChange={this.handleCategoryFilter}
            key= {this.props.key}
          />

          <ButtonIcon >
    
            <ButtomIconWrapper>
              <ButtonImg src={this.props.icon} />
              <ButtonText>{this.props.text}</ButtonText>
            </ButtomIconWrapper>
          </ButtonIcon>
        </ButtonWrapper>
      )  
    }
  
    else if (this.props.group == 'strains'){

      let status = 'inactive'
      let index = this.props.filters.filterBy.type.indexOf(this.props.text)

      if (index !== -1) {
        status = 'active'
      }

      return (
        <ButtonWrapper
        for={this.props.text}
        status = { status }
        >
          <input 
            id={`${this.props.text}`} 
            className="filterCheckbox" 
            type="checkbox" 
            value={this.props.text} 
            onChange={this.handleStrainsFilter}
            key= {this.props.key}
          />
          <ButtonIcon >
              <ButtonText>{this.props.text}</ButtonText>
          </ButtonIcon>
        </ButtonWrapper>
      )  
      
    }

    else if(this.props.group == 'additional'){

      let status = 'inactive'
      let index = this.props.filters.filterBy.additional.indexOf(this.props.text)

      if (index !== -1) {
        status = 'active'
      }

      return (
        <ButtonWrapper
        for={this.props.text}
        status = { status }
        >
          <input 
            id={`${this.props.text}`} 
            className="filterCheckbox" 
            type="checkbox" 
            value={this.props.text} 
            onChange={this.handleAdditionalFilter}
            key= {this.props.key}
          />
          <ButtonIcon >
              <ButtonText>{this.props.text}</ButtonText>
          </ButtonIcon>
        </ButtonWrapper>

      )

    }
  
  }
  
  }

// We require the use of src and alt, only enforced by react in dev mode
FilterButton.propTypes = {
  src: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  alt: PropTypes.string,
  className: PropTypes.string,
  key: PropTypes.string,
  onStrainsCheck: PropTypes.func,
  onStrainsRemove: PropTypes.func,
  onAdditionalCheck: PropTypes.func,
  onAdditionalRemove: PropTypes.func,
  onCategoryCheck: PropTypes.func,
  onCategoryRemove: PropTypes.func,
  onStraionSubmitnsClick: PropTypes.func,
  filters:PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  strains : makeSelectStrains(),
  additional : makeSelectAdditional(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onStrainsCheck     : strain => dispatch(filterStrainAdd(strain)),
    onStrainsRemove    : strain => dispatch(filterStrainRemove(strain)),
    onAdditionalCheck  : additional => dispatch(filterAdditionalAdd(additional)),
    onAdditionalRemove : additional => dispatch(filterAdditionalRemove(additional)),
    onCategoryCheck  : category => dispatch(filterCategoryAdd(category)),
    onCategoryRemove : category => dispatch(filterCategoryRemove(category)),
    onSubmit           : () => dispatch(getFilterList())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FilterButton);


