// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import axios from "axios";
// import { saveAs } from "file-saver";

// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   ResponsiveContainer,
// } from "recharts";

// import {
//   FaChartBar,
//   FaRobot,
//   FaFileAlt,
//   FaHome,
// } from "react-icons/fa";

// function App() {

//   const [sales, setSales] = useState(0);
//   const [regionData, setRegionData] = useState([]);

//   const [question, setQuestion] = useState("");
//   const [aiResponse, setAiResponse] = useState("");

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const [darkMode, setDarkMode] = useState(false);

//   const [searchRegion, setSearchRegion] = useState("");

//   useEffect(() => {

//     axios
//       .get("http://127.0.0.1:8000/total-sales")
//       .then((response) => {
//         setSales(response.data.total_sales);
//       })
//       .catch((error) => {
//         console.log(error);
//       });

//     axios
//       .get("http://127.0.0.1:8000/region-sales")
//       .then((response) => {

//         const formattedData = SetRegionData(response.data).map(
//           ([region, sales]) => ({
//             region,
//             sales,
//           })
//         );

//         setRegionData(formattedData);

//       })
//       .catch((error) => {
//         console.log(error);
//       });

//   }, []);

//   // AI Function
//   const askAI = () => {

//     if (!question) {
//       setError("Please enter a question.");
//       return;
//     }

//     setLoading(true);
//     setError("");

//     axios
//       .get(`http://127.0.0.1:8000/ask-ai?question=${question}`)

//       .then((response) => {
//         setAiResponse(response.data.ai_response);
//       })

//       .catch((error) => {

//         console.log(error);
//         setError("Failed to fetch AI response.");

//       })

//       .finally(() => {
//         setLoading(false);
//       });

//   };

//   // CSV Export
//   const exportCSV = () => {

//     const csvData = [
//       ["Region", "Sales"],

//       ...regionData.map((item) => [
//         item.region,
//         item.sales,
//       ]),
//     ];

//     const csvContent = csvData
//       .map((row) => row.join(","))
//       .join("\n");

//     const blob = new Blob(
//       [csvContent],
//       { type: "text/csv;charset=utf-8;" }
//     );

//     saveAs(blob, "sales_report.csv");

//   };

//   // Top Region
//   const topRegion =
//     regionData.length > 0
//       ? regionData.reduce((prev, current) =>
//           prev.sales > current.sales
//             ? prev
//             : current
//         ).region
//       : "Loading...";

//   // Search Filter
//   const filteredData = regionData.filter((item) =>
//     item.region
//       .toLowerCase()
//       .includes(searchRegion.toLowerCase())
//   );

//   return (

//     <div
//       className={`flex min-h-screen ${
//         darkMode
//           ? "bg-gray-900 text-white"
//           : "bg-gray-100 text-black"
//       }`}
//     >

//       {/* Sidebar */}
//       <div
//         className={`w-20 md:w-64 p-6 ${
//           darkMode
//             ? "bg-black text-white"
//             : "bg-white text-black shadow-2xl"
//         }`}
//       >

//         <h1 className="text-2xl font-bold mb-10 hidden md:block">
//           AI Dashboard
//         </h1>

//         <ul className="space-y-6 text-lg">

//           <li className="flex items-center gap-3 cursor-pointer hover:text-gray-400">
//             <FaHome />
//             <span className="hidden md:block">
//               Dashboard
//             </span>
//           </li>

//           <li className="flex items-center gap-3 cursor-pointer hover:text-gray-400">
//             <FaChartBar />
//             <span className="hidden md:block">
//               Analytics
//             </span>
//           </li>

//           <li className="flex items-center gap-3 cursor-pointer hover:text-gray-400">
//             <FaRobot />
//             <span className="hidden md:block">
//               AI Insights
//             </span>
//           </li>

//           <li className="flex items-center gap-3 cursor-pointer hover:text-gray-400">
//             <FaFileAlt />
//             <span className="hidden md:block">
//               Reports
//             </span>
//           </li>

//         </ul>

//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-5 md:p-10">

//         {/* Navbar */}
//         <motion.div

//           initial={{ opacity: 0, y: -50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}

//           className={`p-5 rounded-xl shadow-2xl mb-10 flex justify-between items-center ${
//             darkMode
//               ? "bg-gray-800 text-white"
//               : "bg-white text-black"
//           }`}
//         >

//           <div>

//             <h2 className="text-2xl md:text-3xl font-bold">
//               Business Overview
//             </h2>

//             <p className="text-sm opacity-70">
//               Real-Time AI Analytics System
//             </p>

//           </div>

//           <div className="flex gap-4">

//             <button
//               onClick={() => setDarkMode(!darkMode)}
//               className="px-4 md:px-5 py-2 rounded-lg border"
//             >
//               {darkMode ? "Light" : "Dark"}
//             </button>

//             <button
//               onClick={exportCSV}
//               className={`px-4 md:px-5 py-2 rounded-lg ${
//                 darkMode
//                   ? "bg-white text-black"
//                   : "bg-black text-white"
//               }`}
//             >
//               Download Report
//             </button>

//           </div>

//         </motion.div>

//         {/* Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

//           <motion.div
//             whileHover={{ scale: 1.05 }}
//             className="bg-blue-500 text-white p-6 rounded-xl shadow-2xl"
//           >

//             <h2 className="text-xl font-semibold">
//               Total Sales
//             </h2>

//             <p className="text-3xl mt-4">
//               ₹ {sales.toFixed(2)}
//             </p>

//           </motion.div>

//           <motion.div
//             whileHover={{ scale: 1.05 }}
//             className="bg-green-500 text-white p-6 rounded-xl shadow-2xl"
//           >

//             <h2 className="text-xl font-semibold">
//               Top Region
//             </h2>

//             <p className="text-3xl mt-4">
//               {topRegion}
//             </p>

//           </motion.div>

//           <motion.div
//             whileHover={{ scale: 1.05 }}
//             className="bg-purple-500 text-white p-6 rounded-xl shadow-2xl"
//           >

//             <h2 className="text-xl font-semibold">
//               Sales Growth
//             </h2>

//             <p className="text-3xl mt-4">
//               +18.5%
//             </p>

//           </motion.div>

//         </div>

//         {/* Chart Section */}
//         <motion.div

//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.4 }}

//           className={`p-6 rounded-xl shadow-2xl mb-10 ${
//             darkMode
//               ? "bg-gray-800 text-white"
//               : "bg-white text-black"
//           }`}
//         >

//           <h2 className="text-2xl font-bold mb-6">
//             Region Wise Sales
//           </h2>

//           <input
//             type="text"
//             placeholder="Search Region..."
//             value={searchRegion}
//             onChange={(e) =>
//               setSearchRegion(e.target.value)
//             }
//             className="border p-3 rounded-lg mb-4 w-full text-black"
//           />

//           {
//             regionData.length === 0 ? (
//               <p>Loading Chart...</p>
//             ) : (

//               <ResponsiveContainer width="100%" height={400}>

//                 <BarChart data={filteredData}>

//                   <CartesianGrid strokeDasharray="3 3" />

//                   <XAxis dataKey="region" />

//                   <YAxis />

//                   <Tooltip />

//                   <Bar dataKey="sales_amount" />

//                 </BarChart>

//               </ResponsiveContainer>

//             )
//           }

//         </motion.div>

//         {/* AI Section */}
//         <motion.div

//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.5 }}

//           className={`p-6 rounded-xl shadow-2xl ${
//             darkMode
//               ? "bg-gray-800 text-white"
//               : "bg-white text-black"
//           }`}
//         >

//           <h2 className="text-2xl font-bold mb-4">
//             AI Business Insight
//           </h2>

//           <input
//             type="text"
//             placeholder="Ask business question..."
//             value={question}
//             onChange={(e) => {

//               setQuestion(e.target.value);
//               setError("");

//             }}
//             className={`border p-3 w-full rounded-lg mb-4 ${
//               darkMode
//                 ? "bg-gray-700 text-white border-gray-600"
//                 : "bg-white text-black"
//             }`}
//           />

//           {
//             error && (
//               <p className="text-red-500 mb-4">
//                 {error}
//               </p>
//             )
//           }

//           <button
//             onClick={askAI}
//             disabled={loading}
//             className="bg-black text-white px-6 py-3 rounded-lg disabled:bg-gray-400 hover:scale-105 transition duration-300"
//           >

//             {loading ? "Loading..." : "Ask AI"}

//           </button>

//           <div
//             className={`mt-6 p-4 rounded-lg ${
//               darkMode
//                 ? "bg-gray-700 text-white"
//                 : "bg-gray-100 text-black"
//             }`}
//           >

//             <h3 className="text-xl font-semibold">
//               AI Response:
//             </h3>

//             <p className="mt-2">
//               {aiResponse}
//             </p>

//           </div>

//         </motion.div>

//       </div>

//     </div>
//   );
// }

// export default App;






import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { saveAs } from "file-saver";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import {
  FaChartBar,
  FaRobot,
  FaFileAlt,
  FaHome,
} from "react-icons/fa";

function App() {

  const [sales, setSales] = useState(0);
  const [regionData, setRegionData] = useState([]);

  const [question, setQuestion] = useState("");
  const [aiResponse, setAiResponse] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [darkMode, setDarkMode] = useState(false);

  const [searchRegion, setSearchRegion] = useState("");

  // Fetch APIs
  useEffect(() => {

    // Total Sales
    axios
      .get("http://127.0.0.1:8000/total-sales")
      .then((response) => {

        setSales(response.data.total_sales);

      })
      .catch((error) => {

        console.log(error);

      });

    // Region Sales
    axios
      .get("http://127.0.0.1:8000/region-sales")
      .then((response) => {

        setRegionData(response.data);

      })
      .catch((error) => {

        console.log(error);

      });

  }, []);

  // AI Function
  const askAI = () => {

    if (!question) {

      setError("Please enter a question.");
      return;

    }

    setLoading(true);
    setError("");

    axios
      .get(`http://127.0.0.1:8000/ask-ai?question=${question}`)

      .then((response) => {

        setAiResponse(response.data.ai_response);

      })

      .catch((error) => {

        console.log(error);

        setError("Failed to fetch AI response.");

      })

      .finally(() => {

        setLoading(false);

      });

  };

  // Export CSV
  const exportCSV = () => {

    const csvData = [

      ["Region", "Sales Amount"],

      ...regionData.map((item) => [
        item.region,
        item.sales_amount,
      ]),

    ];

    const csvContent = csvData
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob(
      [csvContent],
      { type: "text/csv;charset=utf-8;" }
    );

    saveAs(blob, "sales_report.csv");

  };

  // Top Region
  const topRegion =
    regionData.length > 0
      ? regionData.reduce((prev, current) =>
          prev.sales_amount > current.sales_amount
            ? prev
            : current
        ).region
      : "Loading...";

  // Filter Search
  const filteredData = regionData.filter((item) =>
    item.region
      .toLowerCase()
      .includes(searchRegion.toLowerCase())
  );

  return (

    <div
      className={`flex min-h-screen ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-black"
      }`}
    >

      {/* Sidebar */}
      <div
        className={`w-20 md:w-64 p-6 ${
          darkMode
            ? "bg-black text-white"
            : "bg-white text-black shadow-2xl"
        }`}
      >

        <h1 className="text-2xl font-bold mb-10 hidden md:block">
          AI Dashboard
        </h1>

        <ul className="space-y-6 text-lg">

          <li className="flex items-center gap-3 cursor-pointer hover:text-gray-400">
            <FaHome />
            <span className="hidden md:block">
              Dashboard
            </span>
          </li>

          <li className="flex items-center gap-3 cursor-pointer hover:text-gray-400">
            <FaChartBar />
            <span className="hidden md:block">
              Analytics
            </span>
          </li>

          <li className="flex items-center gap-3 cursor-pointer hover:text-gray-400">
            <FaRobot />
            <span className="hidden md:block">
              AI Insights
            </span>
          </li>

          <li className="flex items-center gap-3 cursor-pointer hover:text-gray-400">
            <FaFileAlt />
            <span className="hidden md:block">
              Reports
            </span>
          </li>

        </ul>

      </div>

      {/* Main */}
      <div className="flex-1 p-5 md:p-10">

        {/* Navbar */}
        <motion.div

          initial={{ opacity: 0, y: -50 }}

          animate={{ opacity: 1, y: 0 }}

          transition={{ duration: 0.6 }}

          className={`p-5 rounded-xl shadow-2xl mb-10 flex justify-between items-center ${
            darkMode
              ? "bg-gray-800 text-white"
              : "bg-white text-black"
          }`}
        >

          <div>

            <h2 className="text-2xl md:text-3xl font-bold">
              Business Overview
            </h2>

            <p className="text-sm opacity-70">
              Real-Time AI Analytics System
            </p>

          </div>

          <div className="flex gap-4">

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-4 py-2 rounded-lg border"
            >
              {darkMode ? "Light" : "Dark"}
            </button>

            <button
              onClick={exportCSV}
              className={`px-4 py-2 rounded-lg ${
                darkMode
                  ? "bg-white text-black"
                  : "bg-black text-white"
              }`}
            >
              Download Report
            </button>

          </div>

        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-blue-500 text-white p-6 rounded-xl shadow-2xl"
          >

            <h2 className="text-xl font-semibold">
              Total Sales
            </h2>

            <p className="text-3xl mt-4">
              ₹ {sales}
            </p>

          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-green-500 text-white p-6 rounded-xl shadow-2xl"
          >

            <h2 className="text-xl font-semibold">
              Top Region
            </h2>

            <p className="text-3xl mt-4">
              {topRegion}
            </p>

          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-purple-500 text-white p-6 rounded-xl shadow-2xl"
          >

            <h2 className="text-xl font-semibold">
              Sales Growth
            </h2>

            <p className="text-3xl mt-4">
              +18.5%
            </p>

          </motion.div>

        </div>

        {/* Chart */}
        <motion.div

          initial={{ opacity: 0 }}

          animate={{ opacity: 1 }}

          transition={{ delay: 0.4 }}

          className={`p-6 rounded-xl shadow-2xl mb-10 ${
            darkMode
              ? "bg-gray-800 text-white"
              : "bg-white text-black"
          }`}
        >

          <h2 className="text-2xl font-bold mb-6">
            Region Wise Sales
          </h2>

          <input
            type="text"
            placeholder="Search Region..."
            value={searchRegion}
            onChange={(e) =>
              setSearchRegion(e.target.value)
            }
            className="border p-3 rounded-lg mb-4 w-full text-black"
          />

          <ResponsiveContainer width="100%" height={400}>

            <BarChart data={filteredData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="region" />

              <YAxis />

              <Tooltip />

              <Bar dataKey="sales_amount" />

            </BarChart>

          </ResponsiveContainer>

        </motion.div>

        {/* AI */}
        <motion.div

          initial={{ opacity: 0, y: 50 }}

          animate={{ opacity: 1, y: 0 }}

          transition={{ delay: 0.5 }}

          className={`p-6 rounded-xl shadow-2xl ${
            darkMode
              ? "bg-gray-800 text-white"
              : "bg-white text-black"
          }`}
        >

          <h2 className="text-2xl font-bold mb-4">
            AI Business Insight
          </h2>

          <input
            type="text"
            placeholder="Ask business question..."
            value={question}
            onChange={(e) => {

              setQuestion(e.target.value);
              setError("");

            }}
            className={`border p-3 w-full rounded-lg mb-4 ${
              darkMode
                ? "bg-gray-700 text-white border-gray-600"
                : "bg-white text-black"
            }`}
          />

          {error && (

            <p className="text-red-500 mb-4">
              {error}
            </p>

          )}

          <button
            onClick={askAI}
            disabled={loading}
            className="bg-black text-white px-6 py-3 rounded-lg disabled:bg-gray-400"
          >

            {loading ? "Loading..." : "Ask AI"}

          </button>

          <div
            className={`mt-6 p-4 rounded-lg ${
              darkMode
                ? "bg-gray-700 text-white"
                : "bg-gray-100 text-black"
            }`}
          >

            <h3 className="text-xl font-semibold">
              AI Response:
            </h3>

            <p className="mt-2">
              {aiResponse}
            </p>

          </div>

        </motion.div>

      </div>

    </div>
  );
}

export default App;