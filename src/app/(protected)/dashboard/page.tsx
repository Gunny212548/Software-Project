"use client";

import styles from "./page.module.css";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { useTheme } from "next-themes";

export default function DashboardPage() {
  const { theme } = useTheme();

  const monthlyData = [
    { month: "Jan", patients: 30, growth: 10 },
    { month: "Feb", patients: 45, growth: 20 },
    { month: "Mar", patients: 60, growth: 30 },
    { month: "Apr", patients: 40, growth: 15 },
    { month: "May", patients: 80, growth: 50 },
    { month: "Jun", patients: 70, growth: 35 },
  ];

  const consentData = [
    { name: "Approved", value: 70 },
    { name: "Pending", value: 20 },
    { name: "Rejected", value: 10 },
  ];

  // ✅ กำหนดสี Pie chart ให้ contrast
  const COLORS =
    theme === "dark"
      ? ["#4CA771", "#58A6FF", "#E55353"] // Dark: green, blue, red
      : ["#4CA771", "#C0E6BA", "#013237"]; // Light

  const activities = [
    {
      time: "09:15 - 18/09/2025",
      detail: "Dr. A added new patient record (Patient #102)",
    },
    { time: "11:30 - 18/09/2025", detail: "Consent form updated for Patient #56" },
    { time: "14:00 - 18/09/2025", detail: "Report generated for Patient #23" },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Dashboard</h1>
      <p className={styles.subtitle}>Overview of PGx Platform Data</p>

      <div className={styles.grid}>
        {/* Left Side */}
        <div className={styles.left}>
          {/* Summary Cards */}
          <div className={styles.cards}>
            <div className={styles.card}>
              <h3>Patients</h3>
              <p className={styles.number}>120</p>
            </div>
            <div className={styles.card}>
              <h3>Consents</h3>
              <p className={styles.number}>95</p>
            </div>
            <div className={styles.card}>
              <h3>Reports</h3>
              <p className={styles.number}>60</p>
            </div>
          </div>

          {/* Bar Chart */}
          <div className={styles.chartBox}>
            <h3>Patients per Month</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={monthlyData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={theme === "dark" ? "#444" : "#ccc"}
                />
                <XAxis
                  dataKey="month"
                  stroke={theme === "dark" ? "#E6EDF3" : "#013237"}
                />
                <YAxis stroke={theme === "dark" ? "#E6EDF3" : "#013237"} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: theme === "dark" ? "#161B22" : "#fff",
                    color: theme === "dark" ? "#E6EDF3" : "#000",
                  }}
                />
                <Bar
                  dataKey="patients"
                  fill={theme === "dark" ? "#4CA771" : "#4CA771"}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Line Chart */}
          <div className={styles.chartBox}>
            <h3>Patient Growth Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={monthlyData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={theme === "dark" ? "#444" : "#ccc"}
                />
                <XAxis
                  dataKey="month"
                  stroke={theme === "dark" ? "#E6EDF3" : "#013237"}
                />
                <YAxis stroke={theme === "dark" ? "#E6EDF3" : "#013237"} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: theme === "dark" ? "#161B22" : "#fff",
                    color: theme === "dark" ? "#E6EDF3" : "#000",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="growth"
                  stroke={theme === "dark" ? "#58A6FF" : "#013237"}
                  strokeWidth={2}
                  dot={{
                    stroke: theme === "dark" ? "#4CA771" : "#013237",
                    r: 4,
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Side */}
        <div className={styles.right}>
          {/* Activity */}
          <div className={styles.activity}>
            <h3>Recent Activity</h3>
            <ul>
              {activities.map((a, i) => (
                <li key={i}>
                  <div className={styles.timelineDot}></div>
                  <div>
                    <span className={styles.time}>{a.time}</span>
                    <span className={styles.detail}>{a.detail}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Pie Chart */}
          <div className={styles.chartBox}>
            <h3>Consent Status</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={consentData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label
                >
                  {consentData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: theme === "dark" ? "#161B22" : "#fff",
                    color: theme === "dark" ? "#E6EDF3" : "#000",
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
