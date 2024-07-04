import { z } from "zod";

export const createSemesterSchema = z.object({
    name: z.string({ required_error: "Name is Required" }),
    year: z.number({ required_error: "Year is Required" }),
    endMonth: z.string({ required_error: "End Month is Required" }),
    startMonth: z.string({ required_error: "Start Month is Required" }),
});