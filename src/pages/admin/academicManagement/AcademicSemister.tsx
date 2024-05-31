import { useGetAllSemistersQuery } from "../../../redux/features/academicSemister/academicSemisterApi";

const AcademicSemister = () => {
    const {data} = useGetAllSemistersQuery(undefined)
    console.log(data);
    return (
        <div>
            <h1>this is from academic semister</h1>
        </div>
    );
};

export default AcademicSemister;
