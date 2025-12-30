

"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import dayjs from "dayjs";

// Components
import { InfiniteScrollTable } from "@/components/admin/InfiniteScrollTable";
import { RangeDatePicker } from "@/components/admin/RangeDatePicker";

// Data
import { useLeadsQuery } from "@/hooks/useContactForm";
import type { Lead } from "@/type/leads";

// MUI
import { TextField, Box, CircularProgress } from "@mui/material";

export default function LeadsTable() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [dateRange, setDateRange] = useState<
    [dayjs.Dayjs | null, dayjs.Dayjs | null]
  >([null, null]);

  const tableRef = useRef(null);

  // ------------------------------------
  // 1. FETCH DATA FROM ShopcareEnquiry TABLE
  // ------------------------------------
  const { data, isLoading, isError, error } = useLeadsQuery();
  
  // The actual array of leads from ShopcareEnquiry database
  const leadsData: Lead[] = data?.data || [];

  // Debounce search input (wait 500ms after user stops typing)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // ------------------------------------
  // 2. Filters: Search + Date Range
  // ------------------------------------
  const filteredData = useMemo(() => {
    // If data is loading or there's an error, don't attempt to filter
    if (isLoading || isError) return [];
    
    // Filter the leadsData fetched from ShopcareEnquiry table
    return leadsData.filter((item) => {
      const searchText = debouncedSearch.toLowerCase();

      // Check for search match across all fields
      const matchesSearch =
        item.fullName.toLowerCase().includes(searchText) ||
        item.email.toLowerCase().includes(searchText) ||
        item.phone.toLowerCase().includes(searchText) ||
        (item.business && item.business.toLowerCase().includes(searchText)) || 
        (item.source && item.source.toLowerCase().includes(searchText)) || 
        (item.message && item.message.toLowerCase().includes(searchText)); 

      // Check for date range match
      const hasDate = dateRange[0] && dateRange[1];
      const matchesDate = hasDate
        ? dayjs(item.datetime).isAfter(dateRange[0]!.startOf("day")) &&
          dayjs(item.datetime).isBefore(dateRange[1]!.endOf("day"))
        : true;

      return matchesSearch && matchesDate;
    });
  }, [debouncedSearch, dateRange, leadsData, isLoading, isError]);

  // Create a stable key from filter values to reset table when filters change
  const filterKey = useMemo(() => {
    const dateKey =
      dateRange[0] && dateRange[1]
        ? `${dateRange[0].valueOf()}-${dateRange[1].valueOf()}`
        : "no-date";
    return `${debouncedSearch}-${dateKey}`;
  }, [debouncedSearch, dateRange]);

  // ------------------------------------
  // 3. Fetch function for InfiniteScrollTable
  // ------------------------------------
  const fetchFunction = async ({ pageParam = 0, pageSize = 20 }) => {
    const start = pageParam * pageSize;
    const end = start + pageSize;
    const pageData = filteredData.slice(start, end);

    return {
      data: pageData,
      hasMore: end < filteredData.length,
    };
  };

  // ------------------------------------
  // 4. Table Columns
  // ------------------------------------
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
    <motion.div
      className="w-full mt-30"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header and Filter components */}
      <div className="flex flex-wrap justify-between items-center mb-6  gap-4">
        <motion.h2
          className="text-2xl font-bold"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-slate-900">Admin Panel </span>
          <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            - Leads ({leadsData.length} total)
          </span>
        </motion.h2>

        {/* DATE RANGE PICKER */}
        <Box sx={{ width: 280 }}>
          <RangeDatePicker
            label="Filter by Date"
            value={dateRange}
            onChange={(dates) => setDateRange(dates)}
            format="DD-MM-YYYY"
          />
        </Box>

        {/* SEARCH */}
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search leads..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          disabled={isLoading}
        />
      </div>
      
      {/* 5. LOADING STATE */}
      {isLoading && (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', mt: 8 }}>
          <CircularProgress size={60} />
          <Box sx={{ mt: 2, color: 'text.secondary' }}>
            Loading leads from ShopcareEnquiry table...
          </Box>
        </Box>
      )}
      
      {/* 6. ERROR STATE */}
      {isError && (
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center', 
          mt: 8, 
          p: 4,
          bgcolor: 'error.light',
          borderRadius: 2,
          color: 'error.dark'
        }}>
          <Box sx={{ fontSize: '1.2rem', fontWeight: 'bold', mb: 1 }}>
            Error fetching leads data
          </Box>
          <Box sx={{ fontSize: '0.9rem' }}>
            {error?.message || "Unable to load data from ShopcareEnquiry table"}
          </Box>
        </Box>
      )}

      {/* 7. NO DATA STATE */}
      {!isLoading && !isError && leadsData.length === 0 && (
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          justifyContent: 'center', 
          mt: 8,
          p: 4,
          bgcolor: 'background.paper',
          borderRadius: 2,
          border: '1px dashed',
          borderColor: 'divider'
        }}>
          <Box sx={{ textAlign: 'center', color: 'text.secondary' }}>
            <Box sx={{ fontSize: '1.2rem', mb: 1 }}>No leads found</Box>
            <Box sx={{ fontSize: '0.9rem' }}>
              The ShopcareEnquiry table is empty. New leads will appear here.
            </Box>
          </Box>
        </Box>
      )}

      {/* 8. INFINITE SCROLL TABLE */}
      {!isLoading && !isError && leadsData.length > 0 && (
        <>
          {filteredData.length === 0 ? (
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center',
              justifyContent: 'center', 
              mt: 4,
              p: 4,
              bgcolor: 'background.paper',
              borderRadius: 2,
              border: '1px dashed',
              borderColor: 'divider'
            }}>
              <Box sx={{ textAlign: 'center', color: 'text.secondary' }}>
                No leads match your filters. Try adjusting your search or date range.
              </Box>
            </Box>
          ) : (
            <InfiniteScrollTable
              key={filterKey}
              columns={columns}
              fetchFunction={fetchFunction} 
              getRowId={(row) => row.id}
              fetchID="leads-table"
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