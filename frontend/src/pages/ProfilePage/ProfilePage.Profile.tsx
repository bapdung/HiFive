// import ModifyModal from "./ProfilePage.Modify.Modal";

// import fullHeart from "../../assets/icons/full-heart.png";
// import heart from "../../assets/icons/heart.png";

function Profile() {
  return (
    <>
      {/* <ModifyModal /> */}
      <div className="flex h-90 px-12 py-10 items-center justify-between w-4/5 rounded-3xl bg-horizontal-gradient">
        <div className="w-2/5 h-64 flex flex-col justify-center">
          <div className="flex items-center">
            <div className="text-h2 mr-5">이름</div>
            <div className="creator-btn-outline-md h-8 flex items-center">
              프로필 수정
            </div>
            {/* <div className="btn-outline-md h-8 flex items-center">
              <img src={fullHeart} alt="하트" className="mr-1  w-3 h-3" />
              팔로잉 중
            </div> */}
            {/* <div className="btn-md h-8 flex items-center">
              <img src={heart} alt="하트" className="mr-1 w-3 h-3" />
              팔로우
            </div> */}
          </div>
          <p className="text-medium my-5 text-gray-600">
            안녕하세요! 🐡 복하복하~ 개복어입니다! 여러분과 함께하는 웃음 가득한
            순간들을 만들기 위해 HiFive를 시작했어요. 히히 :) 이곳에서 함께 웃고
            즐기며 멋진 추억을 만들어가요!
          </p>
          <div className="flex">
            <div className="flex flex-col items-center text-small text-gray-600 mr-14">
              <span className="text-large">0</span>
              활동일
            </div>
            <div className="flex flex-col items-center text-small text-gray-600 mr-14">
              <span className="text-large">10,000,000</span>
              팔로워
            </div>
            <div className="flex flex-col items-center text-small text-gray-600 mr-14">
              <span className="text-large">0</span>팬미팅
            </div>
            <div className="flex flex-col items-center text-small text-gray-600 mr-14">
              <span className="text-large">0</span>게시글
            </div>
          </div>
        </div>
        <div className="bg-gray-300 w-52 h-52 rounded-full mx-5" />
        <div className="w-2/5 h-64 flex flex-col justify-between">
          <div className="bg-white p-5 rounded-tl-2xl rounded-r-2xl">
            <span className="text-large">이름</span>
            <p className="text-h6 text-gray-600">팬미팅에서 곧 만나요~!!!</p>
          </div>
          <div className="bg-white p-5 rounded-tl-2xl rounded-r-2xl">
            <span className="text-large">이름</span>
            <p className="text-h6 text-gray-600">
              내일 우리 만나는 거 잊지 않으셨죠? 저는 방금 준비 다 끝내고 집에
              가는 중입니다 ㅎㅎ
            </p>
          </div>
          <div className="text-primary-text flex justify-end text-small">
            게시글 더보기
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
