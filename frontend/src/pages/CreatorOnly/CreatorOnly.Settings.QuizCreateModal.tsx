import propTypes from "prop-types";

interface QuizCreateModalProps {
  handleQuizSubmit: React.MouseEventHandler<HTMLButtonElement>;
  handleQuizClose: React.MouseEventHandler<HTMLButtonElement>;
}

const QuizCreateModal: React.FC<QuizCreateModalProps> = ({
  handleQuizSubmit,
  handleQuizClose,
}) => (
  <div className="w-full h-full absolute flex items-center justify-center">
    <div className="w-full h-full bg-black absolute opacity-70" />
    <div className="bg-white w-[50rem] h-[22rem] z-10 rounded-3xl flex flex-col items-center justify-between absolute top-1/4 p-12">
      <div className="flex justify-between w-full">
        <div className="w-2/3">
          <p className="text-h6 mb-[0.6rem]">질문</p>
          <input
            type="text"
            className="border-2 border-gray-300 focus:outline-none border-3xl w-full px-2 py-2 rounded-3xl text-center"
            placeholder="O/X 퀴즈 문제를 입력해주세요. (최대 30글자)"
          />
        </div>
        <div>
          <p className="text-h6 mb-[0.6rem]">정답</p>
          <div>
            <button type="button" className="creator-btn-light-md">
              O
            </button>
            <button type="button" className="btn-light-md ml-2">
              X
            </button>
          </div>
        </div>
      </div>
      <div className="w-full">
        <p className="text-h6 mb-[0.6rem]">설명</p>
        <input
          type="text"
          className="border-2 border-gray-300 focus:outline-none border-3xl w-4/5 px-2 py-2 rounded-3xl text-center"
          placeholder="정답에 대한 간단한 설명을 입력해주세요. 설명은 최대 50글자 입니다."
        />
      </div>
      <div className="w-full flex justify-center">
        <button
          className="creator-btn-light-md w-1/4"
          type="button"
          onClick={handleQuizClose}
        >
          돌아가기
        </button>
        <button
          className="creator-btn-md w-1/4 ml-10"
          type="button"
          onClick={handleQuizSubmit}
        >
          문제 등록하기
        </button>
      </div>
    </div>
  </div>
);

QuizCreateModal.propTypes = {
  handleQuizSubmit: propTypes.func.isRequired,
  handleQuizClose: propTypes.func.isRequired,
};
export default QuizCreateModal;
