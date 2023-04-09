import React, { useState, useContext, useReducer, useEffect } from "react";
import cartItems from "./data";
import reducer from "./reducer";
import {
  ClearCart,
  Remove,
  Increase,
  Decrease,
  Loading,
  Display,
} from "./actions";
import { getTotal } from "./utils";

// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = "https://course-api.com/react-useReducer-cart-project";
const AppContext = React.createContext();

const defaultValue = {
  loading: false,
  cart: new Map(cartItems.map((item) => [item.id, item])),
};

const AppProvider = ({ children }) => {
  //const [cart, setCart] = useState(cartItems)
  const [state, dispatch] = useReducer(reducer, defaultValue);

  const { totalAmount, totalCost } = getTotal(state.cart);

  const clearCart = () => {
    dispatch({ type: ClearCart });
  };

  const remove = (id) => {
    dispatch({ type: Remove, payLoad: { id } });
  };

  const increase = (id) => {
    dispatch({ type: Increase, payLoad: { id } });
  };

  const decrease = (id) => {
    dispatch({ type: Decrease, payLoad: { id } });
  };

  const fetchData = async (url) => {
    dispatch({ type: Loading });
    try {
      const response = await fetch(url);
      const data = await response.json();
      dispatch({ type: Display, payLoad: { data } });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData(url);
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        remove,
        increase,
        decrease,
        totalAmount,
        totalCost,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
