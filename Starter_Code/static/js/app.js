function getPlots(id) {
    //samples
        d3.json("samples.json").then (sampledata =>{
            console.log(sampledata)
            var ids = sampledata.samples[0].otu_ids;
            console.log(ids)
            var sampleValues =  sampledata.samples[0].sample_values.slice(0,10).reverse();
            console.log(sampleValues)
            var labels =  sampledata.samples[0].otu_labels.slice(0,10);
            console.log (labels)
        // top 10 ids
            var OTU_top = ( sampledata.samples[0].otu_ids.slice(0, 10)).reverse();
        // change format
            var OTU_id = OTU_top.map(d => "OTU " + d);
            console.log(`OTU IDS: ${OTU_id}`)
         //top ten labels
            var labels =  sampledata.samples[0].otu_labels.slice(0,10);
            console.log(`OTU_labels: ${labels}`)
            var trace = {
                x: sampleValues,
                y: OTU_id,
                text: labels,
                marker: {
                color: 'blue'},
                type:"bar",
                orientation: "h",
            };
            // trace variable
            var data = [trace];
    
            // bar layout
            var layout = {
                title: "Top 10 OTU",
                yaxis:{
                    tickmode:"linear",
                },
                margin: {
                    l: 100,
                    r: 100,
                    t: 100,
                    b: 30
                }
            };
    
        Plotly.newPlot("bar", data, layout);
            
            var trace1 = {
                x: sampledata.samples[0].otu_ids,
                y: sampledata.samples[0].sample_values,
                mode: "markers",
                marker: {
                    size: sampledata.samples[0].sample_values,
                    color: sampledata.samples[0].otu_ids
                },
                text:  sampledata.samples[0].otu_labels
    
            };
    
            // bubble layout
            var layout_2 = {
                xaxis:{title: "OTU ID"},
                height: 600,
                width: 1000
            };
    
            // trace 
            var data1 = [trace1];
    
        // bubble plot
        Plotly.newPlot("bubble", data1, layout_2); 
        
        });
    }  
    // function thing
    function getDemoInfo(id) {
    
        d3.json("samples.json").then((data)=> {
    
            var metadata = data.metadata;
    
            console.log(metadata)
    
          
           var result = metadata.filter(meta => meta.id.toString() === id)[0];
          
           var demographicInfo = d3.select("#sample-metadata");
            
         //clear data
           demographicInfo.html("");
    
         // append
            Object.entries(result).forEach((key) => {   
                demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
            });
        });
    }
 
    function optionChanged(id) {
        getPlots(id);
        getDemoInfo(id);
    }
    

    function init() {
        // dropdown 
        var dropdown = d3.select("#selDataset");
    
        
        d3.json("samples.json").then((data)=> {
            console.log(data)
    
            // get the id data to the dropdwown menu
            data.names.forEach(function(name) {
                dropdown.append("option").text(name).property("value");
            });
    
            // get data
            getPlots(data.names[0]);
            getDemoInfo(data.names[0]);
        });
    }
    
    init();