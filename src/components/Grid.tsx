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
      md:grid-cols-3
      lg:grid-cols-4
      xl:grid-cols-5
      gap-2 sm:gap-4
      "
      >   
        {children}
    </div>
    // </main>
  )
}

export default Grid
