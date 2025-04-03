import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

// cart summary component that gives a dynamic cart total as things are added
// when the element is clicked it navigates to the cartpage
// also has styling along with it
const CartSummary = () => {
  const navigate = useNavigate();
  const { cart } = useCart();
  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);
  return (
    <div
      style={{
        position: 'fixed',
        top: '10px',
        right: '20px',
        background: '#f8f9fa',
        padding: '10px 15px',
        border: '8px solid transparent',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
        fontSize: '16px',
      }}
      onClick={() => navigate('/cart')}
    >
      🛒 <strong>${totalAmount.toFixed(2)}</strong>
    </div>
  );
};

export default CartSummary;
