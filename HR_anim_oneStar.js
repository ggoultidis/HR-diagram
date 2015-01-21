// handle on click event
d3.select("#binary_menu")
  .on("change", function() {
    console.log(d3.select(this).property("value"));
    // updateLegend(newData);
});



var margin = {top: 20, right: 20, bottom: 30, left: 50},
  width = 960 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom; 


var x = d3.scale.log()
  .domain([3.5,6])
  .range([width, 0]);

var y = d3.scale.log()
  .domain([3, 6])
  .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    // .tickFormat(axis_format)
    // .tickValues([1000,3000,6000,10000,20000,40000]);


var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");


var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("id", "graph1")
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


// append x-axis + text
svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
  .append("text")
    .attr("class", "label")
    .attr("x", width)
    .attr("y", -6)
    .style("text-anchor", "end")
    .text("Effective Temperature");

// append y-axis + text
svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
  .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Luminosity");



// callback function
d3.json("HR_d_1.json", function(error, data){

  var stars = svg.selectAll("dot")
      .data([data.points[0]])
  .enter().append("circle")
    .attr("r", function(d) { return d[5]; })
    .attr("cx", function(d) { return x(d[3]); })
    .attr("cy", function(d) { return y(d[4]); })
    .style("fill", "red");

  
  var duration = 5;
  var delay = 0;
  
  function update(model_num){
    stars.data([data.points[model_num]]);
    if (data.points.length - 1 > (model_num % 3300)){

      var tr = stars.transition()
        .duration(duration)
        .attr("r", function(d) { return d[5]; })
        .attr("cx", function(d) { return x(d[3]); })
        .attr("cy", function(d) { return y(d[4]); })
        .style("fill", "blue");

      var delete_line = d3.selectAll("path.star1Path").remove();

      var line_path_1 = []

      for (var j = 0; j < model_num; j++){
        line_path_1.push({"X" : data.points[j][3], "Y" : data.points[j][4]});  
      }

      // console.log(line_path_1[0]);
      
      var draw_line = d3.svg.line()
        .x(function(d){return x(d.X);})
        .y(function(d){return y(d.Y);})
        .interpolate("linear");

      var line_graph = svg.append("path")
        .attr("class", "star1Path")
        .attr("d", draw_line(line_path_1))
        .attr("stroke", "blue")
        .attr("stroke-width", 1)
        .attr("fill", "none");

      // console.log(model_num)
    }
    setTimeout(function(){update((model_num + 1) % 3300);}, duration + delay);
  }

  update(0);
});