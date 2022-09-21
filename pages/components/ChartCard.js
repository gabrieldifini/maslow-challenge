import { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { getColorFromStyles } from "../utils/utils";

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartCard = ({ title = "", subtitle = "", data, colorsPalette }) => {
  const [colors, setColors] = useState([]);
  let styles;

  useEffect(() => {
    styles = getComputedStyle(document.body);
    setColors(colorsPalette.map((color) => getColorFromStyles(styles, color)));
  }, []);

  const chartData = {
    labels: data.map((item) => item.title),
    datasets: [
      {
        data: data.map((item) => item.currentValue),
        backgroundColor: colors,
        borderColor: colors,
        offset: 10,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="border-solid h-auto border border-gray-100 rounded-tr-xl rounded-bl-xl p-6 relative shadow-md h-fit">
      <h2 className="font-bold text-gray-800 text-xl">{title}</h2>
      <h3 className="text-gray-500">{subtitle}</h3>
      <div className="my-6 h-80 min-h-[200px] min-w-[200px]">
        <Pie data={chartData} options={chartOptions} />
      </div>
      <div>
        <ul>
          {data.map((item, i) => {
            return (
              <li key={i} className="flex flex-row align-middle mb-2">
                <div
                  className="h-6 w-6 mr-2"
                  style={{ backgroundColor: colors[i] }}
                />
                <span className="text-gray-600">
                  {item.title}&nbsp;&nbsp;
                  <span className="text-black">
                    {item.currency} ${item.currentValue}
                  </span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ChartCard;
