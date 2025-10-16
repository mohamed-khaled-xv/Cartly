import React, {createContext, useContext, useState} from 'react';

type User = {
  fullName: string;
  email: string;
  id: number;
  token: string;
  isGuest: boolean;
  isLoggedIn: boolean;
};

export interface UserContextType {
  user: User | null;
  changeUserInfo: (user: User | null) => void;
  updateUser: (data: Partial<User>) => void;
  deleteUser: () => void;
  isGuestUser?: boolean;
  isLoggedIn: boolean;
}
const AuthContext = createContext<UserContextType | null>(null);

const WithAuth: React.FC<{children?: React.ReactNode}> = ({children}) => {
  const [user, setUser] = useState<User | null>(null);

  const changeUserInfo = (newUser: User | null) => {
    setUser(newUser);
  };

  const updateUser = (data: Partial<User>) => {
    setUser(prevUser => (prevUser ? {...prevUser, ...data} : null));
  };

  const deleteUser = () => {
    setUser(null);
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        changeUserInfo,
        updateUser,
        deleteUser,
        isGuestUser: user?.isGuest,
        isLoggedIn: !!user?.token,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
export default WithAuth;
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    return;
  }
  return context;
};
