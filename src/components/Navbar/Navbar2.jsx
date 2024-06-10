import { useEffect, useState } from "react";
import ApiRequest from "../../utils/apiRequest.js";
import { useNavigate } from "react-router-dom";

const Navbar2 = () => {
  const [templates, setTemplates] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [blogs, setBlogs] = useState([]);

  const navigate = useNavigate();

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

  const fetchCategories = async (templateId) => {
    setSelectedTemplate(templateId);

    setSelectedCategory("");
    setSelectedSubcategory("");
    setBlogs([]);
    try {
      const res = await ApiRequest.get(`/${templateId}/category`);

      if (res.data.categories.length === 0) {
        setCategories([]);
        setSubcategories([]);
        setSelectedSubcategory("");
        setBlogs([]);
        try {
          const response = await ApiRequest.get(`/${templateId}/subcategory`);
          setSubcategories(response.data.subCategories);
        } catch (error) {
          console.log(error);
        }
      } else {
        setCategories(res.data.categories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSubcategories = async (categoryId) => {
    setSelectedCategory(categoryId);
    setSelectedSubcategory("");
    setSubcategories([]);
    setBlogs([]);
    try {
      const res = await ApiRequest.get(
        `/${selectedTemplate}/${categoryId}/subcategory`
      );

      setSubcategories(res.data.subCategories);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBlogs = async (subcategoryId) => {
    if (!selectedCategory) {
      setSelectedSubcategory(subcategoryId);
      try {
        const res = await ApiRequest(
          `/${selectedTemplate}/${subcategoryId}/blog`
        );

        setBlogs(res.data.blogs);
      } catch (error) {
        console.log(error);
      }
    } else {
      setSelectedSubcategory(subcategoryId);
      try {
        const res = await ApiRequest(
          `/${selectedTemplate}/${selectedCategory}/${subcategoryId}/blog`
        );
        setBlogs(res.data.blogs);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleNavigateBlog = (id) => {
    navigate(`/blog/${id}`);
  };

  return (
    <>

      <nav className="flex justify-between items-center  space-x-4 px-10 py-4 bg-gray-200">
        <h1 className='text-xl font-bold'>Sandip Shrestha</h1>
         <div className='flex gap-2'>
         <select
          className="p-2 bg-white border border-gray-300 rounded"
          value={selectedTemplate}
          onChange={(e) => fetchCategories(e.target.value)}
        >
          <option value="">Select Template</option>
          {templates.map((template) => (
            <option key={template.id} value={template.id}>
              {template.templateName}
            </option>
          ))}
        </select>

        <select
          className="p-2 bg-white border border-gray-300 rounded"
          value={selectedCategory}
          onChange={(e) => fetchSubcategories(e.target.value)}
          disabled={categories.length === 0}
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.categoryName}
            </option>
          ))}
        </select>

        <select
          className="p-2 bg-white border border-gray-300 rounded"
          value={selectedSubcategory}
          onChange={(e) => fetchBlogs(e.target.value)}
          //   disabled={!selectedCategory}
        >
          <option value="">Select Subcategory</option>
          {subcategories.map((subcategory) => (
            <option key={subcategory.id} value={subcategory.id}>
              {subcategory.subCategoryName}
            </option>
          ))}
        </select>
         </div>
      </nav>
      <div className="p-4">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div
              key={blog.id}
              className="p-4 mb-4 bg-white border rounded"
              onClick={() => handleNavigateBlog(blog.id)}
            >
              <h2 className="text-xl font-bold">{blog.blogName}</h2>
              <p>{blog.blogDescription}</p>
            </div>
          ))
        ) : (
          <p>No blogs available.</p>
        )}
      </div>
    </>
  );
};
export default Navbar2;
