import DropDown from "../components/DropDown"
import Input from "../components/Input"
import React, { useState , useEffect } from "react";
import { FaFilePdf } from "react-icons/fa6";
import { TbXboxXFilled } from "react-icons/tb";
import { LuMoveLeft } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import type { ProjectForm } from "../mockdata/mockdata";
import  { Projects} from "../services/AdminAccess";
import toast from "react-hot-toast";

const existingClients = [
  "TechNova Solutions",
  "CloudX Technologies",
  "Orbit Labs",
  "Vertex Digital",
  "GreenTech",
  "Nexora Systems",
  "PixelCraft Studio",
  "BlueWave Technologies",
  "CodeSphere Solutions",
  "VertexOne Consulting",
];

const projectTypes = [
  "Web Development",
  "Mobile App Development",
  "UI/UX Design",
  "E-Commerce Development",
  "Software Development",
  "API Development",
  "Dashboard Development",
  "B2B Platform",
  "Website Redesign",
];

const priorities = [
  "Low",
  "Medium",
  "High",
  "Critical",
];

const projectStatuses = [
  "Not Started",
  "Planning",
  "In Progress",
  "On Hold",
  "Completed",
  "Cancelled",
];

const ProjectRoles = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "UI/UX Designer",
  "Mobile App Developer",
  "React Native Developer",
  "QA Engineer",
  "Testing Engineer",
  "DevOps Engineer",
  "Database Administrator",
  "Data Analyst",
  "Project Manager",
  "Business Analyst"
];

const IntialFormData = {
        clientName: "",
        companyName: "",
        email: "",
        phone: "",
        projectName: "",
        projectDescription: "",
        projectType: "",
        priority: "",
        startDate: "",
        deadline: "",
        budget: "",
        projectStatus: "Not Started",
        file: null,
        roles : []
}


const AddNewProject = () =>  {
    const navigate = useNavigate()
    
    const [formData, setFormData] = useState<ProjectForm>(IntialFormData);

    const[projectFile ,setFile] = useState<File | null>(null)
    
    const [roles , setRoles] = useState<string[]>([])
    
    const onFile = (e :React.ChangeEvent<HTMLInputElement>) => {
         setFormData((prev) => ({
             ...prev,
             file: e.target.files?.[0] ?? null
         })       
        )

        setFile(e.target.files?.[0] ?? null)
    }

    const onGetData = (name:string , value :string) =>{
         
      setFormData((prev) => ({
             ...prev,
             [name] : value
         }))
    }
    
    const projectDescripition = (vale:string) =>{
         setFormData((prev) => ({
             ...prev,
             projectDescription : vale
         }))
    }
   
    const onSubmitData = async (e:React.FormEvent) => {
          e.preventDefault()
           
          const error = Validiation()

          if (error) {
              toast.error(Validiation)
            return
          }
        

        const data = new FormData()

         Object.entries(formData).forEach(([key , value]) => {
              if (value !== null) {
                   data.append(key , value as string | Blob )
              }
         })
       
      const response = await Projects.createProject(data)
     console.log(formData)
      if (response.status === 200) {
           toast.success(response.data.message)

          setFormData(IntialFormData)
          setFile(null)
      }
  }
    
  const SelectedRoles = (role : string) => {
      if (roles.includes(role)) {
           const filterRole = roles.filter(eachRole => eachRole !== role)
           setRoles(filterRole)
           return
      }
      setRoles((prev) => ([
         ...prev , role
      ]))
  }

  const Validiation = () => {
    if (!formData.clientName.trim()) {
    return  "Please enter client name"
    
  }

  if (!formData.companyName.trim()) {
      return  "Please enter company name"
  
  }

  if (!formData.email.trim()) {
     return   "Please enter email"

  }

  if (!formData.phone.trim()) {
    return  "Please enter phone number"

  }

//   if (!/^[6-9]\d{9}$/.test(formData.phone)) {
//   return "Enter a valid 10-digit phone number"
  
// }

 if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
  return "Enter a valid email address"
}

  if (!formData.projectName.trim()) {
     return   "Please enter project name"

  }

  if (!formData.projectDescription.trim()) {
     return   "Please enter project description" 

  }

  if (!formData.projectType.trim()) {
     return  "Please select project type"

  }

  if (!formData.priority.trim()) {
   return  "Please select priority"

  }

  if (!formData.startDate) {
    return   "Please select start date" 

  }

  if (!formData.deadline) {
   return  "Please select deadline"
  }

  if (!formData.budget) {
    return  "Please enter budget"

  }

  if (!roles.length) {
     return  "Please select at least one role"

  }

  return null
}
      useEffect(() => {
      setFormData((prev) => ({
        ...prev,
        roles: roles,
      }));
    }, [roles]);

    return (
    <div className="h-[calc(100dvh-80px)] w-full overflow-y-auto  hide-scrollbar scrollbar-smooth p-3 bg-[#F6F8FD]">
      <form onSubmit={onSubmitData}>    
        <div className="md:flex sticky top-0 left-0 right-0 z-50 items-center fixed  justify-between p-3">
          <button  type="button" className="h-[40px] p-3 mt-5 mb-5 flex items-center gap-3 w-[100px] transition duration-300 ease-in-out bg-white rounded-[10px] cursor-pointer hover:scale-95  hover:border-1 border-[#7A4CF5] text-[#7A4CF5] font-dm-medium shadow-xl"
          onClick={() => navigate('/projects')}
          >
               <LuMoveLeft className="h-[20px] w-[20px]"/>   <p> Back</p>
          </button>

           <div className="flex justify-between md:justify-end mt-3 mb-5 gap-3">
            
            <button 
            onClick={() => setFormData(IntialFormData)}
            type="button"
            className="h-[40px] w-[100px] transition duration-300 ease-in-out bg-[#ffffff] rounded-[10px] cursor-pointer font-dm-medium hover:scale-95 text-[#000000]  shadow-xl">
                   Clear All
            </button>

            <button type="submit" className="h-[40px] w-[100px] transition duration-300 ease-in-out bg-gradient-to-br from-[#7a4cf5] to-[#4f7cff] font-dm-medium rounded-[10px] cursor-pointer hover:scale-95 text-white  shadow-xl">
                   Submit
            </button>
        </div>
      </div>
        <h1 className="md:text-[30px] text-[clamp(20px,5vw,25px)] font-dm-bold text-[#112F62]">Add New Project</h1>
        <p className="md:text-[20px] text-[clamp(15px,5vw,18px)] md:tracking-[0px] tracking-[-0.5px]  text-gray-600">Fill in client, project and assignment details</p>
         
         {/* Client details */}
    
        <div className=" bg-white  rounded-[8px] p-5 mt-5 shadow-[0_4px_20px_rgba(5,25,51,0.08)]">
            <h1 className="text-[#000000] text-[18px] font-dm-bold">1 · Client Details</h1>
           
              <div className="mt-3">
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 mt-3 gap-5">
                       
                     <div>
                        <Input name="clientName" value={formData.clientName} onGetData={onGetData} type="text"/>
                     </div>

                       <div>
                    
                         <Input name="companyName"  onGetData={onGetData} value={formData.companyName} type="text"/>
                     </div>

                   </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 mt-3 gap-5">
                       
                     <div>
                       
                         <Input name="email" value={formData.email} onGetData={onGetData} type="text"/>
                     </div>

                       <div>
                        
                          <Input name="phone" value={formData.phone} onGetData={onGetData} type="tel"/>
                     </div>

                   </div>
                  
              </div>

        </div>

        {/* Project Deatils */}

         <div className="shadow-[0_4px_20px_rgba(5,25,51,0.08)] bg-[#ffffff] rounded-[8px] p-5 mt-5">
            <h1 className="text-[#000000] text-[18px] font-dm-bold">2 · Project Details</h1>
           
              <div className="mt-3">
                  <Input name="projectName" value={formData.projectName} onGetData={onGetData} type="text"/>
                    
                    <div className="mt-3">                      
                    <label className="mb-2 font-dm-regular block text-sm  text-[#555C6D]">
                       Project Description
                    </label>
                    <textarea rows={5} value={formData.projectDescription} className="h-[100px] w-[100%] focus:border-[#7A4CF5]  focus:ring-2 focus:ring-[#7A4CF5]/20  border-1 border-gray-200 rounded-[10px] p-[15px]
                    text-[#000000] text-[15px]  outline-none transition"
                    onChange={(e) =>projectDescripition(e.target.value)}
                    >            
                    </textarea>
                    </div>

                   <div className="grid grid-cols-2 mt-3 gap-5">
                       <div>
                  
                          <DropDown name="projectType" dropdownData={projectTypes} value={formData.projectType} onGetData={onGetData} />
                       </div>

                        <div>
                    
                        <DropDown name="priority" dropdownData={priorities} value={formData.priority}  onGetData={onGetData} />
                     </div>

                   </div>

                     <div className="grid grid-cols-2 mt-3 gap-5">                  
                       <div>
                        <Input name="startDate" value={formData.startDate} onGetData={onGetData} type="date"/>
                     </div>

                      <div>
                        <label className="mb-2 font-dm-regular block text-sm  text-[#555C6D]">
                       
                    </label>
                       <Input name="deadline" value={formData.deadline} onGetData={onGetData} type="date"/>
                     </div>

                   </div>

                      <div className="grid grid-cols-2 mt-3 gap-5">
                       
                       <div>
                        <Input name="budget" value={formData.budget} onGetData={onGetData} type="number"/>
                     </div>

                      <div>
                          <DropDown name="projectStatus" dropdownData={projectStatuses} value={formData.projectStatus}  onGetData={onGetData} />
                       </div>

                   </div>

                      <div className="grid grid-cols-1 md:grid-cols-1  xl:grid-cols-2 mt-3 gap-5">
                  
                   <div className="mt-3">

                     <label className="mb-2 font-dm-regular block text-sm  text-[#555C6D]">
                     Project Documents / Files
                    </label>
                     
                    <div  className="h-[45px] p-3 w-[100%] focus:border-[#7A4CF5] focus:ring-2 focus:ring-[#7A4CF5]/20  border-1 border-gray-200 rounded-[10px] p-[15px]
                    text-[#000000] text-[15px]  outline-none transition flex items-center gap-5">
                         
                        {
                          !projectFile  && (
                             <input type="file"
                           onChange={onFile}
                           className="bg-[#f5f6fc] pt-1 pl-3 border-1 cursor-pointer border-gray-200 rounded-[8px] h-[35px] w-[120px] flex items-center"
                           accept=".pdf,application/pdf"
                      />
                          )
                        }
                        
                    
                    <div className="md:flex items-center gap-3">
                      {
                        projectFile && (
                            <FaFilePdf className="h-[20px] w-[20px] text-red-500"/>
                        )
                      }
                     
                    </div>
                    <p className="text-[#000000] text-[clamp(12px,3vw,15px) font-dm-regular text-[15px]">{projectFile?.name || 'No files Choose'}</p>
                     
                     {
                      projectFile && (
                      <button
                       className="cursor-pointer" 
                       onClick={() => setFile(null)}
                     >
                      <TbXboxXFilled className="h-[20px] w-[20px] text-red-500"/>
                     </button>
                      )
                     }
                          
                    </div>
                    
                   </div>
                  
                 
                <div>
                   <label className="mb-2 block font-dm-medium text-md   text-[#555C6D]">
                      Select Project Roles
                    </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                     
                  {
                    ProjectRoles.map(eachRole => (
                       <div className="flex items-center  gap-2 cursor-pointer" key={eachRole}>
                        <input type="checkbox"  checked={roles.includes(eachRole)} id={eachRole} onChange={() => SelectedRoles(eachRole)} value={''} className="h-[15px] w-[15px] text-green-600"/>
                        <label htmlFor={eachRole}  className="text-[15px] text-gray-500 font-dm-regular">{eachRole}</label>
                      </div>
                    ))
                  }
                  </div>
                  </div>
                  </div>

              </div>

        </div>

        
       
      </form>
    </div>
)
}
export default AddNewProject;