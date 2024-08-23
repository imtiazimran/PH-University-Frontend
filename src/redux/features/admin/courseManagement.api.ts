import { baseApi } from "../../api/baseApi";

const courseManagementApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAllCourses: build.query({
            query: () => ({
                url: "/",
                method: "GET",
            }),
        }),
        createSemesterRegister: build.mutation({
            query: (data) => ({
                url: "/semester-registrations/create-semester-registration",
                method: "POST",
                body: data,
            }),
        }),
    }),
})

export const {useGetAllCoursesQuery, useCreateSemesterRegisterMutation} = courseManagementApi