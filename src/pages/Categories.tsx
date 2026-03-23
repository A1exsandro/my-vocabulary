import { useParams } from "react-router-dom"
import CategoryCard from "../components/CategoryCard"
import { useEffect, useState } from "react"
import { toast } from 'react-toastify'
import Grid from "../components/Grid"
import LoadingScreen from "../components/LoadingScreen"
import type { Category } from "../types/category"
import CreateItemModal from "../components/CreateItemModal"
import { createCategory, getCategoriesByUser } from "../service/categoryApi"

const Categories = () => {
  const { userId } = useParams()
	const [categories, setCategories] = useState<Category[]>([])
	const [newCategory, setNewCategory] = useState("")
	const [showForm, setShowForm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const fetchCategories = async () => {
    if (!userId) return
    try {
      const data = await getCategoriesByUser(userId)
      setCategories(data)
    } catch (error) {
      console.error("Erro ao buscar categorias:", error)
      toast.error("Não foi possível carregar as categorias.")
    }
  }

  useEffect(() => {
    let isMounted = true

    const load = async () => {
      if (!userId) return
      try {
        const data = await getCategoriesByUser(userId)
        if (isMounted) setCategories(data)
      } catch (error) {
        console.error("Erro ao buscar categorias:", error)
        toast.error("Não foi possível carregar as categorias.")
      }
    }

    void load()

    return () => {
      isMounted = false
    }
  }, [userId])

  const addNewCategory =  async() => {
    if (!newCategory.trim()) return toast.warning('O campo não pode ser vazio!')
    if (!userId) return toast.error("Usuário inválido para criação da categoria.")

    setIsLoading(true)

    try {
      setShowForm(false)
      const response = await createCategory({
        name: newCategory.trim(),
        userId,
      })

      setIsLoading(false)
      toast.success(response.detail ?? "Categoria criada com sucesso.")
      await fetchCategories()
      setNewCategory('')
    } catch (error) {
      setIsLoading(false)
      toast.error('Algum erro aconteceu!')
      console.error('Erro ao criar categoria:', error)
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

          <CreateItemModal
            title="Nova Categoria"
            placeholder="Digite o nome da categoria"
            value={newCategory}
            isOpen={showForm}
            onChange={setNewCategory}
            onConfirm={addNewCategory}
            onClose={() => setShowForm(false)}
          />
				</div>
	)
}

export default Categories
