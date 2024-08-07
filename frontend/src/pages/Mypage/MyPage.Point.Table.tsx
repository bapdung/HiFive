import { useEffect, useState } from "react";
import client from "../../client";
import useAuthStore from "../../store/useAuthStore";

import preIcon from "../../assets/icons/preIcon.svg";
import nextIcon from "../../assets/icons/nextIcon.svg";

type PlusPoint = {
  transactionDate: string;
  money: number;
  point: number;
  totalPages: number;
};

type MinusPoint = {
  transactionDate: string;
  detail: number;
  point: number;
  totalPages: number;
};

type Params = {
  period: number;
  page: number;
};

interface TypeProps {
  type: "plus" | "minus";
}

function Table({ type }: TypeProps) {
  const token = useAuthStore((state) => state.accessToken);

  const [totalPage, setTotalPage] = useState<number>(1);
  const [pointList, setPointList] = useState<PlusPoint[] | MinusPoint[] | null>(
    null,
  );
  const [period, setPeriod] = useState<number>(3);
  const [page, setPage] = useState<number>(1);
  const [currentPageGroup, setCurrentPageGroup] = useState<number>(0);

  const changePage = (newPage: number) => {
    setPage(newPage);
  };

  const changePeriod = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPeriod(Number(e.target.value));
  };

  useEffect(() => {
    const getPoint = async () => {
      const params: Params = {
        period,
        page: page - 1,
      };

      if (token) {
        const response = await client(token).get(`/api/point/${type}`, {
          params,
        });

        setPointList(response.data);
        setTotalPage(response.data[0].totalPages);
      }
    };

    getPoint();
  }, [token, type, period, page]);

  const handleNextPageGroup = () => {
    if ((currentPageGroup + 1) * 5 < totalPage) {
      setCurrentPageGroup(currentPageGroup + 1);
    }
  };

  const handlePreviousPageGroup = () => {
    if (currentPageGroup > 0) {
      setCurrentPageGroup(currentPageGroup - 1);
    }
  };

  const renderPageNumbers = () => {
    const startPage = currentPageGroup * 5 + 1;
    const endPage = Math.min(startPage + 4, totalPage);
    const pages = [];
    for (let i = startPage; i <= endPage; i += 1) {
      pages.push(
        <div
          key={i}
          onClick={() => changePage(i)}
          role="presentation"
          className={`${page === i ? "text-primary-700" : ""} hover:cursor-pointer`}
        >
          {i}
        </div>,
      );
    }
    return pages;
  };

  return (
    <>
      <div className="w-full flex justify-between">
        <h5 className="text-h5">
          {type === "plus" ? "충전 내역 조회" : "사용 내역 조회"}
        </h5>
        <select
          name="period"
          className="text-small hover:cursor-pointer"
          onChange={(e) => changePeriod(e)}
        >
          <option value="3">최근 3개월</option>
          <option value="6">최근 6개월</option>
          <option value="12">최근 1년</option>
        </select>
      </div>
      <table className="w-full text-center mt-2 border-b-2 border-primary">
        <thead className="border-t-2 border-b-2 border-primary py-20">
          <tr>
            <th className="py-2.5">번호</th>
            <th>{type === "plus" ? "결제 날짜" : "사용 날짜"}</th>
            <th>{type === "plus" ? "결제 금액" : "사용 내역"}</th>
            <th>{type === "plus" ? "충전 포인트" : "사용 포인트"}</th>
          </tr>
        </thead>
        <tbody>
          {pointList ? (
            pointList.map((point, index) => (
              // eslint-disable-next-line
              <tr key={index}>
                <td className="py-2.5">{index + 1}</td>
                <td>
                  {point.transactionDate.split("T")[0].replaceAll("-", ".")}
                </td>
                <td>{"money" in point ? point.money : point.detail}</td>
                <td>{point.point}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="py-2.5">
                데이터가 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="my-3.5 flex justify-center">
        <div className="flex justify-between items-center w-80 text-h6">
          <img
            src={preIcon}
            alt="이전버튼"
            className="w-[1rem] h-[1rem] hover:cursor-pointer"
            onClick={handlePreviousPageGroup}
            role="presentation"
          />
          {renderPageNumbers()}
          <img
            src={nextIcon}
            alt="다음버튼"
            className="w-[1rem] h-[1rem] hover:cursor-pointer"
            onClick={handleNextPageGroup}
            role="presentation"
          />
        </div>
      </div>
    </>
  );
}

export default Table;
