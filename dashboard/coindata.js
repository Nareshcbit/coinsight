var COIN_DATA = []

const coindataDefaultColDef = {
  width: 160,
  editable: false,
  filter: 'agTextColumnFilter',
  floatingFilter: true,
  resizable: true,
}
const coindataColumnDefs = [
  {
    headerName: 'Coin',
    groupId: 'coinGroup',
    children: [
        // using medal column type
        { headerName: 'id', field: 'id' , columnGroupShow: 'always'},
        { headerName: 'name', field: 'name' , columnGroupShow: 'open'},
        { headerName: 'symbol', field: 'symbol' , columnGroupShow: 'open'},
    ],
  },
  {
    headerName: 'Score',
    children: [
        // using medal column type
        { headerName: 'coingecko', field: 'coingecko_score' , columnGroupShow: 'always'},
        { headerName: 'developer', field: 'developer_score' , columnGroupShow: 'open'},
        { headerName: 'community', field: 'community_score' , columnGroupShow: 'open'},
        { headerName: 'liquidity', field: 'liquidity_score' , columnGroupShow: 'open'},
    ],
  },
  {
    headerName: 'Reddit',
    children: [
        // using medal column type
        { headerName: 'Subscribers', field: 'community_data.reddit_subscribers' , columnGroupShow: 'always'},
        { headerName: '48H Active Users', field: 'community_data.reddit_accounts_active_48h' , columnGroupShow: 'open'},
        { headerName: '48H Avg. Posts', field: 'community_data.reddit_average_posts_48h' , columnGroupShow: 'open'},
        { headerName: '48H Avg. Comments', field: 'community_data.reddit_average_comments_48h' , columnGroupShow: 'open'},
    ],
  },
  {
    headerName: 'Developer',
    children: [
        // using medal column type
        { headerName: 'Stars', field: 'developer_data.stars' , columnGroupShow: 'always'},
        { headerName: 'Forks', field: 'developer_data.forks' , columnGroupShow: 'always'},
        { headerName: 'Total Issues', field: 'developer_data.total_issues' , columnGroupShow: 'open'},
        { headerName: 'Closed Issues', field: 'developer_data.closed_issues' , columnGroupShow: 'open'},
        { headerName: '4W Commits', field: 'developer_data.commit_count_4_weeks' , columnGroupShow: 'open'},
        { headerName: '4W Additions', field: 'developer_data.code_additions_deletions_4_weeks.additions' , columnGroupShow: 'open'},
        { headerName: '4W Deletions', field: 'developer_data.code_additions_deletions_4_weeks.deletions' , columnGroupShow: 'open'},
        { headerName: 'PR Contributors', field: 'developer_data.pull_request_contributors' , columnGroupShow: 'open'},
        { headerName: 'PRs Merged', field: 'developer_data.pull_requests_merged' , columnGroupShow: 'open'},
    ],
  },
];

function tableCoinData(coinids, days){
  COIN_DATA = []
  let deferreds = []
  coinids.forEach((coinid)=>{
    //console.log("coinid: " + coinid)
    deferreds.push(ajaxCoinData(coinid, days))
  })
  $.when.apply(null, deferreds).done(function() {
    //console.log(JSON.stringify(COIN_DATA))

    console.log(JSON.stringify(COIN_DATA))
    let coindataGridOptions = {
      columnDefs: coindataColumnDefs,
      defaultColDef: coindataDefaultColDef,
      rowData: COIN_DATA
    }

    //Reinitialize coindataDiv
    $('#coindataDiv').find('#coindataGrid').each(function() {
      $(this).remove()
    });
    $('#coindataDiv').append('<div id="coindataGrid" style="height: 400px;" class="ag-theme-alpine">');
    
    let gridDiv = document.querySelector('#coindataGrid');
    new agGrid.Grid(gridDiv, coindataGridOptions);
    
  })

}
function ajaxCoinData(coinid, days){
  console.log("coinid: " + coinid)
  console.log("days: " + days)
  //let url =  "https://api.coingecko.com/api/v3/coins/" + coinid + "/market_chart?vs_currency=usd&days=" + days + "&interval=daily"
  let url = "https://api.coingecko.com/api/v3/coins/" + coinid + "?localization=false&tickers=false&market_data=false&community_data=true&developer_data=true&sparkline=false"

  console.log("url: " + url)
  return  $.ajax({
    url: url,
    success: function(result){
     //console.log(JSON.stringify(result))
     COIN_DATA.push(result)
    }
  });
}



