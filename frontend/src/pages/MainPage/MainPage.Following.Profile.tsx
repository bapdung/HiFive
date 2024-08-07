import { Link } from "react-router-dom";

interface FollowingProfileProps {
  creatorId: number;
  profileName: string;
  profile: string;
}

const FollowingProfile: React.FC<FollowingProfileProps> = ({
  creatorId,
  profileName,
  profile,
}) => (
  <div className="flex flex-col items-center">
    <div className="rounded-full overflow-clip bg-primary-100 shadow-lg mb-2">
      <Link to={`/creator/${creatorId}`}>
        <img src={profile} alt="Profile" className="w-[150px] h-[150px]" />
      </Link>
    </div>
    <span className="text-h4 text-gray-900">{profileName}</span>
  </div>
);
export default FollowingProfile;
