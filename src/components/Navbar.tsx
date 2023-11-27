import logo from "@/assets/logo.png";
const Navbar = () => {
  return (
    <div className="bg-slate-700 h-16 border-b border-slate-800 drop-shadow-2xl flex text-slate-300 gap-8 w-full fixed top-0 items-center px-6  z-50">
      <div className="w-32">
        <img src={logo} alt="logo" className="w-full" />
      </div>
      <p className="text-3xl font-bold">Book That Show</p>
    </div>
  );
};

export default Navbar;
