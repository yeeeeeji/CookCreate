import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function EditLesson({ lessonId, disable }) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleEditClick = () => {
    if (!disable) {
      navigate(`/lesson/edit/${lessonId}`);
    }
  };

  return (
    <>
      {!disable && (
        <div 
          style={{
            display: 'flex', 
            justifyContent: 'center', 
            marginTop: '30px'
          }}
        >
          <button
            style={{
              width: '240px',
              height: '40px',
              backgroundColor: disable ? '#ccc' : (isHovered ? '#FF6060' : '#FF7A42'),
              color: '#FFFDFD',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '5px',
              border: 'none',
              cursor: disable ? 'not-allowed' : 'pointer',
              textDecoration: 'none'
            }}
            disabled={disable}
            onClick={handleEditClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            수정하기
          </button>
        </div>
      )}
    </>
  );
}

export default EditLesson;