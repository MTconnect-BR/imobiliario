export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  avatarUrl?: string;
  githubId?: number;
  createdAt: string;
}

const USERS_KEY = "imobiliario_users";
const SESSION_KEY = "imobiliario_session";

function readUsers(): User[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function writeUsers(users: User[]): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function generateId(): string {
  return crypto.randomUUID?.() ?? Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export function getSession(): Omit<User, "password"> | null {
  if (typeof window === "undefined") return null;
  try {
    const data = localStorage.getItem(SESSION_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export function setSession(user: User): void {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...safe } = user;
  localStorage.setItem(SESSION_KEY, JSON.stringify(safe));
}

export function logout(): void {
  localStorage.removeItem(SESSION_KEY);
}

export function isGithubSession(): boolean {
  const session = getSession();
  return !!session?.githubId;
}

export function loginWithGithub(githubUser: {
  id: number;
  login: string;
  email: string;
  avatar_url: string;
}): { success: boolean; error?: string } {
  const users = readUsers();
  let user = users.find((u) => u.githubId === githubUser.id);

  if (user) {
    // Update existing user info
    user.name = githubUser.login;
    user.email = githubUser.email;
    user.avatarUrl = githubUser.avatar_url;
    writeUsers(users);
  } else {
    // Create new user
    user = {
      id: generateId(),
      name: githubUser.login,
      email: githubUser.email,
      avatarUrl: githubUser.avatar_url,
      githubId: githubUser.id,
      createdAt: new Date().toISOString(),
    };
    users.push(user);
    writeUsers(users);
  }

  setSession(user);
  return { success: true };
}

export function register(name: string, email: string, password: string): { success: boolean; error?: string } {
  const users = readUsers();
  if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
    return { success: false, error: "Este email já está cadastrado." };
  }
  const user: User = {
    id: generateId(),
    name,
    email: email.toLowerCase(),
    password: simpleHash(password),
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  writeUsers(users);
  return { success: true };
}

export function login(email: string, password: string): { success: boolean; error?: string; user?: User } {
  const users = readUsers();
  const user = users.find(
    (u) => u.email === email.toLowerCase() && u.password === simpleHash(password)
  );
  if (!user) {
    return { success: false, error: "Email ou senha incorretos." };
  }
  setSession(user);
  return { success: true, user };
}

function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return btoa(`_${Math.abs(hash)}_${str.length}`);
}

export function forgotPassword(email: string): { success: boolean; error?: string } {
  const users = readUsers();
  const user = users.find((u) => u.email === email.toLowerCase());
  if (!user) {
    return { success: false, error: "Email não encontrado." };
  }
  return { success: true };
}
