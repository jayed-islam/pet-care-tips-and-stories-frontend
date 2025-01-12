"use client";

import React from "react";
import {
  Grid,
  Card,
  Typography,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { useGetSummaryQuery } from "@/redux/reducers/user/userApi";

// Register required Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const DashboardHomeView = () => {
  const { data, isLoading, error } = useGetSummaryQuery();

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error fetching data.</Typography>;
  }

  const { summary, chartData, users } = data?.data || {};

  const barChartData = {
    labels: [
      "Saturday",
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
    ],
    datasets: [
      {
        label: "Weekly Sales",
        data: chartData?.revenueOverview.map((item) => item.totalRevenue) || [],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const pieChartData = {
    labels: chartData?.categoryDistribution.map((item) => item.category) || [],
    datasets: [
      {
        label: "Category Distribution",
        data: chartData?.categoryDistribution.map((item) => item.count) || [],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
      },
    ],
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Dashboard Overview
      </Typography>

      <h2 className="mb-5">Overview</h2>

      {/* Summary Cards */}
      <Grid container spacing={3}>
        {summary &&
          Object.entries(summary).map(([key, value]) => (
            <Grid item xs={12} sm={6} md={3} key={key}>
              <Card
                style={{
                  padding: "20px",
                  textAlign: "center",
                  borderRadius: "10px",
                  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Typography variant="h6" color="textSecondary">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </Typography>
                <Typography variant="h4" color="primary">
                  {value}
                </Typography>
              </Card>
            </Grid>
          ))}
      </Grid>

      {/* Bar Chart */}
      <div style={{ margin: "20px 0" }} className="w-full">
        <Typography variant="h6" gutterBottom>
          Sales Overview
        </Typography>
        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Bar data={barChartData} />
        </div>
      </div>

      {/* Pie Chart */}
      <div style={{ margin: "20px 0" }} className="max-w-md">
        <Typography variant="h6" gutterBottom>
          Category Distribution
        </Typography>
        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Pie data={pieChartData} />
        </div>
      </div>

      {/* Recent Orders Table */}
      <div style={{ margin: "20px 0" }}>
        <Typography variant="h6" gutterBottom>
          Recent Users
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User ID</TableCell>
                <TableCell>name</TableCell>
                <TableCell>email</TableCell>
                <TableCell>Joined</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users?.map((user) => (
                <TableRow key={user?._id}>
                  <TableCell>{user?._id}</TableCell>
                  <TableCell>{user?.name ?? "eyebook user"}</TableCell>
                  <TableCell>{user?.email}</TableCell>
                  <TableCell>
                    {new Date(user?.createdAt as Date).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default DashboardHomeView;
