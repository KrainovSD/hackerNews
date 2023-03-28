import { Loader } from "../../components/Loader/Loader";
import { useEffectOnlyUpdate } from "../../hooks/useEffectOnlyUpdate";
import { usePopup } from "../../hooks/usePopup";
import { observer } from "mobx-react-lite";
import News from "../../store/News";
import "./NewsInfo.scss";
import { NavLink, useParams } from "react-router-dom";
import { getFormatDate } from "../../helpers/getFormatDate";
import { useEffect } from "react";
import { CommentList } from "../../models/comments/CommentList";
import Comments from "../../store/Comments";
import { BlackButton } from "../../components/UI/BlackButton/BlackButton";

export const NewsInfo: React.FC = observer(() => {
  const { popup, setPopup } = usePopup();
  useEffectOnlyUpdate(() => {
    if (News.error.length > 0) setPopup("Ошибка", News.error);
  }, [News.error]);

  useEffectOnlyUpdate(() => {
    if (Comments.error.length > 0) setPopup("Ошибка", Comments.error);
  }, [Comments.error]);

  const { id } = useParams();
  const loadInfo = () => {
    if (id) News.getNewsInfo(id);
    Comments.clearCommentInfo();
  };
  useEffect(() => {
    if (News.currentNews === null || `${News.currentNews?.id}` != id) {
      loadInfo();
    }
  }, [id]);

  if (News.isLoadingCurrentNews || News.isLoadingNews) return <Loader />;
  if (News.currentNews === null || `${News.currentNews?.id}` != id)
    return (
      <div className="news-info__not-found">
        Информация о новости не найдена!
      </div>
    );

  return (
    <div className="news-info">
      {popup}
      <div className="news-info__header">
        <div className="news-info__header-left">
          <div className="news-info__header-title">
            {News.currentNews.title}
          </div>
          <div className="news-info__header-info">
            <div className="news-info__header-author">
              Автор <span className="_author">{News.currentNews.by}, </span>
            </div>
            <div className="news-info__header-date">
              {getFormatDate(News.currentNews.time)}
            </div>
          </div>
          <div className="news-info__header-link">
            Ссылка на новость:{" "}
            <NavLink to={News.currentNews.url}>{News.currentNews.url}</NavLink>
          </div>
        </div>
        <div className="news-info__header-right">
          <div className="news-info__header-count-comment">
            Комментариев: {News.currentNews.descendants}
          </div>
        </div>
      </div>
      {News.currentNews?.kids && (
        <div className="news-info__comments-wrapper">
          <div className="news-info__button-wrapper">
            <BlackButton onClick={loadInfo}>Обновить комментарии</BlackButton>
          </div>
          <CommentList commentIDs={News.currentNews.kids} />
        </div>
      )}
    </div>
  );
});
