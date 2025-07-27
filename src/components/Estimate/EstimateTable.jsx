import React from "react";
import "./EstimateTable.css";
import { useSelector } from "react-redux";

function EstimateTable() {

  const cardselectitems = useSelector((store) => store.cart.cardselectitems);

  const totalAmount = cardselectitems.reduce(
    (total, item) =>
      total + (parseFloat(item.originalAmount) || 0) * (item.quantityNumber || 0),
    0
  );

  const salesAmount = cardselectitems.reduce(
    (total, item) =>
      total + (parseFloat(item.saleAmount) || 0) * (item.quantityNumber || 0),
    0
  );

 
  const packingCharge = (salesAmount) * 0.03; // 3% on discounted price
  const overallTotal = salesAmount + packingCharge;

  return (
    <table border="1" aria-describedby="estimate-summary" className="table">
      <caption id="estimate-summary" className="sr-only">
        Estimate details including product list and pricing summary
      </caption>
      <thead>
        <tr className="table-main-header">
          <th colSpan={8}>ESTIMATE</th>
        </tr>
        <tr className="table-sub-header">
          <th scope="col">S.No</th>
          <th scope="col">Product Name</th>
          <th scope="col">Discount (%)</th>
          <th scope="col">Price /QTY</th>
          <th scope="col">Dis. Price</th>
          
          <th scope="col">QTY</th>
          <th></th>
          <th scope="col">Amount (Rs)</th>
        </tr>
      </thead>
      <tbody>
        {cardselectitems.map((item, i) => (
          <tr key={i}>
            <td>{i + 1}</td>
            <td>{item.name}</td>
            <td>80 %</td>
            <td>{item.originalAmount}</td>
            <td>{item.saleAmount}</td>
            <td>{item.quantityNumber}</td>
            <td></td>
            <td>{(item.saleAmount || 0) * (item.quantityNumber || 0)}</td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan="7">
            <strong>Total Amount</strong>
          </td>
          <td>{totalAmount}</td>
        </tr>

        <tr>
          <td colSpan="7">
            <strong>Discount Amount</strong>
          </td>
          <td>{salesAmount}</td>
        </tr>
        
        <tr>
          <td colSpan="7">
            <strong>Packing (3%)</strong>
          </td>
          <td>{packingCharge}</td>
        </tr>
  
        <tr>
          <td colSpan="7">
            <strong>Overall Total</strong>
          </td>
          <td>{overallTotal}</td>
        </tr>
      </tfoot>
    </table>
  );
}

export default EstimateTable;
