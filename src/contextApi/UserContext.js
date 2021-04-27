import React, { useState } from "react";
import { ACCESS_TOKEN_NAME, USER_KEY_STORE } from "constants/securityConts";

const UserContext = React.createContext(undefined);

export function UserContextProvider(props) {
  const [jwt, setJwt] = useState(() =>
    window.localStorage.getItem(ACCESS_TOKEN_NAME)
  );
  const [shopName, setShopName] = useState(() =>
    window.localStorage.getItem("shopName")
  );

  const [user, setUser] = useState(() => {
    const userStored = window.localStorage.getItem(USER_KEY_STORE);
    if (userStored) {
      return JSON.parse(userStored);
    }
  });

  return (
    <UserContext.Provider
      value={{ jwt, setJwt, user, setUser, shopName, setShopName }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContext;
