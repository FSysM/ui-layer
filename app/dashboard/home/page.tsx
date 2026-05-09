import { CardImage } from "@/components/dashboard/Card"
import { CalendarView } from "@/components/dashboard/Calendar"
import { columns, Payment } from "@/components/table/columns"
import { DataTable } from "@/components/table/data-table"

async function getData(): Promise<Payment[]> {
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
  ]
}

export default async function HomePage() { 
  const data = await getData()
  return (
    <div className="">
      <h1 className="text-3xl font-bold">DASHBOARD</h1>
      <div className="flex">
        <CardImage />
        <CardImage />
        <CardImage />
      </div>
      <div className="flex">
        <CalendarView />
        <div >
          <h2 className="text-3xl font-bold">Events</h2>
          <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};
