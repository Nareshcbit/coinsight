var options = {
  container: document.querySelector('#myChart'),
  autoSize: true,
  data: data,
  series: [
    {
      type: 'column',
      xKey: 'year',
      yKeys: ['male', 'female'],
      yNames: ['Male cattle', 'Female cattle'],
      grouped: true,
      fills: ['#c16068', '#a2bf8a'],
      strokeWidth: 0,
    },
    {
      type: 'line',
      xKey: 'year',
      yKey: 'exportedTonnes',
      yName: 'Beef exports',
      stroke: '#80a0c3',
      strokeWidth: 5,
      marker: {
        enabled: false,
        fill: '#80a0c3',
      },
    },
  ],
  axes: [
    {
      type: 'category',
      position: 'bottom',
    },
    {
      type: 'number',
      position: 'left',
      keys: ['male', 'female'],
      title: {
        enabled: true,
        text: 'Number of cattle',
      },
      label: {
        formatter: function (params) {
          return params.value / 1000 + 'M';
        },
      },
    },
    {
      type: 'number',
      position: 'right',
      keys: ['exportedTonnes'],
      title: {
        enabled: true,
        text: 'Exports (tonnes)',
      },
      label: {
        formatter: function (params) {
          return params.value / 1000 + 'k';
        },
      },
    },
  ],
};

var chart = agCharts.AgChart.create(options);