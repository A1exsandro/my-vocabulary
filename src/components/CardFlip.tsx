import { useState } from "react"
import type { Word } from "../types/word"
import type { Phrase } from "../types/phrase"

interface CardProps {
  word: Word
}

const CardFlip = ({word}: CardProps) => {
  const [flipped, setFlipped] = useState(false)
  const[menuOpen,setMenuOpen] = useState(false)

  const [showTranslation, setShowTranslation] = useState(false)
  const [editedWord, setEditedWord] = useState(word)
  
  const playAudio = (
    e: React.MouseEvent<HTMLElement>, 
    url: string
  ) => {
    e.stopPropagation()
    new Audio(url).play()
  }


  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation()

  const newEnglish = prompt("Editar inglês:", editedWord.english)
  const newPortuguese = prompt("Editar português:", editedWord.portuguese)

    if (newEnglish && newPortuguese) {
      setEditedWord({
        ...editedWord,
        english: newEnglish,
        portuguese: newPortuguese
      })
    }
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()

    const confirmDelete = confirm("Deseja excluir essa palavra?")
    if (confirmDelete) {
      console.log("Deletado (mock)")
    }
  }

  const handleTranslate = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowTranslation(!showTranslation)
  }

	return (
		<div 
			className="w-full aspect-5/8 perspective"
			onClick={() => setFlipped(!flipped)}
		>

			<div
				className={`relative w-full h-full transition-transform duration-500 
          transform-style ${
				flipped ? "rotate-y-180" : ""
				}`}
			>
        {/* Frente */}
        <div className="absolute w-full h-full backface-hidden rounded-xl 
          overflow-hidden shadow-lg bg-black">
          <img
            src={word.imageUrl}
            alt={word.english}
            className="w-full h-full object-cover
            transition duration-700 ease-in-out hover:scale-105"
          />

          <div className="absolute bottom-0 left-0 w-full p-2 flex justify-around">
            
            <button
              onClick={(e) => playAudio(e, word.audioUrl)} 
              className="text-white text-sm bg-gray-800 px-2 py-1 rounded 
                hover:bg-gray-700">
              🔊
            </button>
          </div>
        </div>

        {/* Verso */}
        <div 
          className="absolute w-full h-full backface-hidden rotate-y-180 
            rounded-xl bg-gray-900 text-white p-4 flex flex-col 
            justify-center items-center text-center shadow-lg"

          onMouseEnter={(e) => {
            e.stopPropagation()
            setMenuOpen(false)
          }}
          onMouseLeave={(e) => {
            e.stopPropagation()
            setMenuOpen(false)
          }}
        >       
          {/* Botão Hambúrguer */}
          <button 
            className="absolute top-2 left-2 text-white text-xl bg-gray- 
              px-2 py-1 rounded hover:bg-gray-700" 
            onClick={(e) =>{
              e.stopPropagation()
              setMenuOpen(!menuOpen)
            }}
          >
             ☰
          </button>
          
          {menuOpen &&(
            <div className="absolute top-12 left-2 bg-gray-800 rounded-lg 
              shadow-lg flex flex-col"
                 onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={handleEdit}
                className="px-4 py-2 hover:bg-gray-700 text-sm"
              >
                ✏️ Editar
              </button>

              <button 
                onClick={handleDelete}
                className="px-4 py-2 hover:bg-gray-700 text-sm"
              >
                🗑️ Excluir
              </button>

              <button 
                onClick={handleTranslate}
                className="px-4 py-2 hover:bg-gray-700 text-sm"
              >
                🌐 {
                showTranslation ? 
                  'Mostrar Tradução Inglês'
                :
                  'Mostrar Tradução Portugues' 
                }
              </button>
            </div>
          )}
          {/* Conteúdo principal do verso */}
          <div className="">
            {
              showTranslation ?
                <p className="text-lg font-semibold">{word.portuguese}</p>
              :
                <p className="text-lg font-semibold">{word.english}</p>
            }
          </div>

          {/* Phrases */}
          <div className="mt-8">
            {
              word.phrases.map((phrase: Phrase) => (
                <div 
                  key={phrase.id}
                  onClick={(e) => playAudio(e, phrase.audioUrl)}
                  className="text-[0.7rem] m-2 hover:cursor-pointer hover:scale-105"
                >
                  {showTranslation ? "Iremos adicionar a tradução" : phrase.text}
                </div>
              ))
            }
          </div>
        </div>
      </div>
		</div>
	)
}

export default CardFlip
