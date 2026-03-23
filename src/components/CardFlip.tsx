import { useState } from "react"
import type { Word } from "../types/word"
import type { Phrase } from "../types/phrase"
import { LiaEyeSlashSolid, LiaEyeSolid } from "react-icons/lia"
import { CiEdit } from "react-icons/ci"
import { MdDeleteOutline } from "react-icons/md"
import { PiSpeakerHigh } from "react-icons/pi"

interface CardProps {
  word: Word
}

const CardFlip = ({word}: CardProps) => {
  const [flipped, setFlipped] = useState(false)

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
          overflow-hidden shadow-lg">
          <img
            src={word.imageUrl}
            alt={word.english}
            className="w-full h-full object-cover
            transition duration-700 ease-in-out hover:scale-105"
          />

          <div className="absolute bottom-0 left-0 w-full p-2 flex 
            justify-around">
            
            <button
              onClick={(e) => playAudio(e, word.audioUrl)} 
              className="px-4 py-2 hover:bg-gray-500 text-sm rounded">
              
              <PiSpeakerHigh 
                className="text-amber-50"
              />
              
            </button>
          </div>
        </div>

        {/* Verso */}
        <div 
          className="absolute w-full h-full backface-hidden rotate-y-180 
            rounded-xl bg-gray-900 text-white p-3 sm:p-4 flex flex-col 
            items-center text-center shadow-lg overflow-hidden"

          onMouseEnter={(e) => {
            e.stopPropagation()
          }}
          onMouseLeave={(e) => {
            e.stopPropagation()
          }}
        >       
          {/* Conteúdo principal do verso */}
          <div className="w-full px-1">
            {
              showTranslation ?
                <p className="mt-5 text-[clamp(0.85rem,2.3vw,1.125rem)] font-semibold leading-tight break-words">
                  {word.portuguese}
                </p>
              :
                <p className="mt-5 text-[clamp(0.85rem,2.3vw,1.125rem)] font-semibold leading-tight break-words">
                  {word.english}
                </p>
            }
          </div>

          {/* Phrases */}
          <div className="mt-3 mb-12 w-full flex-1 overflow-y-auto px-1 lg:px-3 flex flex-col items-center justify-center">
            {
              word.phrases.map((phrase: Phrase) => (
                <div 
                  key={phrase.id}
                  onClick={(e) => playAudio(e, phrase.audioUrl)}
                  className="text-[clamp(0.62rem,1.7vw,0.72rem)] my-1.5 hover:cursor-pointer break-words 
                    text-center max-w-[95%] lg:max-w-[88%] leading-tight"
                >
                  <div className="">
                    {showTranslation ? "Iremos adicionar a tradução" : phrase.text}
                  </div>
                </div>
              ))
            }
          </div>


            {/* Botões fixos no rodapé */}
          <div className="absolute bottom-0 left-0 w-full flex 
            justify-around items-center p-3">
            
            <button 
              onClick={handleEdit}
              className="px-4 py-2 hover:bg-gray-700 text-sm rounded"
            >
              <CiEdit />
            </button>

            <button 
              onClick={handleDelete}
              className="px-4 py-2 hover:bg-gray-700 text-sm rounded"
            >
              <MdDeleteOutline /> 
            </button>

            <button 
              onClick={handleTranslate}
              className="px-4 py-2 hover:bg-gray-700 text-sm rounded"
            >
              {
                showTranslation ? <LiaEyeSolid /> : <LiaEyeSlashSolid />
              }
            </button>

          </div>


        </div>
      </div>
		</div>
	)
}

export default CardFlip
