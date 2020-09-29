import React, { useEffect } from "react";

import MenuItem from "../menu-item/index";
import { v4 as uuidv4 } from "uuid";

import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../types";

import "./directory.scss";
import {
  toggleLoadingStatus,
  fetchShopSectionsStart,
} from "../../redux/actions";

const Directory = () => {
  const dispatch = useDispatch();
  const sectionData = useSelector((state: AppState) => state.product.sections);

  useEffect(() => {
    function fetchSections() {
      dispatch(fetchShopSectionsStart());
      dispatch(toggleLoadingStatus(true));
    }
    sectionData.length === 0 && fetchSections();
  }, [dispatch, sectionData]);

  return (
    <div className="directory-menu">
      {sectionData.map(({ title, ...otherSectionProps }) => (
        <MenuItem key={uuidv4()} {...otherSectionProps} title={title} />
      ))}
    </div>
  );
};

export default Directory;
