import d3 from 'd3';
import filterData from '../filterData';
import axesFactory from './axes';
import dropsFactory from './drops';
import labelsFactory from './labels';
import markerFactory from './marker';
import contextFactory from './context';

export default (svg, dimensions, scales, configuration) => {
  const defs = svg.append('defs');
  defs.append('clipPath')
    .attr('id', 'drops-container-clipper')
    .append('rect')
      .attr('id', 'drops-container-rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', dimensions.width)
      .attr('height', dimensions.height);

  const pattern = defs.append('pattern')
    .attr('id', 'gridStripes')
    .attr('width', dimensions.width)
    .attr('height', (configuration.lineHeight)*2)
    .attr('patternUnits', 'userSpaceOnUse');
  pattern.append('rect')
    .attr('width', dimensions.width)
    .attr('height', configuration.lineHeight)
    .attr('fill', '#fafafa');
  pattern.append('line')
    .attr('x1', 0)
    .attr('x2', dimensions.width)
    .attr('y1', configuration.lineHeight)
    .attr('y2', configuration.lineHeight)
    .attr('stroke', '#d1d1d1')
    .attr('stroke-width', '1px');
  pattern.append('line')
    .attr('x1', 0)
    .attr('x2', dimensions.width)
    .attr('y1', '1px')
    .attr('y2', '1px')
    .attr('stroke', '#d1d1d1')
    .attr('stroke-width', '1px');

  const gridContainer = svg.append('g')
    .classed('grid', true)
    .attr('transform', `translate(${configuration.padding.left + configuration.labelWidth}, ${configuration.padding.top})`);

  const labelsContainer = svg.append('g')
    .classed('labels', true)
    .attr('transform', `translate(${configuration.padding.left}, ${configuration.padding.top})`);

  const axesContainer = svg.append('g')
    .classed('axes', true)
    .attr('transform', `translate(${configuration.padding.left + configuration.labelWidth},  ${configuration.padding.top})`);

  const dropsContainer = svg.append('g')
    .classed('drops-container', true)
    .attr('clip-path', 'url(#drops-container-clipper)')
    .attr('transform', `translate(${configuration.padding.left + configuration.labelWidth},  ${configuration.padding.top})`);

  const stampContainer = svg.append('g')
    .classed('timestamp', true)
    .attr('height', 30)
    .attr('transform', `translate(${configuration.padding.left + configuration.labelWidth}, ${configuration.padding.top})`);

  // const contextContainer = svg.append("g")
  //   .classed('context', true)
  //   .attr('width', dimensions.width)
  //   .attr('height', dimensions.contextHeight)
  //   .attr("transform", `translate(${configuration.padding.left},${configuration.padding.top + dimensions.height})`);


  const marker = markerFactory(gridContainer, stampContainer, scales, dimensions, configuration.dateFormat)
  const axes = axesFactory(axesContainer, scales, configuration, dimensions);
  const labels = labelsFactory(labelsContainer, scales, configuration);
  const drops = dropsFactory(dropsContainer, scales, configuration);

  return data => {
    // context(data);
    drops(data);
    labels(data);
    axes(data);
  };
};
