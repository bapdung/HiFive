function Quiz() {
  const tempQuiz = [
    { id: 1, sequence: 1, detail: "설명", problem: "문제내용", answer: true },
    { id: 2, sequence: 2, detail: "설명", problem: "문제내용", answer: false },
    { id: 3, sequence: 3, detail: "설명", problem: "문제내용", answer: true },
    { id: 4, sequence: 4, detail: "설명", problem: "문제내용", answer: false },
    { id: 5, sequence: 5, detail: "설명", problem: "문제내용", answer: true },
  ];
  return (
    <div className="flex flex-col items-center">
      <button type="button" className="my-8 w-1/4 creator-btn-md">
        퀴즈 생성하기
      </button>
      <div className="w-3/4 flex flex-wrap justify-center gap-6">
        {tempQuiz.map((quiz) => (
          <div
            key={quiz.id}
            className="border-2 border-secondary-700 rounded-[20px] w-[30%] flex flex-col items-center min-h-48 py-[0.5rem] px-8 justify-between bg-white"
          >
            <p className="text-h5 flex justify-between w-full">
              <span>문제 {quiz.sequence}</span>{" "}
              <span
                className={quiz.answer ? "text-secondary" : "text-primary-text"}
              >
                정답 {quiz.answer ? "O" : "X"}
              </span>
            </p>
            <p className="text-large text-gray-700">{quiz.problem}</p>
            <p className="text-large text-gray-500">{quiz.detail}</p>
            <div>
              <button type="button" className="creator-btn-light-md">
                수정하기
              </button>
              <button type="button" className="btn-light-md ml-2">
                삭제하기
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Quiz;
