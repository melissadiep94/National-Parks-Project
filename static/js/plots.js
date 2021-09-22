d3.json(location.origin + "/api/v1/visits").then((data) => {

  // Trace for parks visits
  let trace1 = {
    x: data.filter(row => row.year == 2018).map(row => row.park),
    y: data.filter(row => row.year == 2018).map(row => row.visits),
    type: "bar",

  };
  let trace2 = {
    x: data.filter(row => row.year == 2019).map(row => row.park),
    y: data.filter(row => row.year == 2019).map(row => row.visits),
    type: "bar",

  };

  // Data trace array
  let traceData = [trace1, trace2];

  // Apply the group barmode to the layout
  let layout = {
    title: {
      text: "Most Visited Parks 2020 (in millions of visits)",
      font: {
        color: '#f0f0f0',
      }
    },
    paper_bgcolor: '#232e35',
    plot_bgcolor: '#232e35',
    xaxis: {
      color: '#f0f0f0'
    },
    yaxis: {
      color: '#f0f0f0'
    },
    barmode: 'group'
  };


  // Render the plot to the div tag with id "plot"
  Plotly.newPlot("plot", traceData, layout);
});

d3.json(location.origin + "/api/v1/activities").then((data) => {
  data = data.sort(function(a, b){return b.count - a.count}).slice(0,20) 
  // sorted in descending order, first 20  

  let pieData = [
    {
        values: data.map(row=>row.count),
        labels: data.map(row=>row.type),
        hoverinfo: "hovertext",
        type: "pie"
    }
];

let pieLayout = {
    margin: { t: 0, l: 0 },
    paper_bgcolor: '#232e35',
    plot_bgcolor: '#232e35',
    legend: {
      traceorder: 'normal',
      font: {
        size: 12,
        color: '#f0f0f0',
      },
      bgcolor: '#232e35',
      bordercolor: '#232e35',
      borderwidth: 2
    }
};

Plotly.plot("pie", pieData, pieLayout);
});
