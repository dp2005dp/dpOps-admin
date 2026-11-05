import { MdPeopleAlt } from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { FaDiagramProject } from "react-icons/fa6";
import { useState , useEffect } from "react";
import  LineChartView from "../pages/LineChart"
import PieChartView from "../pages/PieChart"
import {ProjectsStatus} from "./Projects";
import { useApiData } from "../components/AdminDataLaypot";

const Dasboard =() => {
  const {projectData , employeeData} = useApiData()
  const [activeProjects , setactiveProjects]  = useState(0)
  const [tRevenu , setRevenu]  = useState(0)



  useEffect(() => {
    const getAllRevenu = projectData.reduce((value , projects) => value + Number(projects.budget) , 0)
    setRevenu(getAllRevenu)

    
    const getActiveProjects = projectData.filter(activeProject => activeProject.projectStatus === 'In Progress') 
    setactiveProjects(getActiveProjects.length)
    } ,[projectData])



  return (     
    <div className="p-5 overflow-y-auto scroll-smooth hide-scrollbar  h-[calc(100dvh-80px)]">
     {/* Welcom */}
     <h1 className="md:text-[26px] text-[clamp(20px,5vw,26px)] text-[#000000]  font-bold">Hi, DpOps Admin 👋</h1>
     <p className="md:text-[18px] text-[clamp(15px,4vw,18px)] text-gray-500">Your business overview, all in one place</p>
    
    {/* Carts */}

    <CardsContainer tClients={projectData.length} tEmployee={employeeData.length} tRevenu={tRevenu} activeProjects={activeProjects}/>

    {/* charts */}
  
  <div className="grid grid-cols-1 lg:grid-cols-2  xl:grid-cols-3 gap-3">
    <div className="xl:col-span-2 lg:col-span-1">    
    <LineChartView data={projectData}/>
    </div>
    <div className="col-span-1">
    <PieChartView data={projectData}/>
    </div>
    </div>
    
  
  {/* project status */}

   <ProjectsStatus projectData={projectData} />  
  </div>
)
}


interface CardsInterface {
   tClients : number
   activeProjects : number
   tEmployee : number
   tRevenu  : number
}

const CardsContainer = ({tClients , activeProjects , tEmployee , tRevenu} : CardsInterface) => {
    
 
    const cartsData = [
        {
          id : 0,
          icons : MdPeopleAlt,
          title : 'Total Clients',
          value : tClients,
          colors : '#4f7cff'
        },
        {
          id : 1,
          icons : FaDiagramProject,
          title : 'Active Projects',
          value : activeProjects,
          colors : '#8554D9'
        },
        {
          id : 2,
          icons : FaPeopleGroup,
          title : 'Total Employess',
          value : tEmployee,
          colors : '#2ED1B0'
        },
        {
          id : 3,
          icons : FaMoneyBillTrendUp,
          title : 'Total Revenue',
          value : `$${tRevenu}`,
          colors : '#54D956'
        },
    ]
   return (
       <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            {
              cartsData.map((eachItem , index) => {
                const Iocn = eachItem.icons
                return (
                   <div key={index} className="flex items-start gap-3 bg-[#ffffff] shadow-md p-3 border-1 border-gray-200 rounded-[5px]">
                        <div className={`h-[45px] w-[50px] rounded-full flex flex-col justify-center items-center`}
                        style={{backgroundColor :` ${eachItem.colors}30`}}
                        >
                           <Iocn 
                           style={{color : `${eachItem.colors}`}}
                           className={` h-[30px] w-[30px]`} />
                           </div>
                           <div>
                               <h1 className="text-[20px] text-[#112F62] font-dm-regular">{eachItem.title}</h1>
                               <p className="text-[25px] font-dm-bold text-[#000000]">{eachItem.value}</p>
                           </div>
                       
                   </div>
              )})
            }
       </div>
   )
}


export default Dasboard