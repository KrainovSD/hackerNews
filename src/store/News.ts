import axiosInstance from "../helpers/axios";
import { makeAutoObservable, runInAction } from "mobx";
import { TEST_MODE } from "../const";

const linkNewsID = "newstories.json";
const getLinkOneNews = (id: number | string) => {
  return `item/${id}.json`;
};
const secondToUpdate = 60;

export interface INews {
  by: string;
  descendants: number;
  id: number;
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
  kids: number[] | undefined;
}
type NewsIDs = number[];

class News {
  newsList: INews[] = [];
  isLoadingNews: boolean = false;
  isFetchingNews: boolean = false;
  timerToUpdateUI: NodeJS.Timer | null = null;
  timer: number | string = 0;
  timerToUpdate: NodeJS.Timer | null = null;
  error: string = "";
  currentNews: INews | null = null;
  isLoadingCurrentNews: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }
  async repeatableGetNewsList() {
    this.timer = secondToUpdate;
    this.timerToUpdateUI = setInterval(() => {
      this.decrementTimer();
    }, 1000);
    this.timerToUpdate = setInterval(() => {
      this.getNewsList();
    }, secondToUpdate * 1000);
  }
  decrementTimer() {
    if (this.timer >= 1 && typeof this.timer === "number") this.timer--;
    else {
      this.timer = "данные обновляются";
      if (this.timerToUpdateUI) clearInterval(this.timerToUpdateUI);
    }
  }
  clearAllTimers() {
    if (this.timerToUpdate) clearInterval(this.timerToUpdate);
    if (this.timerToUpdateUI) clearInterval(this.timerToUpdateUI);
  }
  async getNewsList() {
    try {
      if (this.isFetchingNews) return;
      this.isFetchingNews = true;
      this.clearAllTimers();
      this.timer = "данные обновляются";
      if (this.newsList.length === 0) this.isLoadingNews = true;
      const newsIds = await axiosInstance.get<NewsIDs>(linkNewsID);
      let promises;
      if (TEST_MODE)
        promises = newsIds.data.slice(0, 20).map(async (id) => {
          const news = await axiosInstance.get<INews>(getLinkOneNews(id));
          return news.data;
        });
      else
        promises = newsIds.data.map(async (id) => {
          const news = await axiosInstance.get<INews>(getLinkOneNews(id));
          return news.data;
        });
      const result = await Promise.all(promises);
      result.sort((a, b) => {
        if (a < b) return 1;
        if (a > b) return -1;
        return 0;
      });
      runInAction(() => {
        this.newsList = result.filter((item) => item !== null);
        this.isLoadingNews = false;
        this.isFetchingNews = false;
      });
      this.repeatableGetNewsList();
    } catch (error) {
      this.clearAllTimers();
      runInAction(() => {
        this.timer = "ошибка при загрузке";
        this.isLoadingNews = false;
        this.isFetchingNews = false;
        this.error = "При загрузке информации о всех новостях произошла ошибка";
      });
    }
  }
  get limitNewsList() {
    if (this.newsList.length === 0) return [];
    return this.newsList.slice(0, 100);
  }

  async getNewsInfo(id: number | string) {
    try {
      if (this.isLoadingCurrentNews) return;
      this.isLoadingCurrentNews = true;
      const response = await axiosInstance.get<INews>(getLinkOneNews(id));
      runInAction(() => {
        this.currentNews = response.data;
        this.isLoadingCurrentNews = false;
      });
    } catch (e) {
      runInAction(() => {
        this.isLoadingCurrentNews = false;
        this.error = "При загрузке информации о новости произошла ошибка";
      });
    }
  }
}
export default new News();
