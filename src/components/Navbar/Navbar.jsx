import { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { data } from "../../data/data.js";
import { workplaceData } from "../../data/data.js";
import { roleData } from "../../data/data.js";
import { HiStar } from "react-icons/hi";

const Navbar = () => {
  const [isSolutionClicked, setIsSolutionClicked] = useState(false);
  const [isProductClicked, setIsProductClicked] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(false);
  const [activeSubmenuProduct, setActiveSubmenuProduct] = useState(false);
  const [isCompOrEmp, setIsCompOrEmp] = useState(false);
  const [show, setShow] = useState(true)

  const handleShow = () => setShow(!show)

  const handleSolutionClick = () => {
    setActiveSubmenu("Industry");
    setActiveSubmenuProduct("live-tracking");
    setIsSolutionClicked(!isSolutionClicked);
    setIsProductClicked(false);
  };

  const handleProductClick = () => {
    setIsCompOrEmp("Company")
    setIsProductClicked(!isProductClicked);
    setIsSolutionClicked(false);
    setActiveSubmenu(null);
  };

  const handleSubmenuClick = (submenu) => {
    setActiveSubmenu(submenu);
  };
  const handleSubmenuProductClick = (submenu) => {
    setActiveSubmenuProduct(submenu);
  };

  return (
    <>
      <nav className="flex justify-around p-10 h-24 items-center relative">
        <div>
          <img src="/logo.png" alt="hajir logo" className="h-10" />
        </div>

        <div>
          <ul className="flex gap-5">
            <li>
              <div className="flex items-center" onClick={handleProductClick}>
                <button>Products</button>
                <span>
                  <RiArrowDropDownLine />
                </span>
              </div>
            </li>
            <li>
              <div
                className="flex items-center relative"
                onClick={handleSolutionClick}
              >
                <button>Solution</button>
                <span>
                  <RiArrowDropDownLine />
                </span>
              </div>
            </li>
            <li>Pricing</li>
            <li>
              <div className="flex items-center">
                <button>Company</button>
                <span>
                  <RiArrowDropDownLine />
                </span>
              </div>
            </li>
          </ul>
        </div>

        <div className="flex gap-5 items-center">
          <div>
            <button>Login</button>
          </div>
          <div className="bg-blue-500 text-white rounded-md px-3 py-1.5">
            <button>Get Started</button>
          </div>
        </div>
      </nav>
      {isSolutionClicked && (
        <div className="absolute top-20 w-3/4 left-52 bg-white py-5 px-8 border border-gray-200 rounded-md">
          <div className="flex">
            <div className="flex w-1/3 px-2 pr-8 py-3 text-lg border-r-2 font-semibold">
              <ul className="flex flex-col w-full gap-3">
                <li
                  className={`mb-2 cursor-pointer ${
                    activeSubmenu === "Industry"
                      ? "bg-slate-100 text-blue-400 rounded-md"
                      : ""
                  }`}
                  onClick={() => handleSubmenuClick("Industry")}
                >
                  <div className="flex justify-between items-center py-1 px-3 rounded-md">
                    <div>Industry</div>
                    <div>
                      <RiArrowDropDownLine />
                    </div>
                  </div>
                </li>
                <li
                  className={`mb-2 cursor-pointer ${
                    activeSubmenu === "Workplace"
                      ? "bg-slate-100 text-blue-400 rounded-md"
                      : ""
                  }`}
                  onClick={() => handleSubmenuClick("Workplace")}
                >
                  <div className="flex justify-between items-center py-1 px-3">
                    <div>Workplace</div>
                    <div>
                      <RiArrowDropDownLine />
                    </div>
                  </div>
                </li>
                <li
                  className={`mb-2 cursor-pointer ${
                    activeSubmenu === "Role"
                      ? "bg-slate-100 text-blue-400 rounded-md"
                      : ""
                  }`}
                  onClick={() => handleSubmenuClick("Role")}
                >
                  <div className="flex justify-between items-center py-1 px-3">
                    <div>Role</div>
                    <div>
                      <RiArrowDropDownLine />
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="w-2/3 p-4 grid grid-cols-3 gap-6">
              {/* data from Industry */}
              {activeSubmenu === "Industry" &&
                data.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <div className="text-blue-500 pt-1">
                      <HiStar className="bg-gray-200 p-1 w-6 h-6 rounded-full " />
                    </div>
                    <div className="space-y-1">
                      <h1>{item.name}</h1>
                      <h3 className="text-sm">{item.desc}</h3>
                    </div>
                  </div>
                ))}
              {activeSubmenu === "Workplace" &&
                workplaceData.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <div className="text-blue-500 pt-1">
                      <HiStar className="bg-gray-200 p-1 w-6 h-6 rounded-full " />
                    </div>
                    <div className="space-y-1">
                      <h1>{item.name}</h1>
                      <h3 className="text-sm">{item.desc}</h3>
                    </div>
                  </div>
                ))}
              {activeSubmenu === "Role" &&
                roleData.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <div className="text-blue-500 pt-1">
                      <HiStar className="bg-gray-200 p-1 w-6 h-6 rounded-full " />
                    </div>
                    <div className="space-y-1">
                      <h1>{item.name}</h1>
                      <h3 className="text-sm">{item.desc}</h3>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
      {isProductClicked && (
        <div className="absolute top-20 w-3/4 left-52 bg-white py-5 px-8 border border-gray-200 rounded-md">
          <div className="flex">
            <div className='flex flex-col w-1/3 border-r-2  px-2 pr-8 py-3'>
              <div>
                <div className='flex gap-3 items-center mb-3 px-4 border-2 rounded-full py-2 justify-around'>
                  {/* <button className={`${isCompOrEmp=== Company ? "bg-blue-500" : ""}`}>Company</button> */}
                  <button onClick={handleShow} className={`${show ? "bg-gray-200 py-2 px-3 rounded-full items-center text-gray-700" : ""}`}>Company</button>
                  <button onClick={handleShow} className={`${!show ? "bg-gray-200 py-2 px-3 rounded-full items-center text-gray-700" : ""}`}>Employee</button>
                </div>
              </div>
              {/* li div */}
              <div className={`${show?'flex':'hidden'}  text-lg  font-semibold`}>
                <ul className="flex flex-col w-full gap-3">
                  <li
                    className={`mb-2 cursor-pointer ${
                      activeSubmenuProduct === "live-tracking"
                        ? "bg-slate-100 text-blue-400 rounded-md"
                        : ""
                    }`}
                    onClick={() => handleSubmenuProductClick("live-tracking")}
                  >
                    <div className="flex justify-between items-center py-1 px-3 rounded-md">
                      <div>Live Tracking</div>
                      <div>
                        <RiArrowDropDownLine />
                      </div>
                    </div>
                  </li>
                  <li
                    className={`mb-2 cursor-pointer ${
                      activeSubmenuProduct === "management"
                        ? "bg-slate-100 text-blue-400 rounded-md"
                        : ""
                    }`}
                    onClick={() => handleSubmenuProductClick("management")}
                  >
                    <div className="flex justify-between items-center py-1 px-3">
                      <div>Management</div>
                      <div>
                        <RiArrowDropDownLine />
                      </div>
                    </div>
                  </li>
                  <li
                    className={`mb-2 cursor-pointer ${
                      activeSubmenuProduct === "reports"
                        ? "bg-slate-100 text-blue-400 rounded-md"
                        : ""
                    }`}
                    onClick={() => handleSubmenuProductClick("reports")}
                  >
                    <div className="flex justify-between items-center py-1 px-3">
                      <div>Reports</div>
                      <div>
                        <RiArrowDropDownLine />
                      </div>
                    </div>
                  </li>
                  <li
                    className={`mb-2 cursor-pointer ${
                      activeSubmenuProduct === "eotm"
                        ? "bg-slate-100 text-blue-400 rounded-md"
                        : ""
                    }`}
                    onClick={() => handleSubmenuProductClick("eotm")}
                  >
                    <div className="flex justify-between items-center py-1 px-3">
                      <div>EOTM</div>
                      <div>
                        <RiArrowDropDownLine />
                      </div>
                    </div>
                  </li>
                  <li
                    className={`mb-2 cursor-pointer ${
                      activeSubmenuProduct === "multi-language"
                        ? "bg-slate-100 text-blue-400 rounded-md"
                        : ""
                    }`}
                    onClick={() => handleSubmenuProductClick("multi-language")}
                  >
                    <div className="flex justify-between items-center py-1 px-3">
                      <div>MultiLanguage</div>
                      <div>
                        <RiArrowDropDownLine />
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              {/* second */}
              <div className={`${show?'hidden':'flex'}  text-lg  font-semibold`}>
                <ul className="flex flex-col w-full gap-3">
                  <li
                    className={`mb-2 cursor-pointer ${
                      activeSubmenuProduct === "live-tracking"
                        ? "bg-slate-100 text-blue-400 rounded-md"
                        : ""
                    }`}
                    onClick={() => handleSubmenuProductClick("live-tracking")}
                  >
                    <div className="flex justify-between items-center py-1 px-3 rounded-md">
                      <div>Live Tracking New</div>
                      <div>
                        <RiArrowDropDownLine />
                      </div>
                    </div>
                  </li>
                  <li
                    className={`mb-2 cursor-pointer ${
                      activeSubmenuProduct === "management"
                        ? "bg-slate-100 text-blue-400 rounded-md"
                        : ""
                    }`}
                    onClick={() => handleSubmenuProductClick("management")}
                  >
                    <div className="flex justify-between items-center py-1 px-3">
                      <div>Management New</div>
                      <div>
                        <RiArrowDropDownLine />
                      </div>
                    </div>
                  </li>
                  <li
                    className={`mb-2 cursor-pointer ${
                      activeSubmenuProduct === "reports"
                        ? "bg-slate-100 text-blue-400 rounded-md"
                        : ""
                    }`}
                    onClick={() => handleSubmenuProductClick("reports")}
                  >
                    <div className="flex justify-between items-center py-1 px-3">
                      <div>Reports New</div>
                      <div>
                        <RiArrowDropDownLine />
                      </div>
                    </div>
                  </li>
                  <li
                    className={`mb-2 cursor-pointer ${
                      activeSubmenuProduct === "eotm"
                        ? "bg-slate-100 text-blue-400 rounded-md"
                        : ""
                    }`}
                    onClick={() => handleSubmenuProductClick("eotm")}
                  >
                    <div className="flex justify-between items-center py-1 px-3">
                      <div>EOTM New</div>
                      <div>
                        <RiArrowDropDownLine />
                      </div>
                    </div>
                  </li>
                  <li
                    className={`mb-2 cursor-pointer ${
                      activeSubmenuProduct === "multi-language"
                        ? "bg-slate-100 text-blue-400 rounded-md"
                        : ""
                    }`}
                    onClick={() => handleSubmenuProductClick("multi-language")}
                  >
                    <div className="flex justify-between items-center py-1 px-3">
                      <div>MultiLanguage New</div>
                      <div>
                        <RiArrowDropDownLine />
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-full p-4 grid grid-cols-3 gap-6 ">
              {activeSubmenuProduct === "live-tracking" &&
                data.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <div className="text-blue-500 pt-1">
                      <HiStar className="bg-gray-200 p-1 w-6 h-6 rounded-full " />
                    </div>
                    <div className="space-y-1">
                      <h1>{item.name}</h1>
                      <h3 className="text-sm">{item.desc}</h3>
                    </div>
                  </div>
                ))}
              {activeSubmenuProduct === "management" &&
                workplaceData.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <div className="text-blue-500 pt-1">
                      <HiStar className="bg-gray-200 p-1 w-6 h-6 rounded-full " />
                    </div>
                    <div className="space-y-1">
                      <h1>{item.name}</h1>
                      <h3 className="text-sm">{item.desc}</h3>
                    </div>
                  </div>
                ))}
              {activeSubmenuProduct === "reports" &&
                roleData.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <div className="text-blue-500 pt-1">
                      <HiStar className="bg-gray-200 p-1 w-6 h-6 rounded-full " />
                    </div>
                    <div className="space-y-1">
                      <h1>{item.name}</h1>
                      <h3 className="text-sm">{item.desc}</h3>
                    </div>
                  </div>
                ))}
              {activeSubmenuProduct === "eotm" &&
                roleData.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <div className="text-blue-500 pt-1">
                      <HiStar className="bg-gray-200 p-1 w-6 h-6 rounded-full " />
                    </div>
                    <div className="space-y-1">
                      <h1>{item.name}</h1>
                      <h3 className="text-sm">{item.desc}</h3>
                    </div>
                  </div>
                ))}
              {activeSubmenuProduct === "multi-language" &&
                roleData.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <div className="text-blue-500 pt-1">
                      <HiStar className="bg-gray-200 p-1 w-6 h-6 rounded-full " />
                    </div>
                    <div className="space-y-1">
                      <h1>{item.name}</h1>
                      <h3 className="text-sm">{item.desc}</h3>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
