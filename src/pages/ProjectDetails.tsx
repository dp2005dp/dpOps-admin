import { GiCheckMark } from "react-icons/gi";
import { useState  , useEffect} from "react";
import { LuMoveLeft } from "react-icons/lu";
import { useNavigate , useParams } from "react-router-dom";
import { assignProject , Projects } from "../services/AdminAccess";
import type { ProjectInterface , assignProjectmembers } from "../mockdata/mockdata";
import { FaEdit } from "react-icons/fa";
import type { IconType} from 'react-icons'
import { IoPersonOutline } from "react-icons/io5";
import { LuPhone } from "react-icons/lu";
import { MdOutlineMailOutline } from "react-icons/md";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { LuCalendarFold } from "react-icons/lu";
import { FaRegFlag } from "react-icons/fa6";
import { FaCode } from "react-icons/fa";
import { FaRegFileCode } from "react-icons/fa6";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { MdTimeline } from "react-icons/md";
import Status from "../components/Status";
import Prograss from "../components/Prograss";
import UpdateProjectModal from "../components/UpdateProjectStatus";
import { RxUpdate } from "react-icons/rx";
import ProjectTypeIcons from "../components/ProjectTypeIcons";
import { useApiData } from "../components/AdminDataLaypot";
const colors = ['#16a05a' , '#4f7cff' , '#f5b73b' , '#ef4444' , '#9aa3c7' ]


const ProjectDetails = () => {
    const navigate = useNavigate()
    const {projectProgress} = useApiData()
    const {id} = useParams()
    const [data , setProjectData] = useState<ProjectInterface>()
    const [assignMembers , setMembers] = useState<assignProjectmembers[]>([])
    const [showStatus ,  setStatus] = useState(false)
    const [selectStstus , setSelectStatus] = useState('')
    const fetchData = async () => {
      const response = await Projects.getProject(Number(id))
      setProjectData(response.data.data)
    }
   
    const teachAssgnProjectMembers = async() => {
        const response = await assignProject.getEmployess(Number(id))

        setMembers(response.data.data)
    }

    useEffect(() => {
        fetchData(),
        teachAssgnProjectMembers()
    } , [])
    

    const formatDate = (date?: string) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric", 
    });
    };
   

    const getProjectlength = projectProgress.filter(p => p.projectId === Number(id))
                        
    const getProjectProgress = getProjectlength.reduce((sum , value) => sum + value.progress , 0)

    const progress = Math.round( getProjectProgress / getProjectlength.length)
    
    const getStatus = (value:string) => {
            setSelectStatus(value)
    }

    return (
         <div className="h-[calc(100dvh-80px)] overflow-y-auto scrollbar-smooth hide-scrollbar p-3">
               
            <button className="h-[40px] p-3 mt-5 mb-5 flex items-center gap-3 w-[100px] transition duration-300 ease-in-out bg-white rounded-[10px] cursor-pointer hover:scale-95  hover:border-1 border-[#7A4CF5] text-[#7A4CF5] font-dm-medium shadow-xl"
                    onClick={() => navigate('/projects')}
                >
                <LuMoveLeft className="h-[20px] w-[20px]"/>   <p> Back</p>
            </button>
              <div className="shadow-md mb-5 rounded-[8px] p-3 bg-[#ffffff]">
                  <div className="xl:flex items-start mb-5 justify-between">
                     <div className="md:flex items-start gap-3">
                       <div className="flex items-start gap-3">
                            <ProjectTypeIcons value={String(data?.projectType)}/>
                            <div>
                            <h1 className="text-[#00000] text-[clamp(20px,5vw,24px)] font-dm-bold text-[30px]">{data?.projectName}</h1>
                           <p className="text-gray-500 font-dm-regular text-[clamp(16px,4vw,18px)] text-[20px]">{data?.projectType} . {data?.ClientCompany}</p>      
                          </div>
                       </div>
                       <div className="mt-5 md:mt-0">
                        <Status status={ selectStstus ?  selectStstus :    data?.projectStatus}/>
                        </div>
                    </div>

                   <div className="flex items-center gap-3">
                            <button className="flex p-2 items-center mt-5 xl:mt-0 border-1 border-white gap-1 bg-gradient-to-br from-[#7a4cf5] to-[#4f7cff] transition duration-300 ease-in-out cursor-pointer hover:scale-95 rounded-[8px] h-[40px] w-[150px]"
                                onClick={() => setStatus(!showStatus)}
                                >
                                <RxUpdate className="h-[20px]  w-[20px] text-[#ffffff]"/>
                                <p className="text-[#ffffff] text-[18px] text-[clamp(14px,3.2vw,16px)]  tracking-[-0.5px] font-dm-medium">Update Status</p>
                            </button>

                        <button className="flex p-2 items-center mt-5 xl:mt-0 border-1 border-white gap-1 bg-gradient-to-br from-[#7a4cf5] to-[#4f7cff] transition duration-300 ease-in-out cursor-pointer hover:scale-95 rounded-[8px] h-[40px] w-[130px]"
                                onClick={() => navigate(`/editProject/${id}`)}
                                >
                                <FaEdit className="h-[20px]  w-[20px] text-[#ffffff]"/>
                                <p className="text-[#ffffff] text-[18px] text-[clamp(14px,3.2vw,16px)]  tracking-[-0.5px] font-dm-medium">Edit Project</p>
                        </button>
                    </div>   
                  </div>

                   <div className="grid grid-cols-1 mb-5">
                        <h1 className="text-[#112F62] mt-3 font-dm-medium mb-1 text-[20px]">Over All Prograss</h1>
                       <div>
                           <p className="text-gray-400 font-dm-regular mb-2 text-[15px]">Progress</p>
                             <Prograss prograss={progress} />
                           <p className="font-[#000000] text-[15px] mt-2 font-dm-regular">{progress}%</p>
                       </div>
                      
                   </div>

                     <ProjectProps 
                        title="Budget"
                        value={data?.budget}
                     />
              </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3  md:gap-10">
            <div className="shadow-md mb-5 rounded-[8px] p-3 bg-[#ffffff]">
                <h1 className="text-[#112F62] font-dm-bold mb-1 tracking-[-1px] text-[20px]">Client</h1>
                <ClientDetails value={data?.clientName} title={data?.ClientCompany} color="#7A4CF5" Icon={IoPersonOutline}/>
                <ClientDetails value={`+91 ${data?.clientPhone}`} title=""  color="#1934E3" Icon={LuPhone}/>
                <ClientDetails value={data?.ClientEmail} title="" color="#DE4545" Icon={MdOutlineMailOutline}/>
            </div>

             <div className="shadow-md mb-5 rounded-[8px] p-5 bg-[#ffffff]">
                <h1 className="text-[#112F62] font-dm-bold mb-1 tracking-[-1px] text-[20px]">Project Date</h1>
                <ClientDetails value={formatDate(data?.startDate)} title='Start Date' color="#108893" Icon={MdOutlineCalendarMonth}/>
                <ClientDetails value={formatDate(data?.deadline)} title="End Date"  color="#19D4E6" Icon={LuCalendarFold}/>
            </div>

             <div className="shadow-md mb-5 rounded-[8px] p-5 bg-[#ffffff]">
                <h1 className="text-[#112F62] font-dm-bold mb-1 tracking-[-1px] text-[20px]">ProjectType & Prority</h1>
                <ClientDetails value={data?.priority} title='Priority' color="#BC1515" Icon={FaRegFlag}/>
                <ClientDetails value={data?.projectType} title='Project Type' color="#7A4CF5" Icon={FaCode}/>
    
            </div>
            </div>
           
           <div className="grid grid-cols-1 2xl:grid-cols-2 gap-8">
          
            <div className="shadow-md mb-2  2xl:h-[200px] rounded-[8px] p-3 lg:p-5 bg-[#ffffff]">
               <div className="flex items-start gap-2 md:gap-3 ">
                        <FaRegFileCode className={` h-[25px] w-[25px]` }
                        style={{color : '#7A4CF5'}}
                        />
                <div>
                    <h1 className="text-[#112F62] font-dm-bold mb-1 tracking-[-1px] text-[20px]">Project Descripition</h1>
                    <p className="text-gray-600 font-dm-regular text-[18px]">{data?.projectDescription}</p>
                </div>
      
                </div>
            </div>

              <div className="shadow-md rounded-[8px] h-[200px] p-3 bg-[#ffffff]">
                   <div className="flex items-center gap-3">
                        <MdTimeline className="h-[35px] w-[35px] text-[#7A4CF5]"/>
                         <h1 className="text-[#112F62] font-dm-bold mb-1 tracking-[-1px] text-[20px]">Timeline</h1>
                    </div>

                    <div className="overflow-x-auto min-w-0 scrollbar-smooth hide-scrollbar md:overflow-x-hidden">
                      <div className="md:w-full w-[50px]">
                   
                    <div className="md:flex flex-col justify-center mt-5 items-center">
                    <div className="flex items-center">
                        {
                            ['Not Started' , 'In Progress' , 'Review' , 'Completed'].map((eachStatus , index) => (
                            <div key={index}>
                                <div className="flex items-center mt-5">
                                    <Timeline status={data?.projectStatus} value={eachStatus} />
                                    {
                                        index <=2 ? <div className="md:border-2 border-1 w-[80px] md:w-[150px] border-gray-200"/> : ''
                                    }
                                    
                                </div>
                                    <p className={` ${data?.projectStatus === eachStatus ? 'text-[#16a05a]' : 'text-gray-500'} font-dm-medium text-[clamp(12px,3vw,14px)] text-[18px]`}>{eachStatus}</p>
                                </div> 
                            ))
                        }
                    </div> 
                    </div>
                    
                </div>
                </div>
              </div>
            
            </div>
            
            <div className="grid grid-cols-1 2xl:grid-cols-2 gap-8">
             <div className="shadow-md mb-5 mt-5 rounded-[8px] p-3 bg-[#ffffff]">
                 <div className="flex items-start gap-3">
                    <MdOutlinePeopleAlt className="h-[25px] w-[25px] text-[#7A4CF5]"/>
                    <h1 className="text-[#112F62] font-dm-bold mb-1 tracking-[-1px] text-[20px]">Assigned Members ({assignMembers.length})</h1>
                 </div>
                  
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5 gap-5">
                  {
                    assignMembers.map((eachMembers , index) => (
                         <div key={index} className="flex flex-col items-center">
                             <img src={`${import.meta.env.VITE_IMAGE_URL}${eachMembers.profilePhoto}`} 
                              className="h-[65px] w-[65px] rounded-full mb-3 object-cover object-top" alt="profile"
                             />
                            <h1 className="text-[19px] text-center font-dm-medium mb-2 text-[#000000]">{eachMembers.fullName}</h1>
                            <p className="text-gray-600 text-center font-dm-regular text-[16px]">{eachMembers.assignedRole}</p>
                         </div>
                    ))
                  }
                </div>
             </div>
              
                <div className="shadow-md mb-5 rounded-[8px] mt-5 p-3 bg-[#ffffff]">
                  <div className="flex items-start gap-3">
                    <MdOutlinePeopleAlt className="h-[25px] w-[25px] text-[#7A4CF5]"/>
                    <h1 className="text-[#112F62] font-dm-bold mb-1 tracking-[-1px] text-[20px]">Project Roles & Status</h1>
                  </div>
                     
                   {
                    assignMembers.map((eachRoles , index) => (
                         <div key={index}>
                             <div className="grid grid-cols-1 md:grid-cols-3 mt-5 gap-5">
                                <div className="flex items-center gap-2">
                                  <div className="h-[10px] w-[10px] rounded-full"
                                  style={{backgroundColor : `${colors[index % colors.length]}`}}
                                  />

                                  <p className="text-[#000000]/50 font-dm-medium tracking-[-0.5px] text-[18px]">{eachRoles.assignedRole}</p>
                                </div>
                                   <Status status={eachRoles.roleStatus}/>
                                <div className="flex items-center gap-2">
                                   <Prograss prograss={eachRoles.progress} />
                                   <p className="font-[#000000] text-[15px] mt-2 font-dm-regular">{eachRoles.progress}%</p>
                                </div>
                             </div>
                         </div>
                    ))
                   }

                </div>

            </div>

            {
                showStatus && (
                     <div className="fixed inset-0 bg-black/50 flex flex-col justify-center items-center h-screen">
                          <UpdateProjectModal ongetData={getStatus} onClose={() => setStatus(false)} projectId={Number(id)}/>
                     </div>
                )
            }
           </div>

        
           

    )
}

interface Props {
   title : string,
   value : string | number | undefined
}

const ProjectProps = (
    {title , value} : Props
) => {
    return <div className="col-span-1 mt-3 md:mb-3">
        <h1 className="text-gray-400 font-dm-regular text-[15px]">{title}</h1>
        <p  className="text-[#000000] font-dm-medium text-[20px]">{`$${value?.toString().split(".")[0]}/-`}</p>
    </div>
}

interface TimelineProps {
    status : string | undefined,
    value : string,
}

const Timeline = ({value , status} : TimelineProps) => (
     <div className="flex flex-col items-center">
        {
          status === value  ? <div className="md:h-[30px] bg-[#16a05a] flex flex-col justify-center items-center  md:w-[30px] h-5 w-5  rounded-full">    
              <GiCheckMark className="text-[#ffffff]  md:h-[15px] h-[10px] w-[10px] md:w-[15px]"/>    
          </div> : <div className={`md:h-[30px] md:w-[30px] h-4 w-4  border-5 md:border-8 border-gray-300 rounded-full`}/>
        }
        
     </div>
)



interface ClientdetailsProps {
   Icon : IconType,
   title : string | undefined,
   value :string  | undefined,
   color : string
}

const ClientDetails = ({Icon , value , title, color} : ClientdetailsProps) => (
     <div className="flex items-center mt-3 gap-3">
        <div className="h-[40px] w-[40px] rounded-full bg-[#F6F8FD] flex flex-col justify-center items-center">
             <Icon className={`h-[20px] w-[20px]` }
             style={{color : color}}
             />
       </div>
     
     <div>
         { 
            title && (
                  <h1 className="text-[19px] font-dm-medium text-[#000000]">{title}</h1>
            )
         }
         <p className="text-gray-500 font-dm-regular text-[16px]">{value}</p>
     </div>
      
     </div>
)

export default ProjectDetails;