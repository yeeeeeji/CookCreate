import React, {useState} from 'react';

function SearchBar() {
  const [searchEverything, setsearchEverything] = useState('')

  return (
    <div>
      <input type="text" 
        placeholder='아무거나 검색하세요!'
        value = {searchEverything}
        onChange={(e) => {
          setsearchEverything(e.target.value)
        }}
      />    
    </div>
  );
}

export default SearchBar;