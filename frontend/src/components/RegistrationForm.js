import React, { useState } from "react";
import axios from "axios";


function RegistrationForm() {
    // const [error,setError] = useState()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNo: "",
    designation: "",
    gender: "",
    course: "",
    imgUpload: null,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const validateMobileNo = (mobileNo) => {
    const mobileRegex = /^\d{10}$/; // Validates if the mobile number has exactly 10 numeric characters
    return mobileRegex.test(mobileNo);
  };

  const handleFileChange = (event) => {
    setFormData({
      ...formData,
      imgUpload: event.target.files[0],
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateMobileNo(formData.mobileNo)) {
        alert('Invalid mobile number format');
        return;
      }
    if (!validateEmail(formData.email)) {
        alert("Invalid Email Format")
    } else {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("mobileNo", formData.mobileNo);
      formDataToSend.append("designation", formData.designation);
      formDataToSend.append("gender", formData.gender);
      formDataToSend.append("course", formData.course);
      formDataToSend.append("imgUpload", formData.imgUpload);

      console.log(formData);
      axios
        .post("http://localhost:8000/createEmployee", formDataToSend)
        .then((res) => {
          alert(res.data.message);
        })
        .catch((res) => {
          console.log("failed");
        });
    }
  };

  return (
    <div className="max-w-md mx-auto my-8 p-6 bg-gray-100 rounded-md shadow-md">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="name">
            Name:
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="email">
            Email:
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="mobileNo">
            Mobile No:
          </label>
          <input
            type="text"
            name="mobileNo"
            value={formData.mobileNo}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="designation">
            Designation:
          </label>
          <input
            type="text"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="gender">
            Gender:
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="course">
            Course:
          </label>
          <input
            type="text"
            name="course"
            value={formData.course}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="imgUpload">
            Image Upload:
          </label>
          <input
            type="file"
            accept="image/*"
            name="imgUpload"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default RegistrationForm;
