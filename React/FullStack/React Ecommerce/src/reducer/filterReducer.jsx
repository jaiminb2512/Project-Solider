const initialState = {
  filter_products: [],
  all_products: [],
  grid_view: true,
  sorting_value: "lowest",
  filters: {
    text: "",
    category: "all",
    company: "all",
    color: "all",
    maxPrice: 0,
    price: 0,
    minPrice: 0,
  },
  price: {
    maxPrice: 0,
    minPrice: 0,
  },
};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD_FILTER_PRODUCT":
      let priceArr = action.payload.map((curElem) => curElem.price);
      // console.log(priceArr);
      let numericPriceArr = priceArr
        .filter((value) => !isNaN(value) && value !== null && value !== undefined)
        .map(Number);

      let maxPrice = numericPriceArr.length > 0 ? Math.max(...numericPriceArr) : 0;
      // console.log(maxPrice);

      return {
        ...state,
        filter_products: [...action.payload],
        all_products: [...action.payload],
        filters: {
          ...state.filters,
          maxPrice,
          price: maxPrice,
          minPrice: 0,
        },
        price: {
          maxPrice,
          minPrice: 0,
        },
      };

    case "SET_GRIDVIEW":
      return {
        ...state,
        grid_view: true,
      };

    case "SET_LISTVIEW":
      return {
        ...state,
        grid_view: false,
      };

    case "GET_SORT_VALUE":
      return {
        ...state,
        sorting_value: action.payload,
      };

    case "SORTING_PRODUCTS":
      const { filter_products, sorting_value } = state;
      let tempSortProduct = [...filter_products];

      const sortingProducts = (a, b) => {
        if (sorting_value === "lowest") {
          return a.price - b.price;
        }
        if (sorting_value === "highest") {
          return b.price - a.price;
        }
        if (sorting_value === "a-z") {
          return a.name.localeCompare(b.name);
        }
        if (sorting_value === "z-a") {
          return b.name.localeCompare(a.name);
        }
      };

      const newSortData = tempSortProduct.sort(sortingProducts);

      return {
        ...state,
        filter_products: newSortData,
      };

    case "UPDATE_FILTERS_VALUE":
      const { name, value } = action.payload;
      return {
        ...state,
        filters: {
          ...state.filters,
          [name]: value,
        },
      };

    case "FILTER_PRODUCTS":
      let { all_products, filters } = state;
      let tempFilterProduct = [...all_products];

      const { text, category, company, color, price } = filters;

      if (text) {
        tempFilterProduct = tempFilterProduct.filter((curElem) =>
          curElem.name.toLowerCase().includes(text.toLowerCase())
        );
      }

      if (category !== "all") {
        tempFilterProduct = tempFilterProduct.filter((curElem) => {
          return curElem.category.toLowerCase() === category.toLowerCase();
        });
      }

      if (company !== "all") {
        tempFilterProduct = tempFilterProduct.filter((curElem) => {
          return curElem.company.toLowerCase() === company.toLowerCase();
        });
      }

      if (color !== "all") {
        tempFilterProduct = tempFilterProduct.filter((curElem) =>
          curElem.colors.includes(color)
        );
      }

      if (price) {
        tempFilterProduct = tempFilterProduct.filter(
          (curElem) => curElem.price <= price
        );
      }

      return {
        ...state,
        filter_products: tempFilterProduct,
      };

    case "CLEAR_FILTERS":
      return {
        ...state,
        filters: {
          ...state.filters,
          text: "",
          category: "all",
          company: "all",
          color: "all",
          maxPrice: state.filters.maxPrice,
          price: state.filters.maxPrice,
          minPrice: state.filters.minPrice,
        },
      };

    default:
      return state;
  }
};

export default filterReducer;
