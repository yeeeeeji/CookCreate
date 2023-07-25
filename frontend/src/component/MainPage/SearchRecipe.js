import React, {useState} from 'react';

function SearchRecipe() {
  const [searchRecipe, setsearchRecipe] = useState('')
  const gotoSearch = () => {
    console.log({searchRecipe})
    // 검색 기능으로 갈 함수
  }
  return (
    <div>
      <div className='searchBar'>
        <input type="text" 
        value = {searchRecipe}
        placeholder='배우고 싶은 요리를 검색해 보세요!'
        onChange = {(e) => {
          setsearchRecipe(e.target.value)
        }}/>
        <button onClick={
          gotoSearch
        }>검색하기</button>
      </div>
    </div>
  );
}

export default SearchRecipe;