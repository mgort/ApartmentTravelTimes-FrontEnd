$( document ).ready(function() {
    draw_all_charts();
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

function get_data(day, destination) {
    var data;
    $.ajax({
        url: "get_all_times.php?day="+day+"&destination="+destination,
        type: "GET",
        async: false,
        success: function (d) {
            data = JSON.parse(d);
        }
    });

    var data_points = [];

    for(var i=0; i <= data.length-3; i+=3) {
        var temp = [];
        temp.push(data[i].leave_time);
        temp.push(parseFloat(data[i].avg)/60);       // Arvada Station
        temp.push(parseFloat(data[i+1].avg)/60);     // Park Place Olde Town
        temp.push(parseFloat(data[i+2].avg)/60);     // Water Tower Flats
        console.log(temp);
        data_points.push(temp);
    }


    return data_points;
}

function draw_all_charts(data) {
    google.charts.load('current', {packages: ['corechart', 'line']});
    google.charts.setOnLoadCallback(draw_monday_eco);
    google.charts.setOnLoadCallback(draw_monday_log);
    google.charts.setOnLoadCallback(draw_tuesday_eco);
    google.charts.setOnLoadCallback(draw_tuesday_log);
    google.charts.setOnLoadCallback(draw_wednesday_eco);
    google.charts.setOnLoadCallback(draw_wednesday_log);
    google.charts.setOnLoadCallback(draw_thursday_eco);
    google.charts.setOnLoadCallback(draw_thursday_log);
    google.charts.setOnLoadCallback(draw_friday_eco);
    google.charts.setOnLoadCallback(draw_friday_log);
}

function draw_base_chart(day, destination, div_name) {
    var dataTable = new google.visualization.DataTable();
    var locations = get_locations();
    var data = get_data(day, destination);

    dataTable.addColumn('string', 'Departure Time');
    dataTable.addColumn('number', 'Arvada Station');
    dataTable.addColumn('number', 'Park Place Olde Town');
    dataTable.addColumn('number', 'Water Tower Flats');

    dataTable.addRows(data);

    var options = {
        vAxis: {
            title: 'Average Travel Time'
        },
        hAxis: {
            title: 'Departure Time'
        },
        width: 1200,
        height: 500,
        title: destination
    };

    var chart = new google.visualization.LineChart(document.getElementById(div_name));

    chart.draw(dataTable, options);
}

function draw_monday_eco() {
    draw_base_chart("Monday", "Ecocion", 'e_mon_chart');
}

function draw_tuesday_eco() {
    draw_base_chart("Tuesday", "Ecocion", 'e_tues_chart');
}

function draw_wednesday_eco() {
    draw_base_chart("Wednesday", "Ecocion", 'e_wed_chart');
}

function draw_thursday_eco() {
    draw_base_chart("Thursday", "Ecocion", 'e_thurs_chart');
}

function draw_friday_eco() {
    draw_base_chart("Friday", "Ecocion", 'e_fri_chart');
}

function draw_monday_log() {
    draw_base_chart("Monday", "LogRhythm", 'l_mon_chart');
}

function draw_tuesday_log() {
    draw_base_chart("Tuesday", "LogRhythm", 'l_tues_chart');
}

function draw_wednesday_log() {
    draw_base_chart("Wednesday", "LogRhythm", 'l_wed_chart');
}

function draw_thursday_log() {
    draw_base_chart("Thursday", "LogRhythm", 'l_thurs_chart');
}

function draw_friday_log() {
    draw_base_chart("Friday", "LogRhythm", 'l_fri_chart');
}
