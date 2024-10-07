import { columns, ProcessedData } from "@/components/data-table/columns";
import { DataTable } from "@/components/data-table/data-table";
import { ConsumptionForm } from "@/components/forms/ConsumptionForm";

const fetchData = async (limit = 2000, page = 1) => {
  const response = await fetch(`http://localhost:3000/api/sck-analytics/data-analytics?page=${page}&limit=${limit}`);
  const data = await response.json();

  const AllInformation: ProcessedData[] = data.data.map((item: any) => {
    return {
      id: item.id,
      sourceType: item.processedData.sourceType,
      materialID: item.materialID,
      materialCategory: item.processedData.materialCategory,
      materialName: item.materialName,
      processedQuantity: item.processedData.processedQuantity,
      processedDate: item.processedData.processedDate.split('T')[0],
      costPerUnit: item.processedData.costPerUnit,
      totalCost: item.processedData.totalCost,
      unitOfMeasure: item.processedData.unitOfMeasure,
      createdAt: item.processedData.createdAt.split('T')[0],

    }
  })

  const materialIDArray = AllInformation.map((item) => {
    return item.materialID
  })

  const information = AllInformation.filter((item) => {
    return item.sourceType !== 'MANUAL'
  })

  const uniqueMaterialID = new Set(materialIDArray);

  let materialIDItems = Array.from(uniqueMaterialID)

  return {
    information,
    meta: data.meta,
    materialIDItems,
  };
}

export default async function Page() {
  const { information, meta, materialIDItems } = await fetchData();

  console.log({ meta })

  return (
    <div>
      <DataTable columns={columns} data={information} selectItems={materialIDItems} form={<ConsumptionForm />} title={'Consumos'} />
    </div>
  );
}