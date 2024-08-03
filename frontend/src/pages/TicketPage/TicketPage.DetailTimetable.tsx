interface TimeTableItem {
  categoryName: string;
  sequence: number;
  detail: string;
}

interface TimeTableProps {
  timetable: TimeTableItem[];
}

const Timetable: React.FC<TimeTableProps> = ({ timetable }) => {
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
        {timetable.map((item, index) => {
          const [bgColor, borderColor] =
            tableColors[index % tableColors.length];
          return (
            <div
              key={item.sequence}
              className={`${bgColor} h-12 flex items-center border-l-[2.5px] ${borderColor} rounded-r-3xl mb-2.5 w-fit`}
            >
              <p className="text-gray-700 mb-auto mt-auto flex text-medium w-auto">
                <span className="w-40 ml-8">{item.categoryName}</span>
                <span className="mr-8">{item.detail}</span>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Timetable;
