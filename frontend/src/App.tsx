import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookPage from './pages/BookPage';
import BuyPage from './pages/BuyPage';
import { CartProvider } from './context/CartContext';
import CartPage from './pages/CartPage';
import AdminBooksPage from './pages/AdminBooksPage';

// App component that has all the routes
// with the cart provider around everything so that each page can access and use functions from the context page
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
            <Route path="/adminbooks" element={<AdminBooksPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </>
  );
}

export default App;
