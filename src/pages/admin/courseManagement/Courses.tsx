/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Modal,
  Table,
  TableColumnsType,
  TableProps,
} from "antd";
import { TQueryParams } from "../../../types";
import {
  useAssignFacultiesMutation,
  useGetAllCoursesQuery
} from "../../../redux/features/admin/courseManagement.api";
import { useState } from "react";
import { toast } from "sonner";
import { useGetAllUserFacultiesQuery } from "../../../redux/features/admin/userManagement.api";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";
import Loading from "../../../utils/Loading";

// type DataType = Pick<TSemester, "title" | "code" | "key">;


const Courses = () => {

  const {
    data: semesterData,
    isLoading,
    isFetching,
  } = useGetAllCoursesQuery(undefined);

  const tableData = semesterData?.data?.map(({ _id, title, code, prefix }) => ({
    key: _id,
    title,
    code: `${prefix} ${code}`,
  }));



  const columns: TableColumnsType<any> = [
    {
      title: "Title",
      key: "title",
      dataIndex: "title",
      defaultSortOrder: "descend",
    },
    {
      title: "Code",
      key: "code",
      dataIndex: "code",
      defaultSortOrder: "descend",
    },
    {
      title: "Action",
      key: "x",
      render: (item) => {
        return <AddFacultyModal data={item} />;
      },
    },
  ];

  const onChange: TableProps<any>["onChange"] = (
    pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParams[] = [];
      filters.name?.forEach((item) =>
        queryParams.push({ name: "name", value: item })
      );
      filters.year?.forEach((item) =>
        queryParams.push({ name: "year", value: item })
      );
      filters.startMonth?.forEach((item) => {
        queryParams.push({ name: "startMonth", value: item });
      });
      filters.endMonth?.forEach((item) => {
        queryParams.push({ name: "endMonth", value: item });
      });
      queryParams.push({ name: "limit", value: pagination.pageSize });
      queryParams.push({ name: "page", value: pagination.current });
    }
    console.log("params", filters, extra, pagination);
  };

  return (
    <Table
      loading={isFetching || isLoading}
      columns={columns}
      dataSource={tableData}
      onChange={onChange}
      showSorterTooltip={{ target: "sorter-icon" }}
      pagination={{ defaultPageSize: 5, showSizeChanger: true }}
    />
  );
};

const AddFacultyModal = ({ data: courseData } : { data: { key: string, title: string, code: string, prefix: string, _id: string} }) => {
  const [showModal, setShowModal] = useState(false);
  const {
    data: faculties,
    isFetching,
    isLoading,
  } = useGetAllUserFacultiesQuery(undefined);
const [assignFaculties] = useAssignFacultiesMutation()
  const facultiesOptions = faculties?.data?.map((item) => ({
    value: item._id,
    label: item.fullName,
  }));

  // console.log(faculties, data);

 

  const handleSubmit = async (data: any) => {
    const toastId = toast.loading("Assigning faculty...");
    const updateData = {
      courseId: courseData.key,
      data
    };
    try {
      const res = await assignFaculties(updateData);
      toast.success(res.data.message as string, {
        id: toastId,
      })

    } catch (error) {
      toast.error("Something went wrong", {
        id: toastId,
      })
    }
    setShowModal(false);
  };


  if (isFetching || isLoading) return <Loading/>;

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Assign Faculty</Button>
      <Modal 
      title="Assign faculty" 
      open={showModal}
       onCancel={() => setShowModal(false)}
       footer={null}
       >
        <PHForm onSubmit={handleSubmit}>
          <PHSelect mode="multiple" name="faculties" label="Select faculty" options={facultiesOptions}/>
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Modal>
    </>
  );
};

export default Courses;
