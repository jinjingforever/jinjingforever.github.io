window['ai_edge_gallery_get_result'] = async (data) => {
  const ctx = document.getElementById('myChart').getContext('2d');
  try {
    const jsonData = JSON.parse(data);
    var type = 'line';
    if (jsonData['type'].startsWith('bar')) {
      type = 'bar';
    }

    return new Promise((resolve) => {
      // 1. Create the Chart
      new Chart(ctx, {
        type: type,
        data: {
          labels: jsonData['labels'],
          datasets: [
            {
              data: jsonData['values'],
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 2,
              fill: false,
            },
          ],
        },
        options: {
          animation: {
            // Ensure the chart is fully drawn before we try to grab the URL
            onComplete: (context) => {
              const chartInstance = context.chart;
              resolve(chartInstance.toBase64Image());
            },
          },
          scales: {
            y: {beginAtZero: true},
          },
          plugins: {
            legend: {
              // This hides the legend
              display: false,
            },
          },
        },
        plugins: [
          {
            id: 'custom_canvas_background_color',
            beforeDraw: (chart) => {
              const ctx = chart.canvas.getContext('2d');
              ctx.save();
              ctx.globalCompositeOperation = 'destination-over';
              ctx.fillStyle = 'white';
              ctx.fillRect(0, 0, chart.width, chart.height);
              ctx.restore();
            },
          },
        ],
      });
    });
  } catch(e) {
    console.error(e);
    return "failed to generate image";
  }
};
