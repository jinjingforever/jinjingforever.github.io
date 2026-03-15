---
name: plot-chart
description: Plot a chart for given values and labels.
---

# Plot chart

This skill plots a chart for given values and labels.

## Examples

* "Plot chart..."

## Instructions

Call the `run_js` tool with the following exact parameters:
- data: A JSON string with the following field
  - type: The type of the chart. Options include "line chart" or "bar chart". Default to "line chart".
  - labels: An array of strings for the chart labels.
  - values: An array of numbers for the chart values.
