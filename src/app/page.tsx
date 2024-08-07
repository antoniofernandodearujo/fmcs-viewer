"use client";

import { useEffect, useState } from "react";
import DataTable from "@/components/DataTable";
import SearchBox from "@/components/SearchBox";
import PivotTable from "@/components/PivotTable";
import SwitchTables from "@/components/SwitchTables";
import Footer from "@/components/Footer";

import { loadData } from "@/utils/loadData";
import { Box, Typography, CircularProgress } from "@mui/material";

export default function Home() {
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [view, setView] = useState<"table" | "pivot">("table");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const rawData = await loadData("/database/data.json");
      setLoading(false);

      const records = rawData["FMSCA_records (2)"] || [];
      const processedData = records.map((item: any, index: number) => ({
        id: item.id || index,
        ...item,
      }));

      setData(processedData);
      setFilteredData(processedData);
    };

    fetchData();

    return () => {
      setLoading(true);
    };
  }, []);

  const handleSearch = (value: string) => {
    const filtered = data.filter(
      (row: { [s: string]: unknown } | ArrayLike<unknown>) =>
        Object.values(row).some((cell: any) =>
          cell.toString().toLowerCase().includes(value.toLowerCase())
        )
    );
    setFilteredData(filtered);
  };

  return (
    <>
      <Typography
        fontSize={30}
        fontWeight="bold"
        sx={{ color: "#6d8a82", textShadow: "0 2px 0 0 #ffffff" }}
        textAlign="center"
        mt={2}
      >
        FMCSA Viewer
      </Typography>
      <SearchBox onSearch={handleSearch} />
      <Box
        display="flex"
        justifyContent="center"
        mt={2}
        onClick={() => setView(view === "table" ? "pivot" : "table")}
      >
        <SwitchTables />
      </Box>
      {view === "table" ? (
        loading ? (
          <Box display="flex" justifyContent="center" mt={5}>
            <CircularProgress />
          </Box>
        ) : (
          <DataTable data={filteredData} />
        )
      ) : loading ? (
        <Box display="flex" justifyContent="center" mt={5}>
          <CircularProgress />
        </Box>
      ) : (
        <PivotTable data={filteredData} />
      )}
      <Footer />
    </>
  );
}
