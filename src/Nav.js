import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createBrowserHistory } from 'history';

import styles from './Nav.module.scss';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table, Alert } from 'reactstrap';
import { cart as actionTypesCart } from './store/action/cart';
// import Select from 'react-select';
// import 'react-dropdown/style.css';

const history = createBrowserHistory();
class Navbar extends Component {
  state = {
    item: '',
    modal: false,
    selectedOption: null,
    urlRouter: [
      {id:0,url:"auth",pageName:'註冊/登入'},
      {id:1,url:"about-us",pageName:'關於我們'},
      {id:2,url:"redux-practice",pageName:'redux練習'}
    ],
    redirect:null
  }
  /**
   * 按下結帳按鈕觸發alert & 清空
   * @param {number} totalPrice 總價
   */
  checkOut = totalPrice => {
    alert(`已經從您的信用卡扣款${totalPrice}元`)
    this.props.clearCart()
    history.push('/')
    window.location.reload(true)
  }

  /**
   * 按下登入並結帳按鈕帶到auth頁
   */
  signinToCheckout = () =>{
    history.push('/auth')
    window.location.reload(true)
    this.props.openCartAfterAuth(true)
  }
  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  }
  componentDidUpdate = prevProps => {
   //比較global reducer的cart.isOpenCart 有改變時啟動開合
    if (this.props.isOpenCart !== prevProps.isOpenCart) this.toggle()

    //未登入結帳需先登入
    if (this.props.cartStateOpenCartrtAfterAuth !== prevProps.cartStateOpenCartrtAfterAuth) this.toggle()    
  }

  render() {
    const FontAwesome = require('react-fontawesome')

     //算總數量
    let totalQty = null
    let i
    for (i in this.props.cart) {
      totalQty += this.props.cart[i].qty
    }

    let cart = null
    if (this.props.cart.length) {
      cart = (
          <div className={styles.shoppingcartWrap} 
            onClick={this.toggle}>
            <FontAwesome
                name="shopping-cart"
                className={styles.shoppingcartIcon}
              />
            <div className={styles.numberWrap}>
              <div className={styles.number}>
                {totalQty}
              </div>
            </div>
        </div>
      )
    } else {
      cart = (
          <div className={styles.shoppingcartWrap} onClick={this.toggle}>
            <FontAwesome
                name="shopping-cart"
                className={styles.shoppingcartIcon}
                />
            </div>
      )
    }
    const totalPrice = this.props.cart.reduce((acc, item) => (acc += item.price * item.qty), 0)
    
    //如果登入, 顯示使用者帳戶
    let isShowUserPage
    if(this.props.isAuthenticated){
      isShowUserPage = (
        <Link to='/user-account'>
        Hi, 歡迎你 :)
      </Link>
      )
    }

    //登入登出的白色border, 登出沒有,登入才有
    const whiteBorder = !this.props.isAuthenticated ? `${styles.whiteBorder}` : '';

    // 提示已經有商品放入購物車了
    let alert = null
    if (this.props.isAlertMessage) {
      alert = (
        <div>
          <div className={styles.popupMessage}>
          <FontAwesome
          className={styles.checkIcon}
          name="check-circle"/>
          商品已放入購物車
        </div>
      </div>
      )
    } 
    return (
      <div style={{position:'relative'}}>
        {alert}
      <nav>
        {/* toggle可讓點選Modal window外的地方也能關掉 */}
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader>購物車</ModalHeader>
          {this.props.cart.length ?
            <div>
              <ModalBody>
                <Table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>品項</th>
                      <th>價格</th>
                      <th>數量</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.cart.map((i, index) =>
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{i.name}</td>
                        <td>{i.price}</td>
                        <td>{i.qty}</td>
                        <td>
                          <Button
                            style={{backgroundColor:'#3d8663'}}
                            onClick={() => this.props.deleteItem(i.id)}
                          >X</Button></td>
                      </tr>
                    )}
                  </tbody>
                </Table>
                <Alert style={{backgroundColor:'#f50057',color:'white'}} className="text-right">
                  總價：
                    {this.props.cart.reduce((acc, item) => (acc += item.price * item.qty), 0)}
                  元
                </Alert>
              </ModalBody>
              <ModalFooter>
                {this.props.isAuthenticated
                ? <Button color="primary" onClick={() => this.checkOut(totalPrice)}>結帳</Button>
                : <Button style={{backgroundColor:'#025839'}} onClick={() => this.signinToCheckout()}>登入並結帳</Button>
                }
                <Button style={{backgroundColor:'#3d8663',color:'white'}} onClick={this.toggle}>取消</Button>
              </ModalFooter>
            </div>
            :
            <div>
              <ModalBody>
                購物車內沒有商品
              </ModalBody>
            </div>
          }
        </Modal>
        <div className={`${styles.navContainer} containerWrap`}>
          <div>
            <Link to="/">
            <FontAwesome
              className={styles.shieldIcon}
              name="shield"/>
            </Link>
          </div>
          <ul>
            <li>
              {isShowUserPage}
            </li>
            <li>
             {cart}
            </li>
            {this.props.isAuthenticated
              ? <Link to="/logout"><li className = {whiteBorder}>登出</li></Link>
              : <Link to="/auth"><li className = {whiteBorder}>註冊/登入</li></Link>
            }                       
            </ul>
        </div>
      </nav >
      </div>

    );
  };
}
const mapStateToProps = state => {
  return {
    cart: state.cart.cart,
    isAuthenticated: state.auth.token !== null,
    isOpenCart : state.cart.isOpenCart,
    cartStateOpenCartrtAfterAuth: state.cart.openCartAfterAuth,
    isAlertMessage: state.message.isAlertMessage
  }
}
const mapDispatchToProps = dispatch => {
  return {
    addToCart: product => dispatch({ type: actionTypesCart.ADD_TOCART, product }),
    clearCart: () => dispatch({ type: actionTypesCart.CLEAR_CART}),
    deleteItem: id => dispatch({ type: actionTypesCart.DELETE_ITEM, id }),
    openCartAfterAuth: isOpen => dispatch({ type: actionTypesCart.OPENCART_AFTERAUTH, isOpen }),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
