interface WaitingModalProps {
  queueSize: number;
}

function WaitingModal({ queueSize }: WaitingModalProps) {
  return (
    <div className="w-[50rem] bg-white flex flex-col items-center h-[26rem] justify-center rounded-3xl">
      <div className="bg-primary-100 px-6 py-3 flex flex-col justify-center items-center rounded-[10px]">
        <p>나의 대기 순서</p>
        <h1 className="text-h2 text-primary-text">{queueSize}</h1>
      </div>
      <p className="text-gray-700 mt-6">현재 접속 인원이 많아 대기중입니다.</p>
      <p className="text-gray-700">
        잠시만 기다려주시면 예매 페이지로 연결됩니다.
      </p>
      <p className="text-gray-900 mt-6">
        새로고침하거나 재접속 하시면 대기순서가 초기화되어 대기 시간이 더
        길어집니다.
      </p>
    </div>
  );
}

export default WaitingModal;
