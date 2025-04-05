import { createContext, useState, useEffect } from "react";

const Mycontext = createContext();

function Userdetail({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user-online');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const updateUser = (newUser) => {
    setUser(newUser);
  };

  useEffect(() => {
    if (user !== null) {
      localStorage.setItem('user-online', JSON.stringify(user));
    }
  }, [user]);

  return (
    <Mycontext.Provider value={{ user, updateUser }}>
      {children}
    </Mycontext.Provider>
  );
}

export { Userdetail, Mycontext };