
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import {makeSelectCurrentUser} from 'containers/App/selectors'
import { 
  showFilterModal,
  closeFilterModal
} from 'containers/HomePage/actions';
import {
  FilterModalWrapper
} from './Styles';
import { Button,Row ,Col,Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import Filter from 'components/filter'

import filterIcon from '../../images/filter.png'

function FilterModal(props) {

  console.log("filterModal---------->>",props.filterModal)

  return (


      <FilterModalWrapper onClick={props.onFilterModalClick}>


        <Modal isOpen={props.filterModal} toggle={props.onFilterModalClose}>
          <ModalHeader toggle={props.onFilterModalClose}>Choose your best!</ModalHeader>
          <ModalBody>

                <Filter
                filters = {props.filters}
                />


          </ModalBody>
        </Modal>

        <img src={filterIcon} width="30px" height="auto" />

      </FilterModalWrapper>


  )
}

// We require the use of src and alt, only enforced by react in dev mode
FilterModal.propTypes = {
  onFilterModalClick   : PropTypes.func,
  onFilterModalClose: PropTypes.func,

};

const mapStateToProps = createSelector(
  makeSelectCurrentUser(),
  RegisterModal => ({
    RegisterModal,
  }),
);


export function mapDispatchToProps(dispatch) {
  return {
    onFilterModalClick : () => dispatch(showFilterModal()),
    onFilterModalClose : () => dispatch(closeFilterModal()),

    dispatch,
  };
}



export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FilterModal);

