import { PropsWithChildren, memo } from "react";
import "./BlackButton.scss";
interface BlackButtonProps {
  [key: string]: any;
  "data-disabled"?: boolean;
}

export const BlackButton: React.FC<PropsWithChildren<BlackButtonProps>> = memo(
  ({ children, ...props }) => {
    return (
      <div className="black-button no-interaction" {...props}>
        {children}
      </div>
    );
  }
);
