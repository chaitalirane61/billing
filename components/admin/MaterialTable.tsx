// import React from "react";
// import {
//   MaterialReactTable,
//   useMaterialReactTable,
//   type MRT_ColumnDef,
//   MRT_TablePagination,
// } from "material-react-table";
// import { Box, Typography } from "@mui/material";
// import CustomExpandableSearch from "../inputs/CustomExpandableSearch";

// export type { MRT_TableInstance } from "material-react-table";

// interface MaterialTableProps<T extends { id: string | number; subRows?: T[] }> {
//   columns: MRT_ColumnDef<T>[];
//   data: T[];
//   enableExpanding?: boolean;
//   getSubRows?: (row: T) => T[];
//   enableRowActions?: boolean;
//   renderRowActions?: (row: any) => React.ReactNode;
//   enablePagination?: boolean;
//   enableSorting?: boolean;
//   enableGlobalFilter?: boolean;
//   searchAtBottom?: boolean;
//   initialState?: any;
//   rowHeight?: number;
//   tableHeight?: string; // Add this property
//   muiTableBodyProps?: any;
//   muiTableContainerProps?: any;
//   muiTableBodyRowProps?: any;
//   displayColumnDefOptions?: any;
//   renderToolbarInternalActions?: any;
//   renderTopToolbar?: any;
//   renderBottomToolbar?: any;
//   enableColumnActions?: boolean;
//   enableColumnFilters?: boolean;
//   enableDensityToggle?: boolean;
//   enableFullScreenToggle?: boolean;
//   enableHiding?: boolean;
//   enableBottomToolbar?: boolean;
//   enableStickyHeader?: boolean;
//   enableTopToolbar?: boolean;
//   bottomToolbarText?: string; // Add custom text option
// }

// export function MaterialTable<
//   T extends { id: string | number; subRows?: T[] }
// >({
//   columns,
//   data,
//   getSubRows,
//   enableExpanding = false,
//   enableRowActions = false,
//   renderRowActions,
//   enablePagination = true,
//   enableSorting = true,
//   enableColumnActions = true,
//   enableColumnFilters = true,
//   enableGlobalFilter = true,
//   enableDensityToggle = true,
//   enableFullScreenToggle = true,
//   enableHiding = true,
//   enableBottomToolbar = true,
//   enableTopToolbar = true,
//   searchAtBottom = false,
//   initialState,
//   rowHeight,
//   tableHeight, // Add this parameter
//   muiTableBodyProps,
//   muiTableContainerProps,
//   muiTableBodyRowProps,
//   displayColumnDefOptions,
//   renderToolbarInternalActions,
//   renderTopToolbar,
//   renderBottomToolbar,
//   bottomToolbarText,
// }: MaterialTableProps<T>) {
//   const processedColumns = columns.map((col) => {
//     const existingHeadProps =
//       typeof col.muiTableHeadCellProps === "function"
//         ? {}
//         : col.muiTableHeadCellProps || {};
//     const existingBodyProps =
//       typeof col.muiTableBodyCellProps === "function"
//         ? {}
//         : col.muiTableBodyCellProps || {};

//     return {
//       ...col,
//       muiTableHeadCellProps: {
//         ...existingHeadProps,
//         sx: {
//           ...existingHeadProps.sx,

//           fontFamily: "Poppins, sans-serif !important",
//           fontSize: {
//             xs: "0.55rem", // mobile
//             sm: "0.65rem",
//             md: "0.75rem",
//             lg: "0.75rem",
//             xl: "0.95rem", // desktop
//           },
//         },
//       },
//       muiTableBodyCellProps: {
//         ...existingBodyProps,
//         sx: {
//           ...existingBodyProps.sx,

//           fontFamily: "Poppins, sans-serif !important",
//           fontSize: {
//             xs: "0.55rem", // mobile
//             sm: "0.65rem",
//             md: "0.75rem",
//             lg: "0.75rem",
//             xl: "0.95rem", // desktop
//           },
//           paddingTop: "0.25rem",
//           paddingBottom: "0.25rem",
//         },
//       },
//     };
//   });

//   const table = useMaterialReactTable({
//     columns: processedColumns,
//     data,
//     muiTopToolbarProps: {
//       sx: {
//         padding: {
//           xs: "4px",
//           sm: "8px",
//           md: "10px",
//         },

//         gap: "10px",
//         flexWrap: "wrap",
//         "& .MuiInputBase-root": {
//           fontSize: {
//             xs: "0.75rem",
//             sm: "0.875rem",
//           },
//           padding: "2px 6px",
//         },
//       },
//     },
//     muiBottomToolbarProps: {
//       sx: {
//         padding: {
//           xs: "4px",
//           sm: "8px",
//           md: "10px",
//         },
//         gap: "10px",
//         flexWrap: "wrap",
//         "& .MuiInputBase-root": {
//           fontSize: {
//             xs: "0.75rem",
//             sm: "0.875rem",
//           },
//           padding: "2px 6px",
//         },
//       },
//     },

//     getSubRows: getSubRows ?? ((row) => row.subRows ?? []),
//     enableExpanding,
//     paginateExpandedRows: false,
//     enableRowActions,
//     renderRowActions,
//     enableSorting,
//     enablePagination,
//     enableColumnActions,
//     enableColumnFilters,
//     enableGlobalFilter,
//     enableDensityToggle,
//     enableFullScreenToggle,
//     enableHiding,
//     enableBottomToolbar,
//     enableStickyHeader: true,
//     localization: {
//       noRecordsToDisplay: "", // Customize as needed
//     },
//     enableTopToolbar,
//     initialState: { density: "compact", ...(initialState || {}) },
//     muiTableContainerProps: {
//       sx: {
//         height: {
//           xs: tableHeight || "45vh",
//           sm: tableHeight || "45vh",
//           md: tableHeight || "50vh",
//           lg: tableHeight || "55vh",
//           xl: tableHeight || "65vh",
//         },

//         overflowY: "auto",
//         overflowX: "auto",
//         fontFamily: "Poppins, sans-serif !important",
//         scrollBehavior: "smooth", // 👈 ensure smooth scrolling
//       },
//       ...muiTableContainerProps,
//     },
//     muiTablePaperProps: {
//       sx: {
//         overflow: "visible", // 👈 allow detail panels to overflow
//         // height: tableHeight,
//       },
//     },
//     muiTableProps: {
//       sx: {
//         width: "100%",
//       },
//     },

//     muiTableBodyRowProps: rowHeight
//       ? { sx: { height: `${rowHeight}px` }, ...muiTableBodyRowProps }
//       : muiTableBodyRowProps,
//     muiTableBodyProps,
//     displayColumnDefOptions,
//     renderToolbarInternalActions,
//     ...(renderTopToolbar ? { renderTopToolbar } : {}),
//     renderBottomToolbar:
//       renderBottomToolbar ||
//       (searchAtBottom
//         ? CustomExpandableSearch
//         : bottomToolbarText
//         ? ({ table }) => (
//             <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 px: 2,
//                 py: 0,
//               }}
//             >
//               <Typography
//                 variant="body2"
//                 sx={{
//                   color: "text.secondary",
//                   fontFamily: "Poppins, sans-serif",
//                   fontSize: { xs: "0.75rem", sm: "0.875rem" },
//                 }}
//               >
//                 {bottomToolbarText}
//               </Typography>
//               <Box>
//                 {/* Use the default MRT pagination component */}
//                 <MRT_TablePagination table={table} />
//               </Box>
//             </Box>
//           )
//         : undefined),
//   });

//   return <MaterialReactTable table={table} />;
// }
