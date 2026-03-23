import { Link } from "react-router-dom"
import type { User } from "../types/user"

interface CardProps {
  user: User | null
}

const Card = ({ user }: CardProps) => {
  if (!user?.id) return null

  return (
    <Link
      to={`/profile/${user.id}`}
      className="rounded-2xl 
          bg-linear-to-l from bg-gray-900 to-blue-800 
          text-white shadow-lg
          flex items-center justify-center text-lg font-medium
          hover:scale-105 hover:shadow-2xl transition"
    >
      {user.name}
    </Link>
  )
}

export default Card
