function Question() {
  const questions = [
    {
      key: 1,
      value: "질문",
    },
    { key: 2, value: "질문" },
    {
      key: 3,
      value: "질문",
    },
    { key: 4, value: "문질문질문질문질문질문질문질문질문질문질문질문" },
  ];
  return (
    <div className="w-[100vw] flex flex-col items-center">
      <div className="bg-white w-full flex flex-col items-center py-8 mb-5">
        <h1 className="text-primary-text text-h2 mb-5">질문 작성</h1>
        <div className="bg-gray-100 px-8 py-4 rounded-lg text-center">
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
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 w-full max-w-[80%] justify-items-center pb-5 ">
        {questions.map((question) => (
          <div
            key={question.key}
            className="border border-primary-700 rounded-[20px] w-[25rem] bg-white py-5 px-8 flex flex-col items-center"
          >
            <p className="text-large mb-4 min-h-32">{question.value}</p>
            <button type="button" className="btn-light-md mt-auto">
              수정
            </button>
          </div>
        ))}

        {Array.from({ length: 6 - questions.length }).map(() => (
          <div
            key={`${Date.now()}-${Math.random()}`}
            className="border border-primary-700 rounded-[20px] w-[25rem] bg-white py-5 px-8 flex flex-col items-center"
          >
            <textarea className="focus:outline-none resize-none w-full min-h-32 text-body-large" />
            <button type="button" className="btn-md mt-auto">
              작성
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Question;
