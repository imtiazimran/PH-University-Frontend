/* eslint-disable @typescript-eslint/no-unused-vars */
import { Menu, Layout } from "antd";
import { NavLink } from "react-router-dom";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerators";
import { adminRoutes } from "../../routes/admin.routes";
import { facultyRoutes } from "../../routes/faculty.routes";
import { studentRoute } from "../../routes/student.routes";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
const { Sider } = Layout;

const userRole = {
  ADMIN: "admin",
  FACULTY: "faculty",
  STUDENT: "student",
}

const Sidebar = () => {
  const user = useAppSelector(selectCurrentUser)
  let sidebarItems 


  switch (user!.role) {
    case userRole.FACULTY:
      sidebarItems = sidebarItemsGenerator(facultyRoutes, userRole.FACULTY)
      break;
    case userRole.ADMIN:
      sidebarItems = sidebarItemsGenerator(adminRoutes, userRole.ADMIN)
      break;
    case userRole.STUDENT:
      sidebarItems = sidebarItemsGenerator(studentRoute, userRole.STUDENT)
      break;

    default:
      break;
  }
  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <div
        style={{
          color: "#fff",
          textAlign: "center",
          height: "4rem",
          marginTop: "1rem",
          lineHeight: "32px",
        }}
      >
        <NavLink to={"/"}>
          <h1>PH University</h1>
        </NavLink>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItems}
      />
    </Sider>
  );
};

export default Sidebar;
