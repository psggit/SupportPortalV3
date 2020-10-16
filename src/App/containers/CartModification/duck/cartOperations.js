const unAvailableProductText = "Product is not available";

let getProductFromSku = (sku) => {
  return {
    sku_id: sku.sku_id,
    brand_name: sku.brand_name,
    brand_id: sku.brand_id,
    price: sku.price,
    volume: sku.volume,
    count: 1,
    available: true,
    subText: unAvailableProductText,
  };
};

let addProduct = (state, sku) => {
  let prod = state.products[sku.sku_id.toString()];
  if (prod === undefined) {
    prod = getProductFromSku(sku);
  } else {
    prod.count += 1;
  }
  // state.products[prod.sku_id.toString()] = prod;
  return state;
};

let removeProduct = (state, sku) => {
  let prod = state.products[sku.sku_id.toString()];
  if (prod === undefined) {
    return state;
  } else {
    prod.count -= 1;
  }
  if (prod.count === 0) {
    delete state.products[prod.skuId.toString()];
  }
  return state;
};

export { addProduct, removeProduct };
