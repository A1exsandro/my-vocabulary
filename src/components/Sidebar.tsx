import { useNavigate } from "react-router-dom"
import { FaArrowCircleRight } from "react-icons/fa"
import { FaArrowCircleLeft } from "react-icons/fa"
import { RiHomeHeartFill } from "react-icons/ri"
import { FaUserTie } from "react-icons/fa"
import { GrDocumentConfig } from "react-icons/gr"
import useAuthStore from "../store/useAuthStore"

type SidebarProps = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Sidebar({ open, setOpen }: SidebarProps) {
  const navigate = useNavigate()
  const goHistory = (value: number) => {
    setOpen(false) // fecha sidebar
      navigate(value) // navega
  }

  const { user } = useAuthStore()

  return (
    <div
      className={`fixed top-0 left-0 h-full  bg-linear-to-b from-gray-900 to-blue-800 text-white w-64 transform 
      ${open ? "translate-x-0" : "-translate-x-full"} 
      transition-transform duration-300 z-40`}
    >

      <div className="p-6 mt-10 text-xl font-bold">
        Menu
      </div>

      

      <ul className="space-y-4 p-6">

        <li 
          onClick={() => {
            setOpen(!open) 
            navigate("/")
          }}
          className="flex items-center gap-2 hover:text-blue-600 cursor-pointer"
        >
          <RiHomeHeartFill />
          Home
        </li>

        <li 
          onClick={() => {
            setOpen(!open) 
            navigate(`/profile/${user?.id}`)
          }}
          className="flex items-center gap-2 hover:text-blue-600 cursor-pointer"
        >
          <FaUserTie />
          Perfil
        </li>

        <li 
          onClick={() => {
            setOpen(!open) 
            navigate(`/profile/${user?.id}/categories`)
          }}
          className="flex items-center gap-2 hover:text-blue-600 cursor-pointer"
        >
          <GrDocumentConfig />
          Categorias
        </li>

        <div 
          className="flex justify-evenly mt-10"
          >
            <FaArrowCircleLeft 
              className="cursor-pointer hover:text-blue-600"
              onClick={() => goHistory(-1)}
            />
            <FaArrowCircleRight
              className="cursor-pointer hover:text-blue-400"
              onClick={() => goHistory(1)}
            />
        </div>

      </ul>

    </div>
  )
}