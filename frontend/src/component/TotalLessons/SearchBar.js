import React from 'react';

function SearchBar() {
  return (
    <div>
      <div style={{display : 'flex', alignItems : 'center'}}>
        <div>
          전체 보기
        </div>
        <input type="text"
          placeholder='배우고 싶은 요리를 검색해보세요!'
          style={{width : '400px'}}
        />
      </div>
    </div>
  );
}

export default SearchBar;