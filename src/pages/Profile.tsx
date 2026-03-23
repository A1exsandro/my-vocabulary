import useAuthStore from "../store/useAuthStore"
import { Link } from "react-router-dom"

const Profile = () => {
  const { user } = useAuthStore()


  return (
    <div className="">
      <div className="grid grid-cols-2 gap-4 mt-10 max-w-xl mx-auto px-4">
        <Link
          to={`/profile/${user?.id}/categories/`}
          className="w-full aspect-5/8 rounded-2xl 
          bg-linear-to-r from-gray-900 to-blue-800 
          text-white shadow-lg
          flex items-center justify-center font-medium text-[clamp(0.85rem,2.5vw,1.125rem)] whitespace-nowrap
          hover:scale-105 hover:shadow-2xl transition"
        >
          Categorias
        </Link>

        <Link
          to={`.`}
          className="w-full aspect-5/8 rounded-2xl 
          bg-linear-to-l from-gray-900 to-blue-800 
          text-white shadow-lg
          flex items-center justify-center font-medium text-[clamp(0.85rem,2.5vw,1.125rem)] whitespace-nowrap
          hover:scale-105 hover:shadow-2xl transition"
        >
          Classes
        </Link>
      </div>
    </div>
  )
}

export default Profile
