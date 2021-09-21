d3.json(location.origin + "/api/v1/visits").then((data) => {
    



    // Trace for parks visits
    let trace1 = {
        x: data.filter(row => row.year==2017).map(row =>row.park),
        y: data.filter(row=> row.year==2017).map(row => row.visits),
        type: "bar"
    };   

  
    let trace2 = {
        x: data.filter(row => row.year==2018).map(row =>row.park),
        y: data.filter(row=> row.year==2018).map(row => row.visits),
        type: "bar"
    };   

    let trace3 = {
        x: data.filter(row => row.year==2019).map(row =>row.park),
        y: data.filter(row=> row.year==2019).map(row => row.visits),
        type: "bar"
    };


    let trace4 = {
        x: data.filter(row => row.year==2020).map(row =>row.park),
        y: data.filter(row=> row.year==2020).map(row => row.visits),
        type: "bar"
    };
        


    // Data trace array
    let traceData = [trace1, trace2, trace3, trace4];

    // Apply the group barmode to the layout
    let layout = {
        title: 
        {
            text:"Visitation in Parks",
            font:{
                color:'#f0f0f0',
            } 
        },
        paper_bgcolor: '#232e35',//dark gray
        plot_bgcolor: '#232e35',
        x_axis: {
            color: '#f0f0f0',
        },
        y_axis: {
            color: '#f0f0f0'
        },
        barmode: 'group' 
    };


    // Render the plot to the div tag with id "plot"
    Plotly.newPlot("plot", traceData, layout);
});

// //use plotly to build charts

// function buildVisits(id) {
//     //Complete the function that builds the Visits Data Panel
//     //Use d3.json to Fetch the data for a sample

//     d3.json(`/new_visits_2017/${id}`).then((data) => {
//         //Use d3 to Select the Panel with id of `#Visits 2017`
//         var panel = d3.select("#new_visits_2017");
//         //Use `.html("") to Clear any Existing data
//         Panel.html("");
//         //Use 'Object.entries` to add each key & value pair to the panel
//         //inside the loop, Use d3 to Append New Tags for each Key-Value in the data
//         Object.entries(data).forEach(([key, value]) => {
//             Panel.append("h6").text(`${key}:${value}`);
//     });

    
    



// function buildcharts(id) {
//             //Use 'd3.json' to Fetch the id Data for the Plots
//             d3.json(`/data/${id}`).then((data) => {
//                 //Build a Bubble Chart using the id data
//                 const ids = data.ids;
//                 const ParkNames = data.ParkNames;
//                 const PercentOfTotal = data.PercentOfTotal;

//                 //Build a Pie Chart
//                 let bubbleLayout = {
//                     margin: { t: 0 },
//                     hovermode: "closests",
//                     x_axis: { title: "Park Name" }
//                 }

//                 let bubbleData = [
//                     {
//                         x: ids,
//                         y: PercentOfTotal,
//                         text: ParkNames,
//                         mode: "markers",
//                         marker: {
//                             size: ids,
//                             color: ParkNames,
//                             colorscale: "Earth"
//                         }
//                     }
//                 ]

//                 Plotly.plot("bubble", bubbleData, bubbleLayout);

d3.json(location.origin + "/api/v1/visits").then((data) => {
    


                //Use slice() to grab the Top 10 Park Names and ids
                let pieData = [
                    {
                        values: data.map(row => row.count),
                        labels: data.map(row => row.type),
                        hoverinfo: "hovertext",
                        type: "pie"
                    }
                ];

                let pieLayout = {
                    margin: { t: 0, l: 0 }
                };

                Plotly.plot("pie", pieData, pieLayout)

            
        

    // // function init() {
    // //         //Get a reference to the Dropdown Select Element
    // //         var selector = d3.select("#selDataset");

    //         //Use the List of Park Names to Populate the Select Options
    //         d3.json("/names").then((ParkNames) => {
    //             ParkNames.forEach((ParkName) => {
    //                 selector
    //                     .append("option")
    //                     .text(ParkName)
    //                     .property("value", ParkNames);
    //             });

    //             //Use the first id from the list to build initial plots
    //             const firstid = ParkNames[0];
    //             buildcharts(firstid);
    //             buildVisits(firstid);
    //         });
    // //     }

    // function optionChanged(newParkName) {
    //         //fetch new data each time a new name is selected
    //         buildcharts(newParkName);
    //         buildVisits(newParkName);
    //     }

    // //Initialize the Dashboard
    //        init();