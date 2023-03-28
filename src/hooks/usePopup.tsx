import { Popup } from "../components/Popup/Popup";

import { useState } from "react";
import { AnimationWrapper } from "../components/AnimationWrapper/AnimationWrapper";

type IusePopup = () => {
  popup: JSX.Element;
  setPopup: IsetPopup;
};
export type IsetPopup = (title: string, body: string) => void;

export const usePopup: IusePopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const setPopup: IsetPopup = (title, body, newCallback = null) => {
    setIsVisible(true);
    setTitle(title);
    setBody(body);
  };

  const popup = (
    <AnimationWrapper className="appear-anim" isVisible={isVisible}>
      <Popup
        title={title}
        body={body}
        action={() => {
          setIsVisible(false);
        }}
      />
    </AnimationWrapper>
  );

  return { popup, setPopup };
};
