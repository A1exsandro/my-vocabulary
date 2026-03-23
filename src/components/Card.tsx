import { Link } from "react-router-dom"
import { BookOpen, FolderKanban } from "lucide-react"
import type { User } from "../types/user"

interface CardProps {
  user: User | null
  categoriesCount?: number
  wordsCount?: number
}

const Card = ({ user, categoriesCount, wordsCount }: CardProps) => {
  if (!user?.id) return null

  const initial = user.name?.trim().charAt(0).toUpperCase() || "U"

  return (
    <Link
      to={`/profile/${user.id}`}
      className="rounded-2xl 
        w-full aspect-5/8
        bg-linear-to-l from-gray-900 to-blue-800
        text-white shadow-lg p-3 sm:p-4 overflow-hidden
        flex flex-col justify-between sm:justify-start
        hover:scale-105 hover:shadow-2xl transition"
    >
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/15 border border-white/30 flex items-center justify-center font-semibold shrink-0">
          {initial}
        </div>

        <div className="min-w-0">
          <p className="font-semibold leading-tight whitespace-nowrap text-[clamp(0.5rem,1.9vw,1rem)]">
            {user.name}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 min-[380px]:grid-cols-2 gap-1.5 sm:gap-2 text-[clamp(0.56rem,1.6vw,0.75rem)] sm:my-auto">
        <div className="bg-white/10 rounded-lg p-1.5 sm:p-2 border border-white/20 min-w-0 overflow-hidden">
          <p className="flex items-center gap-1 text-blue-100">
            <FolderKanban size={10} />
            Categorias
          </p>
          <p className="font-semibold text-[clamp(0.7rem,2vw,1rem)]">
            {categoriesCount ?? "-"}
          </p>
        </div>
        <div className="bg-white/10 rounded-lg p-1.5 sm:p-2 border border-white/20 min-w-0 overflow-hidden">
          <p className="flex items-center gap-1 text-blue-100">
            <BookOpen size={10} />
            Palavras
          </p>
          <p className="font-semibold text-[clamp(0.7rem,2vw,1rem)]">
            {wordsCount ?? "-"}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default Card
