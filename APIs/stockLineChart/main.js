let api="https://raw.githubusercontent.com/valuecodes/Free-Code-Camp/master/APIs/OMXHelsinkiHistoricChart/Data/omx25.json";

    document.addEventListener("DOMContentLoaded", function(event) {
      console.log('starting');
      fetch(api)
      
      .then(function(response) { return response.json(); })
      .then(function(data) {
          var parsedData = parseData(data);
          console.log(parsedData);
          createChart(parsedData);
          // createMouse();

      })
      .catch(function(err) { console.log(err); });
      
  });


  function parseData(data) {
    var arr = [];
      for(var i=0;i<data.length;i++){
           arr.push({
            date: new Date(data[i][0]), //date
            value:data[i][1].split(',')[0] //convert string to number
          });
      }
    return arr;
}

let createChart=(data)=>{
    console.log(data[1].date.getFullYear())
    let w=600;
    let h=200;
    let padding=40;

    const svg=d3.select('body')
        .append('svg')
        .attr('width',w+padding)
        .attr('height',h+padding)
        .attr('class','chart')

        var g = svg.append("g")
        .attr("transform", "translate(" + padding + "," + padding + ")");
    
    var valueline = d3.line()
        .x(function(d) { return x(d.date.getFullYear()); })
        .y(function(d) { return y(d.close); });

    var x = d3.scaleTime()
        .rangeRound([0, w-padding]);
    
    var y = d3.scaleLinear()
        .rangeRound([h-padding, 0]);

    var line = d3.line()
        .x(function(d) {return x(d.date)})
        .y(function(d) { return y(d.value)})
        x.domain(d3.extent(data, function(d) { return d.date}));
        y.domain(d3.extent(data, function(d) { return d.value }));


    g.append("g")
        .attr("transform", "translate(0," +(h-padding) + ")")
        .call(d3.axisBottom(x))
        .append('text')
        .select(".domain")
        .remove()
        
    
    g.append("g")
        .call(d3.axisLeft(y))
        .append("text")
        .attr("fill", "#000")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")

var vertical=  d3.select(".chart")
        .append("rect")
        .attr("x", 1125)
        .attr("y", padding)
        .attr('width',1)
        .attr('height',h-padding)
        .style("fill", "black")
        .style('transform', 'translateX(30px)');
        

        g.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr("d", line)
        .on("mousemove", function(d){ 
                    console.log(d.value) 
                    mousex = d3.mouse(this);
                    mousex = mousex[0];
                    
                    vertical.style("x", mousex + "px" )
                })

}