import { useEffect, useState } from "react"
import { useRef } from "react"
import { Outlet } from "react-router-dom"
import AuthLoadingScreen from "../components/AuthLoadingScreen"
import kc from "../service/keycloak"
import useAuthStore from "../store/useAuthStore"

const IDLE_TIMEOUT_MINUTES = 15 // tempo de inatividade permitido
const RENEW_INTERVAL_MS = 30_000 // checagem a cada 30s
const MIN_TOKEN_VALIDITY = 60 // renovar se faltar menos de 60s

const ProtectedRoutes = () => {
  const { login, setLoading } = useAuthStore()
  const [authenticated, setAuthenticated] = useState<boolean | null>(null)
  const [isIdle, setIsIdle] = useState(false)

  const initialized = useRef(false)

  // ===== Função de logout centralizada =====
  const doLogout = () => {
    console.warn("Encerrando sessão...")
    kc.logout({ redirectUri: window.location.origin })
  }

  // ===== Inicialização do Keycloak =====
  useEffect(() => {
    if (initialized.current) return // evita reinicialização
    initialized.current = true

    kc.init({
      onLoad: "check-sso",
      checkLoginIframe: false,
      pkceMethod: "S256",
    })
      .then((auth) => {
        setAuthenticated(auth)

        if (!auth) {
          kc.login({ redirectUri: window.location.origin })
          return
        }

        if (kc.token) {
          console.log('---kc.token----', kc.tokenParsed?.sub)
          login(
            {
              name: kc.tokenParsed?.given_name || "",
              id: kc.tokenParsed?.sub
            },
            kc.token
          )
        }

        setLoading(false)

        // Renovação reativa (caso expire)
        kc.onTokenExpired = () => {
          console.log("Token expired, attempting refresh...")
          kc.updateToken(30).catch(() => {
            console.error("Failed to refresh token, redirecting to login...")
            doLogout()
          })
        }
      })
      .catch((error) => {
        console.error("Authentication Failed", error)
        setAuthenticated(false)
      })
  }, [])

  // ===== Controle de inatividade =====
  useEffect(() => {
    let idleTimer: number

    const resetIdleTimer = () => {
      if (isIdle) {
        console.log("Usuário voltou a interagir, retomando renovação automática.")
      }
      setIsIdle(false)
      clearTimeout(idleTimer)
      idleTimer = window.setTimeout(() => {
        console.warn("Usuário inativo por muito tempo, sessão encerrada.")
        setIsIdle(true)
        doLogout()
      }, IDLE_TIMEOUT_MINUTES * 60 * 1000)
    }

    window.addEventListener("mousemove", resetIdleTimer)
    window.addEventListener("keydown", resetIdleTimer)
    resetIdleTimer()

    return () => {
      clearTimeout(idleTimer)
      window.removeEventListener("mousemove", resetIdleTimer)
      window.removeEventListener("keydown", resetIdleTimer)
    }
  }, [isIdle])

  // ===== Renovação proativa do token =====
  useEffect(() => {
    if (!authenticated) return

    const intervalId = window.setInterval(() => {
      if (isIdle) return // não renova se usuário estiver inativo
      kc.updateToken(MIN_TOKEN_VALIDITY).catch(() => {
        console.error("Token refresh failed, logging out...")
        doLogout()
      })
    }, RENEW_INTERVAL_MS)

    return () => clearInterval(intervalId)
  }, [authenticated, isIdle])

  if (authenticated === null) {
    return (
      <AuthLoadingScreen 
        title="Quase lá..."
        content="Aguarde enquanto validamos seu acesso"
      />
    )
  }

  if (!authenticated) {
    return <p>Erro ao conectar com o servidor de autenticação.</p>
  }

  return <Outlet />
}

export default ProtectedRoutes
