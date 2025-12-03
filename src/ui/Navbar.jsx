import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="h-[70px] flex items-center justify-between px-6 bg-white border-b border-gray-200 sticky top-0 z-50">
      {/* Left Logo */}
      <Link to="/" className="text-2xl font-semibold text-[#0F3D2E]">
        Signature
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-6">
        <Link className={navLink} to="/">
          Home
        </Link>
        <Link className={navLink} to="/add-recipe">
          Add Recipe
        </Link>
        {/* <Link className={navLink} to="/my-recipes">
          My Recipes
        </Link> */}
        <Link className={navLink} to="/login">
          Login
        </Link>
        <Link className={navLink} to="/signup">
          Signup
        </Link>
      </div>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden text-3xl text-[#0F3D2E]"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? "✕" : "☰"}
      </button>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="absolute top-[70px] left-0 w-full bg-white border-b border-gray-200 flex flex-col items-start px-6 py-4 gap-4 md:hidden">
          <Link className={navLink} to="/" onClick={() => setMobileOpen(false)}>
            Home
          </Link>
          <Link
            className={navLink}
            to="/add-recipe"
            onClick={() => setMobileOpen(false)}
          >
            Add Recipe
          </Link>
          {/* <Link
            className={navLink}
            to="/my-recipes"
            onClick={() => setMobileOpen(false)}
          >
            My Recipes
          </Link> */}
          <Link
            className={navLink}
            to="/login"
            onClick={() => setMobileOpen(false)}
          >
            Login
          </Link>
          <Link
            className={navLink}
            to="/signup"
            onClick={() => setMobileOpen(false)}
          >
            Signup
          </Link>
        </div>
      )}
    </nav>
  );
}

const navLink =
  "text-[16px] font-medium text-gray-700 hover:text-[#4CAF50] transition-colors";
