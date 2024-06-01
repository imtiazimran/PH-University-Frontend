import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateAdmin from "../pages/admin/CreateAdmin";
import CreateFaculty from "../pages/admin/CreateFaculty";
import CreateStudent from "../pages/admin/CreateStudent";
import AcademicSemister from "../pages/admin/academicManagement/AcademicSemister";



export const adminRoutes = [
    {
        name: 'dashboard',
        path: 'dashboard',
        element: <AdminDashboard />
    },
    {
        name: 'academic management',
        children: [
            {
                name: 'Academic Semister',
                path: 'academic-semister',
                element: <AcademicSemister/>
            }
        ]
    },
    {
        name: 'user management',
        children: [
            {
                name: 'Create Admin',
                path: 'create-admin',
                element: <CreateAdmin />
            },
            {
                name: 'Create Faculty',
                path: 'create-faculty',
                element: <CreateFaculty />
            },
            {
                name: 'Create Student',
                path: 'create-student',
                element: <CreateStudent />
            }
        ]
    }
]



