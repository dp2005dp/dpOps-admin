import { MdCancel } from "react-icons/md";
import { MdOutlineMailOutline } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { GrLocation } from "react-icons/gr";
import type { ElementType } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { BiSolidShoppingBagAlt } from "react-icons/bi";
import type { EmployeeInterface } from "../mockdata/mockdata";
import { assignProject } from "../services/AdminAccess";
import { useState ,useEffect } from "react";
import type {EmployeeProjectsInterface} from "../mockdata/mockdata"
import Status from "./Status";
import ProjectTypeIcons from "./ProjectTypeIcons";
import { FaWarehouse } from "react-icons/fa";
import { ImStackoverflow } from "react-icons/im";
import AddProjectsData from "../assets/AddProjectsData.png"
import EmptyState from "./EmptyState";

interface EmployeeProps {
     data : EmployeeInterface,
     onClose : () => void
}


 

const EmployeeDeatils = ({data , onClose }: EmployeeProps) => {
    
    const [employeeProjects , setProjects] = useState<EmployeeProjectsInterface[]>([])

    const fetchEmployeeProjects = async  () => {
       const response = await assignProject.getEmployeeProjects(data.employeeId)
       
       setProjects(response.data.data)
    }

    useEffect(() => {
       fetchEmployeeProjects()
    },[])
    
    const formatDate = (date?: string) => {
      if (!date) return "";
        return new Date(date).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric", 
        });
      };


    return (
        <div className="fixed inset-0  z-50 flex items-center justify-center bg-black/50">
      
         <div className="bg-[#ffffff] overflow-y-auto scrollbar-smooth hide-scrollbar m-3 md:m-0 pb-20 h-[calc(100dvh-80px)] md:w-[90%] xl:w-1/2 rounded-[8px] p-8">
           <div className="flex md:items-start items-start justify-between">
            <div className="md:flex items-center gap-5">
                <img src={`${import.meta.env.VITE_IMAGE_URL}${data.profilePhoto}`}
                  className="h-[120px]  w-[120px] rounded-full object-cover object-top"
                />
                <div>
                    <div className="md:flex items-center gap-5">
                   <h1 className="text-[#000000] mt-2 md:mt-0 font-dm-bold text-[20px]">{data.fullName}</h1>
                   <div className={`flex mt-2 items-center h-[25px] w-[100px] gap-2 rounded-[20px] p-2 ${'Active' === 'Active' ? 'bg-[#16a05a]/20' : 'bg-[#f5b73b]/30'}`}>
                             <div className={`h-[10px] w-[10px] rounded-full ${'Active' === 'Active' ? 'bg-[#16a05a]' : 'bg-[#f5b73b]'}`}/>
                             <p className={`${'Active' === 'Active' ? 'text-[#16a05a]' : 'text-[#f5b73b]'} font-dm-medium text-[12px] `}>Active</p>
                    </div>
                </div>
                
                <div className="flex items-center gap-3 mt-2">
                    <p className="text-gray-500 text-[16px] font-dm-regular">{data.username}</p> 
                    <p className="text-gray-500 font-bold text-[20px]">.</p> 
                    <p className="text-gray-500 text-[16px] tracking-[-1px] font-dm-regular">{data.role}</p> 
                </div>
            </div>
            </div>

            <button onClick={onClose} className="cursor-pointer hover:scale-105">
                 <MdCancel className="text-[#7A4CF5] h-[35px] w-[35px]"/>
            </button>
           </div>  
             
             <div className="md:flex gap-5 mt-3 justify-center items-center">
                   <div className="flex items-center gap-2">
                        <MdOutlineMailOutline  className="h-[20px] w-[20px] text-[#7A4CF5]"/>
                        <p className="text-gray-500 text-[clamp(15px,3.5vw,16px)] text-[17px] font-dm-regular">{data.email}</p>
                   </div>

                   <div className="flex items-center gap-2">
                        <FiPhone  className="h-[20px] w-[20px] text-[#7A4CF5]"/>
                        <p className="text-gray-500 text-[17px] text-[clamp(15px,3.5vw,16px)] font-dm-regular">{`91+ ${data.phone}`}</p>
                   </div>

                   <div className="flex items-center gap-2">
                        <GrLocation  className="h-[20px] w-[20px] text-[#7A4CF5]"/>
                        <p className="text-gray-500 text-[17px] text-[clamp(15px,3.5vw,16px)] font-dm-regular">{data.city}</p>
                   </div>
             </div>

           <div className="border-1 mt-4 mb-3  border-gray-200"/>
            
           <div>
               <p className="text-[#7A4CF5] text-[clamp(20px,4.5vw,22px)] text-[22px] mb-3 font-dm-bold">Overview</p>
           </div>
            
           <div className="grid grid-cols-1 xl:grid-cols-2 mb-3 gap-5">
                <div className="border-1 xl:h-[250px] w-[100%] border-gray-200 rounded-[8px] p-3">
                    <h1 className="text-[20px]  text-[clamp(18px,4vw,20px)] mb-2 font-dm-medium font-[#000000]">About</h1>
                    <p className="text-gray-500 md:text-[16px] text-[clamp(16px,3.5vw,18px)] font-dm-regular">{data.aboutEmployee}</p>
                </div>
                
                <div className="border-1 xl:h-[250px] w-[100%] border-gray-200 rounded-[8px] p-3">
                    <Reusebles 
                    icon={FaCalendarAlt}
                    title="Join Data"
                    value={formatDate(data.joinDate)}
                    />

                     <Reusebles 
                    icon={BiSolidShoppingBagAlt}
                    title="Experience"
                    value={data.experienceYears.toString().split('.')[0]}
                    />

                     <Reusebles 
                    icon={FaWarehouse}
                    title="Department"
                    value={data.department}
                    />

                     <Reusebles 
                    icon={ImStackoverflow}
                    title="Total Projects"
                    value={employeeProjects.length}
                    />
                </div>

           </div>
       

          {  
            employeeProjects.length === 0 ?  <EmptyState  title="No Projects Yet" value="Please wait for your administrator to assign one." 
                            image={AddProjectsData}
                            />      
                       :
           <div className="rounded-[8px] border-1 border-gray-200 p-3">
            
              
              <h1 className="text-[15px] mb-3 font-dm-bold font-[#000000]">Current Projects</h1>
               <div className="overflow-x-auto xl:overflow-x-hidden xl:w-full min-w-0 scrollbar-smooth hide-scrollbar">
                  <div className="xl:w-full w-[1000px]">

             
           
             
                <div className="grid grid-cols-5 bg-[#6c4cf10d] gap-5 border-1 border-gray-200 rounded-tl-[8px] rounded-tr-[8px] p-3">
                {
                    ['Project Name' , 'Role' , 'Status' , 'Duration'].map((eachdata , index) => (
                        <div key={index} className={`${index===0 ? 'col-span-2' : 'col-span-1'}`}>
                        <p className={`text-[17px] text-[#053D9E]  font-dm-medium`}>{eachdata}</p>
                        </div>
                    ))
                }
                </div>
                  
                     {                    
                    employeeProjects.map((eachdata , index) => (
                        <>
                      
                    <div key={index} className="grid grid-cols-5 gap-5 p-2 border-b-1 border-l-1 border-r-1 border-gray-200">
                          
                          <div className="flex items-start gap-2 col-span-2">
                            <ProjectTypeIcons value={eachdata.projectType}/>
                             <h1 className="font-dm-bold text-gray-600 text-[16px]  text-[#000000]">{eachdata.projectName}</h1>
                          </div>
                          
                          <p className="text-[16px] font-dm-regular col-span-1 text-[#000000]">{eachdata.assignedRole}</p>
                          
                          <div className="col-span-1 self-center"> 
                           <Status status={eachdata.roleStatus}/>
                          </div>
                     <p className="text-[16px] col-span-1 font-dm-regular  text-[#000000]">{formatDate(eachdata.startDate)} - {formatDate(eachdata.deadline)}</p>                     
                    </div>

                    
                      </>
                    ))
                     }
                   
               
              
             </div>
               </div>
           </div>
             }
         </div>
       </div>
    )
}

interface resubleProps {
    icon : ElementType,
    title : string,
    value : string | number
}

const Reusebles = (
 
   { icon : Icon,
    title,
    value}
:
 resubleProps
) => {
   return (
       <div className="flex mt-3 items-start gap-3">
           <Icon className ="text-[25px] w-[25px] text-[#7A4CF5]"/>
            <div>
                <h1 className="text-gray-600 text-[14px] font-dm-regular">{title}</h1>
                <p  className="text-[#000000] text-[16px] font-dm-medium">{value}</p>
            </div>
       </div>
   )
}

export default EmployeeDeatils