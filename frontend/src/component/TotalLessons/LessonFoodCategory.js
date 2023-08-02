import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCategories } from '../../store/lessonInfo/lessonInfo';

function LessonFoodCategory() {
  const dispatch = useDispatch();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCategoriesIdx, setSelectedCategoriesIdx] = useState([]);
  const foodCategories = [
    '한식', '양식', '중식', '일식', '아시안', '건강식', '디저트'
  ];

  const handleCategoryClick = (category, index) => {
    let updatedSelectedCategories = [...selectedCategories];
    let updatedSelectedCategoriesIdx = [...selectedCategoriesIdx];

    if (selectedCategories.includes(category)) {
      updatedSelectedCategories = updatedSelectedCategories.filter((c) => c !== category);
      updatedSelectedCategoriesIdx = updatedSelectedCategoriesIdx.filter((c) => c !== index);
    } else {
      updatedSelectedCategories.push(category);
      updatedSelectedCategoriesIdx.push(index);
    }

    setSelectedCategories(updatedSelectedCategories);
    setSelectedCategoriesIdx(updatedSelectedCategoriesIdx);

    dispatch(setCategories(updatedSelectedCategoriesIdx));
  };

  return (
    <div style={{ display: 'flex' }}>
      {foodCategories.map((category, index) => (
        <div
          key={index}
          onClick={() => handleCategoryClick(category, index)}
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
