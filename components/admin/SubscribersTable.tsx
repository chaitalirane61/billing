 "use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import { Box, TextField, CircularProgress } from "@mui/material";

import { InfiniteScrollTable } from "@/components/admin/InfiniteScrollTable";
import { RangeDatePicker } from "@/components/admin/RangeDatePicker";
import { useSubscribersQuery } from "@/hooks/useSubscribe";
import type { Subscriber } from "@/type/subscribe";

export default function SubscribersTable() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs | null, dayjs.Dayjs | null]>([null, null]);

  const tableRef = useRef<HTMLDivElement | null>(null);

  // 1️⃣ Fetch data
  const { data, isLoading, isError, error } = useSubscribersQuery();

  // ✅ Explicitly type 'item' here to avoid implicit 'any'
  const subscribersData: Subscriber[] = (data?.data || []).map((item: Subscriber) => ({
    ...item,
    id: String(item.id),
  }));

  // 2️⃣ Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(timer);
  }, [search]);

  // Debug logs
  useEffect(() => {
    console.log("Subscribers Data:", subscribersData);
  }, [subscribersData]);

  // 3️⃣ Filters: search + date
  const filteredData = useMemo(() => {
    if (isLoading || isError) return [];

    return subscribersData.filter((item: Subscriber) => {
      const s = debouncedSearch.toLowerCase();
      const matchesSearch =
        item.email.toLowerCase().includes(s) ||
        dayjs(item.subscribedAt).format("DD-MM-YYYY HH:mm").includes(s);

      const matchesDate =
        dateRange[0] && dateRange[1]
          ? dayjs(item.subscribedAt).isAfter(dateRange[0].startOf("day")) &&
            dayjs(item.subscribedAt).isBefore(dateRange[1].endOf("day"))
          : true;

      return matchesSearch && matchesDate;
    });
  }, [debouncedSearch, dateRange, subscribersData, isLoading, isError]);

  // 4️⃣ Filter key to reset table when filters change
  const filterKey = useMemo(() => {
    const dateKey = dateRange[0] && dateRange[1] ? `${dateRange[0].valueOf()}-${dateRange[1].valueOf()}` : "no-date";
    return `${debouncedSearch}-${dateKey}`;
  }, [debouncedSearch, dateRange]);

  // 5️⃣ Fetch function for InfiniteScrollTable
  const fetchSubscribers = async ({ pageParam = 0, pageSize = 20 }): Promise<{ data: Subscriber[]; hasMore: boolean }> => {
    const start = pageParam * pageSize;
    const end = start + pageSize;

    const pageData: Subscriber[] = filteredData.slice(start, end).map((item: Subscriber) => ({
      ...item,
      subscribedAt: dayjs(item.subscribedAt).format("YYYY-MM-DD HH:mm:ss"),
    }));

    return {
      data: pageData,
      hasMore: end < filteredData.length,
    };
  };

  // 6️⃣ Table columns
  const columns = [
    { accessorKey: "email", header: "Email Address" },
    { accessorKey: "subscribedAt", header: "Subscribed At" },
  ];

  return (
    <motion.div className="w-full mt-30" initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      {/* Header & Filters */}
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <motion.h2 className="text-2xl font-bold" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="text-slate-900">Admin Panel </span>
          <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            - Subscribers ({subscribersData.length})
          </span>
        </motion.h2>

        <Box sx={{ width: 280 }}>
          <RangeDatePicker label="Filter by Date" value={dateRange} onChange={setDateRange} format="DD-MM-YYYY" />
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

      {/* Loading */}
      {isLoading && (
        <Box sx={{ textAlign: "center", mt: 8 }}>
          <CircularProgress size={60} />
          <Box sx={{ mt: 2 }}>Loading subscriber data...</Box>
        </Box>
      )}

      {/* Error */}
      {isError && (
        <Box sx={{ mt: 8, p: 4, color: "red", textAlign: "center" }}>
          Error fetching data: {error?.message}
        </Box>
      )}

      {/* No Data */}
      {!isLoading && !isError && subscribersData.length === 0 && (
        <Box sx={{ mt: 8, p: 4, textAlign: "center", border: "1px dashed gray", borderRadius: 2 }}>
          No subscribers found.
        </Box>
      )}

      {/* Infinite Scroll Table */}
      {!isLoading && !isError && subscribersData.length > 0 && (
        <>
          {filteredData.length === 0 ? (
            <Box sx={{ mt: 4, p: 4, textAlign: "center", border: "1px dashed gray", borderRadius: 2 }}>
              No subscribers match your search filters.
            </Box>
          ) : (
            <InfiniteScrollTable 
              key={filterKey}
              columns={columns}
              fetchFunction={fetchSubscribers}
              getRowId={(row) => String(row.id)}
              fetchID="subscribers-table"
              isFiltered
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
