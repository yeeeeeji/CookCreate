import { useNavigate } from "react-router-dom";
import '../../style/modal/simpleModal.css';

function SimpleModal({ content, path }) {
  const navigate = useNavigate();

  const goPage = () => {
    if (path !== null) {
      navigate(path);
    }
  }

  return (
    <div className="simple-modal">
      <div className="simple-modal-content-container">
        <p className="simple-modal-content">{content}</p>
        <button className="simple-modal-button" onClick={goPage}>확인</button>
      </div>
    </div>
  );
}

export default SimpleModal;