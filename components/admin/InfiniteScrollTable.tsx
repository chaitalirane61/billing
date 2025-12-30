
import React, { useMemo, useImperativeHandle } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { CircularProgress, Typography, Box } from "@mui/material";
import {
  useInfiniteQuery,
  UseInfiniteQueryResult,
} from "@tanstack/react-query";

interface InfiniteScrollTableProps {
  columns: any[];
  fetchFunction: (params: {
    pageParam?: number;
    pageSize?: number;
  }) => Promise<any>;
  getRowId: (row: any, index: number) => string;
  pageSize?: number;
  tableHeight?: string;
  isFiltered?: boolean;
  fetchID?: string;
  initialState?: any;
  getSubRows?: (row: any) => any[];
  renderDetailPanel?: (props: { row: any }) => React.ReactNode;
  enableTotalRow?: boolean;
  totalRowCalculator?: (data: any[]) => any;
  enableRowSelection?: boolean | ((row: any) => boolean);
  onRowSelectionChange?: (rowSelection: any) => void;
  tableRef?: React.RefObject<any>;
}

export const InfiniteScrollTable: React.FC<InfiniteScrollTableProps> = ({
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
  tableRef,
  ...tableProps
}) => {
  const extractDataFromResponse = (response: any): any[] => {
    if (Array.isArray(response)) {
      return response;
    }
    if (response && typeof response === "object") {
      if (Array.isArray(response.data)) {
        return response.data;
      }
      if (Array.isArray(response.VotersData)) {
        return response.VotersData;
      }
    }
    return [];
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    error,
  }: UseInfiniteQueryResult<any, Error> = useInfiniteQuery({
    queryKey: ["tableData", fetchID],
    queryFn: ({ pageParam = 0 }: { pageParam?: number }) =>
      fetchFunction({ pageParam: Number(pageParam), pageSize }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: any, pages: any[]) => {
      const pageData = extractDataFromResponse(lastPage);
      const hasMore =
        lastPage?.hasMore !== false && pageData.length === pageSize;
      return hasMore ? pages.length : undefined;
    },
    enabled: !!fetchID && isFiltered,
  });

  const flatData = useMemo(() => {
    if (!data?.pages) {
      return [];
    }

    const allRows = data.pages.flatMap((page: any) =>
      extractDataFromResponse(page)
    );

    const uniqueRows = new Map();
    allRows.forEach((row: any, index: number) => {
      try {
        const id = getRowId(row, index);
        if (!uniqueRows.has(id)) {
          uniqueRows.set(id, row);
        }
      } catch (err) {
        const fallbackId = `row-${index}`;
        uniqueRows.set(fallbackId, row);
      }
    });

    let finalData = Array.from(uniqueRows.values());

    if (enableTotalRow && totalRowCalculator && finalData.length > 0) {
      const totalRow = totalRowCalculator(finalData);
      finalData = [...finalData, totalRow];
    }

    return finalData;
  }, [data, getRowId, enableTotalRow, totalRowCalculator]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const { scrollTop, clientHeight, scrollHeight } = target;

    if (
      scrollTop + clientHeight >= scrollHeight - 150 &&
      hasNextPage &&
      !isFetching
    ) {
      fetchNextPage();
    }
  };

  // Process columns with responsive sizing and wrapping
  const processedColumns = columns.map((col) => {
    const existingHeadProps =
      typeof col.muiTableHeadCellProps === "function"
        ? {}
        : col.muiTableHeadCellProps || {};
    const existingBodyProps =
      typeof col.muiTableBodyCellProps === "function"
        ? {}
        : col.muiTableBodyCellProps || {};

    return {
      ...col,
      // Set flexible sizing - columns will grow to fill available space
      grow: true, // Allow columns to grow
      size: col.size || 180,
      minSize: col.minSize || 120,
      maxSize: col.maxSize || 600,
      
      muiTableHeadCellProps: {
        ...existingHeadProps,
        sx: {
          backgroundColor: "#f3f4f6",
          fontWeight: 600,
          color: "#374151",
          borderBottom: "1px solid #e5e7eb",
          ...existingHeadProps.sx,
          fontFamily: "Poppins, sans-serif !important",
          fontSize: {
            xs: "0.7rem",
            sm: "0.75rem",
            md: "0.8rem",
            lg: "0.85rem",
            xl: "0.9rem",
          },
          padding: {
            xs: "8px 4px",
            sm: "10px 8px",
            md: "12px 12px",
            lg: "12px 16px",
            xl: "12px 20px",
          },
          // Allow header text to wrap on small screens
          whiteSpace: "normal",
          wordBreak: "break-word",
        },
      },
      muiTableBodyCellProps: {
        ...existingBodyProps,
        sx: {
          borderBottom: "1px solid #f3f4f6",
          ...existingBodyProps.sx,
          fontFamily: "Poppins, sans-serif !important",
          fontSize: {
            xs: "0.65rem",
            sm: "0.7rem",
            md: "0.75rem",
            lg: "0.8rem",
            xl: "0.85rem",
          },
          padding: {
            xs: "8px 4px",
            sm: "10px 8px",
            md: "12px 12px",
            lg: "12px 16px",
            xl: "12px 20px",
          },
          // Allow text wrapping for better mobile display
          whiteSpace: "normal",
          wordBreak: "break-word",
          overflow: "visible",
        },
      },
    };
  });

  const table = useMaterialReactTable({
    columns: processedColumns,
    data: flatData,
    enableExpanding: !!getSubRows,
    getSubRows: getSubRows,
    renderDetailPanel,
    enablePagination: false,
    enableGlobalFilterModes: true,
    manualSorting: false,
    enableSorting: true,
    enableRowVirtualization: false,
    enableStickyHeader: true,
    enableRowSelection: enableRowSelection,
    enableSelectAll:
      typeof enableRowSelection === "boolean" ? enableRowSelection : true,
    onRowSelectionChange: onRowSelectionChange,
    enableColumnActions: false,
    enableColumnFilters: false,
    enableDensityToggle: false,
    enableFullScreenToggle: false,
    enableHiding: false,
    enableColumnResizing: true, // Enable column resizing for better control
    columnResizeMode: 'onChange',
    layoutMode: 'grid', // Use grid layout for better space distribution
    state: {
      rowSelection: initialState?.rowSelection || {},
      ...(initialState || {}),
    },
    initialState: {
      density: "compact",
      showGlobalFilter: false,
    },
    getRowId: getRowId,
    muiTableContainerProps: {
      sx: {
        height: {
          xs: tableHeight || "calc(100vh - 250px)",
          sm: tableHeight || "calc(100vh - 200px)",
          md: tableHeight || "calc(100vh - 180px)",
          lg: tableHeight || "calc(100vh - 150px)",
          xl: tableHeight || "calc(100vh - 130px)",
        },
        // CRITICAL FIX: Allow horizontal scroll on small devices
        overflowX: "auto",
        overflowY: "auto",
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        boxShadow:
          "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        "&:has(.Mui-expanded)": {
          scrollBehavior: "auto",
        },
        // Scrollbar styling
        "&::-webkit-scrollbar": {
          width: "8px",
          height: "8px",
        },
        "&::-webkit-scrollbar-track": {
          background: "#f1f1f1",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "#888",
          borderRadius: "4px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          background: "#555",
        },
      },
      onScroll: handleScroll,
    },
    muiTablePaperProps: {
      elevation: 0,
      sx: {
        boxShadow: "none",
        border: "none",
      },
    },
    muiTableProps: {
      sx: {
        // Use fixed layout to distribute columns evenly
        tableLayout: "fixed",
        // Table takes full width of container
        width: "100%",
        minWidth: {
          xs: "800px", // Force minimum width on mobile (enables horizontal scroll)
          sm: "900px",
          md: "100%", // Full width on medium and up
        },
      },
    },
    muiTableHeadRowProps: {
      sx: {
        backgroundColor: "#f3f4f6",
        "&:hover": {
          backgroundColor: "#f3f4f6",
        },
      },
    },
    muiTableBodyRowProps: ({ row }) => ({
      sx: {
        backgroundColor: "white",
        "&:hover": {
          backgroundColor: "#f9fafb !important",
        },
        cursor: "default",
        transition: "background-color 0.2s",
      },
    }),
    muiTableBodyProps: {
      sx: {
        opacity: isFetching ? 0.5 : 1,
        transition: "opacity 0.2s",
        "& .MuiTableRow-root[data-expanded='true']": {
          backgroundColor: "rgba(0, 0, 0, 0.02)",
        },
      },
    },
    muiTopToolbarProps: {
      sx: {
        display: "none",
      },
    },
    muiBottomToolbarProps: {
      sx: {
        minHeight: "50px",
        backgroundColor: "#f9fafb",
        borderTop: "1px solid #e5e7eb",
        padding: "8px 16px",
      },
    },
    muiTableBodyCellProps: {
      sx: {
        verticalAlign: "top",
      },
    },
    enableStickyFooter: true,
    ...tableProps,
  });

  if (error) {
    return (
      <Box
        sx={{
          padding: "40px 20px",
          textAlign: "center",
          border: "1px solid #fee2e2",
          borderRadius: "8px",
          backgroundColor: "#fef2f2",
        }}
      >
        <Typography variant="h6" sx={{ color: "#dc2626", marginBottom: 1 }}>
          Error loading data
        </Typography>
        <Typography variant="body2" sx={{ color: "#991b1b" }}>
          {error.message}
        </Typography>
      </Box>
    );
  }

  useImperativeHandle(tableRef, () => table, [table]);

  return (
    <Box sx={{ position: "relative" }}>
      <MaterialReactTable table={table} />
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
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
            zIndex: 1000,
          }}
        >
          <CircularProgress size={16} />
          <Typography
            variant="body2"
            sx={{ fontWeight: 500, color: "#374151" }}
          >
            Loading more data...
          </Typography>
        </Box>
      )}
    </Box>
  );
};