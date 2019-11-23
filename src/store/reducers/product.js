import { product as actionTypes } from '../action/product';
import productJson from '../../Static/product.json';
let initialState = {
    results: productJson,
    productDetail:{}
}
const product = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FIND_PRODUCT:
            console.log('actionTypes.FIND_PRODUCT action',action)
            return {
                ...state,
                productDetail: state.results.find(result => result.id === action.id)
            }
        default:
            return state
            // console.log('warning in product reducer: not matching any of the type')
    }
    // return state;/
}
export default product;
