import { GetPage, fetchPages } from "../../redux/features/page/pageSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";

import parse from "html-react-parser";

export const ViewPage = ({ title, userUid }) => {
  const dispatch = useDispatch();
  const pageState = useSelector((state) => state.page);
  const { pages } = pageState;
  const { customName } = useParams();
  const location = useLocation();
  const userPages = pages.filter((page) => page.userId === userUid);

  const getpageId = pages.filter((page) => page._id === location.state.prop);

  useEffect(() => {
    document.title = title;
    dispatch(fetchPages());
    dispatch(GetPage(location.state.prop));
  }, [title, dispatch, location.state.prop]);

  return (
    <>
      {getpageId.map((page) => {
        return parse(page.view.HTML);
      })}

      {getpageId.map((page) => {
        var element = document.createElement("style");
        element.setAttribute("type", "text/css");
        element.innerHTML = page.view.CSS;
        document.head.append(element);
      })}
    </>
  );
};
