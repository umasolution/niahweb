import React, { useEffect } from 'react';
import { Plotly } from "../../../../Util/Constants";

const CWEPieChart = ({ cwe, divId }) => {
  useEffect(() => {
    if (cwe) {
      const labels = [];
      const values = [];
      cwe.forEach(sev => {
        labels.push(Object.keys(sev)[0]);
        values.push(sev[Object.keys(sev)[0]]);
      })
      const data = [
        {
          labels,
          values,
          type: 'pie',
          automargin: true,
          textinfo: "label+percent",
          textposition: "outside",
        }
      ];
      var layout = {
        title: 'CWE',
        width: 360,
        height: 280,
        showlegend: false,
        plot_bgcolor:"#f1f1f1",
      paper_bgcolor:"#f1f1f1"
      };
      var config = { responsive: true }
      Plotly.newPlot(`CWEPieChartDiv-${divId}`, data, layout, config);
    }
  }, [])

  return (
    <div id={`CWEPieChartDiv-${divId}`} />
  );
};

export default CWEPieChart;