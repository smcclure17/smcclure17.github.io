d3.csv("total_hr_data.csv")
  .then(function(d) {

    var hrs = d3.select("svg")
      .selectAll("g")
            .data(d)
            .enter()
            .append("g")
            .attr("class", "hrs")
                .attr("transform", function(d){
                    return "translate(" + (2 * d.hc_x + 50) + "," + (2 * d.hc_y + 50) + ")";
                });

                // hrs.append("line")
                //          .attr("class", "lne")
                //          .attr("x1", 320)
                //          .attr("y1", 470)
                //          .attr("x2",function(d) {
                //               return d.hc_x;})
                //          .attr("y2",function(d) {
                //               return d.hc_y;})
                //          .style("stroke", "blue")
                //          .style("stroke-width", 0.5);

      hrs.append("circle") // add a circle for each shot
               .attr("r", 3)
               .attr("class", "cle")
               .attr("fill", function(d) {
                      return "blue";
              })


      var batters = d3.nest() // filter by player and get total shots made by each player
      .key(function(d){ return d.player_name; })
      .rollup(function(a){ return a.length; })
      .entries(d);

      console.log(batters);

      batters.unshift({"key": "ALL", //create one entry that shows all shots
                      "value": d3.sum(batters, function(d) { return d.value; })})

     var selector = d3.select("#selector"); //make a selecter to choose desired player

     selector    //add player name and count to each item in the drop down
          .selectAll("option")
          .data(batters)
          .enter()
          .append("option")
              .text(function(d){ return d.key + " (" + d.value + ")"; })
              .attr("value", function(d){ return d.key; })


    selector //fade other players when one player is selected
    .on("change", function(){
      d3.selectAll(".lne")
        .attr("opacity", 1.0);
        d3.selectAll(".cle")
          .attr("opacity", 1.0);
        var value = selector.property("value");
        if (value != "ALL") {
          d3.selectAll(".cle")
            .filter(function(d) { return d.player_name != value; })
            .attr("opacity", 0.02);
            d3.selectAll(".lne")
              .filter(function(d) { return d.player_name != value; })
              .attr("opacity", 0);
          }
          d3.select("#total_text")
            .data(batters)
            .text(function(batters) {
                return value;
            })
        });

  });
