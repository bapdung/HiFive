import { useEffect, useState } from "react";
import client from "../../client";
import useAuthStore from "../../store/useAuthStore";

import CreatorInfo from "../../components/CreatorInfo";
import searchIcon from "../../assets/icons/searchIcon.png";

type Creator = {
  creatorId: number;
  creatorName: string;
  profileImg: string;
};

type Param = {
  name?: string;
  condition?: string;
  sort?: string;
  top?: number;
};

function CreatorList() {
  const token = useAuthStore((state) => state.accessToken);

  const [creatorList, setCreatorList] = useState<Creator[]>([]);
  const [inputKeyword, setInputKeyword] = useState<string>();
  const [keyword, setKeyword] = useState<string>();
  const [condition, setCondition] = useState<"creatorName" | "createdDate">(
    "creatorName",
  );
  const [sort, setSort] = useState<"asc" | "desc">("asc");
  const [top, setTop] = useState<number | null>(null);

  const onSearch = () => {
    setKeyword(inputKeyword);
  };

  const onInputKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputKeyword(e.target.value);
  };

  const onkeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  const changeParam = (e: React.MouseEvent<HTMLHeadingElement, MouseEvent>) => {
    const content = e.currentTarget.textContent;

    if (content === "가나다순") {
      if (condition !== "creatorName") {
        setCreatorList([]);
      }
      setCondition("creatorName");
      setSort("asc");
      setTop(null);
    } else if (content === "최신순") {
      if (!(condition === "createdDate" && sort === "desc")) {
        setCreatorList([]);
        setTop(null);
      }
      setCondition("createdDate");
      setSort("desc");
      setTop(null);
    } else if (content === "활동일순") {
      if (!(condition === "createdDate" && sort === "asc")) {
        setCreatorList([]);
      }
      setCondition("createdDate");
      setSort("asc");
      setTop(null);
    }
  };

  const getCreatorList = async (reset = false) => {
    const params: Param = {
      condition,
      sort,
    };

    if (keyword) {
      params.name = keyword;
    }

    if (top) {
      params.top = top;
    }

    if (token) {
      const response = await client(token).get("/api/creator/search", {
        params,
      });

      if (reset) {
        setCreatorList(response.data);
      } else {
        setCreatorList((prev) => [...prev, ...response.data]);
      }
    }
  };

  useEffect(() => {
    getCreatorList(true);
    // eslint-disable-next-line
  }, [keyword, condition, sort, token]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 2
      ) {
        const lastCreatorId = creatorList[creatorList.length - 1]?.creatorId;

        if (lastCreatorId) {
          setTop(lastCreatorId);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [creatorList]);

  useEffect(() => {
    if (top !== null && token) {
      getCreatorList();
    }
    // eslint-disable-next-line
  }, [top, token]);

  return (
    <div className="bg-white pb-20 w-full">
      <div className="absolute top left-0 h-[228px] bg-landing-gradient w-full flex flex-col pt-12 items-center">
        <div className="flex flex-col items-center">
          <span className="text-h2 font-semibold">HiFive Creators</span>
          <span className="text-medium font-semibold text-gray-600">
            현재 HiFive에서 활동하고 있는 크리에이터 전체 목록입니다.
          </span>
        </div>
      </div>
      <div className="mt-48 flex flex-col items-center">
        <div className="flex relative items-center">
          <input
            className="w-[600px] h-[75px] pl-10 pr-20 rounded-full shadow-pink-shadow z-50 focus:outline-none text-large"
            placeholder="어떤 크리에이터를 찾으시나요?"
            onChange={(e) => onInputKeyword(e)}
            onKeyDown={(e) => onkeydown(e)}
          />
          <img
            src={searchIcon}
            alt="검색"
            className="absolute w-[18px] h-[18px] z-50 right-10 hover:cursor-pointer"
            onClick={() => onSearch()}
            role="presentation"
          />
        </div>
        <div className="mt-8">
          <div className="flex justify-center items-center mb-10">
            <h5
              className={`text-h5 font-semibold border-solid border-r-2 border-[#EEEEEE] pr-3 ${condition === "creatorName" ? "text-primary-text" : ""} hover:cursor-pointer`}
              onClick={(e) => changeParam(e)}
              role="presentation"
            >
              가나다순
            </h5>
            <h5
              className={`text-h5 font-semibold border-solid border-r-2 border-[#EEEEEE] px-3 ${condition === "createdDate" && sort === "desc" ? "text-primary-text" : ""} hover:cursor-pointer`}
              onClick={changeParam}
              role="presentation"
            >
              최신순
            </h5>
            <h5
              className={`text-h5 font-semibold pl-3 ${condition === "createdDate" && sort === "asc" ? "text-primary-text" : ""} hover:cursor-pointer`}
              onClick={changeParam}
              role="presentation"
            >
              활동일순
            </h5>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-10 my-10">
            {creatorList.map((creator) => (
              <CreatorInfo creator={creator} key={creator.creatorId} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatorList;
