import { create } from "zustand"
import type { User } from "../types/user"

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (user: User, token: string) => void
  logout: () => void
  setLoading: (value: boolean) => void
  updateUser: (updatedFields: Partial<User>) => void
}

const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,

  login: (user, token) => set({ user, token, isAuthenticated: true }),
  logout: () => set({ user: null, token: null, isAuthenticated: false }),
  setLoading: (value) => set({ isLoading: value }),

  updateUser: (updatedFields) => {
    const currentUser = get().user
    if (!currentUser) return // ou lance um erro se quiser garantir que haja um user
    set({ user: { ...currentUser, ...updatedFields } })
  }
}))

export default useAuthStore
