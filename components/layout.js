import NavBar from "./navbar"

export default function Layout({children}) {
  return (
    <div className="h-screen">
      <NavBar/>
      <div className="p-4">
      {children}
      </div>
    </div>
  )
}