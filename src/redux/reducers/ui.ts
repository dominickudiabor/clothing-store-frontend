import { UiState } from "../../types"
import { UiActions, TOGGLE_DIALOG, TOGGLESIGNUP, TOGGLE_ADMIN_ACCESS, HIGHLIGHT_NAME, REMOVE_HIGHLIGHT, TOGGLE_ADMIN_VIEW, RESET_UI_STATE } from "../Types/ui"



const defaultState: UiState = {
  dialogOpen: {},
  toggleSignUp: false,
  verifiedAdmin:false,
  highlightName:undefined,
  adminView:true,
}

export default function ui(
  state: UiState = defaultState,
  action: UiActions
): UiState {
  switch (action.type) {
  case TOGGLE_DIALOG: {
    return {
      ...state,
      dialogOpen: {
        ...state.dialogOpen,
        [action.payload.dialog]: !state.dialogOpen[action.payload.dialog],
      },
    }
  }
  case TOGGLESIGNUP: {
    return  {...state, toggleSignUp: !state.toggleSignUp}
  }
  
  case TOGGLE_ADMIN_ACCESS: {
  const {status} = action.payload
    return {...state, verifiedAdmin: status}
  }

  case HIGHLIGHT_NAME: {
    const {name }= action.payload
    return {
      ...state,highlightName: name
      
    }
  }

  case REMOVE_HIGHLIGHT:{
    return {
      ...state,highlightName:undefined
    }
  }

  case TOGGLE_ADMIN_VIEW:{
    return {
      ...state, adminView: !state.adminView
    }
  }

  case RESET_UI_STATE:{
    return {
      ...state, toggleSignUp: false,
      verifiedAdmin:false,
      highlightName:undefined,
      adminView:true,
    }
  }

 

  default:
    return state
  }
}
