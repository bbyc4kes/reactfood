import { createContext, useReducer } from "react";

export const CartContext = createContext({
  items: [],
  addItemToCart: (item) => {},
  removeItemFromCart: (id) => {},
  clearCart: () => {},
});

function shoppingCartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const updatedItems = [...state.items];

    const existingCartItemIndex = updatedItems.findIndex(
      (cartItem) => cartItem.id === action.item.id
    );

    const existingCartItem = updatedItems[existingCartItemIndex];

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      //   const product = DUMMY_PRODUCTS.find(
      //     (product) => product.id === action.payload
      //   );
      //   updatedItems.push({
      //     id: action.payload,
      //     name: product.title,
      //     price: product.price,
      //     quantity: 1,
      //   });
      updatedItems.push({ ...action.item, quantity: 1 });
    }

    return {
      ...state, // not needed here because we have only one state
      items: updatedItems,
    };
  }

  if (action.type === "REMOVE_ITEM") {
    const updatedItems = [...state.items];

    const existingCartItemIndex = updatedItems.findIndex(
      (cartItem) => cartItem.id === action.id
    );

    const existingCartItem = updatedItems[existingCartItemIndex];

    if (existingCartItem.quantity === 1) {
      updatedItems.splice(existingCartItemIndex, 1);
    } else {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      ...state,
      items: updatedItems,
    };
  }

  if (action.type === "CLEAR_CART") {
    return { ...state, items: [] };
  }

  return state;
}

export function CartContextProvider({ children }) {
  const [shoppingCartState, shoppingCartDispatch] = useReducer(
    shoppingCartReducer,
    {
      items: [],
    }
  );

  function handleAddItemToCart(item) {
    shoppingCartDispatch({
      type: "ADD_ITEM",
      item,
    });
  }

  function handleUpdateCartItemQuantity(id) {
    shoppingCartDispatch({
      type: "REMOVE_ITEM",
      id,
    });
  }

  function handleClearCart() {
    shoppingCartDispatch({
      type: "CLEAR_CART",
    });
  }

  const ctxValue = {
    items: shoppingCartState.items,
    addItemToCart: handleAddItemToCart,
    removeItemFromCart: handleUpdateCartItemQuantity,
    clearCart: handleClearCart,
  };

  //   console.log(ctxValue);

  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  );
}

// export default CartContextProvider;
