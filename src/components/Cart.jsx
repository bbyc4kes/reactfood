import { useContext } from "react";
import Modal from "./UI/Modal";
import { CartContext } from "../store/shopping-cart-context";
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button";
import UserProgressContext from "../store/user-progress-context";
import CartItem from "./CartItem";

function Cart() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  const handleCloseCart = () => {
    userProgressCtx.hideCart();
  };

  const handleAddItemToCart = (item) => {
    cartCtx.addItemToCart(item);
  };

  const handleRemoveItemToCart = (id) => {
    cartCtx.removeItemFromCart(id);
  };

  const handleProceedToCheckout = (e) => {
    userProgressCtx.showCheckout();
  };

  return (
    <Modal
      className="cart"
      open={userProgressCtx.progress === "cart"}
      onClose={
        userProgressCtx.progress === "cart" ? handleCloseCart : undefined
      }
    >
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            price={item.price}
            onIncrease={() => handleAddItemToCart(item)}
            onDecrease={() => handleRemoveItemToCart(item.id)}
          />
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button textBtn onClick={handleCloseCart}>
          Close
        </Button>
        {cartCtx.items.length > 0 && (
          <Button onClick={handleProceedToCheckout}>Go to Checkout</Button>
        )}
      </p>
    </Modal>
  );
}

export default Cart;
