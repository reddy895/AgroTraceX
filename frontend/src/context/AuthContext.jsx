// src/context/AuthContext.jsx
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const ROLES = {
  ADMIN: 'ADMIN',
  COMPANY: 'COMPANY',
  AGRONOMIST: 'AGRONOMIST',
  FIELD_OFFICER: 'FIELD OFFICER'
};

const USER_PRESETS = {
  [ROLES.ADMIN]: {
    id: "USR-001",
    name: "Dr. Alok Verma",
    email: "admin@agrotracex.com",
    role: ROLES.ADMIN,
    title: "Platform Administrator & Operations Lead",
    avatar: "AV",
    company: "AgroTraceX Platform Operations"
  },
  [ROLES.COMPANY]: {
    id: "USR-002",
    name: "Dr. Ananya Sen",
    email: "ananya.sen@novisagro.com",
    role: ROLES.COMPANY,
    title: "VP of Plant Genetics & Field R&D",
    avatar: "AS",
    company: "Novis AgroSciences Global"
  },
  [ROLES.AGRONOMIST]: {
    id: "USR-003",
    name: "Dr. Arvind Shrivastava",
    email: "arvind.shrivastava@agrotracex-demo.com",
    role: ROLES.AGRONOMIST,
    title: "Lead Agronomist & Cereal Phenotyper",
    avatar: "AS",
    company: "AgroTraceX Scientific Verification"
  },
  [ROLES.FIELD_OFFICER]: {
    id: "USR-004",
    name: "Vikas Shekhawat",
    email: "vikas.s@agrotracex-demo.com",
    role: ROLES.FIELD_OFFICER,
    title: "Senior Field Officer (Khargone Zone)",
    avatar: "VS",
    company: "Central Field Operations"
  }
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const savedRole = localStorage.getItem('agrotracex_role') || ROLES.ADMIN;
    return USER_PRESETS[savedRole] || USER_PRESETS[ROLES.ADMIN];
  });

  const switchRole = (newRole) => {
    if (USER_PRESETS[newRole]) {
      setCurrentUser(USER_PRESETS[newRole]);
      localStorage.setItem('agrotracex_role', newRole);
    }
  };

  const login = (email, password, selectedRole = ROLES.ADMIN) => {
    const userToLogin = USER_PRESETS[selectedRole] || {
      id: "USR-" + Date.now(),
      name: email.split('@')[0],
      email: email,
      role: selectedRole,
      title: "Authenticated User",
      avatar: email.substring(0, 2).toUpperCase(),
      company: "AgroTraceX User"
    };
    setCurrentUser(userToLogin);
    localStorage.setItem('agrotracex_role', selectedRole);
    return true;
  };

  const logout = () => {
    // Return to default admin for smooth pairing
    setCurrentUser(USER_PRESETS[ROLES.ADMIN]);
    localStorage.setItem('agrotracex_role', ROLES.ADMIN);
  };

  return (
    <AuthContext.Provider value={{ currentUser, switchRole, login, logout, roles: ROLES }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
