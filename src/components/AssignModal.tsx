import type { EmployeeInterface , assignProjectInterFace  , ProjectInterface} from "../mockdata/mockdata"
import {assignProject } from "../services/AdminAccess"
import { useState , useEffect } from "react"
import DropDown from "./DropDown"
import { MdAssignment } from "react-icons/md";
import toast from "react-hot-toast";
import { FaWindowClose } from "react-icons/fa";
import { useApiData } from "./AdminDataLaypot";

interface ModalProps {
    data : ProjectInterface,
    onClose : () => void
}



const IntialData = {
    employeeId : '',
    projectId : 0,
    assignedRole : '',
    username : 0
}

const AssignProjectModal =( {data , onClose} : ModalProps ) =>{
     const {employeeData} = useApiData()
     const [getEmployee , setgetEmployee] = useState<EmployeeInterface>()
     const [employeeId , setEmployeeId] = useState<string>('')
     const [assignProjectData , setAssignProject] = useState<assignProjectInterFace>(IntialData)

    
    const SerachEmployee = (id : string) => {
        const filterData = employeeData.find(eachData => eachData.username === id)  
        
        setgetEmployee(filterData)
    }
    
    const onGetData = (name : string ,value : string) => {
        setEmployeeId(value)
        
        setAssignProject((prev) => ({
            ...prev , [name] : value
        }))

    }  
    
    useEffect(() => {
        setAssignProject((prev) => ({
            ...prev , projectId : data.projectId , username : getEmployee?.employeeId
        }))
    } , [data.projectId , getEmployee?.employeeId])

    const Validition = () => {
         if (!assignProjectData.employeeId) {
           return  "Please Select Employee ID"
         } 

          if (!assignProjectData.assignedRole) {
           return  "Please Select Assign Role"
         } 

    }

    const submitData = async (e:React.FormEvent) => {
          e.preventDefault()

          const error = Validition()

          if (error) {
             toast.error(error)
             return
          }
          
         const response = await assignProject.assign(assignProjectData)

         if (response.status === 200) {
             toast.success(response.data.message)
             onClose()
         }
    }

    const projectRoles = data.roles.split(',')
    return (
        <div className="inset-0 bg-black/50 z-50 fixed flex flex-col justify-center items-center">
         <div className="overflow-y-auto scrollbar-smooth hide-scrollbar   bg-[#ffffff] m-5 md:m-0   xl:w-[600px] shadow-md p-3 rounded-[8px]">
                {/* Assign Project */}
        <div className="flex items-center justify-between">
        <div className="flex items-center justify-center gap-3">
            <MdAssignment className="h-[35px] w-[35px] text-[#7A4CF5]"/>
           <h1 className="text-[#000000] text-center text-[18px] font-dm-bold">Employee Assignment</h1>
          </div>
        
        <button type="button" className="cursor-pointer hover:scale-95 transtion duration-300 ease-in-out" onClick={onClose}>
          <FaWindowClose className="h-[35px] w-[35px] text-[#7A4CF5]"/>
         </button>
        </div>
        <div className=" bg-white mt-5 rounded-[8px] p-5">
            <div>
              <h1 className="md:text-[30px] text-[clamp(20px,5vw,25px)] tracking-[-2px] leading-[100%] font-dm-bold text-[#112F62]">{data.projectName}</h1>
              <p className="md:text-[18px] text-[clamp(14px,4vw,18px)] mt-3 text-gray-600 ">{data.clientName}</p>
            </div>
        <form onSubmit={submitData}>
        <div className="md:flex items-end  justify-between gap-3 mt-8">  
            
         
            <DropDown  onGetData={onGetData} name="employeeId" value={employeeId} dropdownData={employeeData.map(eachEm => String(eachEm.username))}/>
            
            <div className="mt-3 md:hidden block"/>

            <DropDown  onGetData={onGetData} name="assignedRole" value={assignProjectData.assignedRole} dropdownData={projectRoles}/>
       
            <button
            onClick={() => SerachEmployee(employeeId)}
            type="button"
            className="h-[40px] mt-5 md:mt-0 w-[100%] shadow-xl hover:scale-105 transition duration-300 ease-in-out text-[15px] text-[#ffffff]  bg-gradient-to-br from-[#7a4cf5] to-[#4f7cff] font-dm-regular cursor-pointer rounded-[5px] p-2 flex flex-col justify-center items-center">
                   Search Employee
            </button>
        </div>  
        
        {
            getEmployee && (
              <div className="flex flex-col justify-center items-center mt-10">
                 
                 <img src={`${import.meta.env.VITE_IMAGE_URL}${getEmployee.profilePhoto}`}  
                 alt="profle" className="h-[100px] w-[100px] rounded-full object-cover object-top"/>
                 
                 <h1 className="text-[#000000] mt-2 md:mt-0 font-dm-bold text-[20px] mt-5">{getEmployee.fullName}</h1>
                 <div className="flex items-centet gap-3 mt-2">
                    <p className="text-gray-500 text-[14px] font-dm-regular">{getEmployee.username}</p> 
                    <p className="text-gray-500 font-bold text-[14px]">.</p> 
                    <p className="text-gray-500 text-[14px] font-dm-regular">{getEmployee.role}</p> 
                </div>
                 
                <div className="flex justify-end mt-5">
                     <button 
                     type="submit"
                     className="h-[40px] w-[120px] hover:scale-105 transition duration-300 ease-in-out shadow-xl text-[15px] text-[#ffffff] bg-gradient-to-br from-[#7a4cf5] to-[#4f7cff] font-dm-regular cursor-pointer rounded-[5px] p-2 flex flex-col justify-center items-center">
                            Assign Project
                     </button>
                </div>

               </div>
            )
        }
    </form>
        </div>
         </div>
        </div>
    )
}

export default AssignProjectModal