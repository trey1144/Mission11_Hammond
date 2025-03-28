import { useState } from 'react';
import Welcome from '../components/Welcome';
import CategoryFilter from '../components/CategoryFilter';
import BookList from '../components/BookList';
import CartSummary from '../components/CartSummary';
import DarkMode from '../components/DarkMode';

function BookPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  return (
    <>
      <div className="container mt-4">
        <CartSummary />
        <Welcome />
        <div className="row">
          <div className="col-md-3">
            <CategoryFilter
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            />
          </div>
          <div className="col-md-9">
            <BookList selectedCategories={selectedCategories} />
          </div>
          <DarkMode />
        </div>
      </div>
    </>
  );
}
export default BookPage;
