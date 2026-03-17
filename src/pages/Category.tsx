import axios from "axios"
import { toast } from 'react-toastify'

import { useParams } from "react-router-dom"
// import { words } from "../mock/words"
import CardFlip from "../components/CardFlip"
import { useEffect, useState } from "react"
import Grid from "../components/Grid"

const BASE_URL_API = import.meta.env.VITE_BASE_URL_API

const Category = () => {
  const { categoryId, userId } = useParams()
  const [words, setWords] = useState([])
  const [newWord, setNewWord] = useState("")
	const [showForm, setShowForm] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    fetchWords()
  }, [isSuccess])

  // READ
  const fetchWords = async () => {
    try {
      const response = await axios.get(`${BASE_URL_API}/api/vacabulary/word/words`,
        {
          params: {
            user_id: userId,
            category_id: categoryId
          }
        }
      )

      console.log('---- resposta vindo da Api-----', response.data)
      setWords(response.data)
      console.log(response.data)
      // setIsLoading(false)
    } catch (error) {
      console.log('---- error ----', error)
    }
  }

  // - [ ] Remover para o hook
  // CREATE
  const addNewWord =  async() => {
    if (!newWord) return

    try {
      const response = await axios.post(`${BASE_URL_API}/api/vacabulary/word`, 
        {
          english: newWord,
          user_id: userId,
          category_id: categoryId
        }
      )

      toast.success(response.data.detail)
      setIsSuccess(true)
      console.log(response)
      setNewWord('')
      setShowForm(false)
    } catch (error) {
      console.log('----- error ---', error)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4">
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
            // key={word.id} 
            word={word}
          />
        ))}
      </Grid>

        {/* Formulário Para Criar uma Nova Categoria */}
        {/* - [ ] Remover para um componente, e chamar o componente aqui */}
        {showForm && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
            
            <div className="bg-white p-6 rounded shadow-lg w-80">
              
              <h2 className="text-lg font-bold mb-4">
                Nova Palavra
              </h2>

              <input
                value={newWord}
                onChange={(e) => setNewWord(e.target.value)}
                className="border w-full p-2 mb-4"
                placeholder="Digite a palavra"
              />

              <div className="flex gap-2">
                <button
                  onClick={addNewWord}
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
  );
}

export default Category
