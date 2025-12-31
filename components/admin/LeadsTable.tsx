"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import { Box, TextField, CircularProgress } from "@mui/material";

import { InfiniteScrollTable } from "@/components/admin/InfiniteScrollTable";
import { RangeDatePicker } from "@/components/admin/RangeDatePicker";
import { useLeadsQuery } from "@/hooks/useContactForm";
import type { Lead } from "@/type/leads";

export default function LeadsTable() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs | null, dayjs.Dayjs | null]>([null, null]);
  const tableRef = useRef(null);

  const { data, isLoading, isError, error } = useLeadsQuery();
  const leadsData: Lead[] = (data?.data || []).map((item) => ({ ...item, id: Number(item.id) }));

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(timer);
  }, [search]);

  const filteredData = useMemo(() => {
    if (isLoading || isError) return [];
    return leadsData.filter((item) => {
      const s = debouncedSearch.toLowerCase();
      const matchesSearch =
        item.fullName.toLowerCase().includes(s) ||
        item.email.toLowerCase().includes(s) ||
        item.phone.toLowerCase().includes(s) ||
        (item.business && item.business.toLowerCase().includes(s)) ||
        (item.source && item.source.toLowerCase().includes(s)) ||
        (item.message && item.message.toLowerCase().includes(s));

      const matchesDate = dateRange[0] && dateRange[1]
        ? dayjs(item.datetime).isAfter(dateRange[0].startOf("day")) &&
          dayjs(item.datetime).isBefore(dateRange[1].endOf("day"))
        : true;

      return matchesSearch && matchesDate;
    });
  }, [debouncedSearch, dateRange, leadsData, isLoading, isError]);

  const filterKey = useMemo(() => {
    const dateKey = dateRange[0] && dateRange[1] ? `${dateRange[0].valueOf()}-${dateRange[1].valueOf()}` : "no-date";
    return `${debouncedSearch}-${dateKey}`;
  }, [debouncedSearch, dateRange]);

  const fetchLeads = async ({ pageParam = 0, pageSize = 20 }) => {
    const start = pageParam * pageSize;
    const end = start + pageSize;
    const pageData = filteredData.slice(start, end);
    return { data: pageData, hasMore: end < filteredData.length };
  };

  const columns = [
    { accessorKey: "fullName", header: "Full Name" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "phone", header: "Phone" },
    { accessorKey: "business", header: "Business" },
    { accessorKey: "source", header: "Source" },
    { accessorKey: "message", header: "Message" },
    { accessorKey: "datetime", header: "Date & Time" },
  ];

  return (
    <motion.div className="w-full mt-30" initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <motion.h2 className="text-2xl font-bold" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="text-slate-900">Admin Panel </span>
          <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            - Leads ({leadsData.length} total)
          </span>
        </motion.h2>

        <Box sx={{ width: 280 }}>
          <RangeDatePicker label="Filter by Date" value={dateRange} onChange={setDateRange} format="DD-MM-YYYY" />
        </Box>

        <TextField variant="outlined" size="small" placeholder="Search leads..." value={search} onChange={(e) => setSearch(e.target.value)} disabled={isLoading} />
      </div>

      {isLoading && <Box sx={{ textAlign: "center", mt: 8 }}><CircularProgress size={60} /><Box sx={{ mt: 2 }}>Loading leads...</Box></Box>}
      {isError && <Box sx={{ mt: 8, p: 4, color: "red", textAlign: "center" }}>Error: {error?.message}</Box>}

      {!isLoading && !isError && leadsData.length > 0 && filteredData.length > 0 && (
        <InfiniteScrollTable
  key={filterKey}
  columns={columns}
  fetchFunction={fetchLeads}
  getRowId={(row) => String(row.id)}
  fetchID="leads-table"
  isFiltered
  tableRef={tableRef}
  pageSize={20}
  tableHeight="60vh"
/>

      )}
    </motion.div>
  );
}
