import { baseApi } from "../../api/baseApi";

const academicSemisterApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllSemisters : builder.query({
            query: () => ({
                url: "/academic-semesters",
                method: "GET"
            })
        })
    })
})

export const {useGetAllSemistersQuery} = academicSemisterApi