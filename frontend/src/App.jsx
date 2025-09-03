import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { Outlet } from 'react-router-dom'
import { Footer, Header, SideBar } from './compoents'


function App() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <div className="min-h-screen bg-[#065e2c] flex flex-col">
      <Header isSidebarOpen={isSidebarOpen} /> {/* Stays on top */}
      
      <div className="flex flex-1"> {/* Sidebar + Main Content */}
        <SideBar    isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}/> 
        <main className="flex-1 p-4 bg-white">
          <Outlet />
        </main>
      </div>

      <Footer /> {/* Bottom */}
    </div>
  );
}


export default App
