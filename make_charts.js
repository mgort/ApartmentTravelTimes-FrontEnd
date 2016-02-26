$( document ).ready(function() {
  get_data("Monday");
});

function get_locations() {
  var locations = [];
  $.ajax({
    url: "get_locations.php",
    type: "GET",
    async: false,
    success: function (data) {
      JSON.parse(data).forEach(function(loc) {
        locations.push(loc.name);
      });
    }
  });
  return locations;
}

function get_data(day) {
  var data;
  $.ajax({
    url: "get_all_times.php?day="+day,
    type: "GET",
    async: false,
    success: function (d) {
      data = JSON.parse(d);
    }
  });

  var data_points = [];

  data.forEach(function(entry) {
    var temp = [];
    temp.push(entry.leave_timestamp.substring(11, 16));
    temp.
  });

  return data;
}

function draw_all_charts(data) {
  google.charts.load('current', {packages: ['corechart', 'line']});
  google.charts.setOnLoadCallback(draw_monday);
}

function draw_monday() {

      var dataTable = new google.visualization.DataTable();
      var locations = get_locations();
      var data = get_data("Monday");

      data.addColumn('number', 'Departure Time');
      data.addColumn('number', 'Water Tower Flats');
      data.addColumn('number', 'Arvada Station');
      data.addColumn('number', 'Park Place Olde Town');

      data.addRows([
        [0, 0],   [1, 10],  [2, 23],  [3, 17],  [4, 18],  [5, 9],
        [6, 11],  [7, 27],  [8, 33],  [9, 40],  [10, 32], [11, 35],
        [12, 30], [13, 40], [14, 42], [15, 47], [16, 44], [17, 48],
        [18, 52], [19, 54], [20, 42], [21, 55], [22, 56], [23, 57],
        [24, 60], [25, 50], [26, 52], [27, 51], [28, 49], [29, 53],
        [30, 55], [31, 60], [32, 61], [33, 59], [34, 62], [35, 65],
        [36, 62], [37, 58], [38, 55], [39, 61], [40, 64], [41, 65],
        [42, 63], [43, 66], [44, 67], [45, 69], [46, 69], [47, 70],
        [48, 72], [49, 68], [50, 66], [51, 65], [52, 67], [53, 70],
        [54, 71], [55, 72], [56, 73], [57, 75], [58, 70], [59, 68],
        [60, 64], [61, 60], [62, 65], [63, 67], [64, 68], [65, 69],
        [66, 70], [67, 72], [68, 75], [69, 80]
      ]);

      var options = {
        hAxis: {
          title: 'Time'
        },
        vAxis: {
          title: 'Popularity'
        }
      };

      var chart = new google.visualization.LineChart(document.getElementById('chart_div'));

      chart.draw(data, options);
    }
