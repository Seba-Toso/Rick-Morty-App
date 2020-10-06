import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import dataReducer, { setFilterAction } from './dataDuck';
import thunk from 'redux-thunk';    


const rootReducer = combineReducers ({
    obtainedData: dataReducer
});

export default function generateStore(){
    let store = createStore(
        rootReducer, 
        compose(applyMiddleware(thunk))
    );

    setFilterAction('characters')(store.dispatch, store.getState);
    return store;
};