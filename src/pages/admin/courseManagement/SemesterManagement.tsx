/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Dropdown,
  Table,
  TableColumnsType,
  TableProps,
  Tag,
} from "antd";
import { TQueryParams, TSemester } from "../../../types";
import { useGetAllRegisterSemestersQuery, useUpdateSemesterRegisterMutation } from "../../../redux/features/admin/courseManagement.api";
import moment from "moment";
import { useState } from "react";
import { toast } from "sonner";

type DataType = Pick<TSemester, "status" | "startDate" | "endDate">;

const items = [
  {
     label: "UPCOMING",
      key: "UPCOMING" 
    },
    {
      label: "ONGOING",
      key: "ONGOING",
    },
    {
      label: "ENDED",
      key: "ENDED",
    },
  ];

 
const SemesterManagement = () => {
  const [semesterId, setSemesterId] = useState("");
  const [updateSemester] = useUpdateSemesterRegisterMutation();
  const {
    data: semesterData,
    isLoading,
    isFetching,
  } = useGetAllRegisterSemestersQuery(undefined);

  const tableData = semesterData?.data?.map(
    ({ _id, academicSemester, status, startDate, endDate }) => ({
      key: _id,
      name: `${academicSemester.name} ${academicSemester.year}`,
      status,
      startDate: moment(startDate).format("MMMM"),
      endDate: moment(endDate).format("MMMM"),
    })
  );

const handleStatusUpdate = async (data: any) => {
  const toastId = toast.loading("Updating semester...");
  const updateData = {
    id: semesterId,
    data: {
      status: data.key,
    },
  }

  const res = await updateSemester(updateData);

  if (res) {
    toast.success(res.data.message as string, {
      id: toastId,
    });
  }
  
}

  const menuProps = {
    items,
    onClick: handleStatusUpdate,
  }

  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (status) => {
        let color;
        if (status === "UPCOMING") {
          color = "geekblue";
        }
        if (status === "ONGOING") {
          color = "green";
        }
        if (status === "ENDED") {
          color = "red";
        }

        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Start Month",
      key: "startDate",
      dataIndex: "startDate",
      defaultSortOrder: "descend",
    },
    {
      title: "End Month",
      key: "endDate",
      dataIndex: "endDate",
      defaultSortOrder: "descend",
    },
    {
      title: "Action",
      key: "x",
      render: (item) => {
        return (
          <Dropdown menu={menuProps} trigger={["click"]}>
            <Button onClick={() => setSemesterId(item.key)}>Update</Button>
          </Dropdown>
        );
      },
    },
  ];

  const onChange: TableProps<DataType>["onChange"] = (
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

export default SemesterManagement;
