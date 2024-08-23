import { Link, useParams } from "react-router-dom";
import { useGetSingleStudentQuery } from "../../../redux/features/admin/userManagement.api";
import { Card, Row, Col, Descriptions, Divider, Button } from 'antd';
import styled from 'styled-components';
import Loading from "../../../utils/Loading";


const labelStyle = { width: '50%' };
const contentStyle = { width: '50%' };

const StudentDetails = () => {
    const { id } = useParams();
    const { data, isLoading } = useGetSingleStudentQuery(id);

    if (isLoading) {
        return <Loading/>
    }

    if (!data?.data) {
        return <p>No student data found.</p>;
    }

    const student = data.data;

    

    
const ResponsiveCard = styled(Card)`
margin: 20px;

@media (max-width: 576px) {
  margin: 0px;
}
`;

    return (
        <ResponsiveCard>
            <Row justify="space-between" align="middle">
                <Col>
                    <h2>Student Details</h2>
                </Col>
                <Col>
                <Link to={`/admin/student-update/${id}`}>
                    <Button type="primary">
                        Update
                    </Button>
                </Link>
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col  span={24}>
                    <Divider>Personal Information</Divider>
                    <Descriptions bordered column={1} size="small">
                        <Descriptions.Item label="ID" labelStyle={labelStyle} contentStyle={contentStyle}>{student.id}</Descriptions.Item>
                        <Descriptions.Item label="Name" labelStyle={labelStyle} contentStyle={contentStyle}>{student.fullName}</Descriptions.Item>
                        <Descriptions.Item label="Gender" labelStyle={labelStyle} contentStyle={contentStyle}>{student.gender}</Descriptions.Item>
                        <Descriptions.Item label="Date of Birth" labelStyle={labelStyle} contentStyle={contentStyle}>{new Date(student.dateOfBirth).toLocaleDateString()}</Descriptions.Item>
                        <Descriptions.Item label="Blood Group" labelStyle={labelStyle} contentStyle={contentStyle}>{student.bloodGroup}</Descriptions.Item>
                    </Descriptions>
                    <Divider>Contact Information</Divider>
                    <Descriptions bordered column={1} size="small">
                        <Descriptions.Item label="Email" labelStyle={labelStyle} contentStyle={contentStyle}>{student.email}</Descriptions.Item>
                        <Descriptions.Item label="Contact No" labelStyle={labelStyle} contentStyle={contentStyle}>{student.contactNo}</Descriptions.Item>
                        <Descriptions.Item label="Emergency Contact No" labelStyle={labelStyle} contentStyle={contentStyle}>{student.emergencyContactNo}</Descriptions.Item>
                        <Descriptions.Item label="Present Address" labelStyle={labelStyle} contentStyle={contentStyle}>{student.presentAddress}</Descriptions.Item>
                        <Descriptions.Item label="Permanent Address" labelStyle={labelStyle} contentStyle={contentStyle}>{student.permanentAddress}</Descriptions.Item>
                    </Descriptions>
                    <Divider>Guardian Information</Divider>
                    <Descriptions bordered column={1} size="small">
                        <Descriptions.Item label="Father's Name" labelStyle={labelStyle} contentStyle={contentStyle}>{student.guardian.fatherName}</Descriptions.Item>
                        <Descriptions.Item label="Father's Occupation" labelStyle={labelStyle} contentStyle={contentStyle}>{student.guardian.fatherOccupation}</Descriptions.Item>
                        <Descriptions.Item label="Father's Contact No" labelStyle={labelStyle} contentStyle={contentStyle}>{student.guardian.fatherContactNo}</Descriptions.Item>
                        <Descriptions.Item label="Mother's Name" labelStyle={labelStyle} contentStyle={contentStyle}>{student.guardian.motherName}</Descriptions.Item>
                        <Descriptions.Item label="Mother's Occupation" labelStyle={labelStyle} contentStyle={contentStyle}>{student.guardian.motherOccupation}</Descriptions.Item>
                        <Descriptions.Item label="Mother's Contact No" labelStyle={labelStyle} contentStyle={contentStyle}>{student.guardian.motherContactNo}</Descriptions.Item>
                    </Descriptions>
                    <Divider>Local Guardian Information</Divider>
                    <Descriptions bordered column={1} size="small">
                        <Descriptions.Item label="Name" labelStyle={labelStyle} contentStyle={contentStyle}>{student.localGuardian.name}</Descriptions.Item>
                        <Descriptions.Item label="Occupation" labelStyle={labelStyle} contentStyle={contentStyle}>{student.localGuardian.occupation}</Descriptions.Item>
                        <Descriptions.Item label="Contact No" labelStyle={labelStyle} contentStyle={contentStyle}>{student.localGuardian.contactNo}</Descriptions.Item>
                        <Descriptions.Item label="Address" labelStyle={labelStyle} contentStyle={contentStyle}>{student.localGuardian.address}</Descriptions.Item>
                    </Descriptions>
                    <Divider>Academic Information</Divider>
                    <Descriptions bordered column={1} size="small">
                        <Descriptions.Item label="Admission Semester" labelStyle={labelStyle} contentStyle={contentStyle}>{`${student.admissionSemester.name} ${student.admissionSemester.year}`}</Descriptions.Item>
                        <Descriptions.Item label="Academic Department" labelStyle={labelStyle} contentStyle={contentStyle}>{student.academicDepartment.name}</Descriptions.Item>
                        <Descriptions.Item label="Academic Faculty" labelStyle={labelStyle} contentStyle={contentStyle}>{student.academicFaculty.name}</Descriptions.Item>
                    </Descriptions>
                </Col>
            </Row>
        </ResponsiveCard>
    );
};

export default StudentDetails;
