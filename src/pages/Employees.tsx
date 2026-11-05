import { IoMdEye } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import { IoAddOutline } from "react-icons/io5";
import EmployeeDeatils from "../components/EmployeeModal"
import { useState} from "react";
import { useNavigate } from "react-router-dom";
import { motion , type Variants , AnimatePresence } from "motion/react";
import type { EmployeeInterface } from "../mockdata/mockdata";
import DropDown from "../components/DropDown";
import EmptyState from "../components/EmptyState";
import AddEmployee from "../assets/AddEmployee.png"
import PageLoader from "../components/PageLoader";
import PageNotFound from "../components/PageNotFound";
import Nodata from "../components/Nodata";
import { useApiData } from "../components/AdminDataLaypot";
const cardVariants = {
      hidden : {},

      visible :{
         opacity: 1,
        transition : {
            staggerChildren : 0.2
        }
      }
}

const childCardVarients:Variants = {
     hidden :{
        opacity : 0
     },

     visible :{
        opacity : 1,
        transition :{
            ease : 'easeInOut',
            duration : 0.5,
            
        }
     }
}

const ProjectRoles = [
  "All Roles",
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

const renderState = {
    loading : 'Loading',
    success : 'Success',
    failure : 'Failure'
}

const Employess = () => {
    const {employeeData , status} = useApiData()
    const navigate = useNavigate()

    const renderPage = () => {
        switch(status) {
          case renderState.loading : 
          return <div className="flex flex-col justify-center h-[50vh] items-center"><PageLoader /></div> 

          case renderState.success : 
          return <EmployeesPage employeeData={employeeData}/>

          case renderState.failure :
          return  <PageNotFound />

          default :
          return null

        }
    }

    return (
       <>
      
          <div>
              
         <div className="bg-[#F6F8FD] overflow-y-auto transition  pb-10 h-[calc(100dvh-80px)] scrollbar-smooth hide-scrollbar p-5">
            <div className="xl:flex items-center justify-between">
               
               <div>
                  <h1 className="md:text-[30px] text-[clamp(20px,5vw,25px)] font-dm-bold text-[#112F62]">Employees</h1>
                  <p className="md:text-[20px] mb-5 xl:mb-0 text-[clamp(16px,5vw,20px)] font-dm-regular text-gray-600">Manage Your team members and their details.</p>
               </div>
            <div className="flex justify-end xl:justify-start">   
              <button className="flex p-2  md:mt-5 md:mt-0 items-center gap-2 duration-300 ease-in-out  hover:scale-95 bg-gradient-to-br from-[#7a4cf5] to-[#4f7cff] cursor-pointer rounded-[5px] h-[40px] w-[180px]"
                    onClick={() =>navigate('/addnewemployee')}
                    >
                        <IoAddOutline className="h-[20px]  w-[20px] text-[#ffffff]"/>
                        <p className="text-[#ffffff] text-[18px] text-[clamp(15px,3vw,16px)] font-dm-medium">Add Employee</p>
              </button>
            </div>  
            </div>
            
            

              {renderPage()}
         </div>
       
        </div>
      </>
    )
}

interface employeeInterface {
  employeeData : EmployeeInterface[]
}

 const EmployeesPage = ({employeeData} : employeeInterface) => {
    const [userInput , setInput] = useState<string>('')
    const [selectRole , onSelect] = useState<string>(ProjectRoles[0])
    const [modalData , setModalData] = useState<EmployeeInterface | null>( null)

      const filterEmployess = () => {


        const filters =  selectRole === 'All Roles' ?  employeeData.filter(eachEmployee => eachEmployee.fullName.toLocaleLowerCase().includes(userInput.toLocaleLowerCase()))
         : employeeData.filter(eachEmployeeRole => eachEmployeeRole.role === selectRole).filter(eachEmployee => eachEmployee.fullName.toLocaleLowerCase().includes(userInput.toLocaleLowerCase()))

        return filters
    }
   
  
  
    const selectrole =(value : string) => {
          onSelect(value)
    }
    

  return (
        <> 
        {
          employeeData.length === 0 ? (
            <EmptyState  title="No Employees Yet" value="No employees have been added yet. Add your first team member to get started." 
          image={AddEmployee}
          />

          ) : <>
          <div className="md:flex items-center gap-10  mt-5 mb-10">

               <div className="flex items-center gap-2">  
                <p className="text-[15px] text-gray-400 font-dm-regular">Filter Role: </p> 
                <DropDown dropdownData={ProjectRoles} name="" value={selectRole} onGetData={selectrole}/>
                </div>       
                  <div className="md:h-[42px]  h-[35px] w-[100%] md:w-[300px] border-1 mt-2 border-gray-200 bg-white p-5 rounded-[5px] flex items-center gap-3">
                      <IoIosSearch className="h-[20px] w-[20px] text-gray-400"/>
                      
                      <input type="search" 
                          className="outline-none text-[15px] font-dm-regular"
                          placeholder="Search Employees..."
                          onChange={(e) => setInput(e.target.value)}
                          value={userInput}
                      />
                  </div>

                    
            </div>
        {
          filterEmployess().length === 0 ? (
                 <Nodata value={`${selectRole} ${!userInput ? '' : 'to' } ${userInput}`}/>
                 )
                  :
            <motion.div
                  variants={cardVariants}
                  initial='hidden'
                  animate='visible'
                  viewport={{once :true}}
                  className="mt-10 xl:mt-5 grid grid-cols-1 md:grid-cols-2  xl:grid-cols-3 gap-10">
                { 
                  <>
                        {
                        filterEmployess().map(eachData =>  {
                            const employeeProfilePthoto = `${import.meta.env.VITE_IMAGE_URL}${eachData.profilePhoto}`
                          return (
                            <motion.div
                            variants={childCardVarients}
                            className="xl:w-[350px]  hover:scale-105 origin-left cursor-pointer transition-all duration-300 ease-in-out mb-5 md:mb-0  p-3 bg-[#ffffff] shadow-md rounded-[8px]"
                              key={eachData.employeeId}
                            >  
                              <div className="flex flex-col items-center">
                              <img src={employeeProfilePthoto} alt="profile"
                                className="h-[100px] w-[100px] rounded-full object-cover object-top"
                              />
                              
                              <h1 className="mt-2 text-[#000000] font-dm-bold text-[20px]">{eachData.fullName}</h1>
                              <p className="text-gray-500 text-[18px] font-dm-regular  mb-2">{eachData.role}</p>
                              <p className="text-gray-500 text-[18px] font-dm-regular">{eachData.username}</p>

                              <div className={`flex mt-2 items-center h-[30px] w-[120px] gap-3 rounded-[20px] p-2 ${'Active' === 'Active' ? 'bg-[#16a05a]/20' : 'bg-[#f5b73b]/30'}`}>
                                    <div className={`h-[10px] w-[10px] rounded-full ${'Active' === 'Active' ? 'bg-[#16a05a]' : 'bg-[#f5b73b]'}`}/>
                                    <p className={`${'Active' === 'Active' ? 'text-[#16a05a]' : 'text-[#f5b73b]'} font-dm-medium text-[15px] `}>Active</p>
                              </div>
                              </div>
                                <button className="mt-5 border-1 border-[#7A4CF5] cursor-pointer rounded-[8px] h-[45px] w-[100%] flex flex-col justify-center items-center"
                                  onClick={() => setModalData(eachData)}
                                >
                                      
                                      <div className="flex items-center gap-3">
                                        <IoMdEye className="h-[22px] w-[22px] text-[#7A4CF5]"/>
                                        <p className="text-[16px] text-[#7A4CF5] font-dm-medium">View Details</p>
                                      </div>
                                </button>
                            </motion.div>
                        )})
                    }
                    </>
                }
            </motion.div>
             }
         {
        modalData && (
           <AnimatePresence>
               <motion.div
               initial  ={{
                opacity : 0,  
                         
               }}

               animate = {{
                opacity : 1,
                transition : {
                   duration : 1,
                   ease : 'easeInOut',
                   delay : 0.1
                }
               }}
               exit={{opacity : 0}}
               >
                <EmployeeDeatils data={modalData} onClose={() => setModalData(null)}/>
                  
               </motion.div>
                
           </AnimatePresence>
        )
       }
        </>
        }
        </>
    )
}

export default Employess;