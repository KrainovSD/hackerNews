import { observer } from "mobx-react-lite";
import "./CommentItem.scss";
import { useEffect, Fragment, useState } from "react";
import Comments from "../../../../store/Comments";
import { getFormatDate } from "../../../../helpers/getFormatDate";
import arrowDown from "../../../../assets/media/arrow-down.png";
import commentIcon from "../../../../assets/media/comment.png";
import { Parser } from "html-to-react";

interface ICommentItemProps {
  id: number;
  level: number;
}

export const CommentItem: React.FC<ICommentItemProps> = observer(
  ({ id, level }) => {
    const marginLeft = `${level * 30}px`;
    useEffect(() => {
      Comments.getCommentInfo(id);
    }, []);

    const commentInfo = Comments.comments[id] || null;

    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = () => {
      if (!commentInfo?.kids) return;
      const value = isOpen ? false : true;
      setIsOpen(value);
    };

    if (!commentInfo || (commentInfo && commentInfo?.deleted))
      return <div></div>;

    return (
      <Fragment>
        <div
          className="comment-item"
          style={{
            marginLeft: marginLeft,
            maxWidth: `calc(100% - ${marginLeft})`,
          }}
          id={`${id}`}
        >
          <div className="comment-item__header">
            <div className="comment-item__author">{commentInfo.by}</div>
            <div className="comment-item__date">
              {getFormatDate(commentInfo.time)}
            </div>
          </div>
          <div className="comment-item__content">
            {Parser().parse(commentInfo.text)}
          </div>
          <div className="comment-item__footer">
            <div className="comment-item__sub-comment" onClick={toggleOpen}>
              <img src={commentIcon} alt="" className="comment_icon" />
              <p>Ответы ({commentInfo?.kids?.length || 0})</p>
              {commentInfo?.kids && (
                <img src={arrowDown} alt="" className="arrow_icon" />
              )}
            </div>
          </div>
        </div>
        {commentInfo && commentInfo?.kids && isOpen && (
          <div className="comment-item__sub-comment-list">
            {commentInfo.kids.map((kidID) => (
              <CommentItem id={kidID} level={level + 1} key={kidID} />
            ))}
          </div>
        )}
      </Fragment>
    );
  }
);
