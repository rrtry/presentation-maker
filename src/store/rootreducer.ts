import { combineReducers } from 'redux';
import editorReducer from './reducer'; 

const rootReducer = combineReducers({
    editor: editorReducer,
});

export default rootReducer;