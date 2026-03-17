import { useState } from "react"
import { Menu } from "lucide-react"
import useAuthStore from "../store/useAuthStore"
import { IoCloseSharp } from "react-icons/io5"
import Sidebar from "./Sidebar";

const Navbar = () => {
  const { user } = useAuthStore()
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* NAVBAR */}
      <nav 
        className="relative bg-gray-900 text-white p-4 w-full"
      >
        {/* BOTÃO MENU */}
        <button
          onClick={() => setOpen(prev => !prev)}
          className="absolute hover:cursor-pointer z-50"
        >
          {
            open ?
            <IoCloseSharp size={18} />
            :
            <Menu size={18} />
          }
        </button>

        <div 
          className="relative flex justify-end"
        >

          {/* Nome centralizado */}
          <div 
            className="absolute left-1/2 text-2xl transform -translate-x-1/2"
          >
            My Vocabulary

          </div>

          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
            {user?.name}
          </div>
        </div>
      </nav>

      <Sidebar 
        open={open}
        setOpen={setOpen}
      />
    </>
  )
}

export default Navbar