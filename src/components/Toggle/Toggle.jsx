import { useEffect } from "react";
import { useState } from "react";
import useStore from "../../utils/store";
import s from "./Toggle.module.scss";

const Toggle = ({ mode }) => {
  const { mode: storeMode, addMode, removeMode } = useStore();
//   const [toggle, setToggle] = useState(false);

const HandleClick = () => {
    if(storeMode.includes(mode)){
        removeMode(mode);
    }
    else{
        addMode(mode);
    }  
};

  //   console.log(storeMode);

  return (
    <div className={s.wrapper} onClick={() => HandleClick()}>
      <div className={s.toggle}>
        <div
          className={`${s.switch} ${
            storeMode.includes(mode) ? s.switch_active : ""
          }`}
        ></div>
      </div>
      <span className={s.mode}>{mode}</span>
    </div>
  );
};

export default Toggle;