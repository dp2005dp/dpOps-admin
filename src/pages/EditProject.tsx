import DropDown from "../components/DropDown";
import Input from "../components/Input";

import React, { useState, useEffect } from "react";

import { FaFilePdf } from "react-icons/fa6";
import { TbXboxXFilled } from "react-icons/tb";
import { LuMoveLeft } from "react-icons/lu";

import { useNavigate, useParams } from "react-router-dom";

import type { ProjectForm } from "../mockdata/mockdata";

import { Projects } from "../services/AdminAccess";

import toast from "react-hot-toast";


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


const IntialFormData: ProjectForm = {
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
    budget: 0,
    projectStatus: "Not Started",
    file: null,
    roles: []
};


const EditProject = () => {

    const navigate = useNavigate();

    const { id } = useParams();


    // Form state
    const [formData, setFormData] = useState<ProjectForm>(IntialFormData);


    // Existing backend file name
    const [existingFile, setExistingFile] = useState("");


    // Loading state
    const [loading, setLoading] = useState(false);


    // Selected new file
    const projectFile = formData.file instanceof File
        ? formData.file
        : null;



    // ==================================
    // FETCH PROJECT DETAILS
    // ==================================

    const fetchProject = async () => {

        try {

            setLoading(true);

            const response = await Projects.getProject(Number(id));


            if (response.status === 200) {

                const project = response.data.data;


                // Support roles as either array or comma-separated string
                const projectRoles = Array.isArray(project.roles)
                    ? project.roles
                    : project.roles
                        ? project.roles.split(",").map((role: string) => role.trim())
                        : [];


                setFormData({

                    clientName: project.clientName || "",

                    companyName: project.ClientCompany || "",

                    email: project.ClientEmail || "",

                    phone: project.clientPhone || "",

                    projectName: project.projectName || "",

                    projectDescription: project.projectDescription || "",

                    projectType: project.projectType || "",

                    priority: project.priority || "",

                    startDate: project.startDate?.split("T")[0] || "",

                    deadline: project.deadline?.split("T")[0] || "",

                    budget: Number(project.budget) || 0,

                    projectStatus: project.projectStatus || "Not Started",

                    file: null,

                    roles: projectRoles

                });


                // Existing file name
                setExistingFile(project.projectFile || "");

            }

        } catch (error) {

            console.log("Fetch Project Failed:", error);

            toast.error("Failed to fetch project details");

        } finally {

            setLoading(false);

        }

    };



    // Fetch automatically when page opens
    useEffect(() => {

        if (id) {
            fetchProject();
        }

    }, [id]);




    // ==================================
    // INPUT CHANGE
    // ==================================

    const onGetData = (name: string, value: string) => {

        setFormData((prev) => ({

            ...prev,

            [name]: name === "budget" ? Number(value) : value

        }));

    };




    // ==================================
    // PROJECT DESCRIPTION
    // ==================================

    const projectDescripition = (value: string) => {

        setFormData((prev) => ({

            ...prev,

            projectDescription: value

        }));

    };




    // ==================================
    // FILE UPLOAD
    // ==================================

    const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {

        const selectedFile = e.target.files?.[0] || null;

        setFormData((prev) => ({

            ...prev,

            file: selectedFile

        }));

    };




    // ==================================
    // REMOVE SELECTED NEW FILE
    // ==================================

    const removeSelectedFile = () => {

        setFormData((prev) => ({

            ...prev,

            file: null

        }));

    };




    // ==================================
    // SELECT PROJECT ROLES
    // ==================================

    const SelectedRoles = (role: string) => {

        setFormData((prev) => ({

            ...prev,

            roles: prev.roles.includes(role)

                ? prev.roles.filter((eachRole) => eachRole !== role)

                : [...prev.roles, role]

        }));

    };




    // ==================================
    // VALIDATION
    // ==================================

    const Validiation = () => {

        if (!formData.clientName.trim()) {
            return "Please enter client name";
        }


        if (!formData.companyName.trim()) {
            return "Please enter company name";
        }


        if (!formData.email.trim()) {
            return "Please enter email";
        }


        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            return "Enter a valid email address";
        }


        if (!formData.phone.trim()) {
            return "Please enter phone number";
        }


        if (!formData.projectName.trim()) {
            return "Please enter project name";
        }


        if (!formData.projectDescription.trim()) {
            return "Please enter project description";
        }


        if (!formData.projectType.trim()) {
            return "Please select project type";
        }


        if (!formData.priority.trim()) {
            return "Please select priority";
        }


        if (!formData.startDate) {
            return "Please select start date";
        }


        if (!formData.deadline) {
            return "Please select deadline";
        }


        if (!formData.budget) {
            return "Please enter budget";
        }


        if (!formData.roles.length) {
            return "Please select at least one role";
        }


        return null;

    };




    // ==================================
    // SUBMIT UPDATED PROJECT
    // ==================================

    const onSubmitData = async (e: React.FormEvent) => {

        e.preventDefault();


        const error = Validiation();
    

        if (error) {

            toast.error(error);

            return;

        }


        try {

            const data = new FormData();


            Object.entries(formData).forEach(([key, value]) => {

                if (key === "roles") {

                    data.append("roles", (value as string[]).join(","));

                }

                else if (key === "file") {

                    // Append only newly selected file
                    if (value instanceof File) {

                        data.append("file", value);

                    }

                }

                else if (value !== null && value !== undefined) {

                    data.append(key, String(value));

                }

            });


            // Project ID
            data.append("projectId", String(id));
            
            toast.error('Server Down Try Again Later...')

            // UPDATE PROJECT
            // const response = await Projects.UpdateProject(data);


            // if (response.status === 200) {

            //     toast.success(response.data.message);

            //     navigate("/projects");

            // }

        } catch (error) {


            toast.error("Failed to update project");

        }

    };




    // ==================================
    // CLEAR FORM
    // ==================================

    const clearForm = () => {

        setFormData(IntialFormData);

    };




    // ==================================
    // RETURN UI
    // ==================================

    return (

        <div className="h-[calc(100dvh-80px)] w-full overflow-y-auto hide-scrollbar scrollbar-smooth p-3 bg-[#F6F8FD]">

            <form onSubmit={onSubmitData}>


                {/* HEADER */}

                <div className="md:flex sticky top-0 left-0 right-0 z-50 items-center justify-between p-3 bg-[#F6F8FD]">

                    <button
                        type="button"
                        className="h-[40px] p-3 mt-5 mb-5 flex items-center gap-3 w-[100px] transition duration-300 ease-in-out bg-white rounded-[10px] cursor-pointer hover:scale-95 border border-[#7A4CF5] text-[#7A4CF5] font-dm-medium shadow-xl"
                        onClick={() => navigate("/projects")}
                    >

                        <LuMoveLeft className="h-[20px] w-[20px]" />

                        <p>Back</p>

                    </button>



                    <div className="flex justify-between md:justify-end mt-3 mb-5 gap-3">


                        <button
                            onClick={clearForm}
                            type="button"
                            className="h-[40px] w-[100px] transition duration-300 ease-in-out bg-white rounded-[10px] cursor-pointer font-dm-medium hover:scale-95 text-black shadow-xl"
                        >

                            Clear All

                        </button>



                        <button
                            type="submit"
                            disabled={loading}
                            className="h-[40px] w-[120px] transition duration-300 ease-in-out bg-gradient-to-br from-[#7a4cf5] to-[#4f7cff] font-dm-medium rounded-[10px] cursor-pointer hover:scale-95 text-white shadow-xl disabled:opacity-50"
                        >

                            Update Project

                        </button>


                    </div>

                </div>




                <h1 className="md:text-[30px] text-[clamp(20px,5vw,25px)] font-dm-bold text-[#112F62]">

                    Edit Project

                </h1>


                <p className="md:text-[20px] text-[clamp(15px,5vw,18px)] md:tracking-[0px] tracking-[-0.5px] text-gray-600">

                    Update client, project and assignment details

                </p>




                {/* CLIENT DETAILS */}


                <div className="bg-white rounded-[8px] p-5 mt-5 shadow-[0_4px_20px_rgba(5,25,51,0.08)]">

                    <h1 className="text-black text-[18px] font-dm-bold">

                        1 · Client Details

                    </h1>



                    <div className="mt-3">


                        <div className="grid grid-cols-1 md:grid-cols-2 mt-3 gap-5">


                            <div>

                                <Input
                                    name="clientName"
                                    value={formData.clientName}
                                    onGetData={onGetData}
                                    type="text"
                                />

                            </div>



                            <div>

                                <Input
                                    name="companyName"
                                    value={formData.companyName}
                                    onGetData={onGetData}
                                    type="text"
                                />

                            </div>


                        </div>



                        <div className="grid grid-cols-1 md:grid-cols-2 mt-3 gap-5">


                            <div>

                                <Input
                                    name="email"
                                    value={formData.email}
                                    onGetData={onGetData}
                                    type="text"
                                />

                            </div>



                            <div>

                                <Input
                                    name="phone"
                                    value={formData.phone}
                                    onGetData={onGetData}
                                    type="tel"
                                />

                            </div>


                        </div>


                    </div>

                </div>




                {/* PROJECT DETAILS */}


                <div className="shadow-[0_4px_20px_rgba(5,25,51,0.08)] bg-white rounded-[8px] p-5 mt-5">


                    <h1 className="text-black text-[18px] font-dm-bold">

                        2 · Project Details

                    </h1>



                    <div className="mt-3">


                        <Input
                            name="projectName"
                            value={formData.projectName}
                            onGetData={onGetData}
                            type="text"
                        />



                        {/* DESCRIPTION */}


                        <div className="mt-3">


                            <label className="mb-2 font-dm-regular block text-sm text-[#555C6D]">

                                Project Description

                            </label>



                            <textarea
                                rows={5}
                                value={formData.projectDescription}
                                className="h-[100px] w-full focus:border-[#7A4CF5] focus:ring-2 focus:ring-[#7A4CF5]/20 border border-gray-200 rounded-[10px] p-[15px] text-black text-[15px] outline-none transition"
                                onChange={(e) => projectDescripition(e.target.value)}
                            />

                        </div>




                        {/* PROJECT TYPE AND PRIORITY */}


                        <div className="grid grid-cols-2 mt-3 gap-5">


                            <div>

                                <DropDown
                                    name="projectType"
                                    value={formData.projectType}
                                    dropdownData={projectTypes}
                                    onGetData={onGetData}
                                />

                            </div>



                            <div>

                                <DropDown
                                    name="priority"
                                    value={formData.priority}
                                    dropdownData={priorities}
                                    onGetData={onGetData}
                                />

                            </div>


                        </div>




                        {/* DATES */}


                        <div className="grid grid-cols-2 mt-3 gap-5">


                            <div>

                                <Input
                                    name="startDate"
                                    value={formData.startDate}
                                    onGetData={onGetData}
                                    type="date"
                                />

                            </div>



                            <div>

                                <Input
                                    name="deadline"
                                    value={formData.deadline}
                                    onGetData={onGetData}
                                    type="date"
                                />

                            </div>


                        </div>




                        {/* BUDGET AND STATUS */}


                        <div className="grid grid-cols-2 mt-3 gap-5">


                            <div>

                                <Input
                                    name="budget"
                                    value={String(formData.budget)}
                                    onGetData={onGetData}
                                    type="number"
                                />

                            </div>



                            <div>

                                <DropDown
                                    name="projectStatus"
                                    value={formData.projectStatus}
                                    dropdownData={projectStatuses}
                                    onGetData={onGetData}
                                />

                            </div>


                        </div>




                        {/* PROJECT FILE */}


                        <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-2 mt-3 gap-5">


                            <div className="mt-3">


                                <label className="mb-2 font-dm-regular block text-sm text-[#555C6D]">

                                    Project Documents / Files

                                </label>



                                <div className="min-h-[45px] p-3 w-full border border-gray-200 rounded-[10px] text-black text-[15px] flex flex-wrap items-center gap-5">


                                    {!projectFile && (

                                        <input
                                            type="file"
                                            onChange={onFile}
                                            className="bg-[#f5f6fc] pt-1 pl-3 border cursor-pointer border-gray-200 rounded-[8px] h-[35px] w-[120px] flex items-center"
                                            accept=".pdf,application/pdf"
                                        />

                                    )}



                                    <div className="flex items-center gap-3">


                                        {(projectFile || existingFile) && (

                                            <FaFilePdf className="h-[20px] w-[20px] text-red-500" />

                                        )}



                                        <p className="text-black text-[15px] font-dm-regular">

                                            {projectFile?.name || existingFile || "No files chosen"}

                                        </p>



                                        {projectFile && (

                                            <button
                                                type="button"
                                                className="cursor-pointer"
                                                onClick={removeSelectedFile}
                                            >

                                                <TbXboxXFilled className="h-[20px] w-[20px] text-red-500" />

                                            </button>

                                        )}


                                    </div>


                                </div>


                            </div>



                        </div>




                        {/* PROJECT ROLES */}


                        <div className="mt-5">


                            <label className="mb-2 block font-dm-medium text-md text-[#555C6D]">

                                Select Project Roles

                            </label>



                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">


                                {ProjectRoles.map((eachRole) => (

                                    <div
                                        className="flex items-center gap-2 cursor-pointer"
                                        key={eachRole}
                                    >


                                        <input
                                            type="checkbox"
                                            checked={formData.roles.includes(eachRole)}
                                            id={eachRole}
                                            onChange={() => SelectedRoles(eachRole)}
                                            className="h-[15px] w-[15px] text-green-600"
                                        />



                                        <label
                                            htmlFor={eachRole}
                                            className="text-[15px] text-gray-500 font-dm-regular"
                                        >

                                            {eachRole}

                                        </label>


                                    </div>

                                ))}


                            </div>


                        </div>



                    </div>


                </div>



            </form>


        </div>

    );

};


export default EditProject;