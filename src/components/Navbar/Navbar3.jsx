import React, { useEffect, useState } from "react";
import ApiRequest from "../../utils/apiRequest.js";
import { Link, useNavigate } from "react-router-dom";
import { PiShootingStar } from "react-icons/pi";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { FaBars } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const Navbar3 = () => {
  const [templates, setTemplates] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [showContent, setShowContent] = useState(false); // State to control visibility
  const [menuOpen, setMenuOpen] = useState(false); // State for mobile menu

  const navigate = useNavigate();

  // Fetch Templates
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const res = await ApiRequest.get("/template");
        setTemplates(res.data.templates);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTemplates();
  }, []);

  // Fetch Categories
  const fetchCategories = async (templateId) => {
    setSelectedTemplate(templateId);
    setSelectedCategory(null);
    setSelectedSubcategory(null);
    setBlogs([]);
    try {
      const res = await ApiRequest.get(`/${templateId}/category`);
      const categoriesData = res.data.categories;
      setCategories(categoriesData);

      // Fetch SubCategories When Template Doesn't Contain CATEGORY
      if (categoriesData.length === 0) {
        const subcategoryRes = await ApiRequest.get(
          `/${templateId}/subcategory`
        );
        const subcategoriesData = subcategoryRes.data.subCategories;
        setSubcategories(subcategoriesData);
        setShowContent(true);

        if (subcategoriesData.length > 0) {
          setSelectedSubcategory(subcategoriesData[0].id);
          fetchBlogs(subcategoriesData[0].id);
        }
      } else {
        setSubcategories([]);
        setShowContent(true);

        if (categoriesData.length > 0) {
          setSelectedCategory(categoriesData[0].id);
          fetchSubcategories(categoriesData[0].id);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch Sub Categories
  const fetchSubcategories = async (categoryId) => {
    setSelectedCategory(categoryId);
    setSelectedSubcategory(null);
    setBlogs([]);
    try {
      const res = await ApiRequest.get(
        `/${selectedTemplate}/${categoryId}/subcategory`
      );
      const subcategoriesData = res.data.subCategories;
      setSubcategories(subcategoriesData);

      if (subcategoriesData.length > 0) {
        setSelectedSubcategory(subcategoriesData[0].id);
        fetchBlogs(subcategoriesData[0].id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch Blogs
  const fetchBlogs = async (subcategoryId) => {
    setSelectedSubcategory(subcategoryId);
    try {
      const res = await ApiRequest.get(
        selectedCategory
          ? `/${selectedTemplate}/${selectedCategory}/${subcategoryId}/blog` // When Category is Present
          : `/${selectedTemplate}/${subcategoryId}/blog` // When Category is not Present
      );
      setBlogs(res.data.blogs);
    } catch (error) {
      console.log(error);
    }
  };

  // Navigate to the page When Blog is Clicked
  const handleNavigateBlog = (id) => {
    navigate(`/blog/${id}`);
  };

  const handleShowContent = () => {
    setShowContent(!showContent);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    
  };

  return (
    <>
      <div className="max-w-[1128px] mx-auto flex justify-between items-center h-16 relative px-5 lg:px-0">
        <Link to="/" target="_self">
          <img src="/logo.png" alt="hajir logo" className="h-10" />
        </Link>

        <div className="flex md:hidden">
          <button onClick={toggleMenu}>
            {menuOpen ? <IoMdClose size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        <ul className="hidden md:flex flex-col md:flex-row  gap-5 md:items-center font-medium">
          {templates.map((template) => (
            <li
              key={template.id}
              className={`px-4 py-2 text-md rounded-full duration-200 text-blue-900 ${
                selectedTemplate === template.id ? "" : ""
              }`}
              onClick={() => {
                fetchCategories(template.id), handleShowContent();
              }}
            >
              <div className="flex items-center gap-1">
                {template.templateName}
                <IoIosArrowDown className="mt-1" size={15} />
              </div>
            </li>
          ))}
        </ul>

        <div className="gap-5 items-center hidden md:flex">
          <div>
            <button>Login</button>
          </div>
          <div className="bg-blue-500 text-white rounded-md px-3 py-1.5">
            <button>Get Started</button>
          </div>
        </div>
      </div>
      {/* ------------------------- Mobile view -------------------------------- */}
      {menuOpen && <ul className='flex justify-center text-lg p-4 font-medium md:hidden'>
          {templates.map((template) => (
            <li
              key={template.id}
              className={`px-4 py-2 text-md rounded-full duration-200 text-blue-900 ${
                selectedTemplate === template.id ? "" : ""
              }`}
              onClick={() => {
                fetchCategories(template.id), handleShowContent();
              }}
            >
              <div className="flex items-center gap-1">
                {template.templateName}
                <IoIosArrowDown className="mt-1" size={15} />
              </div>
            </li>
          ))}
        </ul>}

      {/* ------------------------------ Show DropDown Div -------------------------------------------- */}

      {showContent && (
        <div className="absolute w-full md:top-16 overflow-hidden md:w-3/4 md:justify-center lg:left-52 bg-white py-5 md:px-8 border border-gray-200 rounded-md z-10">
          {/*  --------------------     full container  ---------------------- */}
          <div className="flex flex-col lg:flex-row">
            {selectedTemplate &&
              (categories.length > 0 || subcategories.length > 0) && (
                //  Left Container
                <div className="flex flex-col md:w-2/6 border-r-2 px-2 pr-8 py-3">
                  <div
                    className={`${
                      categories.length > 0 ? "flex" : "hidden"
                    } flex gap-3 items-center mb-3 px-4 border-2 rounded-full py-2 mx-auto`}
                  >
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        className={`px-6 py-2 text-lg text-gray-700 rounded-full ${
                          selectedCategory === category.id
                            ? "bg-blue-100 text-gray-900"
                            : " hover:text-gray-900"
                        }`}
                        onClick={() => fetchSubcategories(category.id)}
                      >
                        {category.categoryName}
                      </button>
                    ))}
                  </div>
                  <div className="flex flex-col gap-3 mt-4">
                    {subcategories.map((subcategory) => (
                      <button
                        key={subcategory.id}
                        className={`px-2 py-3 text-md text-blue-900 font-medium rounded-md ${
                          selectedSubcategory === subcategory.id
                            ? "bg-gray-100 text-gray-900"
                            : "hover:bg-gray-100"
                        }`}
                        onClick={() => fetchBlogs(subcategory.id)}
                      >
                        <div className="flex items-center justify-between">
                          {subcategory.subCategoryName}
                          <MdOutlineKeyboardArrowRight size={25} />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

            {/* ------------------------------ Show Blogs -------------------------------------------- */}
            {selectedSubcategory && (
              <div className={`py-4 px-8 ${
                categories.length > 0 ? "mt-20" : "mt-0"
              }`}>
                <div className="grid grid-cols-2 gap-2">
                  {blogs.map((blog) => (
                    <div
                      key={blog.id}
                      className="p-4"
                      onClick={() => handleNavigateBlog(blog.id)}
                    >
                      <div className="flex items-center gap-3 hover:bg-blue-100 p-2 rounded-md">
                        <PiShootingStar
                          color="text-blue-400"
                          size={30}
                          className="bg-gray-100 p-1 rounded-full"
                        />
                        <span>
                          <h2 className="font-medium text-blue-900">
                            {blog.blogName}
                          </h2>
                          <p className="text-sm text-blue-900/70">
                            {blog.blogDescription}
                          </p>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                {blogs.length === 0 && (
                  <p className="text-center text-gray-500 mt-4">
                    No blogs available.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar3;
