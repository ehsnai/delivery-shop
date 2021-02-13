/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectHome = state => state.home || initialState;

  const makeSelectAuthUser = () =>
  createSelector(
    selectHome,
    homeState => homeState.authUser,
  );

  const makeSelectRegisterModal = () =>
  createSelector(
    selectHome,
    homeState => homeState.RegisterModal,
  );

  const makeSelectValidModal = () =>
  createSelector(
    selectHome,
    homeState => homeState.ValidateModal,
  );

  const makeSelectFeedbackModal = () =>
  createSelector(
    selectHome,
    homeState => homeState.FeedbackModal,
  );

  const makeSelectLoginModal = () =>
  createSelector(
    selectHome,
    homeState => homeState.LoginModal,
  );

  const makeSelectCartModal = () =>
    createSelector(
      selectHome,
      homeState => homeState.CartModal,
  );

  const makeSelectFilterModal = () =>
    createSelector(
      selectHome,
      homeState => homeState.FilterModal,
  );

  const makeSelectFilter = () =>
    createSelector(
      selectHome,
      homeState => homeState.filters,
  );

  const makeSelectStrains = () =>
    createSelector(
      selectHome,
      homeState => homeState.strains,
  );

  const makeSelectAdditional = () =>
    createSelector(
      selectHome,
      homeState => homeState.additional,
  );

  const makePath = () =>
    createSelector(
      selectHome,
      homeState => homeState.path,
  );
  
  const makeFilteredList = () =>
    createSelector(
      selectHome,
      homeState => homeState.lists,
    );

  const makeCart = () =>
    createSelector(
      selectHome,
      homeState => homeState.cart,
    );

  const makeItems = () =>
    createSelector(
      selectHome,
      homeState => homeState.items,
    );

  const makeSelectSearch = () =>
    createSelector(
      selectHome,
      homeState => homeState.wheres,
    );

  const makeIsValid = () =>
    createSelector(
      selectHome,
      homeState => homeState.isValid,
    );

    const makeAddresses = () =>
    createSelector(
      selectHome,
      homeState => homeState.addresses,
    );

    const makeOrders = () =>
    createSelector(
      selectHome,
      homeState => homeState.orders,
    );


export { 
  selectHome,
  makeSelectAuthUser,
  makeSelectRegisterModal,
  makeSelectFeedbackModal,
  makeSelectLoginModal,
  makeSelectCartModal,
  makeSelectFilterModal,
  makeSelectFilter,
  makeSelectStrains,
  makeSelectAdditional,
  makePath,
  makeFilteredList,
  makeCart,
  makeItems,
  makeSelectSearch,
  makeSelectValidModal,
  makeIsValid,
  makeAddresses,
  makeOrders
};
