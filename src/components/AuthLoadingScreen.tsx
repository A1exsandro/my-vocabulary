import { ImSpinner9 } from "react-icons/im";

const AuthLoadingScreen = () => (
  <div className="w-screen h-screen flex flex-col justify-center items-center">
    {/* <FaLock className="text-blue-800 mb-4" size={48} /> */}
    <ImSpinner9 
      className="text-blue-800" 
      size={36} 
      style={{ animation: 'spin 1s linear infinite' }} 
    />
    <h2 className="mb-3 text-4xl">Quase lá...</h2>
    <p className="text-zinc-600">Aguarde enquanto validamos seu acesso</p>
    
    {/* Estilo inline para a animação */}
    <style>
      {`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}
    </style>
  </div>
);

export default AuthLoadingScreen
