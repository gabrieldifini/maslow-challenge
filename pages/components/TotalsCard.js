import { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const TotalsCard = ({ remainder = 0, total = 0, currency = "ARS" }) => {
  return (
    <div className="border-solid h-auto border border-gray-100 rounded-tr-xl rounded-bl-xl p-6 relative shadow-md h-fit">
      <p className="flex justify-between font-bold text-gray-400 text-lg">
        <span>Para distribuir</span>
        <span className="text-end">{`${currency} ${remainder}`}</span>
      </p>
      <p className="flex justify-between font-bold text-gray-800 text-xl">
        <span>Total</span>
        <span className="text-end">{`${currency} ${total}`}</span>
      </p>
    </div>
  );
};

export default TotalsCard;
