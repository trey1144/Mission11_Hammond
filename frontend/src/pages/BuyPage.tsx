import { useNavigate, useParams } from 'react-router-dom';
import Welcome from '../components/Welcome';
import { CartItem } from '../types/CartItem';
import { useCart } from '../context/CartContext';

function BuyPage() {
  const navigate = useNavigate();
  const { title, bookID, price } = useParams();
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const newItem: CartItem = {
      bookID: Number(bookID),
      title: title || 'No Book Found',
      price: Number(price),
    };
    addToCart(newItem);
    navigate('/cart');
  };

  return (
    <>
      <Welcome />
      <h2>Buy {title}</h2>

      <div>
        <p className="text-muted">Price: ${price}</p>
        <button
          onClick={handleAddToCart}
          className="btn btn-success btn-lg w-50 mb-3"
        >
          Add to Cart
        </button>
      </div>
      <button
        onClick={() => navigate(-1)}
        className="btn btn-outline-secondary btn-lg w-50"
      >
        <i className="bi bi-arrow-left"></i>
        Go Back
      </button>
    </>
  );
}

export default BuyPage;
