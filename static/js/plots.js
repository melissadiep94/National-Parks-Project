d3.json( location.origin + "/api/v1/visits").then((data) => {


console.log(data);


// Trace for parks visits
let trace1 = {
    x: data.map(row => row.park),
    y: data.map(row => row.visits),
    type: "bar",
    
  };

// Data trace array
let traceData = [trace1];

// Apply the group barmode to the layout
let layout = {
  title: {
    text: "Most Visited Parks 2020 (in millions of visits)",
    font: {
      color:'#f0f0f0',
   }
  },
  paper_bgcolor: '#232e35',
  plot_bgcolor: '#232e35',
  xaxis:{
  color: '#f0f0f0'
  },
  yaxis:{
    color: '#f0f0f0'
  }
};


// Render the plot to the div tag with id "plot"
Plotly.newPlot("plot", traceData, layout);
});
