import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { setCategory } from "../../store/lesson/lesson";

function FoodCategory() {
  const dispatch = useDispatch();
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = ['한식', '양식', '중식', '일식', '아시안', '건강식', '디저트'];

  const handleCategoryClick = () => {
    setIsExpanded((prevExpanded) => !prevExpanded);
  };

  const chooseCategory = (category, index) => {
    setSelectedCategory(category);
    setSelectedIndex(index)
    setIsExpanded(false);
  };
  useEffect(() => {
    dispatch(setCategory(selectedIndex));
  }, [dispatch, selectedIndex])
  return (
    <div style={{ maxWidth: '100px'}}>
      <h3 onClick={handleCategoryClick}>
        {selectedCategory ? selectedCategory : '카테고리'}
      </h3>
      {isExpanded && (
        <div
          style={{
            border: '2px solid black',
            padding: '5px',
          }}
        >
          {categories.map((category, index) => (
            <div
              key={index}
              onClick={() => chooseCategory(category, index)}
              style={{
                border: '2px solid black',
                cursor: 'pointer',
                marginBottom: '5px',
                backgroundColor: selectedCategory === category ? 'lightgray' : 'white',
                padding: '3px 5px',
              }}
            >
              {category}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FoodCategory;
