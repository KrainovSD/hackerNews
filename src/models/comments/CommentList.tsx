import "./CommentList.scss";
import { CommentItem } from "./components/CommentItem/CommentsItem";

interface ICommentListProps {
  commentIDs: number[];
}

export const CommentList: React.FC<ICommentListProps> = ({ commentIDs }) => {
  return (
    <div className="comment-list">
      {commentIDs.map((id) => (
        <CommentItem id={id} level={0} key={id} />
      ))}
    </div>
  );
};
