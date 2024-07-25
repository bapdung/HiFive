function Question() {
  return (
    <div className="w-[100vw]">
      <div className="bg-white w-full flex flex-col items-center py-8">
        <h1 className="text-primary-text text-h2 mb-5">질문 작성</h1>
        <div className="bg-gray-100 px-8 py-4 rounded-lg">
          <p className="text-gray-700">
            <span className="text-primary-text">개복어</span> 에게 궁금한 내용을
            남겨주세요!
          </p>
          <p className="text-gray-700">
            질문하신 내용은
            <span className="text-primary-text">어쩌면 해피엔딩</span>{" "}
            팬미팅에서 직접 답해줍니다 :)
          </p>
        </div>
      </div>
      <div className="row-auto">
        <div className="bg-gray-100 flex flex-col items-center justify-center col-auto">
          <div className="border border-primary-700 rounded-[20px] w-[28rem] bg-white py-5 px-8">
            <p className="mr-auto ml-auto text-large">
              질문질문질문질문질문질문질문질문질문질문질문질문질문질문질문질문질문질문질문질문질문질문질문질문질문질문질문질문질문질문질문질문질문질문질문질문질문질문질문질문질문질문질문질문질문질문질문질문질문질문
            </p>
            <button type="button" className="btn-light-md mt-4">
              수정
            </button>
          </div>
        </div>
        <div className="bg-gray-100 flex flex-col items-center justify-center col-auto">
          <div className="border border-primary-700 rounded-[20px] w-[28rem] bg-white py-5 px-8">
            <p className="mr-auto ml-auto text-large">질문질문질문질문</p>
            <button type="button" className="btn-light-md mt-4">
              수정
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Question;
