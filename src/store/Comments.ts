import axiosInstance from "../helpers/axios";
import { makeAutoObservable, runInAction } from "mobx";

export interface IComments {
  by: string;
  id: number;
  parent: number;
  text: string;
  time: number;
  type: string;
  kids?: number[];
  deleted?: boolean;
}

interface ICommetsStore {
  [key: number]: IComments;
}

const getLinkOneNews = (id: number | string) => {
  return `item/${id}.json`;
};

class Comments {
  comments: ICommetsStore = {};
  error: string = "";

  constructor() {
    makeAutoObservable(this);
  }
  clearCommentInfo() {
    this.comments = {};
  }

  async getCommentInfo(id: number) {
    try {
      const response = await axiosInstance.get<IComments>(getLinkOneNews(id));
      runInAction(() => {
        this.comments[id] = response.data;
      });
    } catch (e) {
      runInAction(() => {
        this.error = "При загрузке информации о комментарии произошла ошибка";
      });
    }
  }
}

export default new Comments();
