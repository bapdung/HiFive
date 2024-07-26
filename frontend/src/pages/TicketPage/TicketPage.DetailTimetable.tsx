import React from "react";

function Timetable() {
  const table = [
    {
      key: 1,
      title: "소통",
      description:
        "크리에이터와 자유로운 소통의 시간을 가질 수 있는 시간입니다.",
    },
    {
      key: 2,
      title: "Q&A",
      description:
        "사전에 제출한 질문들을 기반으로 크리에이터가 선정하여 답변을 들을 수 있는 시간입니다.",
    },
    {
      key: 3,
      title: "O/X 퀴즈",
      description:
        "크리에이터가 내는 O/X 퀴즈를 맞춰보세요. 1, 2, 3위는 시상대에 올라갈 수 있습니다!",
    },
    {
      key: 4,
      title: "사연 전달",
      description:
        "참여자가 보낸 사연 중 크리에이터가 선정하여 함께 읽어보는 시간입니다.",
    },
    {
      key: 5,
      title: "포토 타임",
      description:
        "팬 미팅을 기념하며 크리에이터와 함께 사진으로 추억을 남겨보세요!.",
    },
    {
      key: 6,
      title: "사용자 정의 이름",
      description: "크리에이터가 팬 미팅을 위해 준비한 특별한 시간입니다.",
    },
  ];

  const tableColors = [
    ["bg-[#FFF2F2]", "border-[#FF6392]"],
    ["bg-[#F2F9E6]", "border-[#99CC45]"],
    ["bg-[#FFF4E7]", "border-[#FF8736]"],
    ["bg-[#E6EFFF]", "border-[#69618F]"],
    ["bg-[#FFEEFF]", "border-[#FFA3A9]"],
    ["bg-[#EAE6FF]", "border-[#C28FEF]"],
  ];

  return (
    <div className="my-10">
      <h2 className="text-gray-900 text-h5 mb-5 font-semibold">타임테이블</h2>
      <div>
        {table.map((item, index) => {
          const [bgColor, borderColor] =
            tableColors[index % tableColors.length];
          return (
            <div
              key={item.key}
              className={`${bgColor} h-12 flex items-center border-l-[2.5px] ${borderColor} rounded-r-3xl mb-2.5 w-fit`}
            >
              <p className="text-gray-700 mb-auto mt-auto flex text-medium w-auto">
                <span className="w-40 ml-8">{item.title}</span>
                <span className="mr-8">{item.description}</span>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Timetable;
