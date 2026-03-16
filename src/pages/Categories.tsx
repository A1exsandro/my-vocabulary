import { useParams } from "react-router-dom"
import CategoryCard from "../components/CategoryCard"
import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from 'react-toastify'

const BASE_URL_API = import.meta.env.VITE_BASE_URL_API

const Categories = () => {
  const { userId } = useParams()

  
	const [categories, setCategories] = useState([]) 
	const [newCategory, setNewCategory] = useState("")
	const [showForm, setShowForm] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    fetchCategories()
  }, [isSuccess])

  // READ
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${BASE_URL_API}/api/vacabulary/category/categories_by_user`,
        {
          params: {
            user_id: userId
          }
        }
      )

      console.log('---- resposta vindo da Api-----', response.data)
      setCategories(response.data)
      // setIsLoading(false)
    } catch (error) {
      console.log('---- error ----', error)
    }
  }


  // - [ ] Remover para o hook
  // CREATE
  const addNewCategory =  async() => {
    if (!newCategory) return

    try {
      const response = await axios.post(`${BASE_URL_API}/api/vacabulary/category`, 
        {
          name: newCategory,
          user_id: userId
        }
      )

      toast.success(response.data.detail)
      setIsSuccess(true)
      console.log(response)
      setNewCategory('')
      setShowForm(false)
    } catch (error) {
      console.log('----- error ---', error)
    }
  }

	return (
		
		<div className="ml-4">
			<button
				onClick={() => setShowForm(true)}
				className="bg-linear-to-l from-gray-900 to-blue-800 
					text-white px-4 py-2 rounded ml-3"
				>
				+ Adicionar Categoria
			</button>

			{/* Lista */}
				<div className="grid  grid-cols-4 mt-6 ml-3 gap-4">

					{categories.map((category) => (
						<CategoryCard key={category.id} category={category} />
					))}

				</div>

          {/* Formulário Para Criar uma Nova Categoria */}
          {/* - [ ] Remover para um componente, e chamar o componente aqui */}
          {showForm && (
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
              
              <div className="bg-white p-6 rounded shadow-lg w-80">
                
                <h2 className="text-lg font-bold mb-4">
                  Nova Palavra
                </h2>

                <input
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="border w-full p-2 mb-4"
                  placeholder="Digite a palavra"
                />

                <div className="flex gap-2">
                  <button
                    onClick={addNewCategory}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    Adicionar
                  </button>

                  <button
                    onClick={() => setShowForm(false)}
                    className="bg-gray-400 text-white px-4 py-2 rounded"
                  >
                    Cancelar
                  </button>
                </div>

              </div>
            </div>
          )}
				</div>
	)
}

export default Categories
