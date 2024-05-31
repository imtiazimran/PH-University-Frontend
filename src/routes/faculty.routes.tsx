import FacultyDashboard from "../pages/faculty/FacultyDashboard";
import OfferedCourse from "../pages/faculty/OfferedCourse";

export const facultyRoutes = [
    {
        name: 'Dashboard',
        path: 'dashboard',
        element: <FacultyDashboard/>
    },
    {
        name: "Offered courses",
        path: "offered-courses",
        element: <OfferedCourse/>
    }
]