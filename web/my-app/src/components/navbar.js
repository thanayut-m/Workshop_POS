function Navbar() {
  return (
    <>
      {/* Navbar */}
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" data-widget="pushmenu" href="#" role="button">
              <i className="fas fa-bars"></i>
            </a>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <button className="btn btn-info mr-2">
              <i className="fa fa-user mr-2"></i>
              Profile
            </button>
            <button className="btn btn-danger">
              <i className="fa fa-user mr-2"></i>
              Sign Out
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
