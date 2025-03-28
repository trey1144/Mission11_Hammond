import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();
  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);
  return (
    <div>
      <h2>Your cart</h2>
      <div>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul>
            {cart.map((item: CartItem) => (
              <li key={item.bookID}>
                {item.title}: ${item.price.toFixed(2)}
                <button
                  onClick={() => removeFromCart(item.bookID)}
                  className="btn btn-outline-danger btn-sm"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <h3>Total: ${totalAmount.toFixed(2)}</h3>
      <button className="btn btn-success btn-lg w-50 my-2">Checkout</button>
      <button
        onClick={() => navigate('/books')}
        className="btn btn-outline-primary btn-lg w-50"
      >
        Continue Browsing
      </button>
    </div>
  );
}

export default CartPage;
