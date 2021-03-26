import Footer from "./footer"
import NavBar from "./navbar"

export default function Layout({children}) {
  return (
    <div className="h-screen w-screen">
      <NavBar/>
      <div className="p-4 max-w-full">
      {children}
      </div>
      <Footer/>
    </div>
  )
}