import { Dispatch } from "react";
import { Action } from ".";

export const setActivePlatform = (dispatch: Dispatch<Action>, value: number) => {
    dispatch({ type: "SET_CURRENT_PLATFORM", value });
  }

export const setEditMode = (dispatch: Dispatch<Action>, value: boolean) => {
    dispatch({ type: "SET_EDIT_MODE", value });
  }