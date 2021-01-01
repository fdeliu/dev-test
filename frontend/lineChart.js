var template = document.createElement("template");

template.innerHTML = `
   
    <style>
    .line-chart {
        border: 1px solid lightgray;
        margin: 30px 0px;
      }
    </style>

    <div class="line-chart">
        <div id="chart"/>
      </div>

`;

class LineChart extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.api =
      "https://api.coindesk.com/v1/bpi/historical/close.json?start=2017-12-31&end=2018-04-01";
  }

  parseData(data) {
    var arr = [];
    for (var i in data.bpi) {
      arr.push({ date: new Date(i), value: +data.bpi[i] });
    }
    return arr;
  }
  drawChart(data) {
    var svgWidth = 600,
      svgHeight = 400;
    var margin = { top: 20, right: 20, bottom: 30, left: 50 };
    var width = svgWidth - margin.left - margin.right;
    var height = svgHeight - margin.top - margin.bottom;

    var svg = this.shadowRoot.querySelector("#chart");

    svg = d3
      .select(svg)
      .append("svg:svg")
      .attr("width", svgWidth)
      .attr("height", svgHeight);

    var g = svg
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    var x = d3.scaleTime().rangeRound([0, width]);
    var y = d3.scaleLinear().rangeRound([height, 0]);

    var line = d3
      .line()
      .x(function (d) {
        return x(d.date);
      })
      .y(function (d) {
        return y(d.value);
      });

    x.domain(
      d3.extent(data, function (d) {
        return d.date;
      })
    );
    y.domain(
      d3.extent(data, function (d) {
        return d.value;
      })
    );
    g.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .select(".domain")
      .remove();
    g.append("g")
      .call(d3.axisLeft(y))
      .append("text")
      .attr("fill", "#000")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Price ($)");
    g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .attr("d", line);
  }

  connectedCallback() {
    var ref = this;
    fetch(this.api)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        var parsedData = ref.parseData(data);
        ref.drawChart(parsedData);
      });
  }
}

window.customElements.define("line-chart", LineChart);
