import Profile from "./ProfilePage.Profile";
import Fanmeeting from "./ProfilePage.Fanmeeting";

function ProfilePage() {
  return (
    <div className="w-full flex flex-col items-center pt-[40px] bg-background">
      <Profile />
      <div className="w-4/5 mt-8">
        <Fanmeeting />
      </div>
    </div>
  );
}

export default ProfilePage;
