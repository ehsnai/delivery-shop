
import React from 'react';
import PropTypes from 'prop-types';
import {FilterWrapper,FilterTitle,ColButton,RowButton,ClearButton,ClearWrapper,ClearInner,WrapperX} from './Styles';
import FilterButton from '../filterButton'
import {Row,Col,FormGroup, Label, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import { connect } from 'react-redux';
import Search from 'components/search'
import {
  sortChange,
  getFilterList,
  filterClear,
  
} from 'containers/HomePage/actions'
import {makeSelectStrains,makeSelectAdditional} from 'containers/HomePage/selectors'
import { createStructuredSelector } from 'reselect';
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";

import others from '../../images/others.png'
import shoe from '../../images/shoe.png'
import care from '../../images/care.png'
import jeans from '../../images/jeans.png'
import tshirt from '../../images/t-shirt.png'
import pijama from '../../images/pijama.png'
import socks from '../../images/socks.png'
import sport from '../../images/sport.png'





class Filter extends React.Component{

  constructor(props){
    super()

    this.handleSelect = this.handleSelect.bind(this)
    this.handleClear  = this.handleClear.bind(this)
  }


  handleSelect (evt) {

    const sort = evt.target.value
    const sDesc =''

    this.props.onChangeSort({sort,sDesc})  
    this.props.onSubmit()

  }

  handleClear(){
    this.props.onFilterClear()  
    this.props.onSubmit()
  }

  render(){

    return (

      <React.Fragment>

      <FilterWrapper id="filterWrapper">
        
        <WrapperX>

          <BrowserView>
            <Search
                text={this.props.searchText}
            />

          </BrowserView>

          <FilterTitle>GENDER</FilterTitle>

          <RowButton>

            <ColButton>
              <FilterButton
              icon=''
              text="man"
              key="filter-1"
              filters={this.props.filters}
              group = 'strains'
              />
            </ColButton>
            <ColButton>
              <FilterButton
                icon=''
                text="woman"
                key="filter-2"
                filters={this.props.filters}
                group = 'strains'

              />
            </ColButton>
            <ColButton>
              <FilterButton
                icon=''
                text="kid"
                key="filter-3"
                filters={this.props.filters}
                group = 'strains'

              />
            </ColButton>

          </RowButton>


          <FilterTitle className="mt-3">CATEGORIES</FilterTitle>

          <RowButton>
            <ColButton>
              <FilterButton
              icon={tshirt}
              text="t-shirt"
              key="filter-4"
              filters={this.props.filters}
              group = 'categoris'

              />
          </ColButton>
            <ColButton>
            <FilterButton
              icon={jeans}
              text="jean"
              key="filter-5"
              filters={this.props.filters}
              group = 'categoris'

              />
            </ColButton>
            
          </RowButton>

          <RowButton>
            <ColButton>
              <FilterButton
              icon={shoe}
              text="shoe"
              key="filter-6"
              filters={this.props.filters}
              group = 'categoris'

              />
          </ColButton>
            <ColButton>
            <FilterButton
              icon={care}
              text="care"
              key="filter-7"
              filters={this.props.filters}
              group = 'categoris'

              />
            </ColButton>
            
          </RowButton>

          <RowButton>
            <ColButton>
              <FilterButton
              icon={socks}
              text="socks"
              key="filter-8"
              filters={this.props.filters}
              group = 'categoris'

              />
            </ColButton>

            <ColButton>

              <FilterButton
                icon={sport}
                text="sport"
                key="filter-91"
                filters={this.props.filters}
                group = 'categoris'
              />

            </ColButton>

          </RowButton>

          <RowButton>

            <ColButton>
              <FilterButton
                icon={pijama}
                text="pijama"
                key="filter-9"
                filters={this.props.filters}
                group = 'categoris'

                />
            </ColButton>

            <ColButton>

              <FilterButton
                icon={others}
                text="others"
                key="filter-101"
                filters={this.props.filters}
                group = 'categoris'

              />

            </ColButton>

          </RowButton>

          {/* <FilterTitle className="mt-3">ADDITIONAL</FilterTitle>

          <RowButton>

            <ColButton disabled>
              <FilterButton
              icon=''
              text="additional"
              key="filter-10"
              filters={this.props.filters}
              group = 'additional'

              />
            </ColButton>

            <ColButton>
              <FilterButton
                icon=''
                text="lab"
                key="filter-11"
                filters={this.props.filters}
                group = 'additional'

                />
            </ColButton>

          </RowButton> */}

          <FilterTitle className="mt-3">SORT BY</FilterTitle>
          
          <FormGroup>
            <Input 
            type="select"
            onChange={this.handleSelect}
            name="sortFilter" 
            id="sortFilter">
              <option disabled>Select Filter</option>
              <option value="title">A-Z</option>
              <option value="createTimestamp" >Newest</option>
              <option value="createTimestamp" >Best Seller</option>
            </Input>
          </FormGroup>

          <MobileView>

            <FormGroup>

              <ClearButton 
                color="success" 
                block 
                onClick={this.handleClear}
              >
                Clear all
              </ClearButton>

            </FormGroup>

          </MobileView>

        </WrapperX>

        <BrowserView>

          <ClearWrapper>

            <ClearInner>

              <ClearButton 
              color="success" 
              block 
              outline
              onClick={this.handleClear}
              >
              Clear all
              </ClearButton>

          </ClearInner>

        </ClearWrapper>

      </BrowserView>

      </FilterWrapper>
  
      </React.Fragment>
  
  
    )

  }

}

Filter.propTypes = {
  onChangeSort : PropTypes.func,
  onFilterClear : PropTypes.func,
};


const mapStateToProps = createStructuredSelector({
  strains : makeSelectStrains(),
  additional : makeSelectAdditional(),
});


export function mapDispatchToProps(dispatch) {
  return {
    onChangeSort       : sort => dispatch(sortChange(sort)),
    onFilterClear      : () => dispatch(filterClear()),
    onSubmit           : () => dispatch(getFilterList()),

  };
}



export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Filter);
