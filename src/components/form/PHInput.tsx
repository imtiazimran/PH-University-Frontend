import { useFormContext } from "react-hook-form";

const PHInput = () => {
    const {register} = useFormContext()
    
    return <input type="text" {...register("id")} id="id" />
};

export default PHInput;
