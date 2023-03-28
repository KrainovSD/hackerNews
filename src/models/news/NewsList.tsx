import "./NewsList.scss";
import { observer } from "mobx-react-lite";
import News from "../../store/News";
import { NewsListItem } from "./components/NewsListItem/NewsListItem";
import { Loader } from "../../components/Loader/Loader";
import { usePopup } from "../../hooks/usePopup";
import { BlackButton } from "../../components/UI/BlackButton/BlackButton";
import { useEffectOnlyUpdate } from "../../hooks/useEffectOnlyUpdate";

export const NewsList: React.FC = observer(() => {
  const { popup, setPopup } = usePopup();
  useEffectOnlyUpdate(() => {
    if (News.error.length > 0) setPopup("Ошибка", News.error);
  }, [News.error]);

  if (News.isLoadingNews) return <Loader />;

  return (
    <div className="news-list">
      {popup}
      {!News.isLoadingNews && (
        <div className="news-list__header">
          <div className="news-list__button-wrapper">
            <BlackButton
              data-disabled={News.isFetchingNews}
              onClick={() => {
                News.getNewsList();
              }}
            >
              Освежить новости
            </BlackButton>
          </div>
          <div className="news-list__timer">
            Осталось секунд до следующего обновления данных: {News.timer}
          </div>
        </div>
      )}
      {News.limitNewsList.map((news) => {
        if (!news.id) console.log(news);
        return <NewsListItem news={news} key={news.id} />;
      })}
      {News.limitNewsList.length === 0 && !News.isLoadingNews && (
        <div className="news-list__empty">
          Информация о новостях не найдена!
        </div>
      )}
    </div>
  );
});
