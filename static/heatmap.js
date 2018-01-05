class Heatmap {
	constructor(width = 200, height = 200, hexSize = 5, margin = {left: 10, right: 10, top: 10, bottom: 10}, heatColor = '#ff0000') {
		this._width = width;
		this._height = height;
		this._hexRadius = hexSize;
		try {
			if (this._width * this._height / this._hexRadius > 100000) throw 'to many hex elements to generate, set bigger hex size or smaller map size';
		}
		catch (err) {
			console.error(err);
			this._hexRadius = this._width * this._height / 100000;
		}

		try {
			if (!Number.isInteger(margin.left)) throw 'margin length wrongly specified';
			if (!Number.isInteger(margin.right)) throw 'margin right wrongly specified';
			if (!Number.isInteger(margin.top)) throw 'margin top wrongly specified';
			if (!Number.isInteger(margin.bottom)) throw 'margin bottom wrongly specified';
			this._margin = margin;
		}
		catch(err) {
			console.error(err);
			this._margin = {left: 10, right: 10, top: 10, bottom: 10};
		}

		try {
			if(heatColor.length < 7 || heatColor[0] !== '#') throw 'wrong value used for heat color';
			this._heatColor = heatColor;
		}
		catch(err) {
			console.log(err);
			this._heatColor = '#505090';
		}

		this._points = [];

		this._calculateHexCentersArr();

		// delete after tests
		this._info();
	}

	create (id) {
		this._svg = d3.select(`#${id}`).append("svg")
			.attr("width", this._width + this._margin.left + this._margin.right)
			.attr("height", this._height + this._margin.top + this._margin.bottom)
			.append("g")
			.attr("transform", "translate(" + this._margin.left + "," + this._margin.top + ")");

		const hexbin = d3.hexbin().radius(this._hexRadius);
		const points = this._points;
		const strokeColor = this._heatColor;

		function heatUp (d) {
			console.log(d, this);
		  const el = d3.select(this)
		    .transition()
		    .duration(50)
		    .style("fill-opacity", .3)
		    .style("stroke-opacity", .3);
		}

		function coolDown (d) {
		  const el = d3.select(this)
		     .transition()
		     .duration(15000)
		     .style("fill-opacity", 0)
		     .style("stroke-opacity", 0);
		};

		this._svg.append("g")
		  .selectAll(".hexagon")
		  .data(hexbin(points))
		  .enter().append("path")
		  .attr("class", "hexagon")
		  .attr("d", function (d) {
		  return "M" + d.x + "," + d.y + hexbin.hexagon();
			})
		  .attr("stroke", function (d,i) {
		  	return strokeColor;
			})
			.style("stroke-opacity", 0)
		  .attr("stroke-width", "1px")
		  .style("fill", function (d,i) {
		  	return points[i][2];
			})
			.style("fill-opacity", 0)
			.on("mouseover", heatUp)
  		.on("mouseout", coolDown);

	}

	_info () {
		console.log(this);
	}

	_calculateMap () {
		const mapColumns = Math.floor(this._width / (this._hexRadius * 1.5));
		const mapRows = Math.floor(this._height / (this._hexRadius * 1.5));
		return [mapColumns, mapRows];
	}

	_calculateHexCentersArr () {
		for (var i = 0; i < this._calculateMap()[1]; i++) {
    	for (var j = 0; j < this._calculateMap()[0]; j++) {
      	this._points.push([this._hexRadius * j * 1.5, this._hexRadius * i * 1.5, this._heatColor]);
    	}
		}
	}

}
