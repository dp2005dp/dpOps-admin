import Axios from "./config/axios";
import type { assignProjectInterFace } from "../mockdata/mockdata";


export const Projects = {
    createProject : (data:FormData) => Axios.post('/addProject' , data),
    getAllProjects : () => Axios.get('/getAllProjects'),
    getProject : (projectId:number) => Axios.get(`/getById/${projectId}`),
    UpdateStatus : (projectId : number , status : string) => Axios.put(`/updateStatus/${projectId}` ,{ status})
}


export const addEmployee = {
      add  : (data : FormData) => Axios.post('/addEmployee' , data) ,

      getAllEmployess : () => Axios.get('/getAllEmployess'),

      getEmployeeById  : (employeeId : number) => Axios.get(`/getById/${employeeId}`) 
}

export const assignProject  = {
      assign : (data:assignProjectInterFace) => Axios.post('/assignProject' , data),

      getEmployess : (projectId : number) => Axios.get(`/getAssignEmployessWithProjectId/${projectId}`),

      getAllEmployess : () => Axios.get(`/getAssignEmployess`) ,

      getEmployeeProjects : (id:number) => Axios.get(`/adminGetEmployeeProjects/${id}`),
      
      getProjectProgress : () => Axios.get('/getProjectProgress')
}

export const login = (username : string , password : string) => Axios.post('/login' , {username , password})