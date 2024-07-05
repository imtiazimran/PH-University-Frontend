import { Button, Table, TableColumnsType, TableProps } from "antd";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import { TAcademicSemester } from "../../../types/academicManagement.type";
import { useState } from "react";
import {
  monthNames,
  yearOptions,
} from "../../../components/constants/semesterOptions";
import { TQueryParams } from "../../../types";

type DataType = Pick<TAcademicSemester, "year" | "startMonth" | "endMonth">;

const AcademicSemester = () => {
  const [params, setParams] = useState<TQueryParams[] | undefined>(undefined);
  const {
    data: semesterData,
    isLoading,
    isFetching,
  } = useGetAllSemestersQuery(params);
  const tableData = semesterData?.data?.map(
    ({ _id, name, year, startMonth, endMonth }) => ({
      key: _id,
      name,
      year,
      startMonth,
      endMonth,
    })
  );

  const yearFilter = yearOptions?.map((item) => ({
    text: item.label,
    value: item.value,
  }));

  const monthFilter = monthNames.map((item) => ({
    text: item,
    value: item,
  }));

  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      showSorterTooltip: { target: "full-header" },
      filters: [
        {
          text: "Autumn",
          value: "Autumn",
        },
        {
          text: "Fall",
          value: "Fall",
        },
        {
          text: "Summer",
          value: "Summer",
        },
      ],
    },
    {
      title: "Year",
      dataIndex: "year",
      defaultSortOrder: "descend",
      filters: yearFilter,
    },
    {
      title: "Start Month",
      dataIndex: "startMonth",
      defaultSortOrder: "descend",
      filters: monthFilter,
    },
    {
      title: "End Month",
      dataIndex: "endMonth",
      defaultSortOrder: "descend",
      filters: monthFilter,
    },
    {
      title: "Action",
      key: "x",
      render: () => {
        return (
          <div>
            <Button>Update</Button>
          </div>
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
      setParams(queryParams);
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

export default AcademicSemester;
