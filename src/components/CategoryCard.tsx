import { Link } from "react-router-dom"
import type { Category } from "../types/category"
import useAuthStore from "../store/useAuthStore"

interface Props {
  category: Category
}

const CategoryCard = ({ category }: Props) => {
  const { user } = useAuthStore()

  return (
    <Link
      to={`/profile/${user?.id}/category/${category.id}`}
      className="w-40 h-56 rounded-2xl 
          bg-linear-to-l from bg-gray-900 to-blue-800 
          text-white shadow-lg
          flex items-center justify-center text-lg font-medium
          hover:scale-105 hover:shadow-2xl transition"
    >
      {category.name}
    </Link>
  )
}

export default CategoryCard
