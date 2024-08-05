type Creator = {
  creatorId: number;
  creatorName: string;
  profileImg: string;
};

interface CreatorProps {
  creator: Creator;
}

function CreatorInfo({ creator }: CreatorProps) {
  return (
    <div className="flex flex-col items-center">
      <img
        src={creator.profileImg}
        alt="프로필이미지"
        className="w-[150px] h-[150px] bg-gray-300 rounded-full mb-2.5"
      />
      <div>{creator.creatorName}</div>
    </div>
  );
}

export default CreatorInfo;
