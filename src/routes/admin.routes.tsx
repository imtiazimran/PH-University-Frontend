import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateAdmin from "../pages/admin/userManagement/CreateAdmin";
import CreateFaculty from "../pages/admin/userManagement/CreateFaculty";
import CreateStudent from "../pages/admin/userManagement/CreateStudent";
import AcademicDepartment from "../pages/admin/academicManagement/AcademicDepartment";
import AcademicFaculty from "../pages/admin/academicManagement/AcademicFaculty";
import AcademicSemester from "../pages/admin/academicManagement/AcademicSemester";
import CreateAcademicDepartment from "../pages/admin/academicManagement/CreateAcademicDepartment";
import CreateAcademicFaculty from "../pages/admin/academicManagement/CreateAcademicFaculty";
import CreateAcademicSemester from "../pages/admin/academicManagement/CreateAcademicSemester";
import StudentData from "../pages/admin/userManagement/StudentData";
import StudentDetails from "../pages/admin/userManagement/StudentDetails";
import UpdateStudent from "../pages/admin/userManagement/UpdateStudent";
import RegisterSemester from "../pages/admin/courseManagement/RegisterSemester";
import SemesterManagement from "../pages/admin/courseManagement/SemesterManagement";
import CreateCourse from "../pages/admin/courseManagement/CreateCourse";
import Courses from "../pages/admin/courseManagement/Courses";
import OfferCourse from "../pages/admin/courseManagement/OfferCourse";
import OfferedCourses from "../pages/admin/courseManagement/OfferedCourses";



export const adminRoutes = [
    {
        name: 'Dashboard',
        path: 'dashboard',
        element: <AdminDashboard />
    },
    {
        name: 'Academic Management',
        children: [
            {
                name: 'Create A. Semester',
                path: 'create-academic-semester',
                element: <CreateAcademicSemester/>
            },
            {
                name: 'Academic Semester',
                path: 'academic-Semester',
                element:  <AcademicSemester/>
            },
            {
                name: 'Create A. Faculty',
                path: 'create-academic-faculty',
                element: <CreateAcademicFaculty/>
            },
            {
                name: 'Academic Faculty',
                path: 'academic-faculty',
                element: <AcademicFaculty/>
                },
            {
                name: 'Create A. Department',
                path: 'create-academic-department',
                element: <CreateAcademicDepartment/>
            },
            {
                name: 'Academic Department',
                path: 'academic-department',
                element: <AcademicDepartment/>
            }
        ]
    },
    {
        name: 'User management',
        children: [
            {
                name: 'Create Admin',
                path: 'create-admin',
                element: <CreateAdmin />
            },
            {
                name: 'Create Faculty',
                path: 'create-faculty',
                element: <CreateFaculty/>
            },
            {
                name: 'Create Student',
                path: 'create-student',
                element: <CreateStudent />
            },
            {
                name: 'Student Data',
                path: 'students',
                element: <StudentData />
            },
            {
                path:'student/:id',
                element: <StudentDetails/>
            },
            {
                path:'student-update/:id',
                element: <UpdateStudent/>
            }
        ]
    },
    {
        name: 'Course Management',
        children: [
            {
                name: 'Semester Registration',
                path: 'semester-registration',
                element: <RegisterSemester/>
            },
            {
                name: ' Semesters Management',
                path: 'register-semesters',
                element: <SemesterManagement/>
            },
            {
                name: 'Create Course',
                path: 'create-course',
                element: <CreateCourse/>
            },
            {
                name: 'Courses',
                path: 'courses',
                element: <Courses/>
            },
            {
                name: 'Offer Course',
                path: 'offer-course',
                element: <OfferCourse/>
            },
            {
                name: 'Offered Courses',
                path: 'offered-courses',
                element: <OfferedCourses/>
            }
        ]
    }
]



