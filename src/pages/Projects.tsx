import { MdRemoveRedEye } from "react-icons/md";
import { IoAddOutline } from "react-icons/io5";
import { useNavigate , useLocation } from "react-router-dom";
import type { ProjectInterface } from "../mockdata/mockdata";
import ProjectTypeIcons from "../components/ProjectTypeIcons";
import Status from "../components/Status";
import PageLoader from "../components/PageLoader";
import EmptyState from "../components/EmptyState";
import AddProjectsData from "../assets/AddProjectsData.png"
import PageNotFound from "../components/PageNotFound";
import { useApiData } from "../components/AdminDataLaypot";

const projectColumnName = [
  'Project',
  'Client',
  'Assigned Members',
  'Status',
  'Actions'
]

const renderState = {
    loading : 'Loading',
    success : 'Success',
    failure : 'Failure'
}
// 9E5EFF

interface projectProps {
   projectData : ProjectInterface[]
}

export const ProjectsStatus = ({projectData} : projectProps) => {
   const navigation = useNavigate()
   const location = useLocation()
  
  const renderProjectData = location.pathname === '/projects' ? projectData : projectData.slice(0,3)

    return (
           <div className="mt-10 shadow-md bg-[#ffffff]  p-3 md:p-10 rounded-[8px]">

              {  
                renderProjectData.length === 0 ?  <EmptyState  title="No Projects Yet" value="There are currently no projects to display. Create a new project to get started." 
                image={AddProjectsData}
                />
                   : 
                   <>
                  <div className="md:flex items-center justify-between">
                      <div>
                        <h1 className="text-[24px] text-[#000000] text-[clamp(22px,4.5vw,24px)] font-dm-bold">Project Overview</h1>
                        <p className="text-[18px] text-[clamp(15px,3.5vw,18px)] text-gray-500">Organize project workflows, monitor progress, and keep your team aligned from start to completion.</p>
                      </div>
                    
                    {
                      location.pathname  === '/projects' ? '' : <button onClick={() => navigation('/projects')}><p className="text-[#7A4CF5] md:text-start mt-5 md:mt-0 text-end font-dm-medium text-[15px] underline cursor-pointer">View All</p></button>
                    }
                      
                  </div>
                    
                  <div className="overflow-x-auto scrollbar-smooth hide-scrollbar 2xl:overflow-x-hidden md:w-full min-w-0">
                      <div className="2xl:w-full w-[1000px]">
                      <div className="grid pt-3  pb-3  rounded-tl-[10px] rounded-tr-[10px] grid-cols-8 bg-[#6c4cf10d] mt-10 gap-15">
                          {
                            projectColumnName.map((eachCloum , index) => (
                              <div key={index} className={`${index <=2 ? 'col-span-2' : 'con-span-1'}`}>
                                  <h1 className={`text-[18px] ${index ===0 ? 'pl-5' : ''}  text-[#053D9E] font-dm-medium`}>{eachCloum}</h1>
                              </div>
                            ))
                          }
                      </div>
            
                      {
                        renderProjectData.map((eachdata , index) => (
                          <div key={eachdata.projectId}>
                            <div className={` ${index === 0 ? 'border-1 border-gray-200' : ' '} 
                              `}/>
                            <div className="grid grid-cols-8  gap-15 mt-3 mb-3">
                                  <div className="ml-3 col-span-2 self-center">
                                    <div className="flex items-start gap-3">
                                    <ProjectTypeIcons value={eachdata.projectType}/>

                                      <div>
                                        <h1 className="font-dm-bold   tracking-[0px] text-[16px] text-[#000000]">{eachdata.projectName}</h1>
                                        <p className="font-dm-regular   text-[14px] text-gray-600">{eachdata.projectType}</p>
                                      </div>
                                    </div>
                                  </div>
                                
                                  <div className="self-center col-span-2">
                                  <h1 className="text-[18px]  font-dm-medium  text-[#000000]/80">{eachdata.ClientCompany}</h1>
                                  <p className="text-[14px]  font-dm-regular  text-gray-800">{eachdata.ClientEmail}</p>
                                  </div>   
                            
    
                                  <div className="flex justify-start col-span-2">
                                      <ProjectMembers projectId={eachdata.projectId} />
                                  </div>
                                
                                  <div className="self-center">
                                  <Status status={eachdata.projectStatus}/>
                                  </div>
                                  <div className="bg-[#ffffff] col-span-1 h-[30px] w-[80px] self-center  flex items-center gap-2  hover:scale-95 transition duration-300 ease-int-out border-1 border-[#4f7cff]/50  items-center rounded-[5px] cursor-pointer p-3 shadow-md"
                                  onClick={() => navigation(`/projectDetails/${eachdata.projectId}`)}
                                  >
                                      <MdRemoveRedEye className="h-[50px] w-[50px] text-[#7A4CF5]"/>
                                      <h1 className="text-[#7A4CF5] text-[15px] font-dm-medium">View</h1>
                                  </div>
                            </div>
                            
                            <div className={` ${index === projectData.length - 1  ? '' : ' border-b-1 border-gray-200'} 
                              `}/>
                              </div>
                        ))
                      }
                    </div>
                    </div>
                  </>
                   
                   }
             </div> 
    )

}

interface memberProps {
   projectId : number;
}

const ProjectMembers = ({projectId} : memberProps) => {
    const {assignProjectMembers} = useApiData()

    const filterProjectMembers = assignProjectMembers.filter(eachProjectMember => eachProjectMember.projectId === projectId)

      return (
        <div className="flex items-center">
             {
              filterProjectMembers.length == 0 ? <p className="text-[17px] tracking-[-1px] text-[#112F62] font-dm-regular">No employees assigned to this project.</p>
              :
             <>
               {
              filterProjectMembers.map((eachMenberProfile , index) => (
                  <div key={index} className={`${index === 0 ? '' : ' translate-x-[-10px]'} ${index === 2 ? 'translate-x-[-20px]' : ''}`}>
                       {
                        index <= 2 ?   <img src={`${import.meta.env.VITE_IMAGE_URL}${eachMenberProfile.profilePhoto}`}  
                       className={`h-[50px] w-[50px] rounded-full  object-cover object-top`}
                       /> : 
                           index  === 3 ?   <div className="h-[50px] w-[50px] rounded-full translate-x-[-10px] bg-[#F6F8FD] flex flex-col justify-center items-center">
                              <p className="text-[#7A4CF5] text-[20px] font-dm-bold">+{filterProjectMembers.length - index}</p>
                            </div> : ''
                       }
                      
                      
                  </div>
              ))
               }
              </>
             }
        </div>
      )
   }

const Projects = () => {
    const navigate = useNavigate()
    
    const {projectData , status} = useApiData()
     
  const pageRender = () => {
    switch(status) {
       case renderState.loading : 
       return <div className="flex flex-col justify-center h-[50vh] items-center"><PageLoader /></div> 
      
       case renderState.success : 
       return <ProjectsStatus projectData={projectData}/>
 
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
                       <h1 className="md:text-[30px] text-[clamp(20px,5vw,25px)] font-dm-bold text-[#112F62]">Projects</h1>
                       <p className="md:text-[20px] text-[clamp(16px,5vw,20px)] font-dm-regular text-gray-600 ">Track and manage every project.</p>
                    </div>
         
                  <button className="flex p-2 items-center mt-5 md:mt-0 border-1 border-white gap-1 bg-gradient-to-br from-[#7a4cf5] to-[#4f7cff] transition duration-300 ease-in-out cursor-pointer hover:scale-95 rounded-[5px] h-[40px] w-[180px]"
                    onClick={() => navigate('/addnewproject')}
                    >
                     <IoAddOutline className="h-[20px]  w-[20px] text-[#ffffff]"/>
                     <p className="text-[#ffffff] text-[18px] text-[clamp(14px,3.2vw,16px)]  tracking-[-0.5px] font-dm-medium">Add New Project</p>
                 </button>
                 </div>
              
              {pageRender()}
        </div>
    )
}



export default Projects