# Hexagon-Heatmap

HeatMap is written in EcmaScript6 and serves a bridge to display heat-map based on coordinates that are given.
It renders hexagonal heat points csv map that can display hexagonal heat points based on given coordinates inputs.

## Dependencies

Heat map is build on the top of [d3.js](https://github.com/d3);

## Usage and Installation

### Implementing as a script tag:

Download ```source\heatmap.js``` and add it to Your page:

Heatmap.js uses d3.js, add this before:
```
<script type="text/javascript" src="http://d3js.org/d3.v3.js"></script>
<script type="text/javascript" src="http://d3js.org/d3.hexbin.v0.min.js"></script>
```
than add heatmap.js to your script tag:
```
<script type="text/javascript" src="heatmap.js"></script>
```

### NPM installation and usage:

Open terminal and execute:

```
npm install --save hexagon-heatmap
```

### Usage:

#### Required:

To use in project:

```
const Heatmap = require('hexagon-heatmap');

const heatmap = Heatmap(width, height, hexSize, margin, heatColor);
```

width - Width of your csv tag, integer.

height - Height of your csv tag, integer.

hexSize - radius of the circle described on the hex that will be mapped to the heatmap, integer in pixels.

margin - object containing information about margin of heatmap script:
```
{left: integer, right: integer, top: integer, bottom: integer}
```

If you want Heatmap to be mapped with it beginning {x: 0, y: 0} points to correspond with your heatmap hexagonal grid  {x: 0, y: 0}
than left and top margin should be the size of hexSize ``` margin.left should equal hexSize, margin.top should equal hexSize```

To create and append Heatmap hexagonal group on html page:
```
heatmap.create(id);
```

id - Id of the parent node to append Heatmap

To feed with data containing coordinates of heat points to be mapped on the heatmap:
```
heatmap.feedWithCoordinates(data);
```

data - Array of coordinates or single coordinates in format of:
```
	{x: integer, y: integer}
```
Where x and y are coordinates of the heat to be mapped.
For the purpose of performance if array of coordinates will be passed only first 20 will be mapped.
CSV operation are CPU expensive.

#### Additional settings

To toggle mouse events use:
```
heat.toggleMouseEvents = true or false;
```

To set up heating time - when the corresponding to the coordinates hex will be triggered, than heat will increase to the maximum in time space of given integer in milliseconds.
```
heatmap.heatingUpTime = integer;
```

To set cooling down time - when the corresponding to the coordinates hex will be triggered, than cooling down will take given integer in milliseconds
```
heatmap.coolingDownTime = integer;
```

