import React, { createContext, useContext, useState } from 'react'; // Import useState

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null); // Correctly use useState

  // Add your logic to set userId here
  // e.g., you can fetch the user ID from an API or local storage

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext); // No arguments here
};
