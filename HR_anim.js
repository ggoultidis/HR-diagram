// var binary1_sel = true;
// var binary2_sel = false;
// var binary3_sel = false;
// var binary4_sel = false;
// var binary5_sel = false;
// var binary6_sel = false;


// handle on click event
d3.select("#binary_menu")
  .on("change", function() {
    console.log(d3.select(this).property("value"));
    // updateLegend(newData);
});



var margin = {top: 20, right: 20, bottom: 30, left: 50},
  width = 960 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom; 



var axis_format = d3.format("01d");

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


var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");


var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("id", "graph1")
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


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

// 
// 
var data_sets = ["HR_d_6.json", "HR_a_6.json"];

for(var i = 0; i < data_sets.length; i++){
  console.log(i);

  // callback function
  d3.json(data_sets[i], function(error, data){

    var star = svg.selectAll("dot")
        .data([data.points[0]])
      .enter().append("circle")
        .attr("r", function(d) { return d[6]; })
        .attr("cx", function(d) { return x(d[4]); })
        .attr("cy", function(d) { return y(d[5]); })
        .style("fill", "red");


    var total_duration = 10000,
      steps = data.points.length,
      time_step = total_duration / steps;
    
    var duration = 5,
     delay = 0;

    console.log(time_step);



    var line = d3.svg.line()
      .interpolate("linear")
      .x(function(d) {return x(d[4]);})
      .y(function(d) {return y(d[5]);})

    var path = svg.append("path")
      .attr("d", line(data.points))
      .attr("stroke", "steelblue")
      .attr("stroke-width", "2")
      .attr("fill", "none");

    var totalLength = path.node().getTotalLength();

    path
      .attr("stroke-dasharray", totalLength + " " + totalLength)
      .attr("stroke-dashoffset", totalLength)
      .transition()
        .duration(total_duration)
        .ease("linear")
        .attr("stroke-dashoffset", 0);





    
    
    function update(model_num){
      star.data([data.points[model_num]]);
      if (steps - 1 > (model_num % steps)){

        var tr = star.transition()
          .duration(time_step)
          .attr("r", function(d) { return d[6]; })
          .attr("cx", function(d) { return x(d[4]); })
          .attr("cy", function(d) { return y(d[5]); })
          .style("fill", "blue");

        /*
        if (data.points[0][0] == "a"){
          var path = "pathA";
        }
        else if(data.points[0][0] == "d"){
          var path = "pathD";
        }

        var delete_line = d3.selectAll(path).remove();

        var line_path =[];

        for (var j = 0; j < model_num; j++){
          line_path.push({"X" : data.points[j][4], "Y" : data.points[j][5]});  
        }
        
        var draw_line = d3.svg.line()
          .x(function(d){return x(d.X);})
          .y(function(d){return y(d.Y);})
          .interpolate("linear");

        var line_graph = svg.append("path")
          .attr("d", draw_line(line_path))
          .attr("stroke", "blue")
          .attr("stroke-width", 1)
          .attr("fill", "none")
          // .attr("class", path);
        */
      }
      setTimeout(function(){update((model_num + 1) % 3300);}, duration + delay);
    }
    update(0);


    // gets the base 10 log of the effective Temperature and uses the peak of Planck's
    // formula to find the corresponding color 
    function getColor (log_T){
      return log_T;
    }
    function hello(){
      console.log("hello")
    }
  });
}