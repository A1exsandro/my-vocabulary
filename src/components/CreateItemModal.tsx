type CreateItemModalProps = {
  title: string
  placeholder: string
  value: string
  isOpen: boolean
  onChange: (value: string) => void
  onConfirm: () => void
  onClose: () => void
}

const CreateItemModal = ({
  title,
  placeholder,
  value,
  isOpen,
  onChange,
  onConfirm,
  onClose,
}: CreateItemModalProps) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-80">
        <h2 className="text-lg font-bold mb-4">{title}</h2>

        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="border w-full p-2 mb-4"
          placeholder={placeholder}
        />

        <div className="flex gap-2">
          <button
            onClick={onConfirm}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Adicionar
          </button>

          <button
            onClick={onClose}
            className="bg-gray-400 text-white px-4 py-2 rounded"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreateItemModal
