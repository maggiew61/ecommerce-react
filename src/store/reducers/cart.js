import { cart as actionTypes } from '../action/cart';
let initialState = {
    cart: [],
    isOpenCart: false,
    openCartAfterAuth: false,
}

const cart = (state = initialState, action) => {
    switch (action.type) {
        /**
         * 檢查 cart 裡面是否已經有此商品
         */
        case actionTypes.ADD_TOCART:
            let found = state.cart.find(i => i.id === action.product.id)
            // 已有此商品就將數量相加
            if(found){
                return {
                    ...state,
                    //同一個商品則把qty相加並覆蓋過去; 不同則直接返回
                    cart: state.cart.map(i => i.id === found.id? { ...i, qty: i.qty + action.product.qty } : i)
                }
            // 沒有就直接加入
            }else{
                 return {
                     ...state,
                    cart: [...state.cart,action.product]
                }
            }
        //開啟與閉合nav bar的購物車
        case actionTypes.ONOPEN_CART:  
        return {
            ...state,
            isOpenCart: !state.isOpenCart
        }
        //清空購物車
        case actionTypes.CLEAR_CART:  
        return {
            ...state,
            cart: []
        }
        case actionTypes.OPENCART_AFTERAUTH:  
        return {
            ...state,
            openCartAfterAuth: action.isOpen
        }
        // test
        case actionTypes.SHOW_ALERTMESSAGE:  
        console.log('reducer showAlertMessage')
        return {
            ...state,
            isAlertMessage: !state.isAlertMessage
        }
        // test        
        case actionTypes.DELETE_ITEM:
            return {
                ...state,
                cart: state.cart.filter(i => i.id !== action.id)
            }
        default:
            return state
    }
    // console.log('end state',state)
    // return state;
}
export default cart;
