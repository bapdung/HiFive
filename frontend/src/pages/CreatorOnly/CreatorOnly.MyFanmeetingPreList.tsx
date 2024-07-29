import MyFanmeetingItem from "./CreatorOnly.MyFanmeetingItem";

function MyFanmeetingPreList() {
  return (
    <div className="w-full flex flex-wrap">
      <MyFanmeetingItem isDone={false} />
      <MyFanmeetingItem isDone={false} />
      <MyFanmeetingItem isDone={false} />
      <MyFanmeetingItem isDone={false} />
      <MyFanmeetingItem isDone={false} />
    </div>
  );
}

export default MyFanmeetingPreList;
