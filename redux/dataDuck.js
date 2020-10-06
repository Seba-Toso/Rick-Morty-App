//imports
import { ApolloClient, InMemoryCache , gql } from '@apollo/client';
import {setQuery} from './queries';

//definitions
//client
let client = new ApolloClient({
    uri : "https://rickandmortyapi.com/graphql",
    cache: new InMemoryCache()  
  });
//initial state
let initialData= {
    fetching: false,
    characters: [],
    episodes: [],
    locations: [],
    error: false,
    totalPages: null,                
    nextPage: 1,                
    prevPage: null,
    filter: '',
    current: '',
    loadMore: false
};
//query
let queryStructure;
let currentInput;
//cases
let GET_CHARACTERS = "GET_CHARACTERS";                   
let GET_CHARACTERS_SUCCES = "GET_CHARACTERS_SUCCES";     

let GET_EPISODES = "GET_EPISODES";                   
let GET_EPISODES_SUCCES = "GET_EPISODES_SUCCES";     
  
let GET_LOCATIONS = "GET_LOCATIONS";                   
let GET_LOCATIONS_SUCCES = "GET_LOCATIONS_SUCCES";     
 
let GET_DATA_ERROR = "GET_DATA_ERROR";
let SET_FILTER = "SET_FILTER";
let SET_CURRENT = "SET_CURRENT"; 

let UPDATE_PREV_PAGE = "UPDATE_PREV_PAGE";              
let UPDATE_NEXT_PAGE = "UPDATE_NEXT_PAGE";               
let UPDATE_PAGES = "UPDATE_PAGES";    

let CLEAR_ALL = "CLEAR_ALL";
let SET_LOAD_MORE = "SET_LOAD_MORE";


//reducer
export default function reducer(state=initialData, action){     
    switch(action.type){

        case GET_CHARACTERS:
            return {...state, fetching: true};

        case GET_CHARACTERS_SUCCES:
            if(state.loadMore === true){
                return {...state, characters: [...state.characters, ...action.payload], fetching: false, loadMore: false};
            };
            return {...state, characters: action.payload, fetching: false};
            


        case GET_EPISODES:
            return {...state, fetching: true};

        case GET_EPISODES_SUCCES:
            if(state.loadMore === true){
                return {...state, episodes: [...state.episodes, ...action.payload], fetching: false, loadMore: false};
            };
            return {...state, episodes: action.payload, fetching: false};
            

        case GET_LOCATIONS:
            return {...state, fetching: true};

        case GET_LOCATIONS_SUCCES:
            if(state.loadMore === true){
                return {...state, locations: [...state.locations, ...action.payload], fetching: false, loadMore: false};
            };
            return {...state, locations: action.payload, fetching: false};


        case GET_DATA_ERROR:
            return {...state, error: action.payload, fetching: false};

        case UPDATE_PAGES:
            return {...state, totalPages: action.payload};

        case UPDATE_NEXT_PAGE:
            return {...state, nextPage: action.payload};

        case UPDATE_PREV_PAGE:
            return {...state, prevPage: action.payload};

        case SET_CURRENT:
            return {...state, current: action.payload};

        case SET_FILTER:
            return {...state, filter: action.payload};

        case CLEAR_ALL:
            return {...state, characters: [], episodes: [], locations: [], error: false, fetching: false, loadMore: false};

        case SET_LOAD_MORE:
            return {...state, loadMore: action.payload};

        default:
            return state
    };
};

//aux functions
let doQuery = (input, page) => {
    let query = gql`${queryStructure}`
    return client.query({                                       
        query,                                                  
        variables: {                                            
            page: page,                                         
            filter: {
                name: `${input || null}`
            }
        }
    });
};

//actions
export let setFilterAction = (filterSelected) => (dispatch) => {
    dispatch({
        type: SET_FILTER,
        payload: filterSelected
    });
    queryStructure = setQuery(filterSelected)
};

export let clearAllAction = () => (dispatch) => {
    dispatch({
        type: CLEAR_ALL
    });
};

export let setCurrentAction = (input) => (dispatch) => {
    dispatch({
        type: SET_CURRENT,
        payload: input
    });
};

export let setLoadMoreAction = (isNeeded) => (dispatch) => {
    dispatch({
        type: SET_LOAD_MORE,
        payload: isNeeded
    });
}; 


//central action
export let getDataAction = (input, page) => (dispatch, getState) => {
    currentInput = input
    if(getState().obtainedData.error === true){
        dispatch({
            type: GET_DATA_ERROR,
            payload: false
        });
    };    
    //get data
    let filter = getState().obtainedData.filter
    if(filter === 'characters'){
        getCharactersAction(input, page)(dispatch)
    };
    if(filter === 'episodes'){
        getEpisodesAction(input, page)(dispatch)
    };
    if(filter === 'locations'){
        getLocationsAction(input, page)(dispatch)
    };
};


export let getCharactersAction = (input, page) => (dispatch) => {
    dispatch({
        type: GET_CHARACTERS
    });

    doQuery(input || currentInput, page)
    .then(({data}) => {
        dispatch({
            type: GET_CHARACTERS_SUCCES,
            payload: data.characters.results
        });
        dispatch({
            type: UPDATE_NEXT_PAGE,
            payload: data.characters.info.next
        });
    })
    .catch((error)=>{
        dispatch({
            type: GET_DATA_ERROR,
            payload: true
        });
    });
};


export let getEpisodesAction = (input, page) => (dispatch) => {
    dispatch({
        type: GET_EPISODES
    });

    doQuery(input || currentInput, page)
    .then(({data}) => {
        dispatch({
            type: GET_EPISODES_SUCCES,
            payload: data.episodes.results
        });
        dispatch({
            type: UPDATE_NEXT_PAGE,
            payload: data.episodes.info.next
        });
    })
    .catch((error)=>{
        dispatch({
            type: GET_DATA_ERROR,
            payload: true
        });
    });
};


export let getLocationsAction = (input, page) => (dispatch) => {
    dispatch({
        type: GET_LOCATIONS
    });

    doQuery(input || currentInput, page)
    .then(({data}) => {
        dispatch({
            type: GET_LOCATIONS_SUCCES,
            payload: data.locations.results
        });
        dispatch({
            type: UPDATE_NEXT_PAGE,
            payload: data.locations.info.next
        });
    })
    .catch((error)=>{
        dispatch({
            type: GET_DATA_ERROR,
            payload: true
        });
    });
};
