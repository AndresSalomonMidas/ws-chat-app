import { createContext, useCallback, useMemo, useState } from "react";
import { fetchWithoutToken, fetchWithToken } from "../helpers/fetch";

export const AuthContext = createContext();

const INITIAL_STATE = {
  uid: null,
  name: null,
  email: null,
  checking: false,
  logged: false,
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(INITIAL_STATE);

  const login = useCallback(async (email, password) => {
    const res = await fetchWithoutToken("login", { email, password }, "POST");

    if (res.ok) {
      localStorage.setItem("token", res.token);
      const { user } = res;
      setAuth({
        uid: user.uid,
        name: user.name,
        email: user.email,
        checking: false,
        logged: true,
      });
    }

    return res.ok;
  }, []);

  const register = useCallback(async (name, email, password) => {
    const res = await fetchWithoutToken(
      "login/new",
      { name, email, password },
      "POST",
    );

    if (res.ok) {
      localStorage.setItem("token", res.token);
      const { user } = res;
      setAuth({
        uid: user.uid,
        name: user.name,
        email: user.email,
        checking: false,
        logged: true,
      });
    }

    return res.ok;
  }, []);

  const verifyToken = useCallback(async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setAuth({
        uid: null,
        checking: false,
        logged: false,
      });

      return false;
    }

    const res = await fetchWithToken("login/revalidate-token");

    if (res.ok) {
      localStorage.setItem("token", res.token);
      const { user } = res;
      setAuth({
        uid: user.uid,
        name: user.name,
        email: user.email,
        checking: false,
        logged: true,
      });

      return true;
    } else {
      setAuth({
        checking: false,
        logged: false,
      });

      return false;
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setAuth({
      checking: false,
      logged: false,
    });
  }, []);

  const contextObj = useMemo(
    () => ({
      auth,
      login,
      register,
      verifyToken,
      logout,
    }),
    [auth, login, register, verifyToken, logout],
  );

  return (
    <AuthContext.Provider value={contextObj}>{children}</AuthContext.Provider>
  );
};
