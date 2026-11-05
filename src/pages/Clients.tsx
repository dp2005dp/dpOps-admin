import { useState} from "react"
import { MdRemoveRedEye } from "react-icons/md";
import { useLocation } from "react-router-dom";
import type { ProjectInterface } from "../mockdata/mockdata";
import Status from "../components/Status";
import { useNavigate } from "react-router-dom";
import PageLoader from "../components/PageLoader";
import EmptyState from "../components/EmptyState";
import addClient from "../assets/addClient.png"
import PageNotFound from "../components/PageNotFound";
import Nodata from "../components/Nodata";
import { useApiData } from "../components/AdminDataLaypot";



const clientColumnName = [
  'Company',
  'Client Name',
  'Email-Phone',
  'Revenu',
  'Status',
  'Action'
]

const renderState = {
    loading : 'Loading',
    success : 'Success',
    failure : 'Failure'
}

const Clients = () => {
  const {projectData , status} = useApiData()

  const pageRender = () => {
    switch(status) {
       case renderState.loading : 
       return <div className="flex flex-col justify-center h-[50vh] items-center"><PageLoader /></div> 
      
       case renderState.success : 
       return < ClientDetails clientData={projectData}/>
 
      case renderState.failure :
      return  <PageNotFound />
      
      default :
      return null
    }
}

    return (
  <div className="h-[calc(100dvh-80px)] overflow-y-auto scroll-smooth hide-scrollbar p-5">
        <div className="flex items-center justify-between">
           <div>
              <h1 className="md:text-[30px] text-[clamp(20px,5vw,25px)] font-dm-bold text-[#112F62]">Clients</h1>
              <p className="md:text-[20px] text-[clamp(16px,5vw,20px)] font-dm-regular text-gray-600">Manage all your clients.</p>
           </div>
        </div>
        { pageRender()}
  </div>
)
}

interface ClientProps {
clientData : ProjectInterface[]
}

const ClientDetails = ({clientData} : ClientProps) => {
  const location = useLocation()
  const navigate = useNavigate()
  const [userInput ,setInput] = useState<string>('')
     
   const filterClients = () => {
      const filtername = clientData.filter(eachData => eachData.ClientCompany.toLocaleLowerCase().includes(userInput.toLocaleLowerCase())
      ||  eachData.clientName.toLocaleLowerCase().includes(userInput.toLocaleLowerCase())
    )

      return filtername
   }

  return (
          <>
         {
            clientData.length === 0 ? <EmptyState  title="No Clients Yet" value="No clients have been added yet. Add your first client to get started." 
                image={addClient}
                /> : 
        <div className="overflow-x-auto xl:overflow-hidden xl:w-full m-w-0">
          <div className="w-[1000px] xl:w-full">
          <div className="mt-10 shadow-md bg-[#ffffff] p-10 rounded-[8px]">
              <div>
              <p className="text-[18px] text-[clamp(15px,3.5vw,18px)] mb-5 text-gray-500">Build stronger client relationships and keep all client information organized in one place.</p>
                  </div>
                  <div className="flex items-center justify-between">
                      <div className="flex items-center gap-5">
                    <input type="text" 
                    placeholder="Serch Company name or Clients name..."
                    className="h-[50px] w-[450px] text-[15px] border-1 border-gray-400 p-[15px] outline-none
                    focus:border-[#7A4CF5] focus:ring-2 focus:ring-[#7A4CF5]/20  shadow-md bg-[#ffffff] rounded-[5px]"
                    onChange={(e) => setInput(e.target.value)}
                    />

                    {/* <select
                    value={clientStatus}
                    className="h-[40px]  border-1 border-gray-200  rounded-[10px] outline-none focus:border-[#7A4CF5] text-[15px] cursor-pointer focus:ring-2 focus:ring-[#7A4CF5]/20"
                    onChange={(e) => setStaus(e.target.value)}
                    >
                        {
                            filterOptions.map(eachoption => (
                                <option key={eachoption} value={eachoption}>{eachoption}</option>
                            ))
                        }
                    </select> */}
                </div>
                    {
                      location.pathname === '/clients' ? '' :    <p className="text-[#7A4CF5] font-dm-medium text-[15px] underline cursor-pointer">View All</p>
                    }
                  
                  </div>
                    
        
                  <div className="grid grid-cols-9 rounded-tl-[10px]  pt-2 pb-2 rounded-tr-[10px]  bg-[#6c4cf10d] mt-10 gap-10">
                      {
                        clientColumnName.map((eachCloum , index) => (
                          <div key={eachCloum} className={`${index === 0  ? 'col-span-2' : index === 2 ?  'col-span-3' :   'col-span-1'}`}>
                              <h1 className={`text-[18px] ${index === 0 ? 'pl-5' : ''} tracking-[-0.5px] text-[#053D9E] font-dm-medium`}>{eachCloum}</h1>
                          </div>
                        ))
                      }
                  </div>
                  {
                    filterClients().length === 0 ? <Nodata value={userInput}/>
                    :
                 
                  <>
                  {
                  filterClients().map((eachdata , index) => (
                      <div  key={eachdata.projectId}>
                        <div className={` ${index === 0 ? 'border-1  border-gray-200' : ' '} 
                          `}/>
                        <div className="grid grid-cols-9 gap-10 mt-3 mb-3">
                            <h1 className={`font-dm-bold pl-2 text-gray-600 text-[16px] pl-5 text-[#000000] col-span-2`}>{eachdata.ClientCompany}</h1>
                              <h1 className="text-[16px] text-[#000000] font-dm-regular col-span-1">{eachdata.clientName}</h1>
                                
                                <div className="gap-3 col-span-3">
                                  <h1 className="text-[16px] text-[#000000] font-dm-regular">{eachdata.ClientEmail}</h1>
                                  
                                    <h1 className="text-[14px] text-gray-400 font-dm-regular">{`91+ ${eachdata.clientPhone}`}</h1>
                                </div>
                                
                              
                                
                                <h1 className="text-[16px] text-[#000000] font-dm-regular col-span-1">{`$${eachdata.budget.toString().split('.')[0]}/-`}</h1>
                                
                                <div className="col-span-1">
                                  <Status status={eachdata.projectStatus}/>
                                </div>
                                    <button
                                    onClick={(e) => navigate(`/projectDetails/${eachdata.projectId}`)}
                                    type="button" className="bg-[#ffffff] h-[30px] w-[80px] flex items-center gap-2  col-span-1 hover:scale-95 transition duration-300 ease-int-out border-1 border-[#4f7cff]/50  items-center rounded-[5px] cursor-pointer p-3 shadow-md">
                                      <MdRemoveRedEye className="h-[50px] w-[50px] text-[#7A4CF5]"/>
                                      <h1 className="text-[#7A4CF5] text-[15px] font-dm-medium">View</h1>
                                  </button>
                        </div>
                          <div className={` ${index === clientData.length  - 1 ? '' : ' border-b-1 border-gray-200'} 
                          `}/>
                          </div>
                    ))
                  }
                  </>
                 }
          </div>
          </div>
        </div>
      
       }
       </>
  )
}
export default Clients