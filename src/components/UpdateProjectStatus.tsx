import DropDown from "./DropDown"
import { useState } from "react";
import { RxUpdate } from "react-icons/rx";
import { IoMdCloseCircle } from "react-icons/io";
import { Projects } from "../services/AdminAccess";
import toast from "react-hot-toast";
import axios from "axios";
const projectStatuses = [
  "Not Started",
  "Planning",
  "In Progress",
  "On Hold",
  'Pending',
  "Completed",
];

interface UpdateStatus {
    onClose : () => void,
    projectId : number,
    ongetData : (value:string) => void
}

const UpdateProjectModal = ({onClose , projectId , ongetData } : UpdateStatus) => {
    
    const [updateStatus , setStatus] = useState('')
    const getStatus  = (_name : string , value : string) => {
    setStatus(value)
    ongetData(value)
    }
    
    const onSubmitStatus = async (e:React.FormEvent) => {
        e.preventDefault()
     
         const response = await Projects.UpdateStatus(projectId , updateStatus)
         try {
           

            if (response.status === 200) {
                toast.success(response.data.message)
            }
         }
         
         catch(e) {
             if (axios.isAxiosError(e)) {
                 toast.error(response?.data.message)
             }
         }

        onClose() 
    }

    return (
         <div className=" bg-[#ffffff] p-5 shadow-md rounded-[10px]">
              
               <div className="flex justify-end mb-5">
                <button className="cursor-pointer"
                onClick={onClose}
                >
                      <IoMdCloseCircle className="text-[#7A4CF5] h-[35px] w-[35px]"/>
                </button>
               </div> 

               <h1 className="text-[#7A4CF5] text-[22px] font-dm-bold mb-5">Update Project Status</h1>
                
            <form onSubmit={onSubmitStatus}>

                 <DropDown onGetData={getStatus} dropdownData={projectStatuses} value={updateStatus} name="" />

                <div className="flex justify-end">
                    <button type="submit" className="flex p-2 items-center mt-5  border-1 border-white gap-1 bg-gradient-to-br from-[#7a4cf5] to-[#4f7cff] transition duration-300 ease-in-out cursor-pointer hover:scale-95 rounded-[8px] h-[40px] w-[100px]"
                    >
                    <RxUpdate className="h-[20px]  w-[20px] text-[#ffffff]"/>
                    <p className="text-[#ffffff] text-[18px] text-[clamp(14px,3.2vw,16px)]  tracking-[-0.5px] font-dm-medium">Update</p>
            </button>
                </div>
            </form>
         </div>
    )
}

export default UpdateProjectModal