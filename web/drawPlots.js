/**
 * Created by mingzhang on 11/7/17.
 */
'use strict';

function Scale(domain, range) {
  let ratio = (range[1] - range[0]) / (domain[1] - domain[0]);
  return function (x) {
    if (x < domain[0] || x > domain[1]) {
      throw new Error('Out of domain!');
    }
    return range[0] + ratio * (x - domain[0]);
  }
}

// let s = Scale([0, 10], [100, 0]);
// console.log(s(2));
// console.log(s(5));
// console.log(s(8));

function setDomain(arr) {

}

function tagHouse(obj) {
  let res = '<' + obj.type;
  let props = Object.keys(obj);
  let children;
  for (let i = 0; i < props.length; i++) {
    if (props[i] === 'type') {
      continue;
    }
    if (props[i] === 'child') {
      children = obj.child;
      continue;
    }
    res += ' ' + props[i] + '=' + '"' + obj[props[i]] + '"';
  }
  res += '>';
  if (children) {
    for (let k = 0; k < children.length; k++) {
      res += tagHouse(obj);
    }
  }
  return res + '</' + obj.type + '>';
}

// console.log(tagHouse({
//   type: 'line',
//   id: 'test',
//   class: 'svg-line',
//   x1: 20,
//   y1: 20,
//   x2: 60,
//   y2: 60
// }));

function plotA(data, opts) {
  opts = opts || {};
  let margin = opts.margin || 50;
  let space = opts.space || 30; // space between axis and plot area
  let title = opts.title || '';
  let xAxisTitle = opts.xAxisTitle || '';
  let yAxisTitle = opts.yAxisTitle || '';
  let axisTitleSize = opts.axisTitleSize || 20;
  let dotSize = opts.dotSize || 8;
  let id = opts.id || 'svg-plot-generated';

  let width = opts.width || 1100;
  let height = opts.height || 900;
  let h = height - margin * 2;
  let w = width - margin * 2;

  if (h > w * 2) {
    h = w * 2;
  } else {
    w = h / 2;
  }

  let translate = {
    x: (width - w) / 2,
    y: (height - h) / 2
  };

  let domain = [0, 40];
  let yRange = [h, 0];

  let yScale = Scale(domain, yRange);

  let content = '<svg id="' + id +'" width="' + width + '" height="' + height + '">';

  let xAxis = `<line id="xAxis" x1="0" y1="${h + space}" x2="${w}" y2="${h + space}"></line>`;
  let yAxis = `<line id="yAxis" x1="${-space}" y1="0" x2="${-space}" y2="${h}"></line>`;
  content += '<g id="axes"' +
    ` transform="translate(${translate.x},${translate.y})" stroke="black"` +
    ' stroke-width="3">' + xAxis + yAxis + '</g>';

  content += '<g id="plot-area"' +
    ` transform="translate(${translate.x},${translate.y})" stroke="black"` +
    ' stroke-width="3">';
  for (let i = 0; i < data.length; i++) {
    let p1 = {
      x: 0.25 * w,
      y: yScale(data[i].TPM1)
    };
    let p2 = {
      x: 0.75 * w,
      y: yScale(data[i].TPM2)
    };
    let dot1 = `<rect class="TPM1 marks" x="${p1.x - dotSize}" y="${p1.y - dotSize}" 
width="${2 * dotSize}" height="${2 * dotSize}"></rect>`;
    let dot2 = `<circle class="TPM2 marks" cx="${p2.x}" cy="${p2.y}" 
r="${dotSize}">`;
    let line = `<line class="connection-line" x1="${p1.x}" y1="${p1.y}" x2="${p2.x}" y2="${p2.y}"></line>`;
    content += '<g id="${data[i].gene_id}">' + line + dot1 + dot2 + '</g>';
  }
  return content + '</svg>';
}

function plotB(data, ctx) {

}

if (typeof module !== 'undefined' && module.parent) {
  //module.exports =
} else {

} 