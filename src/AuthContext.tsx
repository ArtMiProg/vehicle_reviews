import { createContext, useContext, ReactNode, useState } from 'react';
import {Car} from './components/car/CarComponent';
import { Review } from './components/review/ReviewComponent';
import { v4 as uuidv4 } from 'uuid';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

export interface User {
    id: string;
    username: string;
    password: string;
    name: string;
    surname: string;
    role: UserRole; 
    cars: Car[];
    reviews: Review[];
}

interface AuthContextProps {
  user: User | null;
  signIn: (username: string, password: string) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  const signIn = (username: string, password: string) => {
   
    if (password === 'password') {
      const newUser: User = {
          id: uuidv4(),
          username,
          password, 
          name: 'John',
          surname: 'Smith',
          role: UserRole.USER,
          cars: [],
          reviews: []
      };

      setUser(newUser);
      localStorage.setItem('currentUser', JSON.stringify(newUser));
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const contextValue: AuthContextProps = {
    user,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}