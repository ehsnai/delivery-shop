
import produce from 'immer';
import { 
  SIGNUP_USER_SUCCESS,
  SIGNIN_USER_SUCCESS,
  SHOW_SIGNUP_MODAL_OPEN,
  SHOW_SIGNUP_MODAL_CLOSE,
  SHOW_SIGNIN_MODAL_OPEN,
  SHOW_SIGNIN_MODAL_CLOSE,
  SHOW_CART_MODAL_OPEN,
  SHOW_CART_MODAL_CLOSE,
  SHOW_FILTER_LIST,
  SHOW_FILTER_LIST_SUCCESS,
  ADD_FILTER_STRAINS,
  REMOVE_FILTER_STRAINS,
  REMOVE_FILTER_ADDITIONAL,
  ADD_FILTER_ADDITIONAL,
  REMOVE_FILTER_CATEGORY,
  ADD_FILTER_CATEGORY,
  SORT_CHANGE,
  CLEAR_FILTER,
  LOAD_LIST_SUCCESS,
  SHOW_FILTER_MODAL,
  CLOSE_FILTER_MODAL,
  CHANGE_PATCH,
  LOGOUT_USER,
  ADD_TO_CARD,
  REMOVE_FROM_CARD,
  GET_CART_ITEMS_SUCCESS,
  CHANGE_FILTER_SEARCH,
  SHOW_FEEDBACK_MODAL,
  CLOSE_FEEDBACK_MODAL,
  SEND_FEEDBACK_SUCCESS,
  SHOW_VALIDATION_MODAL,
  VALIDATE_AGE,
  ADD_ADDRESS_SUCCESS,
  CHANGE_CART_COUNT,
  ADD_ORDER_SUCCESS,
  GET_ORDER_SUCCESS,
  GET_SIGNIN_USER_SUCCESS,
  ADD_USER_ID_SUCCESS,
  CONFIRM_ORDER_SUCCESS
} from './constants';

// The initial state of the App
export const initialState = {
  username: 'behnam2',
  lists : [],
  addresses : [],
  orders : [],
  authUser: null,
  isValid   : null,

  RegisterModal : false,
  LoginModal : false,
  CartModal : false,
  FilterModal : false,
  FeedbackModal : false,
  ValidateModal : false,
  path:'home',

  cart:[],
  items:[],

  filters : {
    filterBy:{
      type :[],
      category:[],
      additional:[],
    },
    sort:'_id',
    sDesc:false,
    wheres:null,
    page:0,
    pageSize:6,
    
    }
};

/* eslint-disable default-case, no-param-reassign */
const homeReducer = (state = initialState, action) =>
  produce(state, draft => {

    console.log("state ==> ",state)
    console.log("action ==> ",action)

    switch (action.type) {

      case ADD_TO_CARD:
          //draft.cart.indexOf(action.payload) == -1 ? draft.cart.push(action.payload) :  console.log("This item already exists")
          draft.cart.some(cart => cart.itemId === action.payload.itemId) ? '' : ''

          if(! draft.cart.some(cart => cart.itemId === action.payload.itemId)){
            draft.cart.push(action.payload)
          }
          else if (draft.cart.some(cart => cart.itemId === action.payload.itemId)){
            if(action.payload.sellType == 'weight'){
              draft.cart.push(action.payload)
              //draft.cart.some(cart => cart.priceId === action.payload.priceId) ? console.log("This price item already exists") : draft.cart.push(action.payload)
            }
            else{
              console.log("This item already exists")
            }
          }
          else{
            console.log("item not added")
          }

        break; 

      case CHANGE_CART_COUNT:
          draft.cart[action.id].count = action.count
        break;
        
      case REMOVE_FROM_CARD:
          draft.cart.pop(action.text)
          //draft.items.pop(action.id)
        break;    

      case SIGNUP_USER_SUCCESS:
          draft.authUser      = action.payload
          draft.RegisterModal  = false;
          draft.cart =[]

        break;

      case ADD_ADDRESS_SUCCESS:
        draft.addresses    = action.payload;
        break;
  
      case CHANGE_PATCH:
        draft.path = action.payload;
        break;

      case SHOW_VALIDATION_MODAL:
        draft.ValidateModal = true;
        break;
            
      case VALIDATE_AGE:
        action.payload == 1 ? draft.ValidateModal = false : draft.ValidateModal = true
        draft.isValid = action.payload;
        break;
        
      case LOGOUT_USER:
        draft.authUser     = null;
        draft.RegisterModal      = false;
        draft.path               ='home'
      break;
              
      case SIGNIN_USER_SUCCESS:
        draft.authUser      = action.payload
        draft.LoginModal    = false;
        draft.cart =[]
        break;

      case GET_SIGNIN_USER_SUCCESS:
        draft.authUser      = action.payload
      break;

      case ADD_USER_ID_SUCCESS:
          draft.CartModal = false;
        break;

      case CONFIRM_ORDER_SUCCESS:
        break;

      case LOAD_LIST_SUCCESS:
        draft.lists = action.payload;
        draft.loading = false;
        break;    

      case SHOW_SIGNUP_MODAL_OPEN:
        draft.LoginModal = false;
        draft.RegisterModal = true;
        break;

      case SHOW_SIGNUP_MODAL_CLOSE:
        draft.RegisterModal = false;
        break

      case SHOW_SIGNIN_MODAL_OPEN:
        draft.RegisterModal = false;
        draft.LoginModal = true;
        break

      case SHOW_SIGNIN_MODAL_CLOSE:
        draft.LoginModal = false;
        break

      case GET_CART_ITEMS_SUCCESS:
        draft.items = action.payload;
        draft.loading = false;
        break

      case SHOW_CART_MODAL_OPEN:
          draft.CartModal = true;
          break
        
      case SHOW_CART_MODAL_CLOSE:
        draft.CartModal = false;
        break

      case ADD_ORDER_SUCCESS:
          draft.CartModal = false;
          draft.path      ='order'
        break

      case GET_ORDER_SUCCESS:
          draft.orders    = action.payload;
          break;
    
      case SHOW_FILTER_MODAL:
        draft.FilterModal = true;
        break
    
      case CLOSE_FILTER_MODAL:
        draft.FilterModal = false;
        break

      case SHOW_FEEDBACK_MODAL:
        draft.FeedbackModal = true;
        break
    
      case CLOSE_FEEDBACK_MODAL:
        draft.FeedbackModal = false;
        break

      case SEND_FEEDBACK_SUCCESS : 
        draft.FeedbackModal = false;
      break

      case SHOW_FILTER_LIST_SUCCESS:
        draft.loading = false;
        break
      
      case ADD_FILTER_STRAINS:
        draft.filters.filterBy.type.push(action.payload.strains)
        break

      case REMOVE_FILTER_STRAINS:
        let straintArray = [...draft.filters.filterBy.type];
        let straintIndex = straintArray.indexOf(action.payload.strains)
        if (straintIndex !== -1) {
          straintArray.splice(straintIndex, 1);
          draft.filters.filterBy.type = straintArray
        }
        break

      case ADD_FILTER_ADDITIONAL:
        draft.filters.filterBy.additional.push(action.payload.additional)
        break
  
      case REMOVE_FILTER_ADDITIONAL:
        let arrayAdditional = [...draft.filters.filterBy.additional];
        let AdditionlaIndex = arrayAdditional.indexOf(action.payload.additional)
        if (AdditionlaIndex !== -1) {
          arrayAdditional.splice(AdditionlaIndex, 1);
          draft.filters.filterBy.additional = arrayAdditional
        }
        break

      case ADD_FILTER_CATEGORY:
        draft.filters.filterBy.category.push(action.payload.category)
        break
  
      case REMOVE_FILTER_CATEGORY:
        let arrayCategory = [...draft.filters.filterBy.category];
        let CategoryIndex = arrayCategory.indexOf(action.payload.category)
        if (CategoryIndex !== -1) {
          arrayCategory.splice(CategoryIndex, 1);
          draft.filters.filterBy.category = arrayCategory
        }
        break

      case SORT_CHANGE:
        draft.filters.sort = action.sort
        draft.filters.sDesc = action.sDesc
        break
    
      case CLEAR_FILTER:
        draft.filters.filterBy.type = []
        draft.filters.filterBy.category = []
        draft.filters.filterBy.additional = []
        draft.filters.sort = 'title'
        break

      case CHANGE_FILTER_SEARCH:
        draft.filters.wheres = action.payload
        break
                  
      }

  });

export default homeReducer;
