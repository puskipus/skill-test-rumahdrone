import React from "react";
import logo from "./rumah_drone_logo.jpg";

export default function LogoBrand({ width }) {
  return (
    <img className="mr-2" width={width} src={logo} alt="logo rumah drone" />
  );
}
