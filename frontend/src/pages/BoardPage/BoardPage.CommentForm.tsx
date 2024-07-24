function CommentForm() {
  return (
    <div className="flex items-centerw-full mb-12 justify-between">
      <div className="bg-gray-400 min-w-[50px] h-[50px] rounded-full" />
      <form className="w-full ml-4 flex justify-between border-b border-solid border-1 pb-2 border-gray-500 ">
        <input
          className="bg-transparent text-gray-700 outline-none"
          type="text"
          placeholder="댓글 작성"
        />
        <button type="submit" className="btn-light-md max-h-10 w-14">
          댓글
        </button>
      </form>
    </div>
  );
}

export default CommentForm;
