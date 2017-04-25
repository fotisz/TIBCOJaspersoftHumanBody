define('human_body',['d3'], function (d3) {

	 return function (instanceData) {	
		
	 	var w = instanceData.width,
                    h = instanceData.height;

                var margin = 20;
                var diameter = Math.min(w,h) - margin;

		var svg = d3.select("#" + instanceData.id).insert("svg")
		    .attr("id", instanceData.id + "svg")
		    .attr("width", w)
		    .attr("height", h)
		    .attr("viewbox", "0 0 " + w + " " + h);    
 		
		// We use the animation flag set by the CVC exporter to determine if the export is performed on server or client.
         // The CVC tells us to avoid animations in case of server side export, so if instanceData.animation and true, we
         // are rendering on the server.
         var serverSideExport = false;
         if (typeof instanceData.animation != 'undefined' && instanceData.animation == false)
         {
            serverSideExport = true;
         }
        
        // (original height / original width) x new width = new height
        var nh=h, nw=w;
        
        // Reference size of the original SVG (for the paths coordinates)
        var oh=566, ow=429;
        var scale = 1;
        var delta_x=0, delta_y=0;
        
        if (ow/w > oh/h) { // resize vertically
        		nw = (ow / oh) * h;
        		scale = w/ow;
        		delta_y = (h - oh*scale)/2;
        }
        else { // resize horizontally
        		nh = (oh / ow) * w;
        		scale = h/oh;
        		delta_x = (w - ow*scale)/2;
        }
        
		    
        var g = svg.append("g")
                   .attr("transform", "translate(" + delta_x + "," + (delta_y + 10) + ") scale(" + scale + "," + scale + ")");     
    
        var humanbody_parts = [                         
              { name:"head" ,path: "m181.08 13.508s-9.2644 24.424-10.107 29.477c-0.84221 5.0533 7.5799 46.322 7.5799 46.322l29.478 11.791 33.689-6.7377 6.7377-53.059-10.11-29.478-16.85-10.949-22.74 0.8425z"},
	          { name:"neck" ,path: "m187.81 92.676-5.0533 32.846 60.639-0.84221-8.4221-28.635-24.424 5.0533z"},
	          { name:"thorax" ,path: "m172.65 124.68 74.115 0.84221 22.74 18.529 14.318 4.2111 6.1566 104.96-78.587 18.008-81.695-17.686 5.8955-104.43z"},
	          { name:"left_arm" ,path: "m283.87 148.29 17.64 5.8722 26.109 32.846v57.271l12.633 53.059-16.844 5.8955-15.16 11.791-4.2111 5.8955-11.791-43.795z"},
	          { name:"left_forarm" ,path: "m340.06 297.37 23.773 46.289 16.002 97.697-29.478 10.949-39.584-96.855-6.6127-34.59 4.1455-6.1127 15.035-11.482z"},
	          { name:"left_hand" ,path: "m350.4 452.38 1.6428 29.394 12.633 40.426 25.266 10.949 9.2644-10.107-5.8955-48.848 20.213 13.475 0.84222-5.0533-19.371-29.478-15.16-11.791z"},
	          { name:"abdomen" ,path: "m129.7 254.38 14.318 73.273-0.84221 40.426h134.75l-1.6844-47.164 14.318-67.377-78.326 17.686z"},
	          { name:"pubis" ,path: "m143.47 367.98-12.089 55.688 79.168 27.793 78.326-28.635-10.702-54.395z"},
	          { name:"right_leg" ,path: "m131.39 425.35 5.0533 99.381v13.475l68.773 1.9822 3.8111-89.275-79.321-28.091z"},
	          { name:"left_leg" ,path: "m212.19 451.06 6.7888 90.517 65.693-1.6844 4.2111-117.07z"},
	          { name:"right_arm" ,path: "m135.74 149.12-17.64 5.8722-26.109 32.846v57.271l-12.633 53.059 16.844 5.8955 15.16 11.791 4.2111 5.8955 11.791-43.795z"},
	          { name:"right_forarm" ,path: "m79.546 298.2-23.773 46.289-16.002 97.697 29.478 10.949 39.584-96.855 6.6127-34.59-4.1455-6.1127-15.035-11.482z"},
	          { name:"right_hand" ,path: "m69.207 453.22-1.6428 29.394-12.633 40.426-25.266 10.949-9.2644-10.107 5.8955-48.848-20.213 13.475-0.84222-5.0533 19.371-29.478 15.16-11.791z"}
        ];
        
        g.selectAll("path")
                .data(humanbody_parts)
                .enter()
                .append("path")
                .attr("d",function(d,i){
                    return d.path;
                })
                .attr("id",function(d,i){
                    return d.name;
                })
               .attr("stroke","#aaa")
			   .attr("stroke-width","2")
			   .attr("fill","none");
			   
		
		var sampleSeries = [
		  { name:"head" ,value: 1},
		  { name:"neck" ,value: 2},
		  { name:"thorax" ,value: 3},
		  { name:"left_arm" ,value: 4},
		  { name:"left_forarm" ,value: 5},
		  { name:"left_hand" ,value: 6},
		  { name:"abdomen" ,value: 7},
		  { name:"pubis" ,value: 8},
		  { name:"right_leg" ,value: 9},
		  { name:"left_leg" ,value: 10},
		  { name:"right_arm" ,value: 11},
		  { name:"right_forarm" ,value: 12},
		  { name:"right_hand" ,value: 13}
		];
		
		// Find the minimum and maximum of a series...
		var yScale = d3.scale.linear()
			.domain([0, d3.max(sampleSeries, function(d) {return d.value })])
			.range([10, 40]);
			   
		sampleSeries.forEach(function(element) {
			
				var id = element.name;
				
				var part = svg.select("#" + id);
				console.log(part);
				var bbox = part.node().getBBox();
    
				var g_part = g.append("g");
				
				var circle = g_part.append("circle")
					.attr("cx", bbox.x + bbox.width/2)
					.attr("cy", bbox.y + bbox.height/2)
					.attr("r", 0.1)
					.style("fill", "#953e40")
					.style("fill-opacity", ".5")
					.style("stroke", "#953e40")
					.style("stroke-width", "2px");
					
                if (!serverSideExport) {
                    circle.transition() //add a transition to every circle
                        .ease("elastic-in")
						.duration(1000)
						.attr("r", yScale(element.value));		
                }
                else
                {
                    circle.attr("r", yScale(element.value));
                }
				
				g_part.append("text")
                    .attr("class","human-text")
					.attr("x", bbox.x + bbox.width/2)
					.attr("y",bbox.y + bbox.height/2)
					.attr("dy", ".35em")
					.attr("text-anchor", "middle")
					.text(element.value);
					//.transition().ease("quad-out").duration(500).delay(0)
					//	.tween("text", function(d) {
					//	  var i = d3.interpolate(0, d3.round( parseFloat( element.value), 1) );
					//	  return function(t) {
					//		d3.select(this).text(""+ d3.round( i(t), 1)  );
					//	  };
				    //});
					//
				
        });

	};
		
});
