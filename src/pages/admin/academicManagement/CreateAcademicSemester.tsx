/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { zodResolver } from "@hookform/resolvers/zod";
import { createSemesterSchema } from "../../../schemas/academicManagementSchema";
import { useCreateSemesterMutation } from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../../types/global.types";
import {
  monthOptions,
  nameOptions,
  yearOptions,
} from "../../../components/constants/semesterOptions";

const CreateAcademicSemester = () => {
  const [createSemester] = useCreateSemesterMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("creating semester");

    const name = nameOptions[Number(data?.name) - 1]?.label;
    const academicSemester = {
      ...data,
      name,
      code: data.name,
      year: data.year.toString(),
    };

    try {
      const res = (await createSemester(academicSemester)) as TResponse<any>;
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

  return (
    <Flex justify="center" align="center">
      <Col span={24} md={{ span: 8 }}>
        <PHForm
          onSubmit={onSubmit}
          resolver={zodResolver(createSemesterSchema)}
        >
          <PHSelect name="name" label="Name" options={nameOptions} />
          <PHSelect name="year" label="Year" options={yearOptions} />
          <PHSelect
            name="startMonth"
            label="Start Month"
            options={monthOptions}
          />
          <PHSelect name="endMonth" label="End Month" options={monthOptions} />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
