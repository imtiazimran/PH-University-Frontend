/* eslint-disable @typescript-eslint/no-explicit-any */
import { TResponseRedux, TStudent } from "../../../types";
import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createStudent: build.mutation({
            query: (data) => ({
                url: "/users/create-student/",
                method: "POST",
                body: data
            })
        }),
        getAllStudents: build.query({
            query: (args) => {
                const params = new URLSearchParams()

                if (args) {
                    args.forEach((item: { name: string; value: string; }) => {
                        params.append(item.name, item.value)
                    })
                }
                return {
                    url: "/students",
                    method: "GET",
                    params
                }
            },
            transformResponse: (res: TResponseRedux<TStudent[]>) => {
                return {
                    data: res.data,
                    meta: res.meta
                }
            }
        })
    })
})

export const {useCreateStudentMutation, useGetAllStudentsQuery} = userManagementApi;