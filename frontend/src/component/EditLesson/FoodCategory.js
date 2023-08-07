import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory, setCategoryValid } from "../../store/lesson/lessonEdit";

function FoodCategory() {
  const dispatch = useDispatch();
  const initCategory = useSelector((state) => state.lessonInfo.categoryId)
  const transformCategoryId = ['한식', '양식', '중식', '일식', '아시안', '건강식', '디저트'];
  const initCategoryName = transformCategoryId[initCategory - 1];
  const [selectedCategory, setSelectedCategory] = useState(initCategory);

  const categories = useMemo(() => ['한식', '양식', '중식', '일식', '아시안', '건강식', '디저트'], []);
  const categoryValid = useSelector((state) => state.lessonEdit.categoryValid)
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    dispatch(setCategoryValid(e.target.value !== ''))
  };

  useEffect(() => {
    const selectedIndex = categories.indexOf(selectedCategory) + 1;
    dispatch(setCategory(selectedIndex));
  }, [dispatch, selectedCategory, categories]);

  return (
    <div style={{ maxWidth: '120px'}}>
      <div style={{display : 'flex', alignItems : 'center'}}>
        <h3>카테고리</h3>
        <div style={{marginLeft : '5px'}}>{categoryValid ? '✅' : '🔲'}</div>
      </div>
      <select value={selectedCategory} onChange={handleCategoryChange}>
        <option value="">-</option>

        {categories.map((category, index) => (
          <option key={index} value={index + 1}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FoodCategory;
