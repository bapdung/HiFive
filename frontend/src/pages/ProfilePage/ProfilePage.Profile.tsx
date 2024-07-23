function Profile() {
  return (
    <div className="flex h-[350px] p-[40px_50px] items-center justify-between w-4/5 rounded-[30px] bg-horizontal-gradient">
      <div className="w-2/5 h-[250px] flex flex-col justify-center">
        <div className="flex items-center">
          <div className="text-h2 mr-[20px]">이름</div>
          <div className="creator-btn-outline-md h-8 flex items-center">
            프로필 수정
          </div>
        </div>
        <p className="text-medium m-[20px_0px] text-gray-600">
          안녕하세요! 🐡 복하복하~ 개복어입니다! 여러분과 함께하는 웃음 가득한
          순간들을 만들기 위해 HiFive를 시작했어요. 히히 :) 이곳에서 함께 웃고
          즐기며 멋진 추억을 만들어가요!
        </p>
        <div className="flex">
          <div className="flex flex-col items-center text-small text-gray-600 mr-[60px]">
            <span className="text-large">0</span>
            활동일
          </div>
          <div className="flex flex-col items-center text-small text-gray-600 mr-[60px]">
            <span className="text-large">10,000,000</span>
            팔로워
          </div>
          <div className="flex flex-col items-center text-small text-gray-600 mr-[60px]">
            <span className="text-large">0</span>팬미팅
          </div>
          <div className="flex flex-col items-center text-small text-gray-600 mr-[60px]">
            <span className="text-large">0</span>게시글
          </div>
        </div>
      </div>
      <div className="bg-gray-300 w-[204px] h-[204px] rounded-full m-[0px_20px]" />
      <div className="w-2/5 h-[250px] flex flex-col justify-between">
        <div className="bg-white p-5 rounded-tl-[20px] rounded-r-[20px]">
          <span className="text-large">이름</span>
          <p className="text-h6 text-gray-600">팬미팅에서 곧 만나요~!!!</p>
        </div>
        <div className="bg-white p-5 rounded-tl-[20px] rounded-r-[20px]">
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
  );
}

export default Profile;
