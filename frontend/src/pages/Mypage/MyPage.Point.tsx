import { useEffect, useState } from "react";
import client from "../../client";
import useAuthStore from "../../store/useAuthStore";
import { formatNumberWithCommas } from "../../utils/formatNumber";

import Table from "./MyPage.Point.Table";

function Point() {
  const [money, setMoney] = useState<number | null>();
  const [totalPoint, setTotalPoint] = useState<number>();

  const token = useAuthStore((state) => state.accessToken);

  const changeMoney = (e: React.ChangeEvent<HTMLInputElement>) => {
    const stringMoney = e.target.value;

    const check = /^[0-9]*$/;

    if (check.test(stringMoney)) {
      setMoney(Number(stringMoney));
    } else {
      alert("숫자만 입력해주세요");
    }
  };

  const postPoint = async () => {
    if (money === 0) {
      alert("충전할 포인트를 입력해주세요.");
      return;
    }

    if (typeof money !== "number") {
      alert("유효한 숫자를 입력해주세요");
      return;
    }

    if (money > 100000) {
      alert("1회 최대 충전금액은 100,000원입니다.");
      setMoney(null);
      return;
    }

    if (token) {
      const response = await client(token).post("/api/point", {
        money,
      });

      if (response.status === 201) {
        if (totalPoint && money) {
          setTotalPoint(totalPoint + money);
        } else {
          setTotalPoint(money);
        }
        alert(`${money} 포인트 충전이 완료되었습니다!`);
        setMoney(null);
      }
    }
  };

  useEffect(() => {
    const getTotalPoint = async () => {
      if (token) {
        const response = await client(token).get("/api/member");
        setTotalPoint(response.data.point);
      }
    };

    getTotalPoint();
  }, [token, totalPoint]);

  return (
    <div className="w-full flex rounded-3xl">
      <div className="bg-primary-100 w-1/3 p-5 rounded-s-3xl">
        <div className="flex flex-col bg-white rounded-2xl p-5">
          <h5 className="text-h5">포인트 충전하기</h5>
          <div>
            <div className="flex mt-5 justify-between">
              <h6 className="text-small text-gray-700">충전 금액</h6>
              <span className="text-small text-primary-text">
                1회 최대 충전금액 100,000원
              </span>
            </div>
            <input
              type="text"
              value={money ?? ""}
              placeholder="충전할 포인트를 입력해주세요."
              onChange={changeMoney}
              className="flex justify-center items-center border border-1 w-full h-12 placeholder py-3.5 px-6 text-small rounded-3xl mt-2"
            />
          </div>
          <div className="flex flex-col justify-start mt-5 text-small">
            <div className="flex flex-col items-start">
              {/* <span>충전 가능 금액</span> */}
              <span>현재 보유중인 포인트</span>
            </div>
            <div className="flex flex-col items-start mt-2">
              {/* <span className="text-primary-text ml-7">500,000</span> */}
              <span className="text-large text-primary-text">
                {totalPoint
                  ? `${formatNumberWithCommas(totalPoint)} Point`
                  : "0 Point"}
              </span>
            </div>
          </div>
          <button type="button" className="btn-lg mt-10" onClick={postPoint}>
            충전하기
          </button>
        </div>
      </div>
      <div className="w-2/3 p-10">
        <Table type="plus" key={`plus-${totalPoint}`} />
        <div className="mt-16" />
        <Table type="minus" key={`minus-${totalPoint}`} />
      </div>
    </div>
  );
}

export default Point;
