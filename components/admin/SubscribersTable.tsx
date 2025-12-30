

"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import dayjs from "dayjs";

// Components
import { InfiniteScrollTable } from "@/components/admin/InfiniteScrollTable";
import { RangeDatePicker } from "@/components/admin/RangeDatePicker";

// Data
import { useSubscribersQuery } from "@/hooks/useSubscribe";
import type { Subscriber } from "@/type/subscribe";

// MUI
import { TextField, Box, CircularProgress } from "@mui/material";

export default function SubscribersTable() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [dateRange, setDateRange] = useState<
    [dayjs.Dayjs | null, dayjs.Dayjs | null]
  >([null, null]);

  const tableRef = useRef(null);

  // FETCH DATA
  const { data, isLoading, isError, error } = useSubscribersQuery();

  const subscribersData: Subscriber[] = data?.data || [];
  

  // Debounce search input (500ms)
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(timer);
  }, [search]);
// Add right after const subscribersData line
useEffect(() => {
  console.log("Query State:", { data, isLoading, isError, error });
  console.log("Subscribers Data:", subscribersData);
}, [data, isLoading, isError, error, subscribersData]);
  // FILTERED DATA
  const filteredData = useMemo(() => {
    if (isLoading || isError) return [];

    return subscribersData.filter((item) => {
      const searchText = debouncedSearch.toLowerCase();

      const matchesSearch =
        item.email.toLowerCase().includes(searchText) ||
        dayjs(item.subscribedAt).format("DD-MM-YYYY HH:mm").includes(searchText);

      const hasDate = dateRange[0] && dateRange[1];

      const matchesDate = hasDate
        ? dayjs(item.subscribedAt).isAfter(dateRange[0]!.startOf("day")) &&
          dayjs(item.subscribedAt).isBefore(dateRange[1]!.endOf("day"))
        : true;

      return matchesSearch && matchesDate;
    });
  }, [debouncedSearch, dateRange, subscribersData, isLoading, isError]);

  // Reset table on filter change
  const filterKey = useMemo(() => {
    const dateKey =
      dateRange[0] && dateRange[1]
        ? `${dateRange[0].valueOf()}-${dateRange[1].valueOf()}`
        : "no-date";

    return `${debouncedSearch}-${dateKey}`;
  }, [debouncedSearch, dateRange]);

  // PAGINATION FUNCTION
  const fetchFunction = async ({ pageParam = 0, pageSize = 20 }) => {
    const start = pageParam * pageSize;
    const end = start + pageSize;

    const pageData = filteredData.slice(start, end).map((item) => ({
      ...item,
      subscribedAt: dayjs(item.subscribedAt).format("YYYY-MM-DD HH:mm:ss"), // formatted for UI
    }));

    return {
      data: pageData,
      hasMore: end < filteredData.length,
    };
  };

  // TABLE COLUMNS
  const columns = [
    { accessorKey: "email", header: "Email Address" },
    { accessorKey: "subscribedAt", header: "Subscribed At" },
  ];
console.log("subscribersData",subscribersData)  
  return (
    <motion.div
      className="w-full mt-30"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* TITLE + SEARCH + DATE RANGE */}
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <motion.h2
          className="text-2xl font-bold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-slate-900">Admin Panel </span>
          <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            - Subscribers ({subscribersData.length})
          </span>
        </motion.h2>

        <Box sx={{ width: 280 }}>
          <RangeDatePicker
            label="Filter by Date"
            value={dateRange}
            onChange={(dates) => setDateRange(dates)}
            format="DD-MM-YYYY"
          />
        </Box>

        <TextField
          variant="outlined"
          size="small"
          placeholder="Search subscribers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          disabled={isLoading}
        />
      </div>

      {/* LOADING */}
      {isLoading && (
        <Box sx={{ textAlign: "center", mt: 8 }}>
          <CircularProgress size={60} />
          <Box sx={{ mt: 2 }}>Loading subscriber data...</Box>
        </Box>
      )}

      {/* ERROR */}
      {isError && (
        <Box sx={{ mt: 8, p: 4, color: "red", textAlign: "center" }}>
          Error fetching data: {error?.message}
        </Box>
      )}

      {/* NO DATA */}
      {!isLoading && !isError && subscribersData.length === 0 && (
        <Box
          sx={{
            mt: 8,
            p: 4,
            textAlign: "center",
            border: "1px dashed gray",
            borderRadius: 2,
          }}
        >
          No subscribers found.
        </Box>
      )}

      {/* TABLE */}
      {!isLoading && !isError && subscribersData.length > 0 && (
        <>
          {filteredData.length === 0 ? (
            <Box
              sx={{
                mt: 4,
                p: 4,
                textAlign: "center",
                border: "1px dashed gray",
                borderRadius: 2,
              }}
            >
              No subscribers match your search filters.
            </Box>
          ) : (
            <InfiniteScrollTable
              key={filterKey}
              columns={columns}
              fetchFunction={fetchFunction}
              getRowId={(row) => row.id}
              fetchID="subscribers-table"
              isFiltered={true}
              tableRef={tableRef}
              pageSize={20}
              tableHeight="60vh"
            />
          )}
        </>
      )}
    </motion.div>
  );
}
