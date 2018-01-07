/*
*Copyright <2018> <Bartosh Lenart - Bartoshko>
*
*Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the *"Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, *distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to *the following conditions:
*
*The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*
*THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF *MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR *ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH *THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*
*/

class Heatmap {
	constructor (width = 200, height = 200, hexSize = 5, margin = {left: 10, right: 10, top: 10, bottom: 10}, heatColor = '#ff0000') {
		this._width = width;
		this._height = height;
		this._hexRadius = hexSize;
		try {
			if (this._width * this._height / this._hexRadius > 100000) throw 'to many hex elements needs to be generated, set default value, set bigger hex size or smaller map size';
		}
		catch (err) {
			console.error(err);
			this._hexRadius = this._width * this._height / 100000;
		}
		this._strokeWidth = 1;

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
			if(heatColor.length < 7 || heatColor[0] !== '#') throw 'wrong value used for heat colour';
			this._heatColor = heatColor;
		}
		catch(err) {
			console.error(err);
			this._heatColor = '#505090';
		}
		this._heatingUpTime = 50;
		this._coolingDownTime = 15000;
		this._alowMouseEvents = false;

		this._points = [];
		this._calculatePoints();

	}

	create (id) {
		const hexbin = d3.hexbin().radius(this._hexRadius);
		const points = this._points;
		const strokeColor = this._heatColor;
		const mouseEvents = this._alowMouseEvents;
		const heatingTime = this._heatingUpTime;
		const coolingTime = this._coolingDownTime;
		const strokeWidth = this._strokeWidth;
		const hexGridTable = [];

		this._svg = d3.select(`#${id}`).append("svg")
			.attr("width", this._width + this._margin.left + this._margin.right)
			.attr("height", this._height + this._margin.top + this._margin.bottom)
			.append("g")
			.attr("transform", "translate(" + this._margin.left + "," + this._margin.top + ")");

		function heatUp (d) {
			if(mouseEvents) {
			  const el = d3.select(this)
			    .transition()
			    .duration(heatingTime)
			    .style("fill-opacity", .3)
			    .style("stroke-opacity", .3);
			}
		}

		function coolDown (d) {
			if(mouseEvents) {
			  const el = d3.select(this)
			     .transition()
			     .duration(coolingTime)
			     .style("fill-opacity", 0)
			     .style("stroke-opacity", 0);
			}
		};

		this._hexMap = this._svg.append("g")
		  .selectAll(".hexagon")
		  .data(hexbin(points))
		  .enter().append("path")
		  .attr("class", "hexagon")
		  .attr("d", function (d) {
		  	hexGridTable.push({x: d.x, y: d.y});
		  	return "M" + d.x + "," + d.y + hexbin.hexagon();
			})
		  .attr("stroke", function (d,i) {
		  	return strokeColor;
			})
			.style("stroke-opacity", 0)
		  .attr("stroke-width", `${strokeWidth}px`)
		  .style("fill", function (d,i) {
		  	return points[i][2];
			})
			.style("fill-opacity", 0)
			.on("mouseover", heatUp)
  		.on("mouseout", coolDown);

  		this._hexGridTable = hexGridTable;

	}

	feedWithCoordinates (data) {
		const heatingTime = this._heatingUpTime;
		const coolingTime = this._coolingDownTime;

		const findHexIndex = coordinates => {
			return this._hexGridTable.findIndex(hex => hex.x > coordinates.x && hex.y > coordinates.y);
		}

		const fireHeatAtLocation = index =>
		{
			d3.select(this._hexMap[0][index])
	    	.transition()
	    		.duration(heatingTime)
	    		.style("fill-opacity", .3)
	    		.style("stroke-opacity", .3)
	    	.transition()
	     		.duration(coolingTime)
	     		.style("fill-opacity", 0)
	     		.style("stroke-opacity", 0);
	   }

	  if (Array.isArray(data)) {
			data.length < 20 ? data.forEach(arg => fireHeatAtLocation(findHexIndex(arg))) : data.slice(0, 19).forEach(arg => fireHeatAtLocation(findHexIndex(arg)));
		} else {
			fireHeatAtLocation(findHexIndex(data));
		}

	}

	set toggleMouseEvents (value) {
		try {
			if(typeof(value) === 'boolean') {
				this._alowMouseEvents = value;
			} else {
				throw 'toggle mouse value must be boolean'
			}
		}
		catch (err) {
			console.error(err);
		}
	}

	set heatingUpTime (value) {
		try {
			if(!Number.isInteger(value)) {
				throw 'cooling down time must be an integer [milliseconds]';
			} else {
				this._heatingUpTime = value;
			}
		}
		catch (err) {
			console.error(err);
		}
	}

	set coolingDownTime (value) {
		try {
			if(!Number.isInteger(value)) {
				throw 'cooling down time must be an integer [milliseconds]';
			} else {
				this._coolingDownTime = value;
			}
		}
		catch (err) {
			console.error(err);
		}
	}

	_calculateMap () {
		const mapColumns = Math.ceil(this._width / (this._hexRadius * 1.5));
		const mapRows = Math.ceil(this._height / (this._hexRadius * 1.5));
		return [mapColumns, mapRows];
	}

	_calculatePoints () {
		for (let i = 0; i < this._calculateMap()[1]; i++) {
    	for (let j = 0; j < this._calculateMap()[0]; j++) {
      	this._points.push([this._hexRadius * j * 1.5, this._hexRadius * i * 1.5, this._heatColor]);
    	}
		}
	}

}
