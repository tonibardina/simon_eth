import { createContext, useReducer, useMemo, FC } from 'react';
import PropTypes from 'prop-types'

interface State {
    currentPlatform: number;
    editMode: boolean;
}

type ActionType =
    | "SET_CURRENT_PLATFORM"
    | "SET_EDIT_MODE"

export interface Action {
    type: ActionType;
    value: any
}

const initialState: State = {
    currentPlatform: 0,
    editMode: false,
}


const reducer = (state: State, action: Action): State => {
    const callbacks = {
        SET_CURRENT_PLATFORM: () => {
            return { ...state, currentPlatform: action.value }
        },
        SET_EDIT_MODE: () => {
            return { ...state, editMode: action.value }
        }
    }

    return callbacks[action.type]()
}

interface IContext {
    state: State;
    dispatch: (a: Action) => void
}

const context: IContext = {
    state: initialState,
    dispatch: () => {},
}

const BuilderContext = createContext(context);

const BuilderProvider: FC = ({ children }) => {
    const [state, dispatch] = useReducer(
        reducer,
        initialState
    );

    const memoizedState = useMemo(() => ({ state, dispatch }), [state, dispatch]);

    return (
        <BuilderContext.Provider value={memoizedState}>
            {children}
        </BuilderContext.Provider>
    );
};

BuilderProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired
};

export { BuilderContext, BuilderProvider };
