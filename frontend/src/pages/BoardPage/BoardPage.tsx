import Content from "./BoardPage.Content";
import CommentList from "./BoardPage.CommentList";

function ProfilePage() {
  return (
    <div className="w-full flex flex-col items-center pt-[40px] bg-gray-100">
      <div className="w-3/4 flex flex-col items-center bg-board-gradient rounded-3xl">
        <div className="w-[80%] my-20">
          <Content />
          <CommentList />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
