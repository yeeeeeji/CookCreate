  import React, { useState, useEffect, useMemo } from 'react';
  import { useDispatch, useSelector } from 'react-redux';
  import { setCategory, setCategoryValid } from "../../store/lesson/lesson";
  
  function FoodCategory() {
    const dispatch = useDispatch();
    const reduxCategoryId = useSelector((state) => state.lesson.categoryId);
    const [selectedCategory, setSelectedCategory] = useState(''); // 카테고리 이름 저장
    const [selectedIndex, setSelectedIndex] = useState(''); // 카테고리 idx 저장

    const categories = useMemo(() => ['한식', '양식', '중식', '일식', '아시안', '건강식', '디저트'], []);
    const categoryValid = useSelector((state) => state.lesson.categoryValid);

    const handleCategoryChange = (e) => {
      const selectedIndex = e.target.selectedIndex;
      setSelectedIndex(selectedIndex);
      console.log(categories[selectedIndex])
      setSelectedCategory(categories[selectedIndex]);
      dispatch(setCategory(selectedIndex));
    };

    useEffect(() => {
      setSelectedIndex(reduxCategoryId);
      setSelectedCategory(categories[reduxCategoryId -1]);
      console.log(selectedIndex)
      dispatch(setCategoryValid(selectedIndex !== '' && selectedIndex !== 0))

    }, [reduxCategoryId, selectedCategory]);

    return (
        <div className="lessonInfoTopCategoryContainer">
          <div className="lessonInfoText">카테고리 <span className="required">*</span></div>
          {/* <div className="lessonInfoIcon">{categoryValid ? '✅' : '🔲'}</div> */}
          <select className="lessonInfoSelect" value={selectedCategory} onChange={handleCategoryChange}>
            <option value="">-</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
    );
  }

  export default FoodCategory;
