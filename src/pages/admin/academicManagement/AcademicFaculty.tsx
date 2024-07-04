
import { Key } from "react";
import { useGetAllFacultiesQuery } from "../../../redux/features/admin/academicManagement.api";

const AcademicFaculty = () => {
    const {data} = useGetAllFacultiesQuery(undefined);
    return (
        <div style={{width: "90%", margin: "auto" , textAlign: "center" }}>
         {
             data?.data?.map((item: { _id: Key | string; name: string}) => (
                 <li style={{fontWeight: "bold", fontSize: "20px"}} key={item._id}>
                     {item.name}
                 </li>
             ))
         }
        </div>
    );
};

export default AcademicFaculty;
