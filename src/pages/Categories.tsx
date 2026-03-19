import { useParams } from "react-router-dom"
import CategoryCard from "../components/CategoryCard"
import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from 'react-toastify'
import Grid from "../components/Grid"
import LoadingScreen from "../components/LoadingScreen"
import type { Category } from "../types/category"


const BASE_URL_API = import.meta.env.VITE_BASE_URL_API

const Categories = () => {
  const { userId } = useParams()
  
  
	const [categories, setCategories] = useState<Category[]>([]) 
	const [newCategory, setNewCategory] = useState("")
	const [showForm, setShowForm] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  


  useEffect(() => {
    fetchCategories()
  }, [isSuccess])

  // READ
  const fetchCategories = async () => {
    try {
      const response = await axios.get<Category[]>(
        `${BASE_URL_API}/api/vacabulary/category/categories_by_user`,
        {
          params: {
            user_id: userId
          }
        }
      )

      console.log('---- resposta vindo da Api-----', response.data)
      setCategories(response.data)
      setIsLoading(false)
    } catch (error) {
      console.log('---- error ----', error)
    }
  }


  // - [ ] Remover para o hook
  // CREATE
  const addNewCategory =  async() => {
    if (!newCategory) return toast.warning('O campo não pode ser vazio!')
      
  
    setIsLoading(true)

    try {

      setShowForm(false)
      
      const response = await axios.post(`${BASE_URL_API}/api/vacabulary/category`, 
        {
          name: newCategory,
          user_id: userId
        }
      )

      setIsLoading(false)
      toast.success(response.data.detail)
      setIsSuccess(true)
      console.log(response)
      setNewCategory('')
    } catch (error) {
      setIsLoading(false)
      // - [ ] tratar o erro e mostrar a mensagem ao usuário
      toast.error('Algum erro aconteceu!')
      console.log('----- error ---', error)
    }
  }

	return (
		
		<div className="max-w-7xl mx-auto px-4">
      {/* Loading */}
      {
        isLoading &&
        <LoadingScreen 
          title="Quase lá..."
          content="Estamos Criando Sua Nova Categoria"
        />
      }

      <button
				onClick={() => setShowForm(true)}
				className="bg-linear-to-l from-gray-900 to-blue-800 
					text-white px-4 py-2 rounded ml-3"
				>
				+ Adicionar Categoria
			</button>

			{/* Lista */}
				<Grid>

					{categories.map((category) => (
						<CategoryCard key={category.id} category={category} />
					))}

				</Grid>

          {/* Formulário Para Criar uma Nova Categoria */}
          {/* - [ ] Remover para um componente, e chamar o componente aqui */}
          {showForm && (
            <div 
              className="fixed inset-0 bg-black/40 backdrop-blur-sm flex 
                items-center justify-center"
            >
              
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
