/*
 * HomeConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const LOGOUT_USER                = 'delivery/Home/LOGOUT_USER';
export const SIGNUP_USER                = 'delivery/Home/SIGNUP_USER';
export const SIGNUP_USER_SUCCESS        = 'delivery/Home/SIGNUP_USER_SUCCESS';
export const SIGNIN_USER                = 'delivery/Home/SIGNIN_USER';
export const GET_SIGNIN_USER            = 'delivery/Home/GET_SIGNIN_USER';
export const GET_SIGNIN_USER_SUCCESS    = 'delivery/Home/GET_SIGNIN_USER_SUCCESS';
export const SIGNIN_USER_SUCCESS        = 'delivery/Home/SIGNIN_USER_SUCCESS';
export const SIGNOUT_USER               = 'delivery/Home/SIGNOUT_USER';
export const SIGNOUT_USER_SUCCESS       = 'delivery/Home/SIGNOUT_USER_SUCCESS';

export const SHOW_SIGNUP_MODAL_OPEN     = 'delivery/Header/SHOW_SIGNUP_MODAL_OPEN'
export const SHOW_SIGNUP_MODAL_CLOSE    = 'delivery/Header/SHOW_SIGNUP_MODAL_CLOSE'

export const SHOW_SIGNIN_MODAL_OPEN     = 'delivery/Header/SHOW_SIGNIN_MODAL_OPEN'
export const SHOW_SIGNIN_MODAL_CLOSE    = 'delivery/Header/SHOW_SIGNIN_MODAL_CLOSE'

export const SHOW_CART_MODAL_OPEN       = 'delivery/Header/SHOW_CART_MODAL_OPEN'
export const SHOW_CART_MODAL_CLOSE      = 'delivery/Header/SHOW_CART_MODAL_CLOSE'

export const SHOW_FILTER_LIST           = 'delivery/FilterButton/SHOW_FILTER_LIST'
export const SHOW_FILTER_LIST_SUCCESS   = 'delivery/FilterButton/SHOW_FILTER_LIST_SUCCESS'

export const SHOW_FILTER_MODAL          = 'delivery/FilterButton/SHOW_FILTER_MODAL'
export const CLOSE_FILTER_MODAL         = 'delivery/FilterButton/CLOSE_FILTER_MODAL'

export const SHOW_FEEDBACK_MODAL        = 'delivery/List/SHOW_FEEDBACK_MODAL'
export const CLOSE_FEEDBACK_MODAL       = 'delivery/List/CLOSE_FEEDBACK_MODAL'

export const SEND_FEEDBACK              = 'delivery/List/SEND_FEEDBACK'
export const SEND_FEEDBACK_SUCCESS      = 'delivery/List/SEND_FEEDBACK_SUCCESS'

export const ADD_FILTER_STRAINS         = 'delivery/FilterButton/ADD_FILTER_STRAINS'
export const REMOVE_FILTER_STRAINS      = 'delivery/FilterButton/REMOVE_FILTER_STRAINS'

export const ADD_FILTER_ADDITIONAL      = 'delivery/FilterButton/ADD_FILTER_ADDITIONAL'
export const REMOVE_FILTER_ADDITIONAL   = 'delivery/FilterButton/REMOVE_FILTER_ADDITIONAL'

export const ADD_FILTER_CATEGORY        = 'delivery/FilterButton/ADD_FILTER_CATEGORY'
export const REMOVE_FILTER_CATEGORY     = 'delivery/FilterButton/REMOVE_FILTER_CATEGORY'

export const CHANGE_FILTER_SEARCH     = 'delivery/Search/CHANGE_FILTER_SEARCH'

export const SORT_CHANGE                = 'delivery/Filter/SORT_CHANGE'
export const CLEAR_FILTER               = 'delivery/Filter/CLEAR_FILTER'

export const LOAD_LIST                  = 'delivery/Home/LOAD_LIST'
export const LOAD_LIST_SUCCESS          = 'delivery/Home/LOAD_LIST_SUCCESS'

export const CHANGE_PATCH               = 'delivery/ProfileSidebar/CHANGE_PATCH'

export const ADD_TO_CARD                = 'delivery/CastumCard/ADD_TO_CARD'
export const REMOVE_FROM_CARD           = 'delivery/CastumCard/REMOVE_FROM_CARD'

export const GET_CART_ITEMS             = 'delivery/Header/GET_CART_ITEMS'
export const GET_CART_ITEMS_SUCCESS     = 'delivery/Header/GET_CART_ITEMS_SUCCESS'

export const SHOW_VALIDATION_MODAL      = 'delivery/CustomCard/SHOW_VALIDATION_MODAL'
export const VALIDATE_AGE               = 'delivery/Header/VALIDATE_AGE'

export const ADD_ADDRESS                = 'delivery/ADDRESS/ADD_ADDRESS'
export const ADD_ADDRESS_SUCCESS        = 'delivery/ADDRESS/ADD_ADDRESS_SUCCESS'
export const GET_ADDRESS                = 'delivery/ADDRESS/GET_ADDRESS'

export const CHANGE_CART_COUNT          = 'delivery/Header/CHANGE_CART_COUNT'

export const GET_ORDER                  = 'delivery/Header/GET_ORDER'
export const GET_ORDER_SUCCESS          = 'delivery/Header/GET_ORDER_SUCCESS'
export const ADD_ORDER                  = 'delivery/Header/ADD_ORDER'
export const ADD_ORDER_SUCCESS          = 'delivery/Header/ADD_ORDER_SUCCESS'

export const ADD_USER_ID                = 'delivery/Header/ADD_USER_ID'
export const ADD_USER_ID_SUCCESS        = 'delivery/Header/ADD_USER_ID_SUCCESS'

export const CONFIRM_ORDER                = 'delivery/Order/CONFIRM_ORDER'
export const CONFIRM_ORDER_SUCCESS        = 'delivery/Order/CONFIRM_ORDER_SUCCESS'


