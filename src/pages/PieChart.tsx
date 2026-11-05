import type { ProjectInterface } from "../mockdata/mockdata";
import { ResponsiveContainer , PieChart , Pie ,Cell , Tooltip } from "recharts"

interface PieChartPros {
   data : ProjectInterface[]
}

const colors = ['#16a05a' , '#4f7cff' , '#f5b73b' , '#ef4444' , '#9aa3c7' ]

const PieChartView  = ({data}  : PieChartPros) => {
 
const compledP = data.filter(eachP => eachP.projectStatus === 'Completed').length
const inProgressP = data.filter(eachP => eachP.projectStatus === 'In Progress').length
const pendingP = data.filter(eachP => eachP.projectStatus === 'Pending').length
const delayedP = data.filter(eachP => eachP.projectStatus === 'On Hold').length
const notStartedP = data.filter(eachP => eachP.projectStatus === 'Not Started').length


const projectStatusData = [
  { name: "Completed", value: compledP },
  { name: "In Progress", value: inProgressP},
  { name: "Pending", value: pendingP },
  { name: "On Hold", value: delayedP },
  { name: "Not Started", value: notStartedP },
];
  
  return (

<div className="mt-15 w-full bg-[#ffffff] shadow-md p-3 rounded-[8px]">
   
     <h1 className="text-[#000000] text-[22px] font-dm-bold">Projects Overview</h1>
  
  <div className="md:flex items-center p-1 gap-10">
    <div className="relative h-[250px] w-full mt-20 md:w-1/2">
        <ResponsiveContainer height='100%' width='100%'>
            <PieChart >
                  <Pie data={projectStatusData}
                    dataKey='value'
                    nameKey='name'
                    cx='50%'
                    cy='50%'
                    outerRadius='100%'
                    innerRadius='70%'
                    >
                      {
                          projectStatusData.map((eachData , index) => (
                              <Cell 
                              key={eachData.name}
                              fill={colors[index % colors.length]}
                              />
                          ))
                      }
                      <Tooltip />
                    </Pie>
            </PieChart>
        </ResponsiveContainer>
       
       <div className="absolute inset-0 pointer-events-none flex flex-col justify-center items-center">
            <p className="md:text-[20px] font-bold text-[#000000]">{data.length}</p>
            <p className="text-[15px] font-dm-regular">Total Projects</p>
       </div>

    </div>

    <div className="mt-15">
       {
        projectStatusData.map((eachData , index) => (
        <div key={index} className="flex items-center gap-2">
           <div 
           className="h-[10px] w-[10px] rounded-full"
           style={{backgroundColor : colors[index % colors.length]}}/>
            
          <h1 className="text-[15px] font-dm-regular"
          style={{color : colors[index % colors.length]}}
          >{eachData.name}</h1>

           </div>
        ))
        
        
       }
  </div>
  </div>
</div>
)
}
export default PieChartView