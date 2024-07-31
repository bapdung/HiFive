import PropTypes from "prop-types";

interface ModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

const Modal: React.FC<ModalProps> = ({ onClose, onConfirm }) => (
  <div className="w-full h-full absolute flex items-center justify-center">
    <div className="w-full h-full bg-black absolute opacity-70" />
    <div className="bg-white w-[50rem] h-[22rem] z-10 rounded-3xl flex flex-col items-center justify-center absolute top-1/2">
      <p className="text-secondary text-h2">
        이대로 팬미팅을 생성하시겠습니까?
      </p>
      <div className="my-[1.5rem] text-center">
        <p>기본 정보는 등록 후 수정하실 수 없습니다.</p>
        <p>모든 정보가 최신화되고 정확한지 꼭 확인한 뒤 진행해주세요.</p>
      </div>
      <div>
        <button
          className="creator-btn-light-md mr-5"
          type="button"
          onClick={onConfirm}
        >
          생성하기
        </button>
        <button className="btn-light-md" type="button" onClick={onClose}>
          돌아가기
        </button>
      </div>
    </div>
  </div>
);

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default Modal;
