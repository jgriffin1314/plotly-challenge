
//Use the D3 library to read in samples.json.
function getData(id) {
    d3.json("samples.json").then(function (bellydata) {
        console.log(bellydata);
        var sample_values = bellydata.samples[0].sample_values.slice(0, 10).reverse();
        var otu_ids = bellydata.samples[0].otu_ids;
        var otu_labels = bellydata.samples[0].otu_labels.slice(0, 10);
    })};

// Grab subject ID
function grab_subj_id() {
    var id_selection = d3.select("#selDataset");
    
    d3.json("samples.json").then(function (samples_data) {
        var idNames = samples_data.names
        idNames.forEach((name) => { id_selection.append("option").text(name).property("value", name) });
    })};



function buildCharts(ID_selected) {
    //Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
    //Use sample_values as the values for the bar chart.
    //Use otu_ids as the labels for the bar chart.
    //Use otu_labels as the hovertext for the chart.

    d3.json("samples.json").then(function (samples_data) {
        var id_sample = samples_data.samples;
        var filteredSample = id_sample.filter(subject => subject.id == ID_selected)[0];
        
        var bar_trace = [{
            type: 'bar',
            orientation: 'h',
            x: filteredSample['sample_values'].slice(0, 10).reverse(),
            y: filteredSample['otu_ids'].slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
            text: filteredSample['otu_labels'].slice(0, 10).reverse()
        }];

        var bar_layout = {
            title: "Top 10 OTUs Found",
        };

        Plotly.newPlot('bar', bar_trace, bar_layout);

    // Create a bubble chart that displays each sample.
    // Use otu_ids for the x values.
    // Use sample_values for the y values.
    // Use sample_values for the marker size.
    // Use otu_ids for the marker colors.
    // Use otu_labels for the text values.
    // set the dimensions and margins of the graph

    var bubble_trace = {
        margin: { t: 0 },
        hovermode: "closest",
        yaxis: { title: "Sample Values"},
        xaxis: { title: "OTU ID" },
        margin: {
            l: 20,
            r: 20,
            t: 30,
            b: 30
          }
      };

      var bubble_data = [
        {
          x: filteredSample['otu_ids'].map(otuID => `${otuID}`),
          y: filteredSample['sample_values'],
          text: filteredSample['otu_labels'],
          mode: "markers",
          marker: {
            size: filteredSample['sample_values'],
            colorscale: "Bluered"
          }}];
  
      Plotly.newPlot("bubble", bubble_data, bubble_trace);
  
})};

//Display the sample metadata, i.e., an individual's demographic information.
//Display each key-value pair from the metadata JSON object somewhere on the page.

function populateDemographic(ID_selected) {
    d3.json("samples.json").then(function (samples_data) {
        var demo_data = samples_data.metadata;
        var filtered_demo_data = demo_data.filter(subject => subject.id == ID_selected)[0];
        var subj_demo_data = d3.select("#sample-metadata");
        Object.entries(filtered_demo_data).forEach(function ([key, value]) {
            subj_demo_data.append("h5").text(`${key}:${value}`);
        });
    });
};


// Update all of the plots any time that a new sample is selected.
function optionChanged(ID_selected) {
    populateDemographic(ID_selected)
    buildCharts(ID_selected)
};

//INit 
grab_subj_id();