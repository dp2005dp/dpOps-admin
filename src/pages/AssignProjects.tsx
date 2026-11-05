import {useState} from "react";
import type { ProjectInterface , ProjectProgress} from "../mockdata/mockdata";
import { MdAssignmentInd } from "react-icons/md";
import AssignProjectModal from "../components/AssignModal"
import {AnimatePresence} from 'motion/react'
import ProjectTypeIcons from "../components/ProjectTypeIcons";
import Status from "../components/Status";
import Prograss from "../components/Prograss";
import PageLoader from "../components/PageLoader";
import EmptyState from "../components/EmptyState";
import AddProjectsData from "../assets/AddProjectsData.png"
import PageNotFound from "../components/PageNotFound";
import { useApiData } from "../components/AdminDataLaypot";

const projectColumnName = [
  'Project',
  'Client',
  'Progress',
  'Status',
  'Assign To'
]

const renderState = {
    loading : 'Loading',
    success : 'Success',
    failure : 'Failure'
}

interface AssignProjectProps {
  projectData : ProjectInterface[]
   projectProgress : ProjectProgress[]
}

export const ProjectsStatus = ({projectData , projectProgress} : AssignProjectProps) => {
  const [modalData , setModal] = useState<ProjectInterface | null>(null)
    return ( 
            <>
               {
              projectData.length === 0 ?  <EmptyState  title="No Projects Yet" value="There are currently no projects to display. Create a new project and Assign a projectto get started." 
                image={AddProjectsData}
                />
                  :
           <div className="mt-10 shadow-md bg-[#ffffff] p-10 rounded-[8px]">
                  <div className="md:flex items-center justify-between">
                      <div>
                        <h1 className="text-[24px] text-[#000000] text-[clamp(22px,4.5vw,24px)] font-dm-bold">Assign Projects</h1>
                        <p className="text-[18px] text-[clamp(15px,3.5vw,18px)] font-dm-regular text-gray-500">Allocate projects to team members, set responsibilities, and monitor progress to ensure timely delivery.</p>
                      </div>
              
                      {/* <p className="text-[#7A4CF5] md:text-start mt-5 md:mt-0 text-end font-dm-medium text-[15px] underline cursor-pointer">View All</p> */}
                  </div>
                 
                 <div className="overflow-x-auto scrollbar-smooth hide-scrollbar xl:overflow-x-hidden md:w-full min-w-0">
                    <div className="xl:w-full w-[1000px]">
                    <div className="grid pt-3  pb-3  rounded-tl-[10px] rounded-tr-[10px] grid-cols-7 bg-[#6c4cf10d] mt-10 gap-15">
                        {
                          projectColumnName.map((eachCloum , index) => (
                             <div key={eachCloum} className={`${index === 0 ? 'col-span-3' : 'con-span-1'}`}>
                                 <h1 className={`text-[18px] ${index === 0 ? 'pl-5' : ''} text-[#053D9E] font-dm-medium`}>{eachCloum}</h1>
                             </div>
                          ))
                        }
                    </div>
          
                    {
                      projectData.map((eachdata , index) => {
                        
                        const getProjectlength = projectProgress.filter(p => p.projectId === eachdata.projectId)
                        
                        const getProjectProgress = getProjectlength.reduce((sum , value) => sum + value.progress , 0)

                        const progress = Math.round(getProjectProgress / getProjectlength.length)
                        
                        return (
                        <div key={eachdata.projectId}>
                          <div className={` ${index === 0 ? 'border-1 border-gray-200' : ' '} 
                             `}/>
                          <div  className="grid grid-cols-7  gap-15 mt-3 mb-3">
                             
                             <div className="flex items-center pl-5 gap-3 col-span-3">
                               <ProjectTypeIcons  value={eachdata.projectType}/>
                               <div>
                                 <h1 className="font-dm-bold text-gray-600 self-center   text-[16px] text-[#000000]">{eachdata.projectName}</h1>
                                 
                                </div> 

                              </div>
                                  <h1 className="text-[16px] col-span-1 self-center font-dm-regular  text-[#000000]">{eachdata.clientName}</h1>
                            
                                <div className="flex flex-col self-center col-span-1">
                                  
                                
                                 <div className="flex col-span-1  items-center gap-3">
                                     
                                      <Prograss prograss={progress}/>
                                     <p className="text-[12px] text-gray-600 font-dm-regular">{progress}%</p>
                                     </div>
                                      </div>    
                                    
                                    <div className="col-span-1 self-center">
                                    <Status status={eachdata.projectStatus}/>
                                    </div>
                                  
                                    <div className="group flex justify-start col-span-1">
                                      <button 
                                      onClick={() => setModal(eachdata)}
                                      className="flex  flex-col justify-center ml-3 p-2 cursor-pointer group-hover:bg-[#7A4CF5]/80  bg-[#ffffff] mt-5 md:mt-0 items-center gap-2 duration-300 ease-in-out  hover:scale-95 h-[50px] w-[50px] rounded-full border-1 ring-2 ring-[#7A4CF5]/20 border-[#7A4CF5]/50">
                                                <MdAssignmentInd className="h-[45px]  w-[45px] group-hover:text-[#ffffff] text-[#7A4CF5]"/>
                                                {/* <p className="text-[#ffffff] text-[18px] text-[clamp(15px,3vw,16px)] font-dm-medium">Assign</p> */}
                                            </button>
                                    </div>
                          </div>
                             <div className={` ${index === projectData.length - 1  ? '' : ' border-b-1 border-gray-200'} 
                             `}/>
                            </div>
                      )})
                    }
                  </div>
                  </div>

                  {
                    modalData && (
                      <AnimatePresence>
                        <AssignProjectModal data={modalData} onClose={() => setModal(null)} />
                      </AnimatePresence>
                    )
                  }
             </div> 
                }
              </>
    )
}



const AssignProjects = () => {
  const {projectData , status , projectProgress} = useApiData()
  
const pageRender = () => {
  switch(status) {
      case renderState.loading : 
      return <div className="flex flex-col justify-center h-[50vh] items-center"><PageLoader /></div> 
    
      case renderState.success : 
      return <ProjectsStatus projectData={projectData}  projectProgress={projectProgress}/>

    case renderState.failure :
    return  <PageNotFound />
    
    default :
    return null
  }
}


    return (
        <div className="h-[calc(100dvh-80px)] overflow-y-auto scroll-smooth hide-scrollbar p-5">
                 <div className="md:flex items-center justify-between">
                    <div>
                       <h1 className="md:text-[30px] text-[clamp(20px,5vw,25px)]  font-dm-bold text-[#112F62]">Assign Projects</h1>
                       <p className="md:text-[20px] text-[clamp(16px,5vw,20px)] font-dm-regular text-gray-600 ">Track and manage every project.</p>
                    </div>
                 </div>
              
               {pageRender()}
        </div>
    )
}



export default AssignProjects