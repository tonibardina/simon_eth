import { createContext, useReducer, useMemo, FC } from 'react';
import PropTypes from 'prop-types'
import { Matrix } from '../../components/matrix';

interface State {
    currentPlatform: number;
    editMode: boolean;
    isCreatingSequence: boolean;
    selectedBlock: string;
    matrix: Matrix;
    isRunning: boolean;
    runDuration: number;
    activeBlock: string;
    sequence: string[];
    userSequence: string[];
}

type ActionType =
    | "SET_CURRENT_PLATFORM"
    | "SET_EDIT_MODE"
    | "SELECTED_BLOCK"
    | "UPDATE_BLOCK"
    | "SET_RUNNING"
    | "SET_ACTIVE_BLOCK"
    | "SET_CREATING_SEQUENCE_MODE"
    | "UPDATE_SEQUENCE"
    | "UPDATE_USER_SEQUENCE"
    | "CLEAR_SEQUENCE"
    | "CLEAR_USER_SEQUENCE"

export interface Action {
    type: ActionType;
    value?: any
}

const initialState: State = {
    currentPlatform: 0,
    editMode: false,
    runDuration: 4000,
    isRunning: false,
    selectedBlock: "0",
    activeBlock: "0",
    sequence: [],
    userSequence: [],
    isCreatingSequence: false,
    matrix: [
        [
            ['b', 'b', 'b'],
            ['b', 'b', 'b'],
            ['b', 'b', 'b']
        ],
        [
            ['b', 'b', 'b'],
            ['b', 'b', 'b'],
            ['b', 'b', 'b']
        ],
        [
            ['b', 'b', 'b'],
            ['b', 'b', 'b'],
            ['b', 'b', 'b']
        ],
        [
            ['b', 'b', 'b'],
            ['b', 'b', 'b'],
            ['b', 'b', 'b']
        ],
        [
            ['b', 'b', 'b'],
            ['b', 'b', 'b'],
            ['b', 'b', 'b']
        ],
        [
            ['b', 'b', 'b'],
            ['b', 'b', 'b'],
            ['b', 'b', 'b']
        ],
        [
            ['b', 'b', 'b'],
            ['b', 'b', 'b'],
            ['b', 'b', 'b']
        ],
        [
            ['b', 'b', 'b'],
            ['b', 'b', 'b'],
            ['b', 'b', 'b']
        ],
        [
            ['b', 'b', 'b'],
            ['b', 'b', 'b'],
            ['b', 'b', 'b']
        ]
    ],
}

const reducer = (state: State, action: Action): State => {
    const callbacks = {
        SET_CURRENT_PLATFORM: () => {
            return { ...state, currentPlatform: action.value }
        },
        SET_EDIT_MODE: () => {
            return { ...state, editMode: action.value }
        },
        SELECTED_BLOCK: () => {
            return { ...state, selectedBlock: action.value }
        },
        SET_RUNNING: () => {
            return { ...state, isRunning: action.value }
        },
        SET_ACTIVE_BLOCK: () => {
            return { ...state, activeBlock: action.value }
        },
        UPDATE_BLOCK: () => {
            return {
                ...state, matrix: state.matrix.map((rigMatrix, index) => {
                    if (index === parseInt(state.selectedBlock[0])) {
                        return rigMatrix.map((row, index) => {
                            const parsedBlockIndex = parseInt(state.selectedBlock[1])
                            const blockRow = Math.floor(parsedBlockIndex / 3)
                            const blockPosition = parsedBlockIndex % 3
                            if (blockRow === index) {
                                return row.map((block, index) => {
                                    if (blockPosition === index) {
                                        return action.value
                                    }

                                    return block
                                })
                            }
                            return row
                        })
                    }

                    return rigMatrix
                })
            }
        },
        SET_CREATING_SEQUENCE_MODE: () => {
            return { ...state, isCreatingSequence: action.value }
        },  
        UPDATE_SEQUENCE: () => {
            return { ...state, sequence: [...state.sequence, action.value] }
        },   
        CLEAR_SEQUENCE: () => {
            return { ...state, sequence: [] }
        },   
        UPDATE_USER_SEQUENCE: () => {
            return { ...state, userSequence: [...state.userSequence, action.value] }
        },   
        CLEAR_USER_SEQUENCE: () => {
            return { ...state, userSequence: [] }
        },   
    }

    return callbacks[action.type]()
}

interface IContext {
    state: State;
    dispatch: (a: Action) => void
}

const context: IContext = {
    state: initialState,
    dispatch: () => { },
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
