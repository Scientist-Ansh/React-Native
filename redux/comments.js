import * as ActionTypes from './ActionTypes';

export const comments = (state={
    comments:[],
    errMess:null,
},action)=>{
    switch(ActionTypes.type){
        case ActionTypes.ADD_COMMENTS:
            return{...state,errMess:null,comments:action.payload}
        case ActionTypes.COMMENTS_FAILED:
            return{...state,errMess:action.payload,comments:[]}
      
        default:
            return state;
    } 
}