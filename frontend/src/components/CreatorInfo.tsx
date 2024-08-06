import { useNavigate } from "react-router-dom";

type Creator = {
  creatorId: number;
  creatorName: string;
  profileImg: string;
};

interface CreatorProps {
  creator: Creator;
}

function CreatorInfo({ creator }: CreatorProps) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center">
      <img
        src={creator.profileImg}
        alt="프로필이미지"
        className="w-[150px] h-[150px] bg-gray-300 rounded-full mb-2.5"
        onClick={() => navigate(`/creator/${creator.creatorId}`)}
        role="presentation"
      />
      <div>{creator.creatorName}</div>
    </div>
  );
}

export default CreatorInfo;
