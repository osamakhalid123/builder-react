import { GetPage, fetchPages } from "../../redux/features/page/pageSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";

import parse from "html-react-parser";
import { useAuth } from "../../context/AuthProvider";

export const ViewPage = ({ title }) => {
  const dispatch = useDispatch();
  const pageState = useSelector((state) => state.page);
  const { pages } = pageState;
  const { customName, id } = useParams();
  const location = useLocation();
  ////////////////////////////////////////////////////////////////

  const userState = useSelector((state) => state.user);
  const { currentUser } = useAuth();

  //////////////////////////////////////////////////////////////////
  // const userPages = pages.filter((page) => page.userId === userUid);
  // const getpageId = pages.filter((page) => page._id === location.state);
  const getpageId = pages.filter((page) => page._id === id);

  useEffect(() => {
    // console.log(location.state); s
    console.log(id);
    document.title = title;
    dispatch(fetchPages());
    dispatch(GetPage(id));
  }, [title, dispatch, id]);
  // }, [title, dispatch, location.state]);

  return (
    <>
      {getpageId.map((page) => {
        return <div key={page._id}>{parse(page.view.HTML)}</div>;
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
