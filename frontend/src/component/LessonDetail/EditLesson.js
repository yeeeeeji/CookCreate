import React from 'react';
import { useNavigate } from 'react-router-dom';

function EditLesson({ lessonId, disable }) {
  const navigate = useNavigate();

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
          }}>
          <button
            style={{
              width: '260px',
              height: '40px',
              backgroundColor: disable ? '#ccc' : '#FF7A42',
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
          >
            수정하기
          </button>
        </div>
      )}
    </>
  );
}

export default EditLesson;