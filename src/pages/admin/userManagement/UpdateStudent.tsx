/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { Button, Col, Divider, Form, Input, Row, Spin } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import {
  bloodGroupOption,
  genderOption,
} from "../../../components/constants/global";
import PHDatePicker from "../../../components/form/PHDatePicker";
import {
  useGetAllDepartmentsQuery,
  useGetAllSemestersQuery,
} from "../../../redux/features/admin/academicManagement.api";
import {
  useGetSingleStudentQuery,
  useUpdateStudentMutation,
} from "../../../redux/features/admin/userManagement.api";
import { useParams } from "react-router-dom";
import moment from "moment";
const UpdateStudent = () => {
  const { id } = useParams();
  const [updateStudent] = useUpdateStudentMutation();

  const { data: student, isLoading: studentLoading } =
    useGetSingleStudentQuery(id);

  const { data: semester, isLoading } = useGetAllSemestersQuery(undefined);

  const { data: departments, isLoading: departmentLoading } =
    useGetAllDepartmentsQuery(undefined);

  const semesterOptions = semester?.data?.map((item) => ({
    value: item._id,
    label: `${item.name} (${item.year})`,
  }));

  const departmentOptions = departments?.data?.map(
    (item: { _id: string; name: string }) => ({
      value: item._id,
      label: item.name,
    })
  );

  const getChangedValues = (originalData: any, newData: FieldValues) => {
    const changedValues: FieldValues = {};
    for (const key in newData) {
      if (newData[key] !== originalData[key]) {
        changedValues[key] = newData[key];
      }
    }
    return changedValues;
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const changedData = getChangedValues(student?.data, data);
    const formattedData = { student: changedData };

    const res = await updateStudent({ id, data: formattedData });
    console.log( res, formattedData);
  };

  if (isLoading || studentLoading) {
    return (
      <Spin
        tip="Loading..."
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
        size="large"
      />
    );
  }

  return (
    <div>
      <Row>
        <Col span={24}>
          <PHForm
            onSubmit={onSubmit}
            defaultValues={{
              ...student?.data,
              dateOfBirth: moment(student?.data?.dateOfBirth),
              admissionSemester: student?.data?.admissionSemester?._id,
              academicDepartment: student?.data?.academicDepartment?._id,
            }}
          >
            <Divider>Personal Info</Divider>
            <Row gutter={8}>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <Controller
                  name="profileImg"
                  render={({ field: { onChange, value, ...field } }) => (
                    <Form.Item label="Picture">
                      <Input
                        type="file"
                        value={value?.fileName}
                        {...field}
                        onChange={(e) => onChange(e?.target?.files?.[0])}
                      />
                    </Form.Item>
                  )}
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput name="name.firstName" label="First Name" type="text" />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput
                  name="name.middleName"
                  label="Middle Name"
                  type="text"
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput name="name.lastName" label="Last Name" type="text" />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHSelect name="gender" label="Gender" options={genderOption} />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHDatePicker name="dateOfBirth" label="Date Of Birth" />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHSelect
                  name="bloodGroup"
                  label="Blood Group"
                  options={bloodGroupOption}
                />
              </Col>
            </Row>

            <Divider>Contact Info</Divider>
            <Row gutter={8}>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput name="email" label="email" type="email" />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput name="contactNo" label="Contact No" type="text" />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput
                  name="emergencyContactNo"
                  label="Emergency ContactNo"
                  type="text"
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput
                  name="presentAddress"
                  label="Present Address"
                  type="text"
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput
                  name="permanentAddress"
                  label="Permanent Address"
                  type="text"
                />
              </Col>
            </Row>

            <Divider>Guardian Info </Divider>
            <Row gutter={8}>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput
                  name="guardian.fatherName"
                  label="Father Name"
                  type="text"
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput
                  name="guardian.fatherOccupation"
                  label="Father Occupation"
                  type="text"
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput
                  name="guardian.fatherContactNo"
                  label="Father Contact No"
                  type="text"
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput
                  name="guardian.motherName"
                  label="Mother Name"
                  type="text"
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput
                  name="guardian.motherOccupation"
                  label="Mother Occupation "
                  type="text"
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput
                  name="guardian.motherContactNo"
                  label="Mother Contact No "
                  type="text"
                />
              </Col>
            </Row>

            <Divider>Local Guardian Info</Divider>
            <Row gutter={8}>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput
                  name="localGuardian.name"
                  label="Local Guardian Name"
                  type="text"
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput
                  name="localGuardian.occupation"
                  label="Local Guardian occupation"
                  type="text"
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput
                  name="localGuardian.contactNo"
                  label="Local Guardian Contact No"
                  type="text"
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput
                  name="localGuardian.address"
                  label="Local Guardian address"
                  type="text"
                />
              </Col>
            </Row>

            <Divider>Academic Info</Divider>
            <Row gutter={8}>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHSelect
                  name="admissionSemester"
                  label="Academic Semester"
                  options={semesterOptions}
                  disabled={isLoading}
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHSelect
                  name="academicDepartment"
                  label=" academicDepartment"
                  options={departmentOptions}
                  disabled={departmentLoading}
                />
              </Col>
            </Row>

            <Button htmlType="submit">Submit</Button>
          </PHForm>
        </Col>
      </Row>
    </div>
  );
};

export default UpdateStudent;
