var idb = ["samples.json"]
d3.json(idb[0]).then((data) => {
    var samples=data;

    console.log(samples)
    console.log(samples[0])
    console.log(samples[0].names)
    console.log(samples[0].metadata)
    console.log(samples[0].samples)

    //Bar Chart for id=940 as default plot
    function init() {
    var isamples0 = samples[0].samples[0];
    //console.log(isamples0)
    isamples0.otu_ids2 = isamples0.otu_ids.map(function(otu){
        return "otu " + otu
        });
 
    var trace1 = {
        x: isamples0.sample_values.slice(0,10).reverse(),
        y: isamples0.otu_ids2.slice(0,10).reverse(),
        text: isamples0.otu_labels.slice(0,10).reverse(),
        name: "Data",
        type: "bar",
        orientation: "h"
      };
 
    var chartData = [trace1];
    //console.log(chartData)
    
    var layout = {
        title: "Top OTUs of Subject ID: " + "940",
        margin: {
          l: 100,
          r: 100,
          t: 100,
          b: 100
        }
      };

    Plotly.newPlot("bar", chartData, layout);
    //console.log(isamples0.id)

    //Demographic Info   
    var imetadata0 = samples[0].metadata[0]
    console.log(imetadata0)
    var demogr = d3.select("#sample-metadata");
    demogr.append("tr").text("id: " + imetadata0["id"]);
    demogr.append("tr").text("ethnicity: " + imetadata0["ethnicity"]);
    demogr.append("tr").text( "gender: " + imetadata0["gender"]);
    demogr.append("tr").text("age: " + imetadata0["age"]);
    demogr.append("tr").text( "location: " + imetadata0["location"]);
    demogr.append("tr").text("bbtype: " + imetadata0["bbtype"]);
    demogr.append("tr").text( "wfreq: " + imetadata0["wfreq"]);
  
  //Bubble Chart
  var traceb = {
    x: isamples0.otu_ids,
    y: isamples0.sample_values,
    text: isamples0.otu_labels,
    mode: 'markers',
    marker: {
      color: isamples0.otu_ids,
      size: isamples0.sample_values
    }
  };

  var bubbleData = [traceb];
  console.log(bubbleData)
  console.log(d3.max(isamples0.otu_ids))
    
    var layout = {
        title: "Subject ID: " + 940,
        showlegend: false,
        height: 500,
        width: 1000,
        xaxis:{title:{text: 'otu ids'}},
        yaxis:{title:{text: 'sample values'}}
    }
  Plotly.newPlot('bubble', bubbleData, layout);

//Gauge Chart
var gdata = [
	{
		domain: { x: [0, 1], y: [0, 1] },
		value: imetadata0.wfreq,
		title: { text: "Scrubs per Week, Subject ID: " + 940 },
		type: "indicator",
    gauge: {
      axis: { range: [0, 9] },
      steps:[
        { range: [0,1], color: "rgb(237,246,228)" },
        { range: [1,2], color: "rgb(211,233,191)" },
        { range: [2,3], color: "rgb(189,223,159)" },
        { range: [3,4], color: "rgb(164,210,122)" },
        { range: [4,5], color: "rgb(123,188,64)" },
        { range: [5,6], color: "rgb(108,166,56)" },
        { range: [6,7], color: "rgb(86,134,54)" },
        { range: [7,8], color: "rgb(65,101,41)" },
        { range: [8,9], color: "rgb(56,87,85)" }
      ]},
		mode: "gauge+number"
	}
];

var layout = { width: 400, height: 300, margin: { l:100, r:50, t: 0, b: 0 } };
Plotly.newPlot('gauge', gdata, layout);

  };
//Default items above completed

 d3.select("#sample-metadata").html("");  

    //Test Subject ID List
    var samplesallid = samples[0].samples.map(sid => sid.id);
    console.log(samplesallid)
    var idli = document.getElementById("selDataset");
    for (var i = 0; i<samplesallid.length; i++) {
      var opt = samplesallid[i];
      var el = document.createElement("option");
      el.textContent = opt;
      el.value = opt;
      idli.appendChild(el);
    }

    document.getElementById("selDataset").onchange = function(){getData()};
    function getData(){
    var dsid = document.getElementById("selDataset").value;  
    //console.log(dsid)

    //Bar Chart
      var isamples01 = samples[0].samples.filter(ssid => ssid.id === dsid)
      var isamples0 = isamples01[0];
      //console.log(isamples0)
      isamples0.otu_ids2 = isamples0.otu_ids.map(function(otu){
          return "otu " + otu
          });
      
      var trace1 = {
          x: isamples0.sample_values.slice(0,10).reverse(),
          y: isamples0.otu_ids2.slice(0,10).reverse(),
          text: isamples0.otu_labels.slice(0,10).reverse(),
          name: "Data",
          type: "bar",
          orientation: "h"
        };
        var chartData = [trace1];
        var layout = {
          title: "Top OTUs of Subject ID: " + dsid,
          margin: {
            l: 100,
            r: 100,
            t: 100,
            b: 100
          }
        };

        Plotly.newPlot("bar", chartData, layout);

      //Demographic Info
      var imetadata01 = samples[0].metadata.filter(ssid => ssid.id === parseInt(dsid));
      var imetadata0 = imetadata01[0];
      console.log(imetadata0)

      var demogr = d3.select("#sample-metadata");

      d3.select("#sample-metadata").html("");
      demogr.append("tr").text("id: " + imetadata0["id"]);
      demogr.append("tr").text("ethnicity: " + imetadata0["ethnicity"]);
      demogr.append("tr").text( "gender: " + imetadata0["gender"]);
      demogr.append("tr").text("age: " + imetadata0["age"]);
      demogr.append("tr").text( "location: " + imetadata0["location"]);
      demogr.append("tr").text("bbtype: " + imetadata0["bbtype"]);
      demogr.append("tr").text( "wfreq: " + imetadata0["wfreq"]);
      
      //Bubble Chart
      var traceb = {
        x: isamples0.otu_ids,
        y: isamples0.sample_values,
        text: isamples0.otu_labels,
        mode: 'markers',
        marker: {
          color: isamples0.otu_ids,
          size: isamples0.sample_values
        }
      };
    
      var bubbleData = [traceb];
      console.log(bubbleData)
   
        var layout = {
            title: "Subject ID: " + dsid,
            showlegend: false,
            height: 500,
            width: 1000,
            xaxis:{title:{text: 'otu ids'}},
            yaxis:{title:{text: 'sample values'}}
        }
      Plotly.newPlot('bubble', bubbleData, layout);

//Gauge Chart
var gdata = [
	{
		domain: { x: [0, 1], y: [0, 1] },
		value: imetadata0.wfreq,
		title: { text: "Scrubs per Week, Subject ID: " + dsid  },
		type: "indicator",
    gauge: {
      axis: { range: [0, 9] },
      steps:[
        { range: [0,1], color: "rgb(237,246,228)" },
        { range: [1,2], color: "rgb(211,233,191)" },
        { range: [2,3], color: "rgb(189,223,159)" },
        { range: [3,4], color: "rgb(164,210,122)" },
        { range: [4,5], color: "rgb(123,188,64)" },
        { range: [5,6], color: "rgb(108,166,56)" },
        { range: [6,7], color: "rgb(86,134,54)" },
        { range: [7,8], color: "rgb(65,101,41)" },
        { range: [8,9], color: "rgb(56,87,85)" }
      ]},
		mode: "gauge+number"
	}
];

var layout = { width: 400, height: 300, margin: { l:100, r:50, t: 0, b: 0 } };
Plotly.newPlot('gauge', gdata, layout);

    }   

    init();


});
