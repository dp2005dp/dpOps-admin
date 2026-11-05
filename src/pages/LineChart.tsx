import { ResponsiveContainer , AreaChart ,Area  ,XAxis  , YAxis , CartesianGrid,  Tooltip  } from "recharts"
import { useEffect, useState } from "react";
import type { ProjectInterface } from "../mockdata/mockdata";

interface revenuProps {
   month : string,
   revenue : number
}

const IntialData = [
  { month: "Jan", revenue:0},
  { month: "Feb", revenue: 0},
  { month: "Mar", revenue: 0},
  { month: "Apr", revenue: 0},
  { month: "May", revenue: 0},
  { month: "Jun", revenue: 0 },
  { month: "Jul", revenue: 0 },
  { month: "Aug", revenue: 0},
  { month: "Sep", revenue: 0},
  { month: "Oct", revenue: 0},
  { month: "Nov", revenue: 0},
  { month: "Dec", revenue: 0},
];

interface DataProps {
  data : ProjectInterface[]
}
const LineChartView = ({data} : DataProps) => {
  const [revenuedata , setRevenue] = useState<revenuProps[]>(IntialData) 
  const [year ,setYear] = useState<string>('2026')

  useEffect(() => {
      const updateRevenu = IntialData.map((month , index) => {
    
    const totalRevenu =  data.filter((eachMonth)=> {
      const date = new Date(eachMonth.createdAt)


     return (date.getFullYear() === Number(year) && String(date.getMonth()) === String(index))

     })
    .reduce((value , revenue) => value + Number(revenue.budget) ,0)
      

     return {
       ...month , revenue : totalRevenu
     }

  })
   setRevenue(updateRevenu)
  },[data , year])
  

 


return (
<div className="mt-15 bg-[#ffffff] p-3 shadow-md rounded-[8px]">
    
    <div className="md:flex itams-center justify-between">
        <h1 className="text-[#000000] text-[22px] mb-5 md:mb-0 font-dm-bold">Revenue Overview</h1>
       <RevenueFilter  onGet={(value) => setYear(value)}/>
    </div>
    
    


   <div className="h-[250px] mt-20  w-full">
        <ResponsiveContainer height='100%' width="100%">
            <AreaChart data={revenuedata}>
               <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='month' />
                <YAxis />
                <Area dataKey='revenue'
                 stroke="#6c4cf1"
                 strokeWidth={3}
                 fill="#6c4cf1"
                 fillOpacity={0.3}
               
                />
              <Tooltip />
            </AreaChart>

        </ResponsiveContainer>
   </div>
  </div>
)
}

interface FilterProps {
  onGet : (value : string) => void
}

const RevenueFilter = ({onGet} : FilterProps) => {
  
const years = ["2026", "2027", "2028", "2029", "2030"];
const [selected, setSelected] = useState("2026");
  

  return (
    <div className="flex items-center gap-3">
      
      {/* Filter buttons */}
      {/* Options */}
    

       <p className="text-[15px] text-gray-500 font-dm-regular">Filter Yearly</p>
   
      <div className="rounded-xl bg-white p-2  shadow-lg">
      <select
        
        defaultValue={selected}
        onChange={(e) => [setSelected(e.target.value) , onGet(e.target.value)]}
        className="cursor-pointer border-0 bg-transparent px-3 py-2 text-sm text-[#051933] outline-none ring-0 focus:border-0 focus:outline-none focus:ring-0"
      >
        {years.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>

    </div>
  );
};


export default LineChartView