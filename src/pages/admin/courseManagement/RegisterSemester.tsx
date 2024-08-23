/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import {  useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";

import PHInput from "../../../components/form/PHInput";
import PHDatePicker from "../../../components/form/PHDatePicker";
import { useCreateSemesterRegisterMutation } from "../../../redux/features/admin/courseManagement.api";
import { TResponse } from "../../../types";
import Loading from "../../../utils/Loading";

const RegisterSemester = () => {
  const [registerSemester] = useCreateSemesterRegisterMutation()
  const {data: semesters, isLoading} = useGetAllSemestersQuery([{name: 'sort', value: 'year'}])

  const semesterOptions = semesters?.data?.map(item =>({
    value: item._id,
    label: `${item.name} ${item.year}`
  }))
 

  const statusOptions = [
    {
      value: "UPCOMING",
      label: "UPCOMING",
    },
    {
      value: "ONGOING",
      label: "ONGOING",
    },
    {
      value: "ENDED",
      label: "ENDED",
    },
  ]
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("creating semester");

    const academicSemester = {
      ...data,
      minCredit: Number(data.minCredit),
      maxCredit: Number(data.maxCredit)
    };

    try {
      const res = (await registerSemester(academicSemester)) as TResponse<any>;
      if (res.error) {
        toast.error(res?.error?.data?.message, { id: toastId });
      } else {
        toast.success("Semester Created", { id: toastId });
      }

      console.log(res);
    } catch (error) {
      toast.error("Semester Creation Failed", { id: toastId });
    }
  };


  if(isLoading){
    return <Loading/>
  }

  return (
    <Flex justify="center" align="center">
      <Col span={24} md={{ span: 8 }}>
        <PHForm
          onSubmit={onSubmit}
        >
          <PHSelect name="academicSemester" label="Name" options={semesterOptions} />
         
          <PHSelect name="status" label="Status" options={statusOptions} />
          <PHDatePicker name="startDate" label="Start Date"/>
          <PHDatePicker name="endDate" label="End Date"/>
          <PHInput type="text" name="minCredit" label="Min Credit"/>
          <PHInput type="text" name="maxCredit" label="Max Credit"/>
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default RegisterSemester;
