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
      className="rounded-2xl 
        w-full aspect-5/8
        bg-linear-to-l from-gray-900 to-blue-800
        text-white shadow-lg p-4
        flex justify-center items-center
        hover:scale-105 hover:shadow-2xl transition"
    >
      <p className="font-semibold leading-tight text-center whitespace-nowrap text-[clamp(0.78rem,2.5vw,1.25rem)]">
        {category.name}
      </p>
    </Link>
  )
}

export default CategoryCard
