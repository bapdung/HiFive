import Table from "./MyPage.Point.Table";

function Point() {
  return (
    <div className="w-full flex rounded-3xl">
      <div className="bg-primary-100 w-1/3 p-10 rounded-s-3xl">
        <div className="flex flex-col bg-white rounded-2xl p-5">
          <h5 className="text-h5">포인트 충전</h5>
          <div>
            <h6 className="text-h6 text-gray-700 mt-3.5">충전 금액</h6>
            <input
              type="text"
              placeholder="충전할 포인트 입력(1,000P 단위 입력 가능)"
              className="flex justify-center items-center border border-1 w-full h-12 placeholder py-3.5 px-10 text-small rounded-3xl mt-3.5"
            />
          </div>
          <div className="flex justify-end mt-3.5 text-small">
            <div className="flex flex-col items-end">
              <span>충전 가능 금액</span>
              <span>현재 보유중인 포인트</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-primary-text ml-7">500,000</span>
              <span className=" ml-7">78,000</span>
            </div>
          </div>
          <button type="button" className="btn-lg mt-3.5">
            카카오페이로 충전하기
          </button>
        </div>
      </div>
      <div className="w-2/3 p-10">
        <Table />
        <div className="mt-16" />
        <Table />
      </div>
    </div>
  );
}

export default Point;
