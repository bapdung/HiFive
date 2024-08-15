import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import client from "../../client";
import useAuthStore from "../../store/useAuthStore";

type RouteParams = {
  fanmeetingId: string;
};

type Story = {
  id: number;
  title: string;
  content: string;
};

function StoryForm() {
  const { fanmeetingId } = useParams<RouteParams>();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [story, setStory] = useState<Story | null>(null);
  const [editMode, setEditMode] = useState(false);

  const accessToken = useAuthStore((state) => state.accessToken);

  const fetchStory = useCallback(async () => {
    try {
      const apiClient = client(accessToken || "");
      const response = await apiClient.get(`/api/story/my/${fanmeetingId}`);
      if (response.data.length > 0) {
        const { storyId } = response.data[0];
        const storyDetail = await apiClient.get(`/api/story/detail/${storyId}`);
        setStory({ id: storyId, ...storyDetail.data });
        setTitle(storyDetail.data.title || "");
        setContent(storyDetail.data.content || "");
      }
    } catch (err) {
      console.error("Error fetching story:", err);
    }
  }, [accessToken, fanmeetingId]);

  useEffect(() => {
    fetchStory();
  }, [fetchStory]);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setContent(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const apiClient = client(accessToken || "");
      if (editMode && story) {
        await apiClient.patch(`/api/story/${story.id}`, { title, content });
      } else {
        await apiClient.post(`/api/story/${fanmeetingId}`, { title, content });
      }

      fetchStory();
      setEditMode(false);
    } catch (error) {
      console.error("Error submitting story:", error);
    }
  };

  const handleDelete = async () => {
    try {
      if (story) {
        const apiClient = client(accessToken || "");
        await apiClient.delete(`/api/story/${story.id}`);
        setStory(null);
        setTitle("");
        setContent("");
      }
    } catch (error) {
      console.error("Error deleting story:", error);
    }
  };

  const handleEditMode = () => {
    setEditMode(true);
  };

  return (
    <div className="w-[100vw] flex flex-col items-center">
      <div className="bg-white w-full flex flex-col items-center py-8">
        <h1 className="text-primary-text text-h2 mb-5">사연 작성</h1>
        <div className="bg-gray-100 px-8 py-4 rounded-lg text-center">
          <p className="text-gray-700">여러분의 이야기를 남겨주세요!</p>
          <p className="text-gray-700">
            남겨주신 사연은 크리에이터와의 팬미팅에서 소개될 수 있습니다.
          </p>
        </div>
      </div>
      <div className="bg-white w-2/3 rounded-[25px] px-10 pt-10 my-12">
        <form className="flex flex-col items-center">
          <input
            type="text"
            className="w-full focus:outline-none border-2 border-gray-300 p-2.5 rounded-[39px] text-gray-900 px-8"
            value={title}
            onChange={handleTitleChange}
            placeholder="제목을 입력해주세요."
          />
          <textarea
            className="rounded-xl border-2 border-gray-300 min-h-[31rem] resize-none focus:outline-none w-full mt-5 text-gray-900 py-2.5 px-8"
            value={content}
            onChange={handleContentChange}
            placeholder="내용을 입력해주세요."
          />
          <div className="my-5">
            {story ? (
              <>
                <button
                  className="btn-md bg-gray-300 text-gray-700 min-w-[9rem]"
                  type="button"
                  onClick={handleDelete}
                >
                  삭제
                </button>
                <button
                  type="button"
                  className="btn-md min-w-[9rem] ml-5"
                  onClick={editMode ? handleSubmit : handleEditMode}
                >
                  {editMode ? "수정 완료" : "수정"}
                </button>
              </>
            ) : (
              <button
                type="button"
                className="btn-md min-w-[9rem] ml-5"
                onClick={handleSubmit}
              >
                작성 완료
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default StoryForm;
