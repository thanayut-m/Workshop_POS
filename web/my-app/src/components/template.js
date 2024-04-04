import Navbar from "./navbar";
import Sidebar from "./sidebar";

function Template(props) {
  return (
    <>
      <div className="wrapper">
        <Sidebar />
        <Navbar />
        <div className="conrent-wrapper pt-3">
          <section className="content">{props.children}</section>
        </div>
      </div>
    </>
  )
}

export default Template;
