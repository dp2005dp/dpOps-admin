import Input from "../components/Input";
import DropDown from "../components/DropDown";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FaSave } from "react-icons/fa";
import React, { useState  , useRef} from "react";
import type  {EmployeeFormData} from "../mockdata/mockdata"
import { TbXboxXFilled } from "react-icons/tb";
import { addEmployee } from "../services/AdminAccess";
import toast from "react-hot-toast";
const roles: string[] = [
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

const departments: string[] = [
  "Engineering",
  "Design",
  "Quality Assurance",
  "Management",
  "Human Resources",
  "Marketing",
  "Sales",
  "Finance",
];

const countries: string[] = [
  "India",
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "Singapore",
  "United Arab Emirates",
];

const employmentTypes: string[] = [
  "Full Time",
  "Part Time",
  "Contract",
  "Internship",
];

const IntialState = {
   username : '',
   password : '',
   fullName:'',
   email: '',
   phone: '',
   role: '',
   department: '',
   profilePhoto: null,
   joinDate:'',
   experienceYears: 0,
   employmentType:'',
   streetAddress: '',
   city: '',
   state:'',
   country: '',
   zipCode: '',
   aboutEmployee:'',
}

const AddNewEmployee = () => {
    const navigate = useNavigate() 
    const [employeesData , setEmployeeData] = useState<EmployeeFormData>(IntialState)
    const [prevProfile , setProfile] = useState('')
   
    const onGetData = (name :string , value :string) => {
        setEmployeeData((prev) => ({
            ...prev,
            [name] : value
        }))
   }
    
   const EmployeeId = (id:number | string) => {
       setEmployeeData((prev) => ({
         ...prev, username : id
       }))
   }
   
   
   const onSubmitData = async (e:React.FormEvent) => {
       e.preventDefault()

       const error = validateEmployee()

       if (error) {
          toast.error(error)
          return
       }

       const data = new FormData()
       
       Object.entries(employeesData).forEach(([key , value]) => {
            if (value !== null) {
                 data.append(key , value as string | Blob)
            }
       })
     
      const response = await addEmployee.add(data)
     
      if (response.status === 200) {
           toast.success(response.data.message)
          setEmployeeData(IntialState)
          setProfile('')
      }
   }
 

      const fileInputRef = useRef<HTMLInputElement>(null);

      const handleFile = (file: File) => {
       if (!file.type.startsWith("image/")) {
         alert("Only image files are allowed");
         return;
      }
      
      setProfile(URL.createObjectURL(file))
      
      setEmployeeData((prev) => ({
          ...prev , profilePhoto : file 
      }))


      };

      const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];

      if (file) {
         handleFile(file);
      }
      };

      const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();

      const file = e.dataTransfer.files?.[0];

      if (file) {
         handleFile(file);
      }
      };

   const validateEmployee = () => {
    if (!employeesData.fullName.trim()) {
        return "Please enter full name";
    }

    if (!employeesData.email.trim()) {
        return "Please enter email";
    }
    
   if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(employeesData.email)) {
   return "Enter a valid email address"
   }

    if (!employeesData.phone) {
        return "Please enter phone number";
    }

    if (!employeesData.role.trim()) {
        return "Please select role";
    }

    if (!employeesData.department.trim()) {
        return "Please select department";
    }

    if (!employeesData.profilePhoto) {
        return "Please upload profile photo";
    }

    if (!employeesData.joinDate.trim()) {
        return "Please select join date";
    }

    if (!employeesData.employmentType.trim()) {
        return "Please select employment type";
    }

    if (!employeesData.streetAddress.trim()) {
        return "Please enter street address";
    }

    if (!employeesData.city.trim()) {
        return "Please enter city";
    }

    if (!employeesData.state.trim()) {
        return "Please enter state";
    }

    if (!employeesData.country.trim()) {
        return "Please enter country";
    }

    if (!employeesData.zipCode.trim()) {
        return "Please enter zip code";
    }

   if (!employeesData.username) {
        return "Please enter EmployeeID";
    }

    if (!employeesData.password) {
        return "Please enter password";
    }

    if (!employeesData.aboutEmployee.trim()) {
        return "Please enter about employee";
    }

     return "";
     };

    return (
           <div className="bg-[#F6F8FD] overflow-y-auto scrollbar-smooth hide-scrollbar transition  pb-10 h-[calc(100dvh-80px)] p-3">
               <form onSubmit={onSubmitData}>
            
               <div className="md:flex mt-3 items-center justify-between">
                  <div>
                     <h1 className="text-[30px] text-[clamp(20px,5vw,25px)] mb-5 md:mb-0 font-dm-bold text-[#112F62]">Add Employee</h1>
                     <p className="md:text-[16px] mt-1 text-[clamp(16px,5vw,20px)] font-dm-regular text-gray-600">Add new team members, manage their details, and keep employee information organized.</p>
                   </div>
                  <div className="flex mt-5 md:mt-0 items-center gap-3">
            
                     <button type="button" className="h-[40px] w-[100px] transition duration-300 ease-in-out bg-[#ffffff] rounded-[10px] cursor-pointer font-dm-medium hover:scale-95 text-[#000000]  shadow-xl"
                       onClick={() =>navigate('/employees')}
                     >
                           Cancel
                     </button>

                     <button type="submit" className="flex p-2 items-center gap-2 duration-300 ease-in-out  hover:scale-95 bg-gradient-to-br from-[#7a4cf5] to-[#4f7cff] cursor-pointer rounded-[5px] h-[40px] w-[100px]">
                           <FaSave className="h-[20px] w-[20px] text-[#ffffff]"/>
                           <p className="text-[#ffffff] text-[18px] font-dm-medium">Save</p>
                      </button>
                    </div>
               </div>
               
            
               {/* Basic Information */}
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* BasicInformation */}
                   <div className="bg-[#ffffff] rounded-[8px] mt-5 border-1 border-gray-200 shadow-md p-5">
                     
                       <h1 className="text-[#000000] text-[18px] font-dm-bold">1 · Employee Details</h1>
               
                      <div className="mt-3 mb-2">
                        
                        <Input onGetData={onGetData} name='fullName' value={employeesData.fullName}  type="text"/>
                     
                     </div>
                     
                     <div className="mt-3 mb-2">
                        
                        <Input onGetData={onGetData} name='email' value={employeesData.email}  type="text"/>
                     
                     </div>

                     <div className="mt-3 mb-2">
                        
                        <Input onGetData={onGetData} name='phone' value={employeesData.phone}  type="tel"/>
                     
                     </div>

                     <div className="grid grid-cols-2 gap-3">
                       <div className="mt-3 mb-2">
                        
                        <DropDown dropdownData={roles} value={employeesData.role} name="role" onGetData={onGetData}/>
                     
                     </div>

                     <div className="mt-3 mb-2">
                        <DropDown dropdownData={departments} value={employeesData.department} name="department" onGetData={onGetData}/>
                     
                     </div>
                     </div>
                     
                      <label className="mb-2 block font-dm-regular text-sm  text-[#555C6D]">
                        Profile Photo <span className="text-red-500 text-[15px] font-bold"></span>
                     </label>
                     

                     {
                        
                        prevProfile ? <div className="flex justify-center relative">
                               <img src={prevProfile}  className="h-[250px] self-center w-[250px]  object-cover object-top rounded-full" />

                               <button
                               type="button"
                               onClick={() => setProfile('')}
                               className="cursor-pointer hover:scale-105  absolute top-0 right-0">
                                      <TbXboxXFilled className="h-[35px] w-[35px] hover:text-red-500 text-[#7A4CF5]"/>
                               </button>
                        </div>
                           
                           :

                        (
                           <div 
                           onClick={() => fileInputRef.current?.click()}
                           onDragOver={(e) => e.preventDefault()}
                           onDrop={onDrop}
                           className="h-[250px cursor-pointer rounded-[8px] border-style-dashed bg-[#7A4CF5]/10 border-1 p-3 border-[#7A4CF5] flex flex-col justify-center items-center">
                        <MdOutlineAddAPhoto className="h-[20px] mb-2 w-[20px] text-[#7A4CF5]"/>
                        <h1 className="text-[14px] text-[#7A4CF5]">Click to upload photo</h1>
                        <p className="text-[12px] text-[#7A4CF5]">or drag and drop</p>
                        <p className="text-[12px] text-[#7A4CF5]">{'(PNG,JPG,up to 5MB)'}</p>
                      
                           <input
                              ref={fileInputRef}
                              type="file"
                              hidden
                              onChange={onFileChange}
                              accept="image/*"
                           />

                     </div>
                        )

                     }
                    
                   
                   </div> 
              
                
                {/* Professional details */}

            
               
                   <div className="bg-[#ffffff] rounded-[8px] mt-5 border-1 border-gray-200 shadow-md p-5">
                     
                       <h1 className="text-[#000000] text-[18px] font-dm-bold">2 · Professional details</h1>
               
                      <div className="mt-3 mb-2">                     
                        <Input onGetData={onGetData} name='joinDate' value={employeesData.joinDate}  type="date"/>
                     
                     </div>

                     <div className="mt-3 mb-2">
{/*                         
                        <label className="mb-2 font-dm-regular block text-sm  text-[#555C6D]">
                        Experience(Years)<span className="text-red-500 text-[15px] font-bold">*</span>
                        </label>
                         */}
                         <Input onGetData={onGetData} name='experienceYears' value={employeesData.experienceYears}  type="text"/>
                     
                     </div>
                     
                     <label className="mb-2 block font-dm-regular text-sm  text-[#555C6D]">
                        Employeement Type<span className="text-red-500 text-[15px] font-bold"></span>
                     </label>

                     <div className="grid grid-cols-4 gap-3">
 
                        {
                           employmentTypes.map(eachItem => (
                                <label className="flex items-center gap-3 mb-2 block text-sm  text-[#555C6D]">
                                  
                                  <input 
                                  type="radio"
                                  className="h-[20px] w-[10px] font-dm-regular accent-[#7A4CF5]"
                                  value={eachItem}
                                  name="employmentType"
                                  onChange={() => setEmployeeData((prev) => ({
                                      ...prev , employmentType : eachItem
                                  }))}
                                  />

                                 <span className="text-[#000000] font-dm-regular text-[14px]">{eachItem}</span>
                                </label>
                           ))
                        }
                     
                     </div>
                      
                          <h1 className="text-[#000000] mt-3 text-[18px] font-dm-bold">3 · Address</h1>
                            
                        <div className="mt-3 mb-2">
                        <Input onGetData={onGetData} name='streetAddress' value={employeesData.streetAddress}  type="text"/>
                     
                     </div>

                     <div className="mt-3 mb-2">
                        <Input onGetData={onGetData} name='city' value={employeesData.city}  type="text"/>
                     
                     </div>
                      
                     <div className="grid grid-cols-2 gap-3">
                        <div className="mt-3 mb-2">

                        <Input onGetData={onGetData} name='state' value={employeesData.state}  type="text"/>
                     
                     </div>

                     <div className="mt-3 mb-2">
                        
                     <DropDown dropdownData={countries} value={employeesData.country} name="country" onGetData={onGetData}/>
                     
                     </div>
                     </div>
                      
                       <div className="mt-3 mb-2">
                        <Input onGetData={onGetData} name='zipCode' value={employeesData.zipCode}  type="text"/>
                     </div>
                   </div> 
                
                
               </div>

                 {/* Security Filed */}
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="bg-[#ffffff] rounded-[8px] mt-5 border-1 border-gray-200 shadow-md p-5">
                     
                       <h1 className="text-[#000000] text-[18px] font-dm-bold">4 · Security field Must Be Uniqe</h1>
               
                     
                     <div className="mt-3 mb-2">

                            <label className="mb-2 block font-dm-regular text-sm  text-[#555C6D]">
                            Employee ID
                           </label>
                        <div className="flex items-center h-[40px] w-[100%] border-1 border-gray-200 rounded-[10px] p-[15px]">
                           <p className="text-[#000000] text-[15px]">EMP</p>
                       
                        <input type='text' 
                           placeholder="e.g.101"
                           value={employeesData.username}
                           className="outline-none transition"
                           onChange={(e) => {EmployeeId(e.target.value)}}
                           
                           />
                         </div>
                     </div>

                     <div className="mt-3 mb-2">
                        <Input onGetData={onGetData} name='password' value={employeesData.password}  type="text"/>
                     </div>                
                   </div> 

                  {/* Additional Information */}

                  <div className="bg-[#ffffff] h-[300px] rounded-[8px] mt-5 border-1 border-gray-200 shadow-md p-5">
                     
                       <h1 className="text-[#000000] text-[18px] font-dm-bold">4 · Additional Information</h1>

                       <label className="mb-2 mt-2 font-dm-medium block text-md  text-[#555C6D]">
                        About Employee 
                     </label>

                     <textarea className="h-[150px] w-[100%] font-dm-regular border-1 border-gray-200 rounded-[8px] p-3 
                     text-[15px] text-[#000000] outline-none focus:border-[#7A4CF5] focus:ring-2 focus:ring-[#7A4CF5]/20
                     "
                     placeholder="Brief Intriduction about the employee..."
                     rows={3}
                     value={employeesData.aboutEmployee}
                     onChange={(e) => setEmployeeData((prev) => ({
                        ...prev , aboutEmployee : e.target.value
                     }))}
                     >
                         
                     </textarea>
                  </div>
                 </div>
            </form>  
          </div>
    )
}

export default AddNewEmployee;