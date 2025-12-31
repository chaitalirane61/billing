 "use client";

import React, { useMemo, useImperativeHandle, forwardRef } from "react";
import { CircularProgress, Typography, Box } from "@mui/material";
import { useInfiniteQuery, UseInfiniteQueryResult, InfiniteData } from "@tanstack/react-query";
import {
  MRT_ColumnDef,
  MRT_Row,
  MRT_TableInstance,
  MaterialReactTable,
  MRT_RowSelectionState,
} from "material-react-table";

// Generic paginated API response
export interface PaginatedResponse<T> {
  data?: T[];
  hasMore?: boolean;
}

interface InfiniteScrollTableProps<T extends { id: string | number }> {
  columns: MRT_ColumnDef<T>[];
  fetchFunction: (params: { pageParam?: number; pageSize?: number }) => Promise<PaginatedResponse<T>>;
  getRowId: (row: T, index: number) => string;
  pageSize?: number;
  tableHeight?: string;
  isFiltered?: boolean;
  fetchID?: string;
  initialState?: Record<string, unknown>;
  getSubRows?: (row: T) => T[];
  renderDetailPanel?: (props: { row: MRT_Row<T>; table: MRT_TableInstance<T> }) => React.ReactNode;
  enableTotalRow?: boolean;
  totalRowCalculator?: (data: T[]) => T;
  enableRowSelection?: boolean | ((row: MRT_Row<T>) => boolean);
  onRowSelectionChange?: (rowSelection: MRT_RowSelectionState) => void;
  tableRef?: React.Ref<unknown>;
}

export const InfiniteScrollTable = forwardRef(
  <T extends { id: string | number }>(
    {
      columns,
      fetchFunction,
      getRowId,
      initialState,
      pageSize = 20,
      tableHeight,
      isFiltered = false,
      fetchID,
      getSubRows,
      renderDetailPanel,
      enableTotalRow = false,
      totalRowCalculator,
      enableRowSelection = false,
      onRowSelectionChange,
      ...tableProps
    }: InfiniteScrollTableProps<T>,
    ref: React.Ref<unknown>
  ) => {
    const {
      data,
      fetchNextPage,
      hasNextPage,
      isFetching,
      error,
    }: UseInfiniteQueryResult<PaginatedResponse<T>, Error> = useInfiniteQuery({
      queryKey: ["tableData", fetchID],
      queryFn: ({ pageParam = 0 }) => fetchFunction({ pageParam, pageSize }),
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages) => {
        const pageData = lastPage.data || [];
        const hasMore = lastPage.hasMore !== false && pageData.length === pageSize;
        return hasMore ? allPages.length : undefined;
      },
      enabled: !!fetchID && isFiltered,
    });

    const flatData = useMemo(() => {
      const infiniteData = data as InfiniteData<PaginatedResponse<T>> | undefined;
      if (!infiniteData?.pages) return [];

      const allRows = infiniteData.pages.flatMap((page) => page.data || []);
      const uniqueRows = new Map<string, T>();
      allRows.forEach((row, index) => {
        const id = getRowId(row, index);
        if (!uniqueRows.has(id)) uniqueRows.set(id, row);
      });

      let finalData = Array.from(uniqueRows.values());
      if (enableTotalRow && totalRowCalculator && finalData.length > 0) {
        finalData = [...finalData, totalRowCalculator(finalData)];
      }

      return finalData;
    }, [data, getRowId, enableTotalRow, totalRowCalculator]);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
      const target = e.currentTarget;
      if (target.scrollTop + target.clientHeight >= target.scrollHeight - 150 && hasNextPage && !isFetching) {
        fetchNextPage();
      }
    };

    useImperativeHandle(ref, () => ({}));

    return (
      <Box sx={{ position: "relative" }}>
        <MaterialReactTable<T>
          columns={columns}
          data={flatData}
          getRowId={getRowId}
          enableExpanding={!!getSubRows}
          getSubRows={getSubRows}
          renderDetailPanel={renderDetailPanel}
          enablePagination={false}
          enableSorting
          enableRowSelection={enableRowSelection}
          onRowSelectionChange={(updaterOrValue) => {
            if (!onRowSelectionChange) return;
            const newSelection = typeof updaterOrValue === "function" ? updaterOrValue({}) : updaterOrValue;
            onRowSelectionChange(newSelection);
          }}
          muiTableContainerProps={{
            sx: { height: tableHeight || "60vh", overflowY: "auto" },
            onScroll: handleScroll,
          }}
          {...tableProps}
        />

        {isFetching && (
          <Box
            sx={{
              position: "absolute",
              bottom: 16,
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              alignItems: "center",
              gap: 1,
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              padding: "8px 16px",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              zIndex: 1000,
            }}
          >
            <CircularProgress size={16} />
            <Typography variant="body2" sx={{ fontWeight: 500, color: "#374151" }}>
              Loading more data...
            </Typography>
          </Box>
        )}

        {error && (
          <Box sx={{ padding: "40px 20px", textAlign: "center", border: "1px solid #fee2e2", borderRadius: "8px", backgroundColor: "#fef2f2" }}>
            <Typography variant="h6" sx={{ color: "#dc2626", mb: 1 }}>
              Error loading data
            </Typography>
            <Typography variant="body2" sx={{ color: "#991b1b" }}>
              {error.message}
            </Typography>
          </Box>
        )}
      </Box>
    );
  }
);

InfiniteScrollTable.displayName = "InfiniteScrollTable";
