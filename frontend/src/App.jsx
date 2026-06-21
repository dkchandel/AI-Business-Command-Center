// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import axios from "axios";
// import { saveAs } from "file-saver";
// import Login from "./Login";

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
//   FaDatabase,
// } from "react-icons/fa";

// function App() {

//   // ==============================
//   // STATES
//   // ==============================

//   const [sales, setSales] = useState(0);

//   const [regionData, setRegionData] = useState([]);

//   const [question, setQuestion] = useState("");

//   const [aiResponse, setAiResponse] = useState("");

//   const [loading, setLoading] = useState(false);

//   const [error, setError] = useState("");

//   const [darkMode, setDarkMode] = useState(false);

//   const [searchRegion, setSearchRegion] = useState("");

//   const [growth, setGrowth] = useState(0);

//   const [databaseStatus, setDatabaseStatus] = useState("Disconnected");

//   const [isLoggedIn, setIsLoggedIn] = useState(
//     localStorage.getItem("isLoggedIn") === "true"
//   );

//   // ==============================
//   // FETCH APIs
//   // ==============================

//   useEffect(() => {

//     // Total Sales API
//     axios
//       .get("http://127.0.0.1:8000/total-sales")
//       .then((response) => {
//         setSales(response.data.total_sales);
//       })
//       .catch((error) => {
//         console.log(error);
//       });

//     // Region Sales API  ← FIX: response.data.region_sales
//     axios
//       .get("http://127.0.0.1:8000/region-sales")
//       .then((response) => {
//         setRegionData(response.data.region_sales);
//       })
//       .catch((error) => {
//         console.log(error);
//       });

//     // Sales Growth API
//     axios
//       .get("http://127.0.0.1:8000/sales-growth")
//       .then((response) => {
//         setGrowth(response.data.growth_percentage);
//       })
//       .catch((error) => {
//         console.log(error);
//       });

//     // Database Status API
//     axios
//       .get("http://127.0.0.1:8000/database-status")
//       .then((response) => {
//         setDatabaseStatus(response.data.status);
//       })
//       .catch((error) => {
//         console.log(error);
//       });

//   }, []);

//   // ==============================
//   // AI FUNCTION
//   // ==============================

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

//   // ==============================
//   // EXPORT CSV  ← FIX: item.total
//   // ==============================

//   const exportCSV = () => {

//     const csvData = [
//       ["Region", "Sales Amount"],
//       ...regionData.map((item) => [
//         item.region,
//         item.total,
//       ]),
//     ];

//     const csvContent = csvData
//       .map((row) => row.join(","))
//       .join("\n");

//     const blob = new Blob([csvContent], {
//       type: "text/csv;charset=utf-8;",
//     });

//     saveAs(blob, "sales_report.csv");

//   };

//   // ==============================
//   // TOP REGION LOGIC  ← FIX: item.total
//   // ==============================

//   const topRegion =
//     regionData.length > 0
//       ? regionData.reduce((prev, current) =>
//           prev.total > current.total ? prev : current
//         ).region
//       : "Loading...";

//   // ==============================
//   // SEARCH FILTER
//   // ==============================

//   const filteredData = regionData.filter((item) =>
//     item.region.toLowerCase().includes(searchRegion.toLowerCase())
//   );

//   // ==============================
//   // LOGIN CHECK
//   // ==============================

//   if (!isLoggedIn) {
//     return <Login setIsLoggedIn={setIsLoggedIn} />;
//   }

//   // ==============================
//   // UI
//   // ==============================

//   return (

//     <div
//       className={`flex min-h-screen ${
//         darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
//       }`}
//     >

//       {/* ==========================
//           SIDEBAR
//       ========================== */}

//       <div
//         className={`w-20 md:w-64 p-6 ${
//           darkMode ? "bg-black text-white" : "bg-white text-black shadow-2xl"
//         }`}
//       >

//         <h1 className="text-2xl font-bold mb-10 hidden md:block">
//           AI Dashboard
//         </h1>

//         <ul className="space-y-6 text-lg">

//           <li className="flex items-center gap-3 cursor-pointer hover:text-gray-400">
//             <FaHome />
//             <span className="hidden md:block">Dashboard</span>
//           </li>

//           <li className="flex items-center gap-3 cursor-pointer hover:text-gray-400">
//             <FaChartBar />
//             <span className="hidden md:block">Analytics</span>
//           </li>

//           <li className="flex items-center gap-3 cursor-pointer hover:text-gray-400">
//             <FaRobot />
//             <span className="hidden md:block">AI Insights</span>
//           </li>

//           <li className="flex items-center gap-3 cursor-pointer hover:text-gray-400">
//             <FaFileAlt />
//             <span className="hidden md:block">Reports</span>
//           </li>

//         </ul>

//       </div>

//       {/* ==========================
//           MAIN CONTENT
//       ========================== */}

//       <div className="flex-1 p-5 md:p-10">

//         {/* NAVBAR */}

//         <motion.div
//           initial={{ opacity: 0, y: -50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className={`p-5 rounded-xl shadow-2xl mb-10 flex justify-between items-center ${
//             darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
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
//               className="px-4 py-2 rounded-lg border"
//             >
//               {darkMode ? "Light" : "Dark"}
//             </button>

//             <button
//               onClick={exportCSV}
//               className={`px-4 py-2 rounded-lg ${
//                 darkMode ? "bg-white text-black" : "bg-black text-white"
//               }`}
//             >
//               Download Report
//             </button>

//             <button
//               onClick={() => {
//                 localStorage.removeItem("isLoggedIn");
//                 window.location.reload();
//               }}
//               className="bg-red-500 text-white px-4 py-2 rounded-lg"
//             >
//               Logout
//             </button>

//           </div>

//         </motion.div>

//         {/* ==========================
//             CARDS
//         ========================== */}

//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">

//           {/* DATABASE STATUS */}
//           <motion.div
//             whileHover={{ scale: 1.05 }}
//             className="bg-green-600 text-white p-6 rounded-xl shadow-2xl"
//           >
//             <div className="flex items-center gap-3">
//               <FaDatabase size={28} />
//               <h2 className="text-xl font-semibold">Database Status</h2>
//             </div>
//             <p className="text-3xl mt-4">{databaseStatus}</p>
//           </motion.div>

//           {/* TOTAL SALES */}
//           <motion.div
//             whileHover={{ scale: 1.05 }}
//             className="bg-blue-500 text-white p-6 rounded-xl shadow-2xl"
//           >
//             <h2 className="text-xl font-semibold">Total Sales</h2>
//             <p className="text-3xl mt-4">₹ {sales}</p>
//           </motion.div>

//           {/* TOP REGION */}
//           <motion.div
//             whileHover={{ scale: 1.05 }}
//             className="bg-green-500 text-white p-6 rounded-xl shadow-2xl"
//           >
//             <h2 className="text-xl font-semibold">Top Region</h2>
//             <p className="text-3xl mt-4">{topRegion}</p>
//           </motion.div>

//           {/* SALES GROWTH */}
//           <motion.div
//             whileHover={{ scale: 1.05 }}
//             className="bg-purple-500 text-white p-6 rounded-xl shadow-2xl"
//           >
//             <h2 className="text-xl font-semibold">Sales Growth</h2>
//             <p className="text-3xl mt-4">+{growth}%</p>
//           </motion.div>

//         </div>

//         {/* ==========================
//             CHART SECTION
//         ========================== */}

//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.4 }}
//           className={`p-6 rounded-xl shadow-2xl mb-10 ${
//             darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
//           }`}
//         >

//           <h2 className="text-2xl font-bold mb-6">Region Wise Sales</h2>

//           {/* SEARCH */}
//           <input
//             type="text"
//             placeholder="Search Region..."
//             value={searchRegion}
//             onChange={(e) => setSearchRegion(e.target.value)}
//             className="border p-3 rounded-lg mb-4 w-full text-black"
//           />

//           {/* CHART  ← FIX: dataKey="total" */}
//           <ResponsiveContainer width="100%" height={400}>
//             <BarChart data={filteredData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="region" />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey="total" fill="#6366f1" />
//             </BarChart>
//           </ResponsiveContainer>

//         </motion.div>

//         {/* ==========================
//             AI SECTION
//         ========================== */}

//         <motion.div
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.5 }}
//           className={`p-6 rounded-xl shadow-2xl ${
//             darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
//           }`}
//         >

//           <h2 className="text-2xl font-bold mb-4">AI Business Insight</h2>

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

//           {error && (
//             <p className="text-red-500 mb-4">{error}</p>
//           )}

//           <button
//             onClick={askAI}
//             disabled={loading}
//             className="bg-black text-white px-6 py-3 rounded-lg disabled:bg-gray-400"
//           >
//             {loading ? "Loading..." : "Ask AI"}
//           </button>

//           <div
//             className={`mt-6 p-4 rounded-lg ${
//               darkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-black"
//             }`}
//           >
//             <h3 className="text-xl font-semibold">AI Response:</h3>
//             <p className="mt-2">{aiResponse}</p>
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
import Login from "./Login";

import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  CartesianGrid, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Legend,
} from "recharts";

import {
  FaChartBar, FaRobot, FaFileAlt,
  FaHome, FaDatabase,
} from "react-icons/fa";

// ==============================
// COLORS FOR PIE CHART
// ==============================
const COLORS = [
  "#6366f1", "#22c55e", "#f59e0b",
  "#ef4444", "#3b82f6", "#8b5cf6",
  "#ec4899", "#14b8a6",
];

function App() {

  // ==============================
  // STATES
  // ==============================
  const [sales, setSales] = useState(0);
  const [regionData, setRegionData] = useState([]);
  const [question, setQuestion] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [searchRegion, setSearchRegion] = useState("");
  const [growth, setGrowth] = useState(0);
  const [databaseStatus, setDatabaseStatus] = useState("Disconnected");
  const [activePage, setActivePage] = useState("Dashboard");
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  // ==============================
  // FETCH APIs
  // ==============================
  useEffect(() => {

    axios.get("http://127.0.0.1:8000/total-sales")
      .then((res) => setSales(res.data.total_sales))
      .catch((err) => console.log(err));

    axios.get("http://127.0.0.1:8000/region-sales")
      .then((res) => setRegionData(res.data.region_sales))
      .catch((err) => console.log(err));

    axios.get("http://127.0.0.1:8000/sales-growth")
      .then((res) => setGrowth(res.data.growth_percentage))
      .catch((err) => console.log(err));

    axios.get("http://127.0.0.1:8000/database-status")
      .then((res) => setDatabaseStatus(res.data.status))
      .catch((err) => console.log(err));

  }, []);

  // ==============================
  // AI FUNCTION
  // ==============================
  const askAI = () => {
    if (!question) {
      setError("Please enter a question.");
      return;
    }
    setLoading(true);
    setError("");

    axios.get(`http://127.0.0.1:8000/ask-ai?question=${question}`)
      .then((res) => setAiResponse(res.data.ai_response))
      .catch((err) => {
        console.log(err);
        setError("Failed to fetch AI response.");
      })
      .finally(() => setLoading(false));
  };

  // ==============================
  // EXPORT CSV
  // ==============================
  const exportCSV = () => {
    const csvData = [
      ["Region", "Sales Amount"],
      ...regionData.map((item) => [item.region, item.total]),
    ];
    const csvContent = csvData.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "sales_report.csv");
  };

  // ==============================
  // TOP REGION
  // ==============================
  const topRegion =
    regionData.length > 0
      ? regionData.reduce((prev, curr) =>
          prev.total > curr.total ? prev : curr
        ).region
      : "Loading...";

  // ==============================
  // SEARCH FILTER
  // ==============================
  const filteredData = regionData.filter((item) =>
    item.region.toLowerCase().includes(searchRegion.toLowerCase())
  );

  // ==============================
  // LOGIN CHECK
  // ==============================
  if (!isLoggedIn) {
    return <Login setIsLoggedIn={setIsLoggedIn} />;
  }

  // ==============================
  // SIDEBAR MENU ITEMS
  // ==============================
  const menuItems = [
    { name: "Dashboard", icon: <FaHome /> },
    { name: "Analytics", icon: <FaChartBar /> },
    { name: "AI Insights", icon: <FaRobot /> },
    { name: "Reports", icon: <FaFileAlt /> },
  ];

  const bg = darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black";
  const cardBg = darkMode ? "bg-gray-800 text-white" : "bg-white text-black";

  // ==============================
  // UI
  // ==============================
  return (
    <div className={`flex min-h-screen ${bg}`}>

      {/* ==========================
          SIDEBAR — STICKY
      ========================== */}
      <div
        className={`w-20 md:w-64 p-6 sticky top-0 h-screen overflow-y-auto ${
          darkMode ? "bg-black text-white" : "bg-white text-black shadow-2xl"
        }`}
      >
        <h1 className="text-2xl font-bold mb-10 hidden md:block">
          AI Dashboard
        </h1>

        <ul className="space-y-4 text-lg">
          {menuItems.map((item) => (
            <li
              key={item.name}
              onClick={() => setActivePage(item.name)}
              className={`flex items-center gap-3 cursor-pointer px-3 py-2 rounded-lg transition-all ${
                activePage === item.name
                  ? "bg-indigo-500 text-white"
                  : darkMode
                  ? "hover:bg-gray-700"
                  : "hover:bg-gray-100"
              }`}
            >
              {item.icon}
              <span className="hidden md:block">{item.name}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* ==========================
          MAIN CONTENT
      ========================== */}
      <div className="flex-1 p-5 md:p-10">

        {/* NAVBAR */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`p-5 rounded-xl shadow-2xl mb-10 flex justify-between items-center ${cardBg}`}
        >
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">
              {activePage}
            </h2>
            <p className="text-sm opacity-70">Real-Time AI Analytics System</p>
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
                darkMode ? "bg-white text-black" : "bg-black text-white"
              }`}
            >
              Download Report
            </button>

            <button
              onClick={() => {
                localStorage.removeItem("isLoggedIn");
                window.location.reload();
              }}
              className="bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Logout
            </button>
          </div>
        </motion.div>

        {/* ==========================
            DASHBOARD PAGE
        ========================== */}
        {activePage === "Dashboard" && (
          <>
            {/* CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
              <motion.div whileHover={{ scale: 1.05 }}
                className="bg-green-600 text-white p-6 rounded-xl shadow-2xl">
                <div className="flex items-center gap-3">
                  <FaDatabase size={28} />
                  <h2 className="text-xl font-semibold">Database Status</h2>
                </div>
                <p className="text-3xl mt-4">{databaseStatus}</p>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }}
                className="bg-blue-500 text-white p-6 rounded-xl shadow-2xl">
                <h2 className="text-xl font-semibold">Total Sales</h2>
                <p className="text-3xl mt-4">₹ {sales}</p>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }}
                className="bg-green-500 text-white p-6 rounded-xl shadow-2xl">
                <h2 className="text-xl font-semibold">Top Region</h2>
                <p className="text-3xl mt-4">{topRegion}</p>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }}
                className="bg-purple-500 text-white p-6 rounded-xl shadow-2xl">
                <h2 className="text-xl font-semibold">Sales Growth</h2>
                <p className="text-3xl mt-4">+{growth}%</p>
              </motion.div>
            </div>

            {/* REGION CHART */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className={`p-6 rounded-xl shadow-2xl mb-10 ${cardBg}`}
            >
              <h2 className="text-2xl font-bold mb-6">Region Wise Sales</h2>
              <input
                type="text"
                placeholder="Search Region..."
                value={searchRegion}
                onChange={(e) => setSearchRegion(e.target.value)}
                className="border p-3 rounded-lg mb-4 w-full text-black"
              />
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={filteredData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="region" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="total" fill="#6366f1" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </>
        )}

        {/* ==========================
            ANALYTICS PAGE
        ========================== */}
        {activePage === "Analytics" && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              {/* PIE CHART */}
              <div className={`p-6 rounded-xl shadow-2xl ${cardBg}`}>
                <h2 className="text-2xl font-bold mb-6">
                  Region Share (Pie Chart)
                </h2>
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>
                    <Pie
                      data={regionData}
                      dataKey="total"
                      nameKey="region"
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
                      label={({ region }) => region}
                    >
                      {regionData.map((_, index) => (
                        <Cell
                          key={index}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* LINE CHART */}
              <div className={`p-6 rounded-xl shadow-2xl ${cardBg}`}>
                <h2 className="text-2xl font-bold mb-6">
                  Sales Trend (Line Chart)
                </h2>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={regionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="region" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="total"
                      stroke="#6366f1"
                      strokeWidth={3}
                      dot={{ r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* DATA TABLE */}
              <div className={`p-6 rounded-xl shadow-2xl md:col-span-2 ${cardBg}`}>
                <h2 className="text-2xl font-bold mb-6">Region Sales Table</h2>
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-indigo-500 text-white">
                      <th className="p-3 rounded-tl-lg">#</th>
                      <th className="p-3">Region</th>
                      <th className="p-3 rounded-tr-lg">Total Sales (₹)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {regionData.map((item, index) => (
                      <tr
                        key={index}
                        className={`border-b ${
                          index % 2 === 0
                            ? darkMode ? "bg-gray-700" : "bg-gray-50"
                            : ""
                        }`}
                      >
                        <td className="p-3">{index + 1}</td>
                        <td className="p-3 font-semibold">{item.region}</td>
                        <td className="p-3">₹ {item.total.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          </motion.div>
        )}

        {/* ==========================
            AI INSIGHTS PAGE
        ========================== */}
        {activePage === "AI Insights" && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`p-6 rounded-xl shadow-2xl ${cardBg}`}
          >
            <h2 className="text-2xl font-bold mb-4">AI Business Insight</h2>
            <p className="text-sm opacity-60 mb-6">
              Sales data ke baare mein koi bhi sawal puchho
            </p>

            <input
              type="text"
              placeholder="Ask business question... e.g. Which region has highest sales?"
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

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <button
              onClick={askAI}
              disabled={loading}
              className="bg-indigo-500 text-white px-6 py-3 rounded-lg disabled:bg-gray-400 hover:bg-indigo-600"
            >
              {loading ? "Thinking..." : "Ask AI"}
            </button>

            <div
              className={`mt-6 p-4 rounded-lg ${
                darkMode ? "bg-gray-700" : "bg-gray-100"
              }`}
            >
              <h3 className="text-xl font-semibold mb-2">AI Response:</h3>
              <p className="leading-relaxed">
                {aiResponse || "Koi sawal puchho..."}
              </p>
            </div>
          </motion.div>
        )}

        {/* ==========================
            REPORTS PAGE
        ========================== */}
        {activePage === "Reports" && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className={`p-6 rounded-xl shadow-2xl ${cardBg}`}>
                <h3 className="text-lg font-semibold mb-2">Total Revenue</h3>
                <p className="text-4xl font-bold text-indigo-500">
                  ₹ {sales?.toLocaleString()}
                </p>
              </div>
              <div className={`p-6 rounded-xl shadow-2xl ${cardBg}`}>
                <h3 className="text-lg font-semibold mb-2">Top Region</h3>
                <p className="text-4xl font-bold text-green-500">{topRegion}</p>
              </div>
              <div className={`p-6 rounded-xl shadow-2xl ${cardBg}`}>
                <h3 className="text-lg font-semibold mb-2">Total Regions</h3>
                <p className="text-4xl font-bold text-purple-500">
                  {regionData.length}
                </p>
              </div>
            </div>

            <div className={`p-6 rounded-xl shadow-2xl ${cardBg}`}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Full Sales Report</h2>
                <button
                  onClick={exportCSV}
                  className="bg-indigo-500 text-white px-5 py-2 rounded-lg hover:bg-indigo-600"
                >
                  Export CSV
                </button>
              </div>

              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-indigo-500 text-white">
                    <th className="p-3">#</th>
                    <th className="p-3">Region</th>
                    <th className="p-3">Total Sales (₹)</th>
                    <th className="p-3">% of Total</th>
                  </tr>
                </thead>
                <tbody>
                  {[...regionData]
                    .sort((a, b) => b.total - a.total)
                     .map((item, index) => (
                      <tr
                        key={index}
                        className={`border-b ${
                          index % 2 === 0
                            ? darkMode ? "bg-gray-700" : "bg-gray-50"
                            : ""
                        }`}
                      >
                        <td className="p-3">{index + 1}</td>
                        <td className="p-3 font-semibold">{item.region}</td>
                        <td className="p-3">₹ {item.total.toLocaleString()}</td>
                        <td className="p-3">
                          {sales > 0
                            ? ((item.total / sales) * 100).toFixed(1) + "%"
                            : "0%"}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
}

export default App;