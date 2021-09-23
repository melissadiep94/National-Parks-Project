d3.json(location.origin + "/api/v1/visits").then((data) => {

   data = data.sort(function(a, b){return b.y2020 - a.y2020}).slice(0,20) 

  // Trace for parks visits
  let trace1 = {
    x: data.map(row => row.park),
    y: data.map(row => row.y2020),
    type: "bar",
    name: 2020
  };

  let trace2 = {
    x: data.map(row => row.park),
    y: data.map(row => row.y2019),
    type: "bar",
    name: 2019
  };

  let trace3 = {
    x: data.map(row => row.park),
    y: data.map(row => row.y2018),
    type: "bar",
    name: 2018
  };
  
  
  let trace4 = {
    x: data.map(row => row.park),
    y: data.map(row => row.y2017),
    type: "bar",
    name: 2017
    };

  // Data trace array
  let traceData = [trace1, trace2, trace3, trace4];

  // Apply the group barmode to the layout
  let layout = {
    title: {
      text: "Most Visited Parks 2020",
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
    legend: {
      x: 1.0,
      y: 1.0,
      font: {
        color: '#f0f0f0',
        size : 12
      }   

    },
    barmode: 'group'
  };


  // Render the plot to the div tag with id "plot"
  Plotly.newPlot("plot", traceData, layout);
});

