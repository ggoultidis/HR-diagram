var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom; 

var globalData;

// callback function
d3.json("HR1.json", function(error, data){
  

  var axis_format = d3.format("04d");

  var x = d3.scale.log()
    .domain([3.5,6])
    .range([width, 0]);

  var y = d3.scale.log()
    .domain([3, 6])
    .range([height, 0]);

  var xAxis = d3.svg.axis()
      // .ticks(15)
      .scale(x)
      .orient("bottom")
      // .tickFormat(axis_format)
      // .tickValues([1000,3000,6000,10000,20000,40000]);
      // .tickValues([1000, 2000,3000,5000,10000,15000,20000,30000,50000]);


  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");


  var svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // console.log(data.points);

  // Gives domain between min and max >> .extent <<
  // x.domain(d3.extent(data.points, function(d) { return parseInt(d[0]); }));
  // y.domain(d3.extent(data.points, function(d) { return parseInt(d[1]); }));

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

  svg.selectAll("dot")
      .data(data.points)
  .enter().append("circle")
    .attr("r", function(d) { return d[5]; })
    .attr("cx", function(d) { return x(d[3]); })
    .attr("cy", function(d) { return y(d[4]); })
    .style("fill", "red");

  // var tr = rect.transition().duration(1000);
  // tr.attr("cx",)

  // gets the base 10 log of the effective Temperature and uses the peak of Planck's
  // formula to find the corresponding color 
  function getColor (log_T){
    return log_T;
  }
});