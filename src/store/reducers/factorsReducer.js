import * as actionTypes from '../actions/actionsTypes';
import _ from 'lodash';


const initialState = {
    data: [],
    count: 0,
    next: '',
    previous: '',
    numPages: 0
}



export default function (state = initialState,action) {
    //console.log(action.data)
    //console.log(state.data)
    //console.log(FETCH_USER)
    switch (action.type) {
        case actionTypes.FACTOR_CREATE: 
            return {...state,['data']: [action.data]}
        //{...state,[action.data.id]: action.data};

        //case actionTypes.FACTORS_GET: return{...state, ..._.mapKeys(action.data,'id')};
        case actionTypes.FACTORS_GET: {
            
            //console.log(action.data)
            return action.data;
            }
        case actionTypes.FACTOR_DELETE: {
            const dataFromState = state.data
            
            var dataToReducer = dataFromState.filter(item => item.id !== action.data)
              console.log(dataToReducer)
              return {...state,['data']: dataToReducer} // zapisanie do factory.data , nie wiem jak zrobić update
            //const dataW = Object.values(_.omit(dataT,action.data));
            //console.log(dataW)
            //return _.omit(dataT,action.data);
        }
        case actionTypes.FACTOR_EDIT: {
            console.log(state.data)
            const ar = state.data.map((item, index) => {
                // Replace the item at index 2
                //console.log(item,index)
                if(item.id === action.data.id) {
                  return action.data;
                }
            
                // Leave every other item unchanged
                return item;
              });
              console.log(state.arr)
              return {...state,['data']: ar}
        }
        
        case actionTypes.FACTOR_RESET: return {initialState};
        default:
            return state;
    }
}





