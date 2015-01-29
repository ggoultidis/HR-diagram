// Made by George Goultidis


// Variables to be used for comunication between selections and animation
var binary = "Json_files/HR_1";
var star = "_d";
var attribute = "A"; 

var fileName = "Json_files/HR_1_d.json";
var stopped = false;

var lineArray = ["line1", "line2", "line3", "line4", "line5", "line6", "line7", "line8", "line9",
  "line10", "line11", "line12"];
var lineDict = {"line1":false, "line2":false, "line3":false, "line4":false, "line5":false, "line6":false, 
  "line7":false, "line8":false, "line9":false, "line10":false, "line11":false, "line12":false };

var lineName;



// handle selection change event
// at selection, the values of binary and star can change
d3.select("#ConfigurationMenu")
  .on("change", function() {

    binary = d3.select(this).property("value");
});

d3.select("#BinaryMenu")
  .on("change", function() {
    
    star = d3.select(this).property("value");
});



// handle button click event
d3.select("#StartButton")
  .on("click", function() {

    // compose the file name out of the selected values
    fileName = binary + star + ".json";

    if (stopped){
      stopped = false;
    }


    for (var j = 0; j < lineArray.length; j++){
      var line = lineArray[j];
      if (!lineDict.line){
        lineDict.line = true;
        lineName = line;
        break;
      }
    }
    StartAnimation(fileName, lineName);
});

d3.select("#StopButton")
  .on("click", function() {
    
    if (!stopped){
      stopped = true;
    }
});

d3.select("#ClearButton")
  .on("click", function() {
    if (!stopped){
      stopped = true;
    }
    
    var delete_dot = d3.selectAll("circle").remove();

    for (var j = 0; j < lineArray.length; j++){
      var line = lineArray[j];
      if (lineDict.line){
        lineDict.line = false;
        var path = "path." + line
        var delete_path = d3.selectAll(path).remove();
      }
    } 
});

// dimensions for graph 1
var margin = {top: 20, right: 20, bottom: 30, left: 50},
  width = 700 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom; 


//scales for graph 1
var x = d3.scale.log()
  .domain([4000,300000])
  .range([width, 0]);

var y = d3.scale.log()
  .domain([10000,800000])
  .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .ticks(10, ",.1s");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10, ",.1s");

// append svg for graph 1
var svg = d3.select("#HRcontainer").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("id", "graph1")
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


// append x-axis + text for graph 1
svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
  .append("text")
    .attr("class", "label")
    .attr("x", width)
    .attr("y", -6)
    .style("text-anchor", "end")
    .text("Effective Temperature (Kelvin, log scale)");

// append y-axis + text for graph 1
svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
  .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Luminosity (solar units, log scale)");


// dimensions for graph 2
var margin2 = {top: 20, right: 20, bottom: 30, left: 50},
  width2 = 400 - margin2.left - margin2.right,
  height2 = 200 - margin2.top - margin2.bottom;


// scales for graph 2
var x2 = d3.scale.linear()
  .domain([5,20])
  .range([0, width2]);

var y2 = d3.scale.linear()
  .domain([0,1])
  .range([height2, 0]);

var xAxis2 = d3.svg.axis()
    .scale(x2)
    .orient("bottom")
    .ticks(5, ",.1s");

var yAxis2 = d3.svg.axis()
    .scale(y2)
    .orient("left")
    .ticks(5, ",.1s");


// append a svg for the second graph
var svg2 = d3.select("#graph2Container").append("svg")
    .attr("width", width2 + margin2.left + margin2.right)
    .attr("height", height2 + margin2.top + margin2.bottom)
    .attr("id", "graph2")
  .append("g")
  .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");


// append x-axis + text for graph 2
svg2.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height2 + ")")
    .call(xAxis2)
  .append("text")
    .attr("class", "label")
    .attr("x", width2)
    .attr("y", -6)
    .style("text-anchor", "end")
    .text("Star Mass (solar masses)");

// append y-axis + text for graph 2
svg2.append("g")
    .attr("class", "y axis")
    .call(yAxis2)
  .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Surface He4(*100%)");

// function that takes in a file and the name of the line
// and animates the graph
function StartAnimation(jsonFile, lineName){
  // callback function
  d3.json(jsonFile, function(error, data){

    // append star in first graph (HR)
    var stars = svg.selectAll("dot")
      .data([data.points[0]])
    .enter().append("circle")
      .attr("r", function(d) { return d[5]/2; })
      .attr("cx", function(d) { return x(d[3]); })
      .attr("cy", function(d) { return y(d[4]); })
      .style("fill", "blue");

    // append star in second graph (He-Mass)
    var stars2 = svg2.selectAll("dot")
      .data([data.points[0]])
    .enter().append("circle")
      .attr("r", function(d) { return 3; })
      .attr("cx", function(d) { return x2(d[2]); })
      .attr("cy", function(d) { return y2(d[6]); })
      .style("fill", "blue");
    
    var duration = 90;
    var delay = 10;
    
    // update function, takes care of the motion
    function update(model_num){

      stars.data([data.points[model_num]]);
      stars2.data([data.points[model_num]]);

      if(!stopped){

        // transition the circle in the HR diagram
        var tr = stars.transition()
          .duration(duration)
          .attr("r", function(d) { return d[5]/2; })
          .attr("cx", function(d) { return x(d[3]); })
          .attr("cy", function(d) { return y(d[4]); })
          .style("fill", "blue");


        var line_path_1 = []

        for (var j = 0; j < model_num; j = j + 10){
          line_path_1.push({"X" : data.points[j][3], "Y" : data.points[j][4]});  
        }

        // draw line in HR diagram
        var draw_line = d3.svg.line()
          .x(function(d){return x(d.X);})
          .y(function(d){return y(d.Y);})
          .interpolate("linear");


        var delete_line = d3.selectAll("path.lineName").remove();

        var line_graph = svg.append("path")
          .attr("class", lineName)
          .attr("d", draw_line(line_path_1))
          .attr("stroke", "blue")
          .attr("stroke-width", 1)
          .attr("fill", "none");


        // transition the circle in the 2nd graph
        var tr2 = stars2.transition()
        .duration(duration)
        .attr("r", function(d) { return 3; })
        .attr("cx", function(d) { return x2(d[2]); })
        .attr("cy", function(d) { return y2(d[6]); })
        .style("fill", "blue");

        
        // draw line in graph 2
        var line_path_2 = []

        for (var j = 0; j < model_num; j = j + 10){
          line_path_2.push({"X" : data.points[j][2], "Y" : data.points[j][6]});  
        }

        
        var draw_line2 = d3.svg.line()
          .x(function(d){return x2(d.X);})
          .y(function(d){return y2(d.Y);})
          .interpolate("linear");


        var delete_line = d3.selectAll("path.lineName").remove();

        var line_graph2 = svg2.append("path")
          .attr("class", lineName)
          .attr("d", draw_line2(line_path_2))
          .attr("stroke", "blue")
          .attr("stroke-width", 1)
          .attr("fill", "none");
         
        
        setTimeout(function(){update((model_num + 10) % data.points.length);}, duration + delay);
      }
    }

    update(0);
  });
}