import Card from "../components/Card"
import  useAuthStore from "../store/useAuthStore"

export default function Home() {
	const { user } = useAuthStore()

  return (
    <>
			<div className="p-10">

				{/* Lista */}
				{/* - [ ] buscar todos os usuário no db ou no keycloak, e fazer um map */}
				{/* <div className="grid grid-cols-2 gap-4">
					{users.map((user) => (
						<Card 
              key={user.id} 
              user={user} 
            />
					))}
				</div> */}

				<div className="grid grid-cols-2 gap-4">
					<Card 
						key={user?.id} 
						user={user} 
					/>
				</div>
			</div>
		
		</>
  )
}
