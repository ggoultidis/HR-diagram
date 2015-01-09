var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;


    // var parseDate = d3.time.format("%d-%b-%y").parse; 

    var globalData;

    // callback function
    d3.json("HR.json", function(error, data){
      

      // var dat = [];
      // for(var i = 0, length = data.length; i < length; i++){
      //    var d = [data[i].year, data[i].pop];
      //    dat[i] = d;
      //    console.log(d);
      // }

      var axis_format = d3.format("04d");

      var x = d3.scale.log()
        .domain([1000,50000])
        .range([width, 0]);

      var y = d3.scale.linear().domain([0, 5])
          .range([height, 0]);

      var xAxis = d3.svg.axis()
          .scale(x)
          .orient("bottom")
          .tickFormat(axis_format)
          .ticks(10);

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

      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis)
        .append("text")
          .attr("class", "label")
          .attr("x", width)
          .attr("y", -6)
          .style("text-anchor", "end")
          .text("Temperature");

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
        .attr("r", 2)
        .attr("cx", function(d) { return x(parseInt(d[0])); })
        .attr("cy", function(d) { return y(parseInt(d[1])); })
        .style("fill", "red");
    });