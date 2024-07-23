import Profile from "./ProfilePage.Profile";
import Fanmeeting from "./ProfilePage.Fanmeeting";
import BoardList from "./ProfilePage.BoardList";

function ProfilePage() {
  return (
    <div className="w-full flex flex-col items-center pt-[40px]">
      <Profile />
      <div className="w-4/5 mt-8 bg-white p-8 rounded-t-2xl">
        <Fanmeeting />
      </div>
      <div className="bg-vertical-gradient w-4/5 bg-primary-100 rounded-b-2xl flex flex-col justify-center items-center">
        <BoardList />
      </div>
    </div>
  );
}

export default ProfilePage;
