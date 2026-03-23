import { toast } from 'react-toastify'

import { useParams } from "react-router-dom"
// import { words } from "../mock/words"
import CardFlip from "../components/CardFlip"
import { useEffect, useState } from "react"
import Grid from "../components/Grid"
import LoadingScreen from "../components/LoadingScreen"
import type { Word } from "../types/word"
import { createWord, getWordsByCategory } from "../service/wordApi"
import CreateItemModal from "../components/CreateItemModal"

const Category = () => {
  const { categoryId, userId } = useParams()
  const [words, setWords] = useState<Word[]>([])
  const [newWord, setNewWord] = useState("")
	const [showForm, setShowForm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const fetchWords = async () => {
    if (!userId || !categoryId) return
    try {
      const data = await getWordsByCategory({ userId, categoryId })
      setWords(data)
    } catch (error) {
      console.error("Erro ao buscar palavras:", error)
      toast.error("Não foi possível carregar as palavras.")
    }
  }

  useEffect(() => {
    let isMounted = true

    const load = async () => {
      if (!userId || !categoryId) return
      try {
        const data = await getWordsByCategory({ userId, categoryId })
        if (isMounted) setWords(data)
      } catch (error) {
        console.error("Erro ao buscar palavras:", error)
        toast.error("Não foi possível carregar as palavras.")
      }
    }

    void load()

    return () => {
      isMounted = false
    }
  }, [categoryId, userId])

  const addNewWord =  async() => {
    if (!newWord.trim()) return toast.warning('O campo não pode ser vazio!')
    if (!userId || !categoryId) return toast.error("Categoria ou usuário inválido.")

    setIsLoading(true)

    try {
      setShowForm(false)
      const response = await createWord({
        english: newWord.trim(),
        userId,
        categoryId,
      })

      setIsLoading(false)
      toast.success(response.detail ?? "Palavra criada com sucesso.")
      await fetchWords()
      setNewWord('')
    } catch (error) {
      setIsLoading(false)
      toast.error('Algum erro aconteceu!')
      console.error('Erro ao criar palavra:', error)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4">

      {/* Loading */}
      {
        isLoading &&
        <LoadingScreen 
          title="Quase lá..."
          content="Estamos Criando Sua Nova Palavra"
        />
      }

			<button
				onClick={() => setShowForm(true)}
				className="bg-linear-to-l from-gray-900 to-blue-800 
    text-white px-4 py-2 rounded"
				>
				+ Adicionar Palavra
			</button>

			{/* Lista */}
      <Grid>
        {words.map(word => (
          <CardFlip
            key={word.id} 
            word={word}
          />
        ))}
      </Grid>

      <CreateItemModal
        title="Nova Palavra"
        placeholder="Digite a palavra"
        value={newWord}
        isOpen={showForm}
        onChange={setNewWord}
        onConfirm={addNewWord}
        onClose={() => setShowForm(false)}
      />
      </div>
  );
}

export default Category
