/* eslint-disable @typescript-eslint/no-explicit-any */
import { TQueryParams, TResponseRedux, TSemester } from "../../../types";
import { baseApi } from "../../api/baseApi";

const courseManagementApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAllRegisterSemesters: build.query({
            query: (args) => {
                const params = new URLSearchParams()

                if (args) {
                    args.forEach((item: TQueryParams) => {
                        params.append(item.name, item.value as string)
                    })
                }
                return {
                    url: "/semester-registrations",
                    method: "GET",
                    params
                }
            },
            providesTags: ["SemesterRegistration"],
            transformResponse: (res: TResponseRedux<TSemester[]>) => {
                return {
                    data: res.data,
                    meta: res.meta
                }
            }
        }),
        createSemesterRegister: build.mutation({
            query: (data) => ({
                url: "/semester-registrations/create-semester-registration",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["SemesterRegistration"],
        }),
        updateSemesterRegister: build.mutation({
            query: (args) => ({
                url: `/semester-registrations/${args.id}`,
                method: "PATCH",
                body: args.data,

            }),
            invalidatesTags: ["SemesterRegistration"],
        }),

        getAllCourses: build.query({
            query: (args) => {
                const params = new URLSearchParams()

                if (args) {
                    args.forEach((item: TQueryParams) => {
                        params.append(item.name, item.value as string)
                    })
                }
                return {
                    url: "/courses",
                    method: "GET",
                    params
                }
            },
            providesTags: ["SemesterRegistration"],
            transformResponse: (res: TResponseRedux<any[]>) => {
                return {
                    data: res.data,
                    meta: res.meta
                }
            }
        }),
        addCourse: build.mutation({
            query: (data) => ({
                url: "/courses/create-course",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["SemesterRegistration"],
        }),
        assignFaculties: build.mutation({
            query: (args) => ({
                url: `/courses/${args.courseId}/assign-faculties`,
                method: "PUT",
                body: args.data
            }),
            invalidatesTags: ["SemesterRegistration"],
        }),

    }),
})

export const {
    useUpdateSemesterRegisterMutation, useGetAllRegisterSemestersQuery, useCreateSemesterRegisterMutation,
    useAddCourseMutation,
    useGetAllCoursesQuery,
    useAssignFacultiesMutation

} = courseManagementApi