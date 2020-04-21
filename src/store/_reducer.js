import * as actionTypes from "./actions";

const initialState = {
  products: [],
  sortedProducts: [],
  filteredProducts: [],
  filterForSize: [],
};

const lowestToHighestSort = (product1, product2) => {
  if (product1.price < product2.price) {
    //product1 should be first
    return -1;
  } else if (product1.price > product2.price) {
    //product1 should be second
    return 1;
  } else {
    //both are same
    return 0;
  }
};

const highestToLowestSort = (product1, product2) => {
  if (product1.price < product2.price) {
    //product1 should be first
    return 1;
  } else if (product1.price > product2.price) {
    //product1 should be second
    return -1;
  } else {
    //both are same
    return 0;
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_PRODUCTS:
      return {
        ...state,
        //here we want to create entire new array and override any values already existing in state
        //because incoming product array is from the server.
        products: [...action.products.products],
      };

    case actionTypes.LOWEST_TO_HIGHEST:
      let productList;
      if (state.filteredProducts.length > 0) {
        //if filtered list has products inside it then we will
        productList = state.filteredProducts;
      } else {
        productList = state.products;
      }
      const UpdatedSortedList = [...productList];

      return {
        ...state,
        filteredProducts: UpdatedSortedList.sort(lowestToHighestSort),
      };

    case actionTypes.HIGHEST_TO_LOWEST:
      let productList2;
      if (state.filteredProducts.length > 0) {
        //if filtered list has products inside it then we will
        productList2 = state.filteredProducts;
      } else {
        productList2 = state.products;
      }
      const UpdatedSortedList2 = [...productList2];

      return {
        ...state,
        filteredProducts: UpdatedSortedList2.sort(highestToLowestSort),
      };

    case actionTypes.ADD_FILTER:
      const UpdatedFilterForSize = [...state.filterForSize];
      UpdatedFilterForSize.push(action.ProductSize);

      let productList3;

      if (state.sortedProducts.length > 0) {
        //if user has already applied sorting then we will apply filter on that
        //sorted array.
        productList3 = state.sortedProducts;
      } else {
        //if there is no sorting applied by user then we will apply filter on the original
        //productlist.
        productList3 = state.products;
      }

      let UpdatedFilteredtList = [];

      //loop through the list of all the products
      for (let index = 0; index < productList3.length; index++) {
        let product = productList3[index];

        for (let index2 = 0; index2 < product.availableSizes.length; index2++) {
          let currentSize = product.availableSizes[index2];

          //here we will check if the size of this product includes in the filter size list.
          //if yes then we will add this object inside the updatedfilteredList.
          if (UpdatedFilterForSize.includes(currentSize)) {
            UpdatedFilteredtList.push(product);
            //break loop because this product size is required.
            break;
          }
        }
      }

      return {
        ...state,
        filterForSize: UpdatedFilterForSize,
        filteredProducts: UpdatedFilteredtList,
      };

    case actionTypes.REMOVE_FILTER:
      let productList4;

      if (state.sortedProducts.length > 0) {
        //if user has already applied sorting then we will apply filter on that
        //sorted array.
        productList4 = state.sortedProducts;
      } else {
        //if there is no sorting applied by user then we will apply filter on the original
        //productlist.
        productList4 = state.products;
      }

      const UpdatedFilterForSize2 = [...state.filterForSize];

      let index = UpdatedFilterForSize2.indexOf(action.ProductSize);

      if (index === -1) {
        return {
          ...state,
        };
      }

      UpdatedFilterForSize2.splice(index, 1);

      let UpdatedFilteredtList2 = [];

      //loop through the list of all the products
      for (let index = 0; index < productList4.length; index++) {
        let product = productList4[index];

        for (let index2 = 0; index2 < product.availableSizes.length; index2++) {
          let currentSize = product.availableSizes[index2];

          //here we will check if the size of this product includes in the filter size list.
          //if yes then we will add this object inside the updatedfilteredList.
          if (UpdatedFilterForSize2.includes(currentSize)) {
            UpdatedFilteredtList2.push(product);
            //break loop because this product size is required.
            break;
          }
        }
      }
      return {
        ...state,
        filterForSize: UpdatedFilterForSize2,
        filteredProducts: UpdatedFilteredtList2,
      };

    case actionTypes.SELECT:
      if (state.filterForSize.length === 0) {
        let emptyArray = [];
        return {
          ...state,
          sortedProducts: emptyArray,
          filteredProducts: emptyArray,
        };
      }

      let productList5 = state.products;

      let UpdatedFilteredtList5 = [];

      //loop through the list of all the products
      for (let index = 0; index < productList5.length; index++) {
        let product = productList5[index];

        for (let index2 = 0; index2 < product.availableSizes.length; index2++) {
          let currentSize = product.availableSizes[index2];

          //here we will check if the size of this product includes in the filter size list.
          //if yes then we will add this object inside the updatedfilteredList.
          if (UpdatedFilteredtList5.includes(currentSize)) {
            UpdatedFilteredtList5.push(product);
            //break loop because this product size is required.
            break;
          }
        }
      }

      return {
        ...state,
        filteredProducts: UpdatedFilteredtList5,
      };

    default:
      return state;
  }
};

export default reducer;
