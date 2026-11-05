import {Projects , assignProject , addEmployee} from '../services/AdminAccess'
import type { ProjectInterface , assignProjectmembers , EmployeeInterface  , DataProps , ProjectProgress} from '../mockdata/mockdata'
import { useState , useEffect } from 'react'
import type { ReactNode } from 'react'
import { createContext , useContext } from 'react'
import socket from '../socket/socket'
const renderState = {
    loading : 'Loading',
    success : 'Success',
    failure : 'Failure'
}

const ApiContext = createContext<DataProps | null>(null)



const AdminDataLaypot = ({children} : {children : ReactNode}) => {
   
       const [projectData , setProjectData] = useState<ProjectInterface[]>([])
       const [status , setStatus] = useState(renderState.loading)
       const [assignProjectMembers , setAssignMembers] = useState<assignProjectmembers[]>([])
       const [employeeData , setEmployess] = useState<EmployeeInterface[]>([])
       const [projectProgress , setProgress] = useState<ProjectProgress[]>([])

        const fetchApis = async () => {
            try {
                setStatus(renderState.loading)
       
              const [resProjects , resAssignProjects , resEmployess , resProgress]= await  Promise.all([Projects.getAllProjects() , assignProject.getAllEmployess() , addEmployee.getAllEmployess() , assignProject.getProjectProgress()])   
       
             if(resProjects.status === 200 && resAssignProjects.status === 200 && resEmployess.status === 200 &&  resProgress.status === 200) {
                
               setProjectData(resProjects.data.data)
               setAssignMembers(resAssignProjects.data.data)
               setEmployess(resEmployess.data.data)
               setProgress(resProgress.data.data)
               setStatus(renderState.success)
             
             }
       
             else { 
               setStatus(renderState.failure)
             }
            }
            
            catch(e) {
              setStatus(renderState.failure)
            }
            
            
         }
      

         useEffect(() => {
            fetchApis()

            socket.on('get assignEmployess' , () => {
               fetchApis()
            })

            socket.on('get Employee' , () => {
               fetchApis()
            }) 

            socket.on('get Project' , () => {
                fetchApis()
            })

            socket.on('Update Project Status' , () => {
               fetchApis()
            })

            socket.on('get Reports' , () => {
                fetchApis()
            })

            socket.on('UpdateStatus' , () => {
                fetchApis()
            })

            return () => {
                socket.off('get assignEmployess')
                socket.off('get Employe')
                socket.off('get Project')
                socket.off('Update Project Status')
                socket.off('get Reports')
                socket.off('UpdateStatus')
            }

         } , [])
   
    return (
        <ApiContext.Provider
            value={{
                 projectData,
                 status,
                 assignProjectMembers,
                 employeeData,
                 projectProgress
            }}
        >
            {children}
        </ApiContext.Provider>
   )
}


export const useApiData = () => {
    const context = useContext(ApiContext)
    
    if (!context) {
        throw new Error('Apis Faild')
     }

    return context
}

export default AdminDataLaypot