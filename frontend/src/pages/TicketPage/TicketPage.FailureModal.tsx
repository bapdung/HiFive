interface FailureModalProps {
  onClose: () => void;
  // eslint-disable-next-line react/require-default-props
  message?: string;
}

function FailureModal({ onClose, message }: FailureModalProps) {
  return (
    <div className="bg-white p-10 rounded-xl text-center">
      <h2 className="text-h4 mb-4">오류</h2>
      <p className="mb-8">
        {message || "예매에 실패했습니다. 다시 시도해주세요."}
      </p>
      <button type="button" className="btn-lg" onClick={onClose}>
        닫기
      </button>
    </div>
  );
}

export default FailureModal;
