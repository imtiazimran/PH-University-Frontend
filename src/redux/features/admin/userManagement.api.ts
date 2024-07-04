import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createStudent: build.mutation({
            query: (data) => ({
                url: "/users/create-student/",
                method: "POST",
                body: data
            })
        })
    })
})

export const {useCreateStudentMutation} = userManagementApi;