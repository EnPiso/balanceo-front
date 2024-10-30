import {RecoilRoot} from "recoil";
import Sidebar from "./components/views/Sidebar.jsx";
import Navbar from "./components/views/Navbar.jsx";
import Dashboard from "./components/views/Dashboard.jsx";
import ThemeContextProvider from "./infraestructure/states/providers/ThemeContextProvider.jsx";

function App() {

  return (
      <RecoilRoot>
        <>
          <div className="flex">
            <Sidebar/>

            <div className="grow ml-16 md:ml-64 h-full lg:h-screen
              bg-gray-100      text-gray-900
              dark:bg-zinc-900 dark:text-white">
              <Navbar />
              <div>
                <Dashboard/>
              </div>
            </div>

          </div>
        <ThemeContextProvider/>
        </>
      </RecoilRoot>
  )
}

export default App
