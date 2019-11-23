import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import Select from 'react-select';

import css from './home.module.scss';
import productJson from '../../Static/product.json';
import colors from '../../Static/colors.json';
const colorOptions = [
  { value: 'all', label: '全部顏色' },
  { value: 'red', label: '紅色' },
  { value: 'black', label: '黑色' },
  { value: 'brown', label: '咖啡色' },
  { value: 'grey', label: '灰色' },
  { value: 'yellow', label: '黃色' },
  { value: 'green', label: '綠色' },
  { value: 'blue', label: '藍色' },
]
class Home extends Component {
  state = {
    colors:colors,
    inputArray: document.getElementsByTagName("INPUT"),
    isClearButton:null,
    product: productJson,
    selectedColor: '',
    isShowKeyboard:false,
  }
  /**
   * 手機板的顏色filter
   */
  handleChange = selectedColor => {
    this.setState({ selectedColor });
  };

  /**
   * user點選'清除選取', 回復到預設
   */
  clearFilter = () =>{
    //呈現所有product & 清掉清除選取button
    this.setState(() => ({ product: productJson}));
    this.setState(() => ({ isClearButton: null}));

    //uncheck已經check過的input 
    for (let i in this.state.inputArray){
      let isChecked = Boolean(this.state.inputArray[i].checked)
      if(isChecked) {
        this.state.inputArray[i].checked = false;
      } 
    }
  }

  /**
   * 按照user選的顏色呈現出對應的產品
   * @param {object} e 該按鈕
   */
  displaySelectedProduct = e =>{
    const colorSelected = e.target.getAttribute('data-tag')
    const sortColor = productJson.filter(i=>i.color === colorSelected)
    this.setState(() => ({ product: sortColor}));
  }
  /**
   * 手機板的顏色filter:一進來預設為全部顏色(全部顯示)
   */
  componentDidMount = () => this.setState({ selectedColor: { value: 'all', label: '全部顏色' }});

  render() {
    const { selectedColor,isShowKeyboard } = this.state;

    let {isClearButton} = this.state
    for (let i in this.state.inputArray){
      let isChecked = Boolean(this.state.inputArray[i].checked)
      if(isChecked){
        isClearButton = (
          <div style={{cursor:'pointer',color:'#2e90b7',marginBottom: '15px'}} onClick={this.clearFilter}>清除選取 x</div>
        )
      }
    }


    //左邊的顏色列表; !input上面的name="color"一定要在不然會有bug, 暫時無解
    // https://www.freecodecamp.org/forum/t/react-onclick-get-li-clicked-solved/68112
    // https://stackoverflow.com/questions/20377837/how-to-access-custom-attributes-from-event-object-in-react
    // https://stackoverflow.com/questions/48699573/correct-use-of-arrow-functions-in-react
    const displayColorsOnLeft = this.state.colors.map((v,i) => (
    <label key={i} className={css.select}>
        <input style={{display:'none'}} type="radio" data-tag={v.color} name="color" onClick={this.displaySelectedProduct.bind(this)} />
        <span className={css.color}><div className={css.fuck1} style={{background:v.style}}></div></span>  
    </label>
    ));

    //右邊的產品列表
    let { product } = this.state;
    //手機板的顏色filter: 如果user有選取顏色, 則顯示該對應的商品
    if(this.state.selectedColor.value != 'all') product = productJson.filter(i=>i.color === this.state.selectedColor.value)
    
    const productList = product.map(product => (
      <div key={product.id} className={css.productWrap}>
        <Link
          to={'/product-page/' + product.id}>
          <img src={require(`../../assets/image/${product.img}.jpg`)} alt="Card image cap" />
          <div className={css.productDescription}>
            <div>{product.name}</div>
            <div>{product.desc}</div>
            <div>NT ${product.price}</div>
          </div>
        </Link>
      </div>
    ));

    return (
      <div className={css.pageWrap} >
          <main className="containerWrap">
            <aside className={css.homeAside1} style={{paddingRight:'20px'}}>
              <div className={css.titleWrap} style={{marginBottom:'15px'}}>
                <h3>選取顏色</h3>
              </div>
              <div>
                {isClearButton}
                <ul className={css.homeColorFilter}>
                  {displayColorsOnLeft}
                </ul >
              </div>
            </aside>
            <aside className={css.homeAside2}>
            <header className={css.header}>時尚腕錶</header>
            <section className={css.mobileFilter}>
              <Select
                  defaultValue={colorOptions[0]}
                  value={selectedColor}
                  onChange={this.handleChange}
                  options={colorOptions}
                  width="100"
                  isSearchable = {isShowKeyboard}
                  placeholder = {this.foo}
                  style={{width:'120px'}}
                />
            </section>
            <div>顯示 {product.length} 個結果</div>
            <hr/>

              <div className={css.productList}>
                {productList}
              </div>
            </aside>
          </main>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    cart: state.cart.cart,
  }
}
export default connect(mapStateToProps, null)(Home)
