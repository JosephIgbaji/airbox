import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { Switch } from "@/components/ui/switch";

import {
  useGetAllBookingQuery,
  useDeleteBookingMutation,
  useUpdateBookingMutation,
} from "../service/booking.service";
import rtkMutation from "../utils/rtkMutation";
import { useEffect, useState } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";

export function AppointmentTable() {
  const { data, isLoading, refetch } = useGetAllBookingQuery();
  // console.log(data);
  const [deleteBooking] = useDeleteBookingMutation();
  const [updateBooking, { isSuccess }] = useUpdateBookingMutation({
    provideTag: ["Booking"],
  });

  useEffect(() => {
    if (isSuccess) {
      refetch();
    }
  }, [isSuccess, deleteBooking, updateBooking]);

  const HandleDelete = async (id) => {
    try {
      await deleteBooking(id); // Call the delete mutation
      await refetch(); // Refetch the booking data after deleting
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  const handleStatusToggle = async (bookingId, currentStatus) => {
    const newStatus = currentStatus === "confirmed" ? "canceled" : "confirmed";
    try {
      await rtkMutation(
        updateBooking({ id: bookingId, data: { status: newStatus } })
      );
    } catch (error) {
      console.error("Error updating booking status:", error);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      {data?.length > 0 ? (
        <Table>
          <TableCaption>A list of appointments.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="">Title</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead className="text-right">Status</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((booking, idx) => (
              <TableRow key={idx}>
                <TableCell className="font-medium">{booking.title}</TableCell>
                <TableCell>{format(booking.date, "yyyy-MM-dd")}</TableCell>
                <TableCell>{booking.time}</TableCell>
                <TableCell>
                  <Switch
                    checked={booking.status === "confirmed"}
                    onCheckedChange={() =>
                      handleStatusToggle(booking._id, booking.status)
                    }
                  />
                </TableCell>

                <TableCell className="text-right">
                  <div onClick={() => HandleDelete(booking._id)}>Delete</div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center">No bookings available</div>
      )}
    </>
  );
}

// import * as React from "react";
// import {
//   flexRender,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   useReactTable,
// } from "@tanstack/react-table";
// import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
// import {
//   DropdownMenu,
//   DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Input } from "@/components/ui/input";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";

// import {
//   useGetAllBookingQuery,
//   useDeleteBookingMutation,
//   useUpdateBookingMutation,
// } from "../service/booking.service";
// import rtkMutation from "../utils/rtkMutation";
// // import axios from "axios";
// // import { useSelector } from "react-redux";

// export function AppointmentTable() {
//   const { data, isLoading, refetch } = useGetAllBookingQuery();
//   const [deleteBooking] = useDeleteBookingMutation();
//   const [updateBooking, { isSuccess }] = useUpdateBookingMutation({
//     provideTag: ["Booking"],
//   });

//   React.useEffect(() => {
//     if (isSuccess) {
//       refetch();
//     }
//   }, [isSuccess, deleteBooking, updateBooking]);

//   const HandleDelete = async (id) => {
//     try {
//       await deleteBooking(id); // Call the delete mutation
//       await refetch(); // Refetch the booking data after deleting
//     } catch (error) {
//       console.error("Error deleting booking:", error);
//     }
//   };

//   const handleStatusToggle = async (bookingId, currentStatus) => {
//     const newStatus = currentStatus === "confirmed" ? "canceled" : "confirmed";
//     try {
//       await rtkMutation(
//         updateBooking({ id: bookingId, data: { status: newStatus } })
//       );
//     } catch (error) {
//       console.error("Error updating booking status:", error);
//     }
//   };

//   const columns = [
//     // {
//     //   id: "select",
//     //   header: ({ table }) => (
//     //     <Checkbox
//     //       checked={
//     //         // table.getIsAllPageRowsSelected() ||
//     //         table.getIsSomePageRowsSelected() && "indeterminate"
//     //       }
//     //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
//     //       aria-label="Select all"
//     //     />
//     //   ),
//     //   cell: ({ row }) => (
//     //     <Checkbox
//     //       checked={row.getIsSelected()}
//     //       onCheckedChange={(value) => row.toggleSelected(!!value)}
//     //       aria-label="Select row"
//     //     />
//     //   ),
//     //   enableSorting: false,
//     //   enableHiding: false,
//     // },

//     {
//       accessorKey: "title",
//       header: ({ column }) => {
//         return (
//           <Button
//             variant="ghost"
//             onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//           >
//             Title
//             <ArrowUpDown />
//           </Button>
//         );
//       },
//       cell: ({ row }) => (
//         <div className="lowercase">{row.getValue("title")}</div>
//       ),
//     },
//     {
//       accessorKey: "date",
//       header: ({ column }) => {
//         return (
//           <Button
//             variant="ghost"
//             onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//           >
//             Date
//             <ArrowUpDown />
//           </Button>
//         );
//       },
//       cell: ({ row }) => {
//         const date = new Date(row.getValue("date"));
//         const formattedDate = date.toLocaleDateString("en-US", {
//           weekday: "long",
//           year: "numeric",
//           month: "long",
//           day: "numeric",
//         });
//         return <div className="titlecase">{formattedDate}</div>;
//       },
//     },
//     {
//       accessorKey: "time",
//       header: ({ column }) => {
//         return (
//           <Button
//             variant="ghost"
//             onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//           >
//             Time
//             <ArrowUpDown />
//           </Button>
//         );
//       },
//       cell: ({ row }) => (
//         <div className="lowercase">{row.getValue("time")}</div>
//       ),
//     },
//     {
//       accessorKey: "price",
//       header: () => <div className="text-right">Amount</div>,
//       cell: ({ row }) => {
//         const amount = parseFloat(row.getValue("price"));

//         // Format the amount as a dollar amount
//         const formatted = new Intl.NumberFormat("en-US", {
//           style: "currency",
//           currency: "USD",
//         }).format(amount);

//         return <div className="text-right font-medium">{formatted}</div>;
//       },
//     },
//     {
//       id: "status",
//       header: "Status",
//       cell: ({ row }) => {
//         const booking = row.original;
//         const isConfirmed = booking.status === "confirmed";

//         return (
//           <Switch
//             checked={isConfirmed}
//             onCheckedChange={() =>
//               handleStatusToggle(booking._id, booking.status)
//             } // Pass correct ID and status
//           />
//         );
//       },
//       enableSorting: false,
//       enableHiding: false,
//     },
//     {
//       id: "actions",
//       enableHiding: false,
//       cell: ({ row }) => {
//         const payment = row.original;

//         return (
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="ghost" className="h-8 w-8 p-0">
//                 <span className="sr-only">Open menu</span>
//                 <MoreHorizontal />
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end">
//               {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}

//               {/* <DropdownMenuItem
//               // onClick={() => useUpdateBookingMutation(payment._id)}
//               >
//                 Edit
//               </DropdownMenuItem> */}
//               {/* <DropdownMenuSeparator /> */}
//               <DropdownMenuItem onClick={() => HandleDelete(payment._id)}>
//                 Delete
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         );
//       },
//     },
//   ];

//   const [sorting, setSorting] = React.useState([]);
//   const [columnFilters, setColumnFilters] = React.useState([]);
//   const [columnVisibility, setColumnVisibility] = React.useState({});
//   const [rowSelection, setRowSelection] = React.useState({});

//   const table = useReactTable({
//     data,
//     columns,
//     onSortingChange: setSorting,
//     onColumnFiltersChange: setColumnFilters,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     onColumnVisibilityChange: setColumnVisibility,
//     onRowSelectionChange: setRowSelection,
//     state: {
//       sorting,
//       columnFilters,
//       columnVisibility,
//       rowSelection,
//     },
//   });

//   if (isLoading) return <div>Loading...</div>;

//   return (
//     <div className="w-full">
//       <div className="flex items-center justify-between py-4">
//         <div>
//           <Input
//             placeholder="Filter by title"
//             value={table.getColumn("title")?.getFilterValue() ?? ""}
//             onChange={(event) =>
//               table.getColumn("title")?.setFilterValue(event.target.value)
//             }
//             className="max-w-sm"
//           />
//         </div>
//         <div>
//           <Button variant="outline" className="m-auto mr-8 ">
//             Add Booking
//           </Button>
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="outline" className="ml-auto">
//                 Columns <ChevronDown />
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end">
//               {table
//                 .getAllColumns()
//                 .filter((column) => column.getCanHide())
//                 .map((column) => {
//                   return (
//                     <DropdownMenuCheckboxItem
//                       key={column.id}
//                       className="capitalize"
//                       checked={column.getIsVisible()}
//                       onCheckedChange={(value) =>
//                         column.toggleVisibility(!!value)
//                       }
//                     >
//                       {column.id}
//                     </DropdownMenuCheckboxItem>
//                   );
//                 })}
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       </div>
//       <div className="rounded-md border">
//         <Table>
//           <TableHeader>
//             {table.getHeaderGroups().map((headerGroup) => (
//               <TableRow key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => {
//                   return (
//                     <TableHead key={header.id}>
//                       {header.isPlaceholder
//                         ? null
//                         : flexRender(
//                             header.column.columnDef.header,
//                             header.getContext()
//                           )}
//                     </TableHead>
//                   );
//                 })}
//               </TableRow>
//             ))}
//           </TableHeader>
//           <TableBody>
//             {/* {table?.getRowModel()?.rows?.length ? ( */}
//             {table?.getRowModel()?.rows?.map((row) => (
//               <TableRow
//                 key={row.id}
//                 data-state={row.getIsSelected() && "selected"}
//               >
//                 {row.getVisibleCells().map((cell) => (
//                   <TableCell key={cell.id}>
//                     {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             ))}
//             {/* ) : (
//               <TableRow>
//                 <TableCell
//                   colSpan={columns.length}
//                   className="h-24 text-center"
//                 >
//                   No results.
//                 </TableCell>
//               </TableRow>
//             )} */}
//           </TableBody>
//         </Table>
//       </div>
//       <div className="flex items-center justify-end space-x-2 py-4">
//         <div className="flex-1 text-sm text-muted-foreground">
//           {table.getFilteredSelectedRowModel().rows.length} of{" "}
//           {/* {table.getFilteredRowModel().rows.length} row(s) selected. */}
//         </div>
//         <div className="space-x-2">
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => table.previousPage()}
//             disabled={!table.getCanPreviousPage()}
//           >
//             Previous
//           </Button>
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => table.nextPage()}
//             // disabled={!table.getCanNextPage()}
//           >
//             Next
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }
