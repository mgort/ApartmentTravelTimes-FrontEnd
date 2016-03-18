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

function get_number_of_apartments() {
    return get_apartment_list().length;
}

function get_apartment_index_map() {
    var apartment_map = {};
    var apartment_list = get_apartment_list();
    for (var i = 0; i < apartment_list.length; ++i) {
        var apartment_name = apartment_list[i];
        apartment_map[apartment_name] = i;
    }

    return apartment_map;
}

function get_apartment_list() {
    return ["Water Tower Flats", "Belmar"];
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
    var location_time_map = {};

    var apartment_index_map = get_apartment_index_map();

    for (var i = 0; i < data.length; ++i) {
        var leave_time = data[i].leave_time;

        if (!(leave_time in location_time_map)) {
            location_time_map[leave_time] = new Array(get_number_of_apartments());
        }

        var travel_time = parseFloat(data[i].avg)/60;
        var location = data[i].origin;
        var index = apartment_index_map[location];
        location_time_map[leave_time][index] = travel_time;
    }


    var last_times = new Array(get_number_of_apartments());
    for (var leave_time in location_time_map) {
        var times = location_time_map[leave_time];
        var temp = [leave_time];
        // ZOH to fix the case where some data is missing
        for (var i = 0; i < times.length; ++i) {
            var time = times[i];
            if (time == null) {
                var last_time = last_times[i];
                temp.push(parseFloat(last_time));
            } else {
                temp.push(parseFloat(time));
            }

        }
        data_points.push(temp);
        last_times = times;
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
    google.charts.setOnLoadCallback(draw_saturday_eco);
    google.charts.setOnLoadCallback(draw_saturday_log);
    google.charts.setOnLoadCallback(draw_sunday_eco);
    google.charts.setOnLoadCallback(draw_sunday_log);
}

function draw_base_chart(day, destination, div_name) {
    var dataTable = new google.visualization.DataTable();
    var locations = get_locations();
    var data = get_data(day, destination);

    dataTable.addColumn('string', 'Departure Time');
    var sorted_apartments = get_apartment_list();
    for (var i = 0; i < sorted_apartments.length; ++i) {
        dataTable.addColumn('number', sorted_apartments[i]);
    }

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

function draw_saturday_eco() {
    draw_base_chart("Saturday", "Ecocion", 'e_sat_chart');
}

function draw_sunday_eco() {
    draw_base_chart("Sunday", "Ecocion", 'e_sun_chart');
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

function draw_saturday_log() {
    draw_base_chart("Saturday", "LogRhythm", 'l_sat_chart');
}

function draw_sunday_log() {
    draw_base_chart("Sunday", "LogRhythm", 'l_sun_chart');
}
