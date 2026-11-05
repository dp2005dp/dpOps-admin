export interface ProjectForm {
  clientName: string;
  companyName: string;
  email: string;
  phone: string;
  projectName: string;
  projectDescription: string;
  projectType: string;
  priority: string;
  startDate: string;
  deadline: string;
  budget: string | number;
  projectStatus: string;
  file: File | null;
  roles : string[]
}

export interface ProjectInterface {
  projectId : number;
  clientName : string
  ClientCompany: string;
  ClientEmail: string;
  clientPhone: string;
  projectName: string;
  projectDescription: string;
  projectType: string;
  priority: string;
  startDate: string;
  deadline: string;
  budget: number;
  projectStatus: string;
  progress : number;
  projectFile : File | undefined;
  roles : string
  createdAt : string
}

export interface EditProjectInterface {
  projectId : number;
  clientName : string
  ClientCompany: string;
  ClientEmail: string;
  clientPhone: string;
  projectName: string;
  projectDescription: string;
  projectType: string;
  priority: string;
  startDate: string;
  deadline: string;
  budget: number;
  projectStatus: string;
  progress : number;
  projectFile : File | null;
  roles : string
  createdAt : string
}

export interface EmployeeFormData {
  username : number | string;
  password : string | number;
  fullName: string;
  email: string;
  phone: string | number;
  role: string;
  department: string;
  profilePhoto: File | null;
  joinDate: string;
  experienceYears: number;
  employmentType: string;
  streetAddress: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  aboutEmployee: string;
}

export interface EmployeeInterface{
  employeeId : number;
  username : number | string;
  password : string | number;
  fullName: string;
  email: string;
  phone: string | number;
  role: string;
  department: string;
  profilePhoto: string | null;
  joinDate: string;
  experienceYears: number;
  employmentType: string;
  streetAddress: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  aboutEmployee: string;
}

export interface  assignProjectInterFace {
    employeeId : string;
    projectId : number;
    assignedRole : string 
    username : number | undefined
}

export interface assignProjectmembers {
assignedRole : string;
fullName : string; 
profilePhoto : string;
projectId : number;
role : string;
progress : number;
roleName : string;
roleStatus : string;
}

export interface EmployeeProjectsInterface {
  assignedRole : string;
  deadline : string;
  projectName : string;
  roleStatus : string;
  startDate : string;
  projectType : string
}

export interface DataProps {
    projectData : ProjectInterface[]
    assignProjectMembers : assignProjectmembers[]
    employeeData : EmployeeInterface[]
    status : string
    projectProgress : ProjectProgress[]
}

export interface ProjectProgress{
projectId : number
roleName : string
roleStatus : string
progress  : number

}