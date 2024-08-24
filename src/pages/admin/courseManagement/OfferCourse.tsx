import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { useGetAllFacultiesQuery } from "../../../redux/features/admin/academicManagement.api";
import SelectWithWatch from "../../../components/form/SelectWithWatch";
import { useState } from "react";

const OfferCourse = () => {
const [facultyId, setFacultyId] = useState<string>("")
  const {data:academicFacultyData} = useGetAllFacultiesQuery(undefined)
 
  const facultyOptions = academicFacultyData?.data?.map((item: { _id: string; name: string; }) =>({
    value: item._id,
    label: item.name
  }))
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
  }

  console.log("inside parent", facultyId);
    return (
      <Flex justify="center" align="center">
      <Col span={24} md={{ span: 8 }}>
        <PHForm
          onSubmit={onSubmit}
        >
          <SelectWithWatch
          onValueChange={setFacultyId}
          name="academicFaculty" label="Academic Faculty" options={facultyOptions}/>
        <PHInput disabled={!facultyId} type="text" name="code" label="Code" />
         <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
    );
};

export default OfferCourse;
