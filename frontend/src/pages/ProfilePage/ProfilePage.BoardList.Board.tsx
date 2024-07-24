function Board() {
  return (
    <div className="bg-white px-10 py-7 rounded-3xl mt-9">
      <div className="flex justify-between">
        <div className="flex">
          <div className="w-12 h-12 rounded-full bg-gray-300" />
          <div className="flex flex-col ml-3">
            <span className="text-h5">개복어</span>
            <span className="text-small text-gray-700">2024. 07. 15</span>
          </div>
        </div>
        <div className="btn-light-md h-8 flex justify-center items-center">
          자세히보기
        </div>
      </div>
      <p className="mt-2.5 text-large">팬미팅에서 곧 만나요~!!!!</p>
    </div>
  );
}

export default Board;
