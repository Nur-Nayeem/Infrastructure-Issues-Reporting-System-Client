import { MdErrorOutline } from "react-icons/md";

const ErrorInput = ({ error }) => (
  <div className="mt-2 p-3 rounded-lg bg-red-500/10 border-l-4 border-primary text-red-400 text-sm flex items-center gap-2 shadow-md">
    <MdErrorOutline className="text-lg" />
    <span>{error}</span>
  </div>
);
export default ErrorInput;
