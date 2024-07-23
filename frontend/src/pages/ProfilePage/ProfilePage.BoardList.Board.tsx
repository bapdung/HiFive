function Board() {
  return (
    <div className="bg-white p-[30px_40px] rounded-3xl mt-[35px]">
      <div className="flex justify-between">
        <div className="flex">
          <div className="w-[50px] h-[50px] rounded-full bg-gray-300" />
          <div className="flex flex-col ml-[10px]">
            <span className="text-h5">개복어</span>
            <span className="text-small text-gray-700">2024. 07. 15</span>
          </div>
        </div>
        <div className="btn-light-md h-[30px] flex justify-center items-center">
          자세히보기
        </div>
      </div>
      <p className="mt-[10px] text-large">팬미팅에서 곧 만나요~!!!!</p>
    </div>
  );
}

export default Board;
