import Profile from "./ProfilePage.Profile";
import Fanmeeting from "./ProfilePage.Fanmeeting";
import BoardList from "./ProfilePage.BoardList";

function ProfilePage() {
  return (
    <div className="w-full flex flex-col items-center pt-[40px] bg-gray-100">
      <Profile />
      <div className="w-4/5 mt-8">
        <Fanmeeting />
      </div>
      <div className="mt-[40px] w-4/5 bg-primary-100 rounded-2xl flex flex-col justify-center items-center">
        <BoardList />
      </div>
    </div>
  );
}

export default ProfilePage;
