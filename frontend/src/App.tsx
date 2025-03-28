import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookPage from './pages/BookPage';
import BuyPage from './pages/BuyPage';
import { CartProvider } from './context/CartContext';
import CartPage from './pages/CartPage';

// App component that renders the BookList component
function App() {
  return (
    <>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<BookPage />} />
            <Route path="/books" element={<BookPage />} />
            <Route path="/buy/:title/:bookID/:price" element={<BuyPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </>
  );
}

export default App;
