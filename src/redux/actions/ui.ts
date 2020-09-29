import { DialogType } from '../../types';
import {
  ToggleDialogAction,
  TOGGLE_DIALOG,
  TOGGLESIGNUP,
  ToggleSignUpAction,
  ToggleAdminAccess,
  TOGGLE_ADMIN_ACCESS,
  HighlightName,
  HIGHLIGHT_NAME,
  REMOVE_HIGHLIGHT,
  TOGGLE_ADMIN_VIEW,
  RESET_UI_STATE,
} from '../Types/ui';

export function toggleDialog(dialog: DialogType): ToggleDialogAction {
  return {
    type: TOGGLE_DIALOG,
    payload: {
      dialog,
    },
  };
}

export function toggleSignUpForm(): ToggleSignUpAction {
  return {
    type: TOGGLESIGNUP,
  };
}

export function toggleAdminAccess(status: boolean): ToggleAdminAccess {
  return {
    type: TOGGLE_ADMIN_ACCESS,
    payload: {
      status,
    },
  };
}

export function highlightName(name: string | undefined): HighlightName {
  return {
    type: HIGHLIGHT_NAME,
    payload: {
      name,
    },
  };
}

export function removeHightlight() {
  return {
    type: REMOVE_HIGHLIGHT,
  };
}

export function toggleAdminView() {
  return {
    type: TOGGLE_ADMIN_VIEW,
  };
}

export function resetUiState(){
  return {
    type: RESET_UI_STATE
  }
}