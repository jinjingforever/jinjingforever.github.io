window['ai_edge_gallery_get_result'] = async (data) => {
  const ctx = document.getElementById('myChart').getContext('2d');

  return new Promise((resolve) => {
    // 1. Create the Chart
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Monthly Sales',
            data: [12, 19, 3, 5, 2, 3],
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
};
