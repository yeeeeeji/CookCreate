import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCategories } from '../../store/lesson/lessonSearch';

function LessonFoodCategory() {
  const dispatch = useDispatch();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const foodCategories = [
    '한식', '양식', '중식', '일식', '아시안', '건강식', '디저트'
  ];

  const handleCategoryClick = (category) => {
    let updatedSelectedCategories = [...selectedCategories];

    if (selectedCategories.includes(category)) {
      updatedSelectedCategories = updatedSelectedCategories.filter((c) => c !== category);
    } else {
      updatedSelectedCategories.push(category);
    }

    setSelectedCategories(updatedSelectedCategories);

    const selectedCategoriesIdx = foodCategories.reduce((result, cat, index) => {
      if (updatedSelectedCategories.includes(cat)) {
        result.push(index + 1);
      }
      return result;
    }, []);

    dispatch(setCategories(selectedCategoriesIdx));
  };

  return (
    <div style={{ display: 'flex' }}>
      {foodCategories.map((category, index) => (
        <div
          key={index}
          onClick={() => handleCategoryClick(category)}
          style={{
            backgroundColor: selectedCategories.includes(category) ? 'lightgray' : 'white',
            padding: '5px',
            marginRight: '5px',
            cursor: 'pointer',
          }}
        >
          {category}
        </div>
      ))}
    </div>
  );
}

export default LessonFoodCategory;
