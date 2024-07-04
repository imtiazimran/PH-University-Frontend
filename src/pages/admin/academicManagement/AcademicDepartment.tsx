import { Table, TableColumnsType } from "antd";
import { useGetAllDepartmentsQuery } from "../../../redux/features/admin/academicManagement.api";
type dataType = {
  name: string;
  faculty: string;
};
const AcademicDepartment = () => {
  const { data, isLoading, isFetching } = useGetAllDepartmentsQuery(undefined);

  const columns: TableColumnsType<dataType> = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Faculty",
      dataIndex: "academicFaculty",
      render: (academicFaculty) => {
        return academicFaculty.name;
      },
    },
  ];
  const tableData = data?.data?.map((item: { _id: string; name: string; academicFaculty: string; }) => ({
    key: item._id,
    name: item.name,
    academicFaculty: item.academicFaculty,
  }));
  return <Table loading={isLoading || isFetching} columns={columns} dataSource={tableData} />;
};

export default AcademicDepartment;
