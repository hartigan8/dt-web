import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Chart = ({ aspect, title, weight, waterIntake }) => {
  // Function to merge weight and waterIntake data
  const mergeData = () => {
    let mergedData = [];
    // Assuming both datasets have 'date' as a key
    const allDates = new Set([...weight.map(item => item.date), ...waterIntake.map(item => item.date)]);
    allDates.forEach(date => {
      let dataPoint = { date };
      let weightData = weight.find(w => w.date === date);
      let waterData = waterIntake.find(w => w.date === date);
      if (weightData) dataPoint.measure = weightData.measure;
      if (waterData) dataPoint.volume = waterData.volume;
      mergedData.push(dataPoint);
    });
    return mergedData;
  };

  let data = mergeData();

  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
        >
          <defs>
            <linearGradient id="measure" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="waterIntake" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" stroke="gray" angle={-45} textAnchor="end" padding={{ left: 40 }} />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          {weight.length > 0 && (
            <Area
              type="monotone"
              dataKey="measure"
              stroke="#8884d8"
              fillOpacity={0}
              fill="url(#measure)"
            />
          )}
          {waterIntake.length > 0 && (
            <Area
              type="monotone"
              dataKey="volume"
              stroke="#82ca9d"
              fillOpacity={0}
              fill="url(#waterIntake)"
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
