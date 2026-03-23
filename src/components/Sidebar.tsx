import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaArrowCircleRight } from "react-icons/fa"
import { FaArrowCircleLeft } from "react-icons/fa"
import { RiHomeHeartFill } from "react-icons/ri"
import { FaUserTie } from "react-icons/fa"
import { GrDocumentConfig } from "react-icons/gr"
import { FiLogOut } from "react-icons/fi"
import useAuthStore from "../store/useAuthStore"
import kc from "../service/keycloak"
import type { Category } from "../types/category"
import { getCategoriesByUser } from "../service/categoryApi"

type SidebarProps = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Sidebar({ open, setOpen }: SidebarProps) {
  const navigate = useNavigate()
  const [categories, setCategories] = useState<Category[]>([])
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false)

  const goHistory = (value: number) => {
    setOpen(false)
    navigate(value)
  }

  const { user, logout } = useAuthStore()

  const handleLogout = () => {
    setOpen(false)
    logout()
    kc.logout({ redirectUri: window.location.origin })
  }

  useEffect(() => {
    let isMounted = true

    const loadCategories = async () => {
      if (!user?.id) {
        if (isMounted) setCategories([])
        return
      }

      try {
        const data = await getCategoriesByUser(user.id)
        if (isMounted) setCategories(data)
      } catch (error) {
        console.error("Erro ao carregar categorias do menu:", error)
        if (isMounted) setCategories([])
      }
    }

    if (open) {
      void loadCategories()
    }

    return () => {
      isMounted = false
    }
  }, [open, user?.id])

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-linear-to-b from-gray-900 to-blue-800 text-white w-72 max-w-[85vw] transform 
      ${open ? "translate-x-0" : "-translate-x-full"} 
      transition-transform duration-300 z-40 flex flex-col`}
    >

      <div className="p-6 mt-10 text-xl font-bold">
        Menu
      </div>

      

      <ul className="space-y-4 p-6 flex-1">

        <li 
          onClick={() => {
            setOpen(false)
            navigate("/")
          }}
          className="flex items-center gap-2 hover:text-blue-600 cursor-pointer"
        >
          <RiHomeHeartFill />
          Home
        </li>

        <li 
          onClick={() => {
            setOpen(false)
            navigate(`/profile/${user?.id}`)
          }}
          className="flex items-center gap-2 hover:text-blue-600 cursor-pointer"
        >
          <FaUserTie />
          Perfil
        </li>

        <li>
          <button
            onClick={() => {
              setIsCategoriesOpen((prev) => !prev)
            }}
            className="w-full flex items-center justify-between gap-2 hover:text-blue-600 cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <GrDocumentConfig />
              Categorias
            </span>
            <span className="text-xs">{isCategoriesOpen ? "▲" : "▼"}</span>
          </button>

          {isCategoriesOpen && (
            <ul className="mt-2 ml-5 space-y-2 border-l border-white/20 pl-3">
              <li
                onClick={() => {
                  setOpen(false)
                  navigate(`/profile/${user?.id}/categories`)
                }}
                className="text-sm hover:text-blue-300 cursor-pointer"
              >
                Ver todas
              </li>

              {categories.map((category) => (
                <li
                  key={category.id}
                  onClick={() => {
                    setOpen(false)
                    navigate(`/profile/${user?.id}/category/${category.id}`)
                  }}
                  className="text-sm hover:text-blue-300 cursor-pointer"
                >
                  {category.name}
                </li>
              ))}
            </ul>
          )}
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

      <div className="p-4 border-t border-white/20">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 transition rounded-lg px-4 py-2"
        >
          <FiLogOut />
          Sair
        </button>
      </div>

    </div>
  )
}
