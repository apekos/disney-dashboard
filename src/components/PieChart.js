import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const PieChart = ({ filteredCharacters }) => {
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const newChartData = filteredCharacters.map((character) => ({
      name: character.name,
      y: character.films.length,
      films: character.films.length ? character.films.join(", ") : "-",
    }));

    setChartOptions({
      chart: {
        type: "pie",
      },
      title: {
        text: "Films Participation",
      },
      subtitle: {
        text: 'Source: <a href="https://disneyapi.dev/" target="_default">Disney API</a>',
      },
      tooltip: {
        headerFormat: "",
        pointFormat:
          "<span style='color:{point.color}'>\u25CF</span> <b> {point.name}</b><br/>{series.name}: <b>{point.percentage:.1f}%</b><br>Films: <b>{point.films}</b>",
      },
      plotOptions: {
        series: {
          allowPointSelect: true,
          cursor: "pointer",
        },
      },
      series: [
        {
          name: "Percentage",
          data: newChartData,
        },
      ],
    });
  }, [filteredCharacters]);

  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
};

export default PieChart;
