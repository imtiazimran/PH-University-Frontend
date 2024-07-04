import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { TResponse } from "../../../types";
import {
  useCreateAcademicDepartmentMutation,
  useGetAllFacultiesQuery,
} from "../../../redux/features/admin/academicManagement.api";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAcademicDepartmentSchema } from "../../../schemas/academicManagementSchema";

const CreateAcademicDepartment = () => {
  const [createDepartment] = useCreateAcademicDepartmentMutation();
  const { data } = useGetAllFacultiesQuery(undefined);
  const facultyOption = data?.data?.map(
    (item: { _id: string; name: string }) => ({
      label: item.name,
      value: item._id,
    })
  );
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("loading...");
    console.log(data);
    try {
      const res = (await createDepartment(data)) as TResponse<undefined>;
      console.log(res);
      if (res.error) {
        toast.error(res?.error?.data?.message, { id: toastId });
      } else {
        toast.success("Department Created", { id: toastId });
      }
    } catch (error) {
      toast.error("Department creation failed", { id: toastId });
    }
  };
  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm
          onSubmit={onSubmit}
          resolver={zodResolver(createAcademicDepartmentSchema)}
        >
          <PHInput name="name" label="Name" type="text" />
          <PHSelect name="academicFaculty" label="Academic Faculty" options={facultyOption} />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicDepartment;
