import React, { Component } from 'react';
import { connect } from 'react-redux'
import { cart as actionTypesCart } from '../../store/action/cart';
import { product as actionTypesProduct } from '../../store/action/product';
import Select from 'react-select';

import * as actions from '../../store/action/index'
import css from './productPage.module.scss';
const options = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' },
]
class productPage extends Component {
  state = {
    checkoutText: '放入購物車',
    id: '1',
    selectedOption: null,
  }
  handleChange = selectedOption => {
    this.setState({ selectedOption });
  };
  /**
   * 點選加入購物車 || 立刻結帳
   * @param {string} checkoutText 按鈕的文字
   */
  addOrCheckout = checkoutText => {
    //加入購物車並把商品推上cart reducer
    if(checkoutText === '放入購物車'){
        const { productDetail } = this.props
        if (this.state.selectedOption.value == null) this.setState({ selectedOption: 1 })
        this.props.addToCart({
          ...productDetail,
          qty: parseInt(this.state.selectedOption.value)
        })
        //dispatch到store讓navbar底下的popmessage出現
        this.props.alert()
        this.setState(() => ({  checkoutText: '立刻結帳'}));  
    //立刻結帳dispatch到reducer把openCartAfterAuth改為true
    }else{
      this.props.onOpenCart()
    }
  }
  componentDidMount() {
    this.setState({ selectedOption: { value: 1, label: '1' } });
    let id = parseInt(this.props.match.params.id)
    this.props.findProduct(id)

    //未登入要結帳需先登入再回到這, 然後dispatch onOpenCart()來打開Nav.js的cart
    if (this.props.stateOpenCartAfterAuth) {
      this.props.onOpenCart()
    
      //test:還原openCartAfterAuth, 不然會一直打開
      this.props.openCartAfterAuth(false)
      //test
    }
  }
  render() {
    const FontAwesome = require('react-fontawesome')
    const { selectedOption } = this.state;
    
    let productImage
    //this.props.productDetail有值才出現圖片不然讀不到圖片會有error
    if(Object.keys(this.props.productDetail).length){
      productImage = (
        <img alt="products" src={require(`../../assets/image/${this.props.productDetail.img}.jpg`)}/>
      )
    }

    //登入登出的白色border, 登出沒有,登入才有
    const buttonColor = this.state.checkoutText === '放入購物車' 
    ? `${css.orange}` 
    : `${css.skyblue}`;
    return (
      <div className={css.productPageWrap}>
        <div className="containerWrap">
          <div className={css.productFlex}>
            <div>
              {productImage}
            </div>
            <div  className={css.rightSection}>
              <div className={css.container}>
                <header>{this.props.productDetail.name}</header>
                  <header>{this.props.productDetail.desc}</header>
                <div>${this.props.productDetail.price}</div>
                <div>
                  <div className={css.numberTitle}>數量:</div>
                      <Select
                    defaultValue={options[0]}
                    value={selectedOption}
                    onChange={this.handleChange}
                    options={options}
                    width="100"
                    style={{width:'120px'}}
                  />
                </div>
                <div 
                  className = {buttonColor}
                  onClick={()=> this.addOrCheckout(this.state.checkoutText)}>
                  <FontAwesome
                    style={{fontSize:'20px',color:'white'}}
                    name="shopping-cart"
                    />
                  <span                 style={{marginLeft:'5px',color:'white'}}
  >{this.state.checkoutText}</span>
                  </div>
                <p>
                付款後，從備貨到寄出商品為 1 個工作天。（不包含假日）
                設計館提供統一發票或免用統一發票收據
                國泰世華信用卡三期零利率，滿 NT$1,500 六期零利率
                </p>
                <hr/>
                <p>
                簡約羅馬數字機械腕錶📷
                <br/>
                  原裝自動機械機芯⛓無需電池、永久走時
                  <br/>

                  歡迎個人化訂製，免費雕刻文字🛠
                  <br/>
                  #特顯個性 刻上您簽名的機械腕錶
                  <br/>
                  亦可提供圖片來圖訂製🔩
                  <br/>
                  DESIGN YOUR OWN
                  <br/>
                  夜光功能，自動上鏈，精準走時⛓
                  <br/>
                  原裝機械機芯⚙️
                  <br/>
                  「利用擺陀佩戴過程中旋擺來驅動發條產生能源，從而推動走時。」
                  <br/>
                  「複雜的工藝和精心設計使得機械錶有很高的欣賞價值。」
                  <br/>
                  .
                  <br/>
                  錶帶尺寸可調節🌖
                  <br/>
                  男女都適合佩戴🌗
                  <br/>
                  .
                  <br/>
                  詳情歡迎向我們查詢
                  <br/>
                  **
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    productDetail: state.product.productDetail,
    cart: state.cart.cart,
    stateOpenCartAfterAuth: state.cart.openCartAfterAuth      
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addToCart: product => dispatch({ type: actionTypesCart.ADD_TOCART, product }),
    findProduct: id => dispatch({ type: actionTypesProduct.FIND_PRODUCT, id }),
    onOpenCart: () => dispatch({ type: actionTypesCart.ONOPEN_CART}),
    openCartAfterAuth: isOpen => dispatch({ type: actionTypesCart.OPENCART_AFTERAUTH, isOpen }),
    alert: () => dispatch(actions.alert())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(productPage);