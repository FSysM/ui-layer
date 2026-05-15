import { CardImage } from "@/components/dashboard/Card"
import { CalendarView } from "@/components/dashboard/Calendar"
import { columns } from "@/components/table/build-columns"
import { DataTable } from "@/components/table/data-table"
import PageHeader from "@/components/layout/PageHeader"

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
    <div>
      <PageHeader title="Dashboard" />
      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <CardImage />
        <CardImage />
        <CardImage />
      </div>
      {/* Calendar and events */}
      <div className="flex flex-col lg:flex-row gap-4">
        <CalendarView />
        <div >
          <h2 className="text-3xl font-bold">Events</h2>
          <div className="container mx-auto py-10">
            {/* <DataTable columns={columns} data={data} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};
