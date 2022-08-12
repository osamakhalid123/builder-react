import React from "react";
import { useNavigate } from "react-router-dom";

function Componenet() {
  const navigate = useNavigate();

  return navigate("settings");
  //   return console.log("Hello");
}

export default Componenet;
