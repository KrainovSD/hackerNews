import { useRoutes } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { routes } from "./routes/index";
import { useEffect } from "react";
import News from "./store/News";

export const App: React.FC = () => {
  useEffect(() => {
    if (News.limitNewsList.length === 0) News.getNewsList();
  }, []);
  const route = useRoutes(routes);
  return (
    <Layout>
      <div className="workplace"> {route} </div>
    </Layout>
  );
};
