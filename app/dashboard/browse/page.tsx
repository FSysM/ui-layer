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


export default async function BrowsePage() { 
  const data = await getData()
  return (
    <div >
      <h1 className="text-3xl font-bold">BROWSE THESES</h1>
      <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
      </div>
  );
};






