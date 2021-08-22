function percentageFormatter(params) {
  num = params.value
  return Math.round( num * 100 + Number.EPSILON ) / 100
}



var gridOptions = {
  // define grid columns
  columnDefs: [
    { headerName: 'Rank', field: 'market_cap_rank', type: 'numberColumn' },
    {
      headerName: 'Coin',
      groupId: 'coinGroup',
      children: [
        // using medal column type
        { headerName: 'Name', field: 'name', type: 'medalColumn', width: 200 },
        { headerName: 'Id', field: 'id', type: 'medalColumn' },
        { headerName: 'Symbol', field: 'symbol', type: 'medalColumn' },
        {
          headerName: 'Name',
          field: 'name',
          type: 'medalColumn',
          columnGroupShow: 'closed',
          width: 200,
        },
      ],
    },
    { headerName: '24Hours', field: 'price_change_percentage_24h_in_currency', valueFormatter: percentageFormatter , type: 'priceColumn'},
    { headerName: '7Days', field: 'price_change_percentage_7d_in_currency' , valueFormatter: percentageFormatter, type: 'priceColumn'},
    { headerName: '14Days', field: 'price_change_percentage_14d_in_currency' , valueFormatter: percentageFormatter, type: 'priceColumn'},
    { headerName: '30Days', field: 'price_change_percentage_30d_in_currency' , valueFormatter: percentageFormatter, type: 'priceColumn'},
    { headerName: '200Days', field: 'price_change_percentage_200d_in_currency' , valueFormatter: percentageFormatter, type: 'priceColumn'},
    { headerName: '1Year', field: 'price_change_percentage_1y_in_currency' , valueFormatter: percentageFormatter, type: 'priceColumn'},
  ],

  // default ColDef, gets applied to every column
  defaultColDef: {
    // set the default column width
    width: 100,
    // make every column editable
    editable: true,
    // make every column use 'text' filter by default
    filter: 'agTextColumnFilter',
    // enable floating filters by default
    floatingFilter: true,
    // make columns resizable
    resizable: true,
  },

  // default ColGroupDef, get applied to every column group
  defaultColGroupDef: {
    marryChildren: true,
  },

  // define specific column types
  columnTypes: {
    priceColumn: { width: 130, filter: 'agNumberColumnFilter', sortable: true },
    numberColumn: { width: 130, filter: 'agNumberColumnFilter' },
    medalColumn: { width: 100, columnGroupShow: 'open', filter: 'agTextColumnFilter' },
    nonEditableColumn: { editable: false },
  },
  rowData: null,
};

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function () {
  var gridDiv = document.querySelector('#myGrid');
  new agGrid.Grid(gridDiv, gridOptions);

  agGrid
    .simpleHttpRequest({
      url: 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=24h%2C2d%2C3d%2C4d%2C5d%2C6d%2C7d%2C14d%2C30d%2C200d%2C1y',
    })
    .then(function (data) {
      gridOptions.api.setRowData(data);
    });
});