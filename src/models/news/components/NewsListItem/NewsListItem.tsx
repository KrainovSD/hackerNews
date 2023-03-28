import { getFormatDate } from "../../../../helpers/getFormatDate";
import { INews } from "store/News";
import "./NewsListItem.scss";
import score from "../../../../assets/media/reputation.png";
import { NavLink } from "react-router-dom";
import { memo } from "react";

interface INewsListItemProps {
  news: INews;
}
export const NewsListItem: React.FC<INewsListItemProps> = memo(({ news }) => {
  return (
    <NavLink to={`/news/${news.id}`} className="news-list-item">
      <div className="news-list-item__header">
        <div className="news-list-item__title">{news.title}</div>
        <div className="news-list-item__score">
          <img src={score} alt="" />
          <p>{news.score}</p>
        </div>
        <div className="news-list-item__data">{getFormatDate(news.time)}</div>
      </div>
      <div className="news-list-item__author">
        От автора <span className="_author">{news.by}</span>
      </div>
    </NavLink>
  );
});
