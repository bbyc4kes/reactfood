import { useContext } from "react";
import Button from "./UI/Button";
import { CartContext } from "../store/shopping-cart-context";
import UserProgressContext from "../store/user-progress-context";

function Header() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const totalCartItems = cartCtx.items.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  const handleShowCart = () => {
    userProgressCtx.showCart();
  };
  return (
    <header id="main-header">
      <div id="title">
        <img src="logo.jpg" alt="App logo" />
        <h1>Reactfood</h1>
      </div>
      <nav>
        <Button textBtn={true} onClick={handleShowCart}>
          Cart({totalCartItems})
        </Button>
      </nav>
    </header>
  );
}

export default Header;
