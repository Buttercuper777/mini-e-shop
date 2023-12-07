import { CSSProperties, FC } from "react";
import styles from "./btn.module.scss";
import { TUnknownFnc } from "../common";

type btnStyle = Pick<CSSProperties, "width">;

interface IButton {
  title: string;
  active?: boolean;
  onClick?: TUnknownFnc;
  style?: btnStyle;
  inactiveClick?: TUnknownFnc;
}

const MiniButton: FC<IButton> = ({
  onClick,
  title,
  style,
  active,
  inactiveClick,
}) => {
  return (
    <button
      className={`${styles.btn} ${
        active === undefined || active === true ? styles.active : ""
      }`}
      onClick={
        active === undefined || active === true ? onClick : inactiveClick
      }
      style={
        style
          ? style
          : {
              width: "100%",
            }
      }
    >
      {title}
    </button>
  );
};

export default MiniButton;
