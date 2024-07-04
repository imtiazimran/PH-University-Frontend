import { TResponseRedux } from "../../../types";
import { TAcademicSemester } from "../../../types/academicManagement.type";
import { baseApi } from "../../api/baseApi";

const academicManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllSemesters: builder.query({
            query: (args) => {
                const params = new URLSearchParams()
                params.append(args[0].name, args[0].value)
                return {
                    url: "/academic-semesters",
                    method: "GET",
                    params
                }
            },
            transformResponse: (res: TResponseRedux<TAcademicSemester[]>) => {
                return {
                    data: res.data,
                    meta: res.meta
                }
            }
        }),
        createSemester: builder.mutation({
            query: (data) => ({
                url: "/academic-semesters/create-academic-semester",
                method: "POST",
                body: data
            })
        })
    })
})

export const { useGetAllSemestersQuery, useCreateSemesterMutation } = academicManagementApi