import { apiClient } from "./apiClient"
import type { Word } from "../types/word"

type GetWordsPayload = {
  userId: string
  categoryId: string
}

type CreateWordPayload = {
  english: string
  userId: string
  categoryId: string
}

type CreateWordResponse = {
  detail?: string
}

export const getWordsByCategory = async ({ userId, categoryId }: GetWordsPayload) => {
  const response = await apiClient.get<Word[]>("/api/vacabulary/word/words", {
    params: {
      user_id: userId,
      category_id: categoryId,
    },
  })

  return response.data
}

export const createWord = async ({ english, userId, categoryId }: CreateWordPayload) => {
  const response = await apiClient.post<CreateWordResponse>("/api/vacabulary/word", {
    english,
    user_id: userId,
    category_id: categoryId,
  })

  return response.data
}
