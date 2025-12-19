import { FaCheckCircle, FaClock, FaCog, FaTimesCircle } from "react-icons/fa";

const GetStatusIcon = (status) => {
  switch (status) {
    case "Pending":
      return <FaClock className="text-yellow-500" />;
    case "In-Progress":
      return <FaCog className="text-blue-500" />;
    case "Working":
      return <FaCog className="text-orange-500" />;
    case "Resolved":
      return <FaCheckCircle className="text-green-500" />;
    case "Rejected":
      return <FaTimesCircle className="text-red-500" />;
    default:
      return <FaClock className="text-gray-500" />;
  }
};
export default GetStatusIcon;
