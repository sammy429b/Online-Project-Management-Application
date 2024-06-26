import { useForm } from 'react-hook-form';
import Navbar from "./Navbar";
import ApiConfig from '../utils/ApiConfig';
import axios from 'axios';

const Input = ({ label, register, name, errors }) => {
    return (
        <label className="form-control w-full max-w-md">
            <div className="label">
                <span className="label-text text-green-500">{label}</span>
                <span className="label-text-alt"></span>
            </div>
            <input 
                type="date" 
                {...register(name, { required: `${label} is required` })} 
                id={name}
                className="input input-bordered w-full max-w-md" 
            />
            <div className="label">
                {errors[name] && (
                    <span className="label-text-alt text-red-500">{errors[name].message}</span>
                )}
                <span className="label-text-alt"></span>
            </div>
        </label>
    );
};

const Select = ({ label, options, register, name, errors }) => {
    return (
        <label className="form-control w-full max-w-md">
            <div className="label">
                <span className="label-text">{label}</span>
                <span className="label-text-alt"></span>
            </div>
            <select 
                {...register(name, { required: `${label} is required` })} 
                id={name}
                className="select select-bordered"
            >
                {options.map((option, index) => <option key={index} value={option}>{option}</option>)}
            </select>
            <div className="label">
                {errors[name] && (
                    <span className="label-text-alt text-red-500">{errors[name].message}</span>
                )}
                <span className="label-text-alt"></span>
            </div>
        </label>
    );
};

function CreateProject() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async(data) =>{
        console.log(data);
        try {
            const response = await axios.post(ApiConfig.API_CREATE_PROJECT_URL, data);  
            const responseData = await response.data;
            console.log(ApiConfig.API_CREATE_PROJECT_URL)
            console.log(responseData)

        } catch (error) {
            console.log(error)
        }
    } 

    return (
        <>
            <Navbar header={"Create Project"} />
            <div className="w-[90%] h-screen mx-8 px-6 bg-white rounded-lg fixed top-32">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="w-full flex justify-between items-start">
                        <div className="w-full">
                            <label className="form-control w-full" htmlFor="projectTheme">
                                <div className="label">
                                    <span className="label-text"></span>
                                    <span className="label-text-alt"></span>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Enter Project Theme"
                                    {...register('projectTheme', { required: 'Project Theme is required' })}
                                    id="projectTheme"
                                    className="input pb-8 h-20 input-bordered w-full max-w-3xl"
                                />
                                <div className="label">
                                    {errors.projectTheme && (
                                        <span className="label-text-alt text-red-500">{errors.projectTheme.message}</span>
                                    )}
                                    <span className="label-text-alt"></span>
                                </div>
                            </label>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-40 bg-[#044E92] text-base py-2 px-4 rounded-3xl text-white m-4 border-none"
                            >
                                Save project
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <div className="flex justify-start gap-x-6">
                            <Select label={"Reason"} options={["Business", "Dealership", "Transport"]} register={register} name="reason" errors={errors} />
                            <Select label={"Type"} options={["Internal", "External", "Vendor"]} register={register} name="type" errors={errors} />
                            <Select label={"Division"} options={["Compressor", "Filters", "Pumps", "Glass", "Water Heater"]} register={register} name="division" errors={errors} />
                        </div>
                        <div className="flex justify-start gap-x-6">
                            <Select label={"Category"} options={["Quality A", "Quality B", "Quality C", "Quality D"]} register={register} name="category" errors={errors} />
                            <Select label={"Priority"} options={["Low", "Medium", "High"]} register={register} name="priority" errors={errors} />
                            <Select label={"Department"} options={["Strategy", "Finance", "Quality", "Maintenance", "Stores"]} register={register} name="department" errors={errors} />
                        </div>
                        <div className="flex justify-start gap-x-6">
                            <Input label={"Start Date as per Project Plan"} register={register} name="startDate" errors={errors} />
                            <Input label={"End Date as per Project Plan"} register={register} name="endDate" errors={errors} />
                            <Select label={"Location"} options={["Pune", "Delhi", "Mumbai"]} register={register} name="location" errors={errors} />
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default CreateProject;
