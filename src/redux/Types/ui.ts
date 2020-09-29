import { DialogType } from '../../types';

//ui actions
export const TOGGLE_DIALOG = 'TOGGLE_DIALOG';
export const TOGGLESIGNUP = 'TOGGLESIGNUP';
export const TOGGLE_ADMIN_ACCESS = 'TOGGLE_ADMIN_ACCESS';
export const HIGHLIGHT_NAME = 'HIGHLIGHT_NAME';
export const REMOVE_HIGHLIGHT = 'REMOVE_HIGHLIGHT';
export const TOGGLE_ADMIN_VIEW = 'TOGGLE_ADMIN_VIEW ';
export const RESET_UI_STATE = 'RESET_UI_STATE'

//------------------------------------>
//action types for ui
export type ToggleDialogAction = {
  type: typeof TOGGLE_DIALOG;
  payload: {
    dialog: DialogType;
  };
};

export type ToggleSignUpAction = {
  type: typeof TOGGLESIGNUP;
};

export type ToggleAdminAccess = {
  type: typeof TOGGLE_ADMIN_ACCESS;
  payload: { status: boolean };
};

export type HighlightName = {
  type: typeof HIGHLIGHT_NAME;
  payload: { name: string |undefined };
};

export type RemoveHighlight = {
  type: typeof REMOVE_HIGHLIGHT;
};

export type ToggleAdminView = {
  type: typeof TOGGLE_ADMIN_VIEW;
};

export type ResetUiState = {
  type: typeof RESET_UI_STATE
}
//------------------------------------>

//ui actions
export type UiActions =
  | ToggleDialogAction
  | ToggleSignUpAction
  | ToggleAdminAccess
  | HighlightName
  | RemoveHighlight
  | ToggleAdminView
  |ResetUiState;
//------------------------------------>
