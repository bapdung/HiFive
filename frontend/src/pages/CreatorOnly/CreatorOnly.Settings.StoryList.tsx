import Prev from "../../assets/icons/preIcon.svg";
import Next from "../../assets/icons/nextIcon.svg";

function StoryList() {
  return (
    <div className="bg-white rounded-[25px] w-[60%] p-10 pb-5">
      <div className="w-full flex flex-col items-center">
        <table className="w-full text-h6">
          <thead className="border-b-2 border-t-2 border-secondary">
            <tr>
              <td className="w-[10%] py-2.5 pl-10 font-semibold">번호</td>
              <td className="w-[30%] py-2.5 pl-20 font-semibold">작성자</td>
              <td className="w-[50%] py-2.5 pl-36 font-semibold">사연 제목</td>
              <td className="w-[10%] py-2.5 pl-6 font-semibold">작성 날짜</td>
            </tr>
          </thead>
          <tbody className="border-b-2 border-secondary py-2">
            <tr>
              <td className="py-3 text-center">1</td>
              <td className="py-3 px-5 ">닉네임닉네임닉네임닉네임</td>
              <td className="py-3 px-5 ">진짜 개꿀잼 사연 들려드릴게요</td>
              <td className="py-3 px-5 ">2024.07.17</td>
            </tr>
            <tr>
              <td className="py-3 text-center">2</td>
              <td className="py-3 px-5">닉네임닉네임닉네임닉네임</td>
              <td className="py-3 px-5">진짜 개꿀잼 사연 들려드릴게요</td>
              <td className="py-3 px-5">2024.07.17</td>
            </tr>
          </tbody>
        </table>
        <div className="flex row gap-10 my-5">
          <button type="button">
            <img src={Prev} alt="prev" className="w-[1.5rem] opacity-50" />{" "}
          </button>
          <button type="button" className="text-gray-500">
            1
          </button>
          <button type="button" className="text-gray-500">
            2
          </button>
          <button type="button" className="text-gray-500">
            3
          </button>
          <button type="button" className="text-gray-500">
            ...
          </button>
          <button type="button" className="text-gray-500">
            99
          </button>
          <button type="button">
            <img src={Next} alt="next" className="w-[1.5rem] opacity-50" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default StoryList;
