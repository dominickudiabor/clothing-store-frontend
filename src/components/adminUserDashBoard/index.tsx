import React from "react";

import UserInfo from "../user-info";

import SearchBar from "material-ui-search-bar";

import { filterAdminUserList } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { AppState, NewUser } from "../../types";

import { format } from "date-fns";

import { v4 as uuidv4 } from "uuid";

import "./adminUserDashboard.scss";

const AdminUserDashboard = () => {
  const { notification, filteredUsers } = useSelector(
    (state: AppState) => state.user
  );

  const dispatch = useDispatch();

  const handleChange = (query: string) => dispatch(filterAdminUserList(query));
  const handleCancelSearch = () => dispatch(filterAdminUserList(""));

  const headers = [
    { class: "user_header__checkbox", title: "Select" },
    { class: "user_header__image", title: "Avatar" },
    { class: "user_header__name", title: "Name" },
    { class: "user_header__email", title: "Email(verified)" },
    { class: "user_header__ban", title: "Ban Status" },
    { class: "user_header__date", title: "Date Created" },
  ];

  return (
    <div className="admin__main">
      <div className="admin__header">Admin User Dashboard</div>
      <SearchBar
        placeholder={"Search by name"}
        className="admin__search"
        onChange={handleChange}
        onCancelSearch={handleCancelSearch}
      />
      <div className="admin__content">
        <div className="user_header">
          {headers.map((header) => (
            <span key={uuidv4()} className={header.class}>
              {header.title}
            </span>
          ))}
        </div>
        {notification && (
          <div className="admin__filterError">{notification}</div>
        )}
        {filteredUsers.map((user: NewUser) => {
          const {
            email,
            firstname,
            lastname,
            createdAt,
            photo,
            isBanned,
            emailConfirmed,
          } = user;
          const formatDate = format(new Date(createdAt), "MM/dd/yyyy");
          return (
            <UserInfo
              key={uuidv4()}
              firstName={firstname}
              lastName={lastname}
              email={email}
              date={formatDate}
              bannedStatus={isBanned}
              avatar={photo}
              value={user}
              confirm={emailConfirmed}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AdminUserDashboard;
