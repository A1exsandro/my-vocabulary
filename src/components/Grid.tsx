type GridProps = {
  children: React.ReactNode
}

const Grid = ({ children }: GridProps) => {
  return (
    // <main className="mt-2 p-2">
    <div
      className="
      mt-5
      grid
      grid-cols-2
      sm:grid-cols-3
      md:grid-cols-4
      lg:grid-cols-5
      xl:grid-cols-6
      gap-4
      "
      >   
        {children}
    </div>
    // </main>
  )
}

export default Grid
