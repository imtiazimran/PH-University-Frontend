/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";

import { toast } from "sonner";

import PHInput from "../../../components/form/PHInput";
import {
  useAddCourseMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/admin/courseManagement.api";
import Loading from "../../../utils/Loading";
import { TResponse } from "../../../types";

const CreateCourse = () => {
  const [createCourse] = useAddCourseMutation();
  const { data: courses, isLoading } = useGetAllCoursesQuery(undefined);

  const courseOptions = courses?.data?.map((item) => ({
    value: item._id,
    label: item.title,
  }));
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("creating course...");

    const courseData = {
      ...data,
      isDeleted: false,
      code: Number(data.code),
      credits: Number(data.credits),
      preRequisiteCourses: data.preRequisiteCourses? data.preRequisiteCourses.map((item: string) => ({
        course: item,
        isDeleted: false,
      })) : [],
    };
    

    try {
      const res = (await createCourse(courseData)) as TResponse<any>;
      if (res.error) {
        toast.error(res?.error?.data?.message, { id: toastId });
      } else {
        toast.success("Course Created", { id: toastId });
      }

    } catch (error) {
      toast.error("Course Creation Failed", { id: toastId });
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Flex justify="center" align="center">
      <Col span={24} md={{ span: 8 }}>
      <PHForm onSubmit={onSubmit}>
          <PHInput type="text" name="title" label="Title" />
          <PHInput type="text" name="prefix" label="Prefix" />
          <PHInput type="text" name="code" label="Code" />
          <PHInput type="text" name="credits" label="Credits" />
          <PHSelect
            mode="multiple"
            label="Pre Requisite Courses"
            name="preRequisiteCourses"
            options={courseOptions}
          />

          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateCourse;
