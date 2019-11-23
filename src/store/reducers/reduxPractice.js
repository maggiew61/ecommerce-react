import { Actions as actionTypes } from '../action/action';
const initialState = {
   results:[]
}
const reducer = (state=initialState,action) =>{
   switch(action.type){
        case actionTypes.ADD_NAME:
        return{
            ...state,
            results: state.results.concat({id: new Date(),title:action.title,description:action.description})
        }
       case actionTypes.DELETE_NAME:
       return{
           ...state,
           results: state.results.filter(result =>result.id!==action.id )
       }
       default:
    //    console.log('warning in profileReducer: not matching any of the type')
   }
   return state;
}
export default reducer;
