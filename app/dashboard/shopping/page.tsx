import { columns, ProcessedData } from "@/components/data-table/columns";
import { DataTable } from "@/components/data-table/data-table";

const fetchData = async (limit = 20, page = 1) => {
  const response = await fetch(`http://localhost:3000/api/sck-analytics/data-analytics?page=${page}&limit=${limit}`);
  const data = await response.json();

  const information: ProcessedData[] = data.data.map((item: any) => {
    return {
      id: item.id,
      sourceType: item.processedData.sourceType,
      materialID: item.materialID,
      materialCategory: item.processedData.materialCategory,
      materialName: item.materialName,
      processedQuantity: item.processedData.processedQuantity,
      processedDate: item.processedData.processedDate,
      costPerUnit: item.processedData.costPerUnit,
      totalCost: item.processedData.totalCost,
      unitOfMeasure: item.processedData.unitOfMeasure,
      createdAt: item.processedData.createdAt,

    }
  })

  return {
    information,
    meta: data.meta,
  };
}

export default async function Page() {
  const { information, meta } = await fetchData();

  console.log({ meta })

  return (
    <div>
      <DataTable columns={columns} data={information} />
      hola
    </div>
  );
}