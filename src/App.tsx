import Navbar from "./components/Navbar"
import Dasboard from "./pages/Dasboard"
import AddNewProject from "./pages/NewProject"
import Employess from "./pages/Employees"
import AddNewEmployee from "./pages/AddNewEmployee"
import Clients from "./pages/Clients"
import Projects from "./pages/Projects"
import Login from "./pages/Login"
import ProjectDetails from "./pages/ProjectDetails"
import AssignProjects from "./pages/AssignProjects"
import EditProject from "./pages/EditProject"
import { RiMenuFold2Fill } from "react-icons/ri";
import { TiHome } from "react-icons/ti";
import {Routes ,Route} from "react-router-dom"
import { useState } from "react"
import {motion} from "motion/react"
import { useLocation , useNavigate , Outlet } from "react-router-dom"
import PublicRoutes from "./components/PublicRoutes"
import ProductRoutes from "./components/ProductRoutes"
import AdminDataLaypot from './components/AdminDataLaypot.tsx'
const App = () => {
    const location = useLocation()
    const navigation = useNavigate()
    const [isShowNavBar , setShow] = useState(false)
    return (

   <div className="flex items-start bg-[#F6F8FD]  w-full">
     <div className={` ${location.pathname === '/login' ? 'hidden' : 'hidden lg:block'}`}>
      <Navbar/>
       </div>
      
       <div className="relative w-full">
           {/* Admin */}
      <div className={`flex lg:justify-end justify-between h-[80px] w-[100%] p-5 items-center gap-5 bg-[#ffffff]
        ${location.pathname === '/login' ? 'hidden' : 'block'}
        `}>
          <button className="lg:hidden md:block cursor-pointer"
          onClick={() => setShow(!isShowNavBar)}
          >
              <RiMenuFold2Fill className=" h-[30px] w-[30px] text-[#7A4CF5]"/>
          </button>
           
         
            {/* <TfiReload  className="text-[#112F62] h-[15px] w-[20px]"/>
            <div className="relative">
                 <IoMdNotificationsOutline  className="text[#112F62] h-[30px] w-[30px]"/>
                 <div className="bg-red-500 rounded-full h-[15px] w-[15px] absolute top-0 right-0 flex flex-col items-center justify-center">
                   <p className="text-[#ffffff] text-[12px] ">1</p>
                 </div>
            </div> */}
           
           <button className="flex items-center gap-1 cursor-pointer"
           onClick={() => navigation('/')}
           >
                      <div className="h-[40px] bg-gradient-to-br from-[#7a4cf5] to-[#4f7cff] w-[40px] rounded-full flex flex-col justify-center items-center">
                            <TiHome className="h-[28px] w-[28px] text-[#ffffff]"/>
                      </div>
                        {/* <h1 className="text-[#112F62] font-dm-bold mb-1 tracking-[-1px] text-[20px]">Home#</h1> */}

                 </button>
            
      </div>
       <Routes>
               
            <Route element={<PublicRoutes/>}>
                 <Route path="/login" element={<Login />}/>
            </Route>
            
            <Route element={<ProductRoutes/>}>
             
             <Route element={<AdminDataLaypot>
                 < Outlet />
             </AdminDataLaypot>}>
             <Route path="/" element={<Dasboard />}/>
              <Route path="/clients" element={<Clients />}/>
              <Route path="/employees" element={<Employess />}/>
              <Route path="/addnewemployee" element={<AddNewEmployee />}/>
              <Route path="/addnewproject" element={<AddNewProject />}/>
              <Route path="/projects" element={<Projects />}/>
              <Route path="/projectDetails/:id" element={<ProjectDetails />}/>
              <Route path="/assignProjects" element={<AssignProjects />}/>
              <Route path="/editProject/:id" element={<EditProject />}/>
              </Route>
            </Route>
       </Routes>

       {
                isShowNavBar && (
                    <motion.div 
                      
                    initial = {{
                        x:-50,       
                    }}

                    animate = {{
                        x:0,
                         opacity : 1,
                         transition : {
                              
                              ease : 'easeIn'
                         }
                    }}

                    className="absolute lg:hidden block top-0 z-50 inset-0 bg-black/50 left-0"
                    onClick={() => setShow(false)}
                    >
                        <Navbar />
                    </motion.div>
                   
                )
            }
      </div>
   </div>


)
}

export default App