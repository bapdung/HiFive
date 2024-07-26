function StoryForm() {
  return (
    <div className="w-[100vw]">
      <div className="bg-white w-full flex flex-col items-center py-8">
        <h1 className="text-primary-text text-h2 mb-5">사연 작성</h1>
        <div className="bg-gray-100 px-8 py-4 rounded-lg text-center">
          <p className="text-gray-700">여러분의 이야기를 남겨주세요!</p>
          <p className="text-gray-700">
            남겨주신 사연은
            <span className="text-primary-text">어쩌면 해피엔딩</span>{" "}
            팬미팅에서 소개될 수 있습니다 :)
          </p>
        </div>
      </div>
    </div>
  );
}

export default StoryForm;
