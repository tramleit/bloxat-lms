import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CellAction } from "./cell-action";

// import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
// export type Payment = {
//   id: string
//   amount: number
//   status: "pending" | "processing" | "success" | "failed"
//   email: string
// }



export const columns = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="flex flex-row items-center space-x-2">
        <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
          <AvatarImage
            className="object-cover"
            src={
              row.original.user.avatar_url == null
                ? `https://avatar.vercel.sh/${row.original.user.first_name}.png`
                : row.original.user.avatar_url
            }
            alt={row.original.user.first_name}
          />
          <AvatarFallback>
            {row.original.user.first_name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <span className="font-medium">
          {row.original.user.first_name} {row.original.user.last_name}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <span>{row.original.user.email}</span>,
  },
  {
    accessorKey: "phone_number",
    header: "Phone",
    cell: ({ row }) => <span>+{row.original.user.phone_number}</span>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <>
        {row.original.status == 1 ? (
          <div
            // className={cn(
            //   " w-fit px-2 py-1 rounded-md text-sm",
            //   row.original.status === "Idle"
            //     ? "bg-gray-100"
            //     : "bg-blue-500 text-white"
            // )}
            className=" w-fit px-2 py-1 rounded-md text-sm bg-lemonBloxLight text-[#566527]"
          >
            <span>Enrolled</span>
          </div>
        ) : (
          <></>
          // <div
          //   // className={cn(
          //   //   " w-fit px-2 py-1 rounded-md text-sm",
          //   //   row.original.status === "Idle"
          //   //     ? "bg-gray-100"
          //   //     : "bg-blue-500 text-white"
          //   // )}
          //   className=" w-fit px-2 py-1 rounded-md text-sm bg-red text-white"
          // >
          //   <span>Unpaid</span>
          // </div>
        )}
      </>
    ),
  },
  {
    accessorKey: "level_progress_percentage",
    header: "Progress",
    cell: ({ row }) => (
      <span>{Math.round(row.original.percentageCompleted)}%</span>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction userId={row.original.user_id} />,
  },
];
