import { CartProvider } from "cart-library-hmman444";
import CartDemo from "./CartDemo";

function App() {
  return (
    <CartProvider>
      <CartDemo />
    </CartProvider>
  );
}

export default App;