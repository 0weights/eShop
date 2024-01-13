const addDecimals = (num) => {
  return Math.round(num * 100 / 100).toFixed(2);
}

const addToCartPriceCalculations = (state) => {
  state.count = 0;
  // console.log(typeof(state.cartItems[0].qty));
  state.itemsPrice = addDecimals(state.cartItems.reduce(
      (acc,item) => {
        state.count += item.qty;
        return acc + item.price * item.qty;
      }, 0
    )
  )
  
  state.shippingPrice = addDecimals(state.itemsPrice > 100 || state.itemsPrice == 0 ? 0 : 10);

  state.taxPrice = addDecimals(Number( (0.15 * state.itemsPrice).toFixed(2)) );
  
  state.totalPrice = (
    Number(state.itemsPrice) + Number(state.shippingPrice) + Number(state.taxPrice)
  ).toFixed(2);

  localStorage.setItem('cart', JSON.stringify(state))
  console.log(state.itemsPrice)
  return state;
}

export default addToCartPriceCalculations;