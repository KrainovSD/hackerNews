import "./AnimationWrapper.scss";
import { PropsWithChildren } from "react";
import CSSTransition from "react-transition-group/CSSTransition";

interface IAnimationProps {
  isVisible: boolean;
  timeout?: number;
  className: "appear-anim";
}

export const AnimationWrapper: React.FC<PropsWithChildren<IAnimationProps>> = ({
  isVisible,
  timeout,
  className,
  children,
}) => {
  return (
    <CSSTransition
      in={isVisible}
      timeout={timeout ? timeout : 300}
      classNames={className}
      unmountOnExit
    >
      {children}
    </CSSTransition>
  );
};
