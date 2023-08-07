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
    <div style={{
      width: '300px',
      height: '150px',
      border: '1px solid #ccc'
    }}>
      <button
        style={{
          width: '200px',
          height: '40px',
          backgroundColor: disable ? '#ccc' : 'orange',
          color: 'white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '5px',
          cursor: disable ? 'not-allowed' : 'pointer',
          textDecoration: 'none'
        }}
        disabled={disable}
        onClick={handleEditClick}
      >
        수정하기
      </button>
    </div>
  );
}

export default EditLesson;
