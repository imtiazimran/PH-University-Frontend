import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHInput from "../../../components/form/PHInput";
import { toast } from "sonner";
import { useCreateAcademicFacultyMutation } from "../../../redux/features/admin/academicManagement.api";
import { TResponse } from "../../../types";

const CreateAcademicFaculty = () => {
  const [CreateAcademicFaculty] = useCreateAcademicFacultyMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("loading...");
    try {
      const res = await CreateAcademicFaculty(data) as TResponse<undefined>;
      if (res.error) {
        toast.error(res?.error?.data?.message, { id: toastId });
      } else {
        toast.success("Faculty Created", { id: toastId });
      }
    } catch (error) {
      toast.error("Academic Faculty creation failed", { id: toastId });
    }
  };
  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm onSubmit={onSubmit}>
          <PHInput name="name" label="Faculty Name" type="text" />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicFaculty;
