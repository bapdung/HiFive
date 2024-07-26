import React, { useState } from "react";

function StoryForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setContent(event.target.value);
  };

  return (
    <div className="w-[100vw] flex flex-col items-center">
      <div className="bg-white w-full flex flex-col items-center py-8">
        <h1 className="text-primary-text text-h2 mb-5">사연 작성</h1>
        <div className="bg-gray-100 px-8 py-4 rounded-lg text-center">
          <p className="text-gray-700">여러분의 이야기를 남겨주세요!</p>
          <p className="text-gray-700">
            남겨주신 사연은 &nbsp;
            <span className="text-primary-text">어쩌면 해피엔딩</span>{" "}
            팬미팅에서 소개될 수 있습니다 :)
          </p>
        </div>
      </div>
      <div className="bg-white w-2/3 rounded-[25px] px-10 pt-10 my-12">
        <form className="flex flex-col items-center">
          <input
            type="text"
            className="w-full focus:outline-none border-2 border-gray-300 p-2.5 rounded-[39px] text-gray-900 px-8"
            value={title}
            onInput={handleTitleChange}
            placeholder="제목을 입력해주세요."
          />
          <textarea
            className="rounded-xl border-2 border-gray-300 min-h-[31rem] resize-none focus:outline-none w-full mt-5 text-gray-900 py-2.5 px-8"
            value={content}
            onInput={handleContentChange}
          />
          <div className="my-5">
            <button
              className="btn-md bg-gray-300 text-gray-700 min-w-[9rem]"
              type="button"
            >
              삭제
            </button>
            <button type="button" className="btn-md min-w-[9rem] ml-5">
              작성 완료
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StoryForm;
