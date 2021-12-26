import { Dispatch } from "react";
import { Action } from ".";

export const setActivePlatform = (dispatch: Dispatch<Action>, value: number) => {
  dispatch({ type: "SET_CURRENT_PLATFORM", value });
}

export const setEditMode = (dispatch: Dispatch<Action>, value: boolean) => {
  dispatch({ type: "SET_EDIT_MODE", value });
}

export const setSelectedBlock = (dispatch: Dispatch<Action>, value: string) => {
  dispatch({ type: "SELECTED_BLOCK", value });
}

export const updateBlock = (dispatch: Dispatch<Action>, value: string | number) => {
  dispatch({ type: "UPDATE_BLOCK", value });
}

export const setRunning = (dispatch: Dispatch<Action>, value: boolean) => {
  dispatch({ type: "SET_RUNNING", value });
}

export const setActiveBlock = (dispatch: Dispatch<Action>, value: string) => {
  dispatch({ type: "SET_ACTIVE_BLOCK", value });
}

export const setCreatingSequenceMode = (dispatch: Dispatch<Action>, value: boolean) => {
  dispatch({ type: "SET_CREATING_SEQUENCE_MODE", value });
}

export const updateSequence = (dispatch: Dispatch<Action>, value: string) => {
  dispatch({ type: "UPDATE_SEQUENCE", value });
}

export const clearSequence = (dispatch: Dispatch<Action>) => {
  dispatch({ type: "CLEAR_SEQUENCE" });
}

export const updateUserSequence = (dispatch: Dispatch<Action>, value: string) => {
  dispatch({ type: "UPDATE_USER_SEQUENCE", value });
}

export const clearUserSequence = (dispatch: Dispatch<Action>) => {
  dispatch({ type: "CLEAR_USER_SEQUENCE" });
}