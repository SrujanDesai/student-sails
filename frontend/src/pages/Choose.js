import React from "react";
import { useNavigate } from "react-router-dom";

const Choose = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-screen-lg w-full flex flex-col md:flex-row justify-center md:justify-between space-y-8 md:space-y-0 md:space-x-8">
        {/* Admin Card */}
        <div
          onClick={() => navigate("/adminlogin")}
          className="flex flex-col justify-center items-center bg-blue-500 rounded-lg shadow-md p-6 text-center hover:bg-blue-600 transition duration-300 cursor-pointer w-full md:w-auto"
        >
          <h2 className="text-2xl font-bold text-white mb-2">Admin</h2>
          <p className="text-white">
            Login as Admin to manage students, Manage all student and parent
            profiles with ease. Update student information, handle parent
            communications, and oversee system operations. Utilize powerful
            tools for efficient student data administration.
          </p>
        </div>
        {/* Student Card */}
        <div
          onClick={() => navigate("/studentlogin")}
          className="flex flex-col justify-center items-center bg-green-500 rounded-lg shadow-md p-6 text-center hover:bg-green-600 transition duration-300 cursor-pointer w-full md:w-auto"
        >
          <h2 className="text-2xl font-bold text-white mb-2">Student</h2>
          <p className="text-white">
            Login as Student, Access your personal profile and academic details.
            Update personal information, check grades, and track academic
            progress. Take control of your educational journey with our
            intuitive student interface.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Choose;
