import { apiClient } from "./apiClient"
import type { Category } from "../types/category"

type CreateCategoryPayload = {
  name: string
  userId: string
}

type CreateCategoryResponse = {
  detail?: string
}

export const getCategoriesByUser = async (userId: string) => {
  const response = await apiClient.get<Category[]>(
    "/api/vocabulary/category/categories_by_user",
    {
      params: {
        user_id: userId,
      },
    }
  )

  return response.data
}

export const createCategory = async ({ name, userId }: CreateCategoryPayload) => {
  const response = await apiClient.post<CreateCategoryResponse>("/api/vocabulary/category", {
    name,
    user_id: userId,
  })

  return response.data
}
