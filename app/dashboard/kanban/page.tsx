'use client'

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { connectToServer } from "@/utilities/socket-client";
import { useEffect, useState } from "react";


interface state {
  name: string,
  items: order[],
}

interface order {
  id: string,
  materialID: string,
  materialName: string,
  orderDate: Date,
  orderQuantity: number,
  predictedDate: Date,
  predictionID: string,
  purchaseDate: Date | null,
  realQuantity: number,
  status: string,
  updatedAt: Date,
}

const getAllOrders = async () => {
  const response = await fetch(`http://localhost:3000/api/sck-orders`);
  const orders: order[] = await response.json();
  const states: state[] = [
    { name: 'BACKLOG', items: [] },
    { name: 'TO_BUY', items: [] },
    { name: 'IN_BUYING_PROCESS', items: [] },
    { name: 'BOUGHT', items: [] },
    { name: 'DISMISSED', items: [] },
  ]


  for (const order of orders) {
    for (const state of states) {
      if (state.name === order.status) {
        state.items.push(order);
        break;
      }
    }

  }

  return states
}

export default function Page() {
  const [orders, setOrders] = useState<state[]>([])

  const renewData = () => {
    getAllOrders().then(
      (orders: state[]) => {
        console.log({ orders })
        setOrders(orders)
      }
    );
  }

  useEffect(() => {
    connectToServer(renewData);
    renewData()
  }, [])

  return (
    <div className="flex justify-center items-center gap-4 w-full h-full">

      {
        orders.map((state: state, index) => (
          <div key={`${state.name}-${index}`} className="border-blue-800 border rounded-lg h-full w-[20%]">
            <h1 className="text-center text-xl my-4">
              {state.name.replaceAll('_', ' ')}
            </h1>
            <div className="mx-2 flex flex-col h-[calc(100%-80px)] gap-4 mb-5 overflow-y-auto px-2">
              {
                state.items.map((order, index) => (
                  <Card key={`${order.materialID}-${index}`} className="bg-blue-950 border-blue-900">
                    <CardHeader>
                      <CardTitle className="text-sm text-center" >{order.materialName}</CardTitle>
                      {/* <CardDescription>{item.materialID}</CardDescription> */}
                    </CardHeader>
                    <CardContent className="text-sm">
                      <div className="flex justify-between">
                        <span>Cantidad: </span>
                        <span className="lowercase">{`${order.orderQuantity}`}</span>
                        {/* <span className="lowercase">{`${order.orderQuantity} ${item.unitOfMeasure}`}</span> */}
                      </div>
                      {/* <div className="flex justify-between">
                        <span>Costo: </span>
                        <span>{`$ ${(item.purchaseQuantity * item.costPerUnit).toFixed(2)}`}</span>
                        <span>{`$ ${(item.purchaseQuantity * item.costPerUnit).toFixed(2)}`}</span>
                      </div> */}
                      <div className="flex justify-between">
                        <span>Fecha de compra: </span>
                        <span>{`${order.predictedDate.toString().split('T')[0]}`}</span>
                      </div>
                      {/* <div className="flex justify-between">
                        <span>Stock: </span>
                        <span className="lowercase">{`${(item.totalQuantityPurchased - item.totalQuantityUsed).toFixed(2)} ${item.unitOfMeasure}`}</span>
                      </div> */}
                      {/* <div className="flex justify-between">
                        <span>F. última compra: </span>
                        <span>{`${item.lastPurchasedDate}`}</span>
                      </div> */}
                      {/* <div className="flex justify-between">
                        <span>Uso: </span>
                        <span className="lowercase">{`${item.avgDailyUsed} ${item.unitOfMeasure}/día`}</span>
                      </div> */}
                      {/* <div className="flex justify-between">
                        <span>Compras: </span>
                        <span className="lowercase">{`${item.avgTimeBetweenPurchases} días/compra`}</span>
                      </div> */}
                      {/* <div className="flex justify-between">
                        <span>Tendencia: </span>
                        <span className="lowercase">{`${item.usedTrend} días/compra`}</span>
                      </div> */}
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Badge variant={'outline'}>{order.materialID}</Badge>
                      <Badge className="lowercase">{state.name}</Badge>
                    </CardFooter>
                  </Card>
                ))
              }
            </div>
          </div>

        ))
      }

      {/* <div className="bg-blue-700 h-full w-[20%]">TO BUY</div>
      <div className="bg-green-500 h-full w-[20%]">IN PROCESS OF BUYING</div>
      <div className="bg-indigo-600 h-full w-[20%]">BOUGHT</div>
      <div className="bg-yellow-300 h-full w-[20%]">DISMISSED</div> */}
    </div>
  );
}