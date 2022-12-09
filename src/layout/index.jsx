import Sidebar from "components/Sidebar";

const Layout = ({ children }) => {
  return (
    <>
      <Sidebar />
      <main className="content">{children}</main>
    </>
  );
};

export default Layout;
