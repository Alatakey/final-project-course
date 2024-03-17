import { useState } from "react";

interface UserToken {
  token: string;
}

export default function useToken() {
  const [token, setToken] = useState<string | null>(getToken());

  function getToken(): string | null {
    const tokenString = localStorage.getItem("token");
    if (!tokenString) return null;
    const userToken: UserToken = JSON.parse(tokenString);
    return userToken.token;
  }

  function saveToken(userToken: UserToken) {
    localStorage.setItem("token", JSON.stringify(userToken));
    setToken(userToken.token);
  }

  return {
    setToken: saveToken,
    token,
  };
}
