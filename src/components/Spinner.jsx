import { HashLoader } from "react-spinners";

export default function Spinner() {
  return (
    <div className="flex justify-center items-center h-screen">
      <HashLoader size={90} color="#2563eb" /> 
    </div>
  );
}
