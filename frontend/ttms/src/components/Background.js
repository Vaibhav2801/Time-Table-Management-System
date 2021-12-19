import React from "react";
import bg from "../images/bg-ttms.jpg";
export default function Body() {
  return (
    <div
      id="bg"
      style={{
        position: "fixed",
        top: "0",
        left: "-10%",
        width: "10%",
        height: "10%",
      }}
    >
      <img
        src={bg}
        style={{
          position: "inherit",
          // opacity: "0.9",
          // filter: "blur(0px)",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          margin: "auto",
          minWidth: "100%",
          minHeight: "100%",
        }}
        alt="bg"
      ></img>
    </div>
  );
}
