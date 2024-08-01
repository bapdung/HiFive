import { Link } from "react-router-dom";

interface FollowingProfileProps {
  key: number;
  profileName: string;
  profileImage: string;
}

const FollowingProfile: React.FC<FollowingProfileProps> = ({
  profileName,
  profileImage,
}) => (
  <div className="flex flex-col items-center">
    <div className="rounded-full overflow-clip bg-primary-100 shadow-lg mb-2">
      <Link to="/creator/1">
        <img src={profileImage} alt="Profile" className="w-[150px] h-[150px]" />
      </Link>
    </div>
    <span className="text-h4 text-gray-900">{profileName}</span>
  </div>
);
export default FollowingProfile;
