import { useParams } from "react-router-dom";

const StudentDetails = () => {
    const {id} = useParams()
    
    return (
        <div>
             This is from StudentDetails 
        </div>
    );
};

export default StudentDetails;
