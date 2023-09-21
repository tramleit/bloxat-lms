// import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
// export type Payment = {
//   id: string
//   amount: number
//   status: "pending" | "processing" | "success" | "failed"
//   email: string
// }

import CardsIcon from "@/assets/images/icons/card.webp";

const formatDate = (dateString) => {
  const date = new Date(dateString);

  const day = date.getDate();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthIndex = date.getMonth();
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const amOrPm = hours >= 12 ? "pm" : "am";
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${day} ${monthNames[monthIndex]} ${year} at ${formattedHours}:${formattedMinutes} ${amOrPm}`;
};

export const columnsBilling = [
  {
    accessorKey: "order_id",
    header: "Order ID",
    cell: ({ row }) => <span>{row.original.order_id}</span>,
  },
  {
    accessorKey: "purchase_date",
    header: "Purchase date",
    cell: ({ row }) => (
      <div className="flex flex-row items-center space-x-2">
        <span>{formatDate(row.original.purchase_date)}</span>
      </div>
    ),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => (
      <span>
        {row.original.amount} {row.original.currency}
      </span>
    ),
  },
  {
    accessorKey: "payment_method",
    header: "Payment method",
    cell: ({ row }) => (
      <>
        {row.original.payment_method === "card" && (
          <img
            src={CardsIcon}
            alt="card"
            className="w-[75px] h-auto"
            draggable={false}
          />
        )}
      </>
    ),
  },
  {
    accessorKey: "plan",
    header: "Plan",
    cell: ({ row }) => <span>{row.original.plan.toUpperCase()}</span>,
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <>
        {row.original.status == "1" && (
          <span className="bg-[#d9ffb3] px-1 py-0.5 rounded-md text-sm text-[#426122]">
            Success
          </span>
        )}
      </>
    ),
  },
];
