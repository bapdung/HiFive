import preIcon from "../../assets/icons/preIcon.svg";
import nextIcon from "../../assets/icons/nextIcon.svg";

function Table() {
  return (
    <>
      <div className="w-full flex justify-between">
        <h5 className="text-h5">충전 내역 조회</h5>
        <select name="period" className="text-small">
          <option value="3">최근 3개월</option>
          <option value="6">최근 6개월</option>
          <option value="12">최근 1년</option>
        </select>
      </div>
      <table className="w-full text-center mt-2 border-b-2 border-primary">
        <thead className="border-t-2 border-b-2 border-primary py-20">
          <tr>
            <th className="py-2.5">번호</th>
            <th>결제 날짜</th>
            <th>결제 금액</th>
            <th>충전 포인트</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2.5">1</td>
            <td>2024.07.16</td>
            <td>10,000</td>
            <td>1,000</td>
          </tr>
          <tr>
            <td className="py-2.5">1</td>
            <td>2024.07.16</td>
            <td>10,000</td>
            <td>1,000</td>
          </tr>
          <tr>
            <td className="py-2.5">1</td>
            <td>2024.07.16</td>
            <td>10,000</td>
            <td>1,000</td>
          </tr>
          <tr>
            <td className="py-2.5">1</td>
            <td>2024.07.16</td>
            <td>10,000</td>
            <td>1,000</td>
          </tr>
          <tr>
            <td className="py-2.5">1</td>
            <td>2024.07.16</td>
            <td>10,000</td>
            <td>1,000</td>
          </tr>
          <tr>
            <td className="py-2.5">1</td>
            <td>2024.07.16</td>
            <td>10,000</td>
            <td>1,000</td>
          </tr>
        </tbody>
      </table>
      <div className="my-3.5 flex justify-center">
        <div className="flex justify-between items-center w-80 text-h6">
          <img src={preIcon} alt="이전버튼" className="w-[1rem] h-[1rem]" />
          <div className="text-primary-700">1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
          <img src={nextIcon} alt="다음버튼" className="w-[1rem] h-[1rem]" />
        </div>
      </div>
    </>
  );
}

export default Table;
