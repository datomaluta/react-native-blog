import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  async function login(email, password) {
    try {
      const users = JSON.parse(await AsyncStorage.getItem("users")) || [];

      const foundUser = users.find(
        (user) => user.email === email && user.password === password
      );

      if (!foundUser) {
        alert("User not found");
        return;
      }

      await AsyncStorage.setItem("currentUser", JSON.stringify(foundUser));

      setUser(foundUser);

      alert("Login successful");
    } catch (error) {
      throw Error(error.message);
    }
  }

  async function register(email, password) {
    try {
      const existingUsers =
        JSON.parse(await AsyncStorage.getItem("users")) || [];

      const userExists = existingUsers.find((user) => user.email === email);

      if (userExists) {
        alert("User already exists");
        return;
      }

      const newUser = { email, password };
      const updatedUsers = [...existingUsers, newUser];

      await AsyncStorage.setItem("users", JSON.stringify(updatedUsers));
      await AsyncStorage.setItem("currentUser", JSON.stringify(newUser));
      setUser(newUser);

      alert("User registered successfully");
    } catch (error) {
      throw Error(error.message);
    }
  }

  async function logout() {
    await AsyncStorage.removeItem("currentUser");
    setUser(null);
  }

  async function getInitialUserValue() {
    try {
      const user = await AsyncStorage.getItem("currentUser");
      const res = user ? JSON.parse(user) : null;
      setUser(res);
    } catch (error) {
      setUser(null);
    } finally {
      setAuthChecked(true);
    }
  }

  useEffect(() => {
    getInitialUserValue();
  }, []);


  return (
    <UserContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        authChecked,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

// Wrap the UserProvider component around the root layout stack
