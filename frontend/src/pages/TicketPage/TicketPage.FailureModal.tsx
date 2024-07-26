function FailureModal() {
  return (
    <div className="w-[50rem] bg-white flex flex-col items-center h-[26rem] justify-center rounded-3xl">
      <h1 className="text-h4">결제에 실패하였습니다.</h1>
      <button type="button" className="btn-md mt-4 bg-gray-100 text-gray-600">
        창 닫기
      </button>
    </div>
  );
}

export default FailureModal;
