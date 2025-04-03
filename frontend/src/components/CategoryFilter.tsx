import { useEffect, useState } from 'react';
import './CategoryFilter.css';

// component that grabs the categories from the database and then when a category is chosen it is passed to the book list
function CategoryFilter({
  selectedCategories,
  setSelectedCategories,
}: {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
}) {
  const [categories, setCategories] = useState<string[]>([]);

  // grab all of the categories from the database
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          'https://mission13-hammond-backend-gffrduhahwfke4gf.eastus-01.azurewebsites.net/Book/GetBookCategories'
        );
        const data = await response.json();
        console.log('Fetched categories: ', data);
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories: ', error);
      }
    };
    fetchCategories();
  }, []);

  // sets the selected categories to the updated one when a checkbox is pressed
  function handleCheckboxChange({ target }: { target: HTMLInputElement }) {
    const updatedCategories = selectedCategories.includes(target.value)
      ? selectedCategories.filter((x) => x !== target.value)
      : [...selectedCategories, target.value];
    setSelectedCategories(updatedCategories);
  }

  return (
    <>
      <div className="category-filter">
        <h5>Project Types</h5>
        <div className="category-list">
          {categories.map((c) => (
            <div key={c} className="category-item">
              <input
                type="checkbox"
                id={c}
                value={c}
                className="category-checkbox"
                onChange={handleCheckboxChange}
              />
              <label htmlFor={c}>{c}</label>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default CategoryFilter;
