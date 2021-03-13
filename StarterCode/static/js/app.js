// create the function that gets the data and creates the plots for the id

function buildChart(id) {

    // get the data from the json file
    d3.json("samples.json").then((data) => {
        // filter sample values by id
        var samples = data.samples.filter(s => s.id.toString() === id)[0];
        // get only top 10 sample values to plot and reverse for the plotly
        var sampleValues = samples.sample_values.slice(0, 10).reverse();

        // get only top 10 otu ids for the plot
        var OTU_top = (samples.otu_ids.slice(0, 10)).reverse();

        // get the otu id's to the desired form for the plot
        var OTU_id = OTU_top.map(d => "OTU " + d)

        // get the top 10 labels for the plot
        var labels = samples.otu_labels.slice(0, 10);

        // create trace variable for the plot
        var trace = {
            x: sampleValues,
            y: OTU_id,
            text: labels,
            type:"bar",
            orientation: "h",
        };
        // create data variable
        var data = [trace];

        // create layout variable to set plots layout    
        var layout = {
            title: "Top 10 OTU",
            yaxis:{
                tickmode:"linear",
            },
            margin: {
                l: 100,
                r: 100,
                t: 30,
                b: 20
            }
        };
    });
    // create the bar plot
    Plotly.newPlot("bar", data, layout);

    //     var trace1 = {
    //         x: data.samples[0].otu_ids,
    //         y: data.samples[0].sample_values,
    //         mode: 'markers',
    //         marker: {
    //         color: data.samples[0].otu_ids,
    //         size: data.samples[0].sample_values,
    //         },
    //         text: data.samples[0].otu_labels
    //     };
        
    //     var layout1 = {
    //         xaxis: {title: "OTU ID"},
    //         height: 600,
    //         width: 1000
    //     };

    //     var data1 = [trace1];
        
    // Plotly.newPlot("bubble", data1, layout1);
    // });

}
