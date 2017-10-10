var Config = {
    timeStarted: 0,
    timeEnded: 0,
    currentSize: 1024 * 1024 * 5,
    maximumSize: 1024 * 1024 * 5,
    ajax: null,
    downloadSizes: [
//        1024,
//        1024 * 5,
//        1024 * 512,
//        1024 * 1024,
        1024 * 1024 * 5
    ],
    currentDownloadIndex: 0,
    graph: {
        data: [],
        point: {},
    },
    timeout: null,
    isTimeout: false
}
var Graph = Config.graph;
Graph.point.add = function (point) {
//    console.log(point);
    Graph.data.push([(new Date()).toLocaleTimeString(), point.raw.Kbps]);
    generateGraph();
}
$(document).ready(initSpeedTestPhp);

function initSpeedTestPhp() {
    google.charts.load('current', {'packages': ['corechart']});
    google.charts.setOnLoadCallback(StartChecking);
}

function UpdateUISpeedTest(msg) {

}

function CalculateAverageSpeed() {
//    console.log(Graph.data);
    var speed = Graph.data.map(function (item) {
        return item[1];
    });
//    console.log(speed);
    var kbps = speed.reduce(function (a, b) {
        return a + b
    }, 0);
    speed.splice(1, 9);
    kbps = (kbps / speed.length).toFixed(2);
    var mbps = (kbps / 1024).toFixed(2);
    var msg = {
        speed: 0,
        unit: "Kbps"
    };
    if (mbps > 0.999) {
        msg.speed = mbps;
        msg.unit = "Mbps";
    } else if (kbps > 0.999) {
        msg.speed = kbps;
        msg.unit = "Kbps";
    }
    var oSpeed = getElement("speedNumber");
    var oUnit = getElement("speedUnit");
    if (oSpeed && oUnit) {
        oSpeed.innerHTML = msg.speed;
        oUnit.innerHTML = msg.unit;
    }
}

function StopChecking() {
    if (Config.timeout) {
        clearInterval(Config.timeout);
        Config.timeout = null;
    }
    $("#refresh").show();
    CalculateAverageSpeed();
    Graph.data = [];
    Config.currentDownloadIndex = 0;

}

function StartChecking() {

    Config.currentSize = Config.downloadSizes[Config.currentDownloadIndex++];
    if (Config.currentDownloadIndex > Config.downloadSizes.length) {
        Config.currentDownloadIndex = 0;
        StopChecking();
    } else {

        $("#refresh").hide();
        MeasureConnectionSpeed();
        if (!Config.timeout) {
            Config.timeout = setTimeout(function () {
                Config.ajax.abort();
//                StopChecking();
            }, 15*1000);
        }
    }
}
function getElement(id) {
    return document.getElementById(id);
}

function ShowProgressMessage(msg) {
    var oSpeed = getElement("speedNumber");
    var oUnit = getElement("speedUnit");
    if (oSpeed && oUnit) {
        oSpeed.innerHTML = msg.speed;
        oUnit.innerHTML = msg.unit;
    }
    Graph.point.add(msg);
}
function MeasureConnectionSpeed() {
    Config.ajax = $.ajax({
        xhr: function () {
            var xhr = new window.XMLHttpRequest();
//            xhr.upload.addEventListener("progress", function (evt) {
//                if (evt.lengthComputable) {
//                    var percentComplete = evt.loaded / evt.total;
//                    //Do something with upload progress here
//                }
//            }, false);

            xhr.addEventListener("progress", function (evt) {
                var t = (new Date()).getTime() - Config.timeStarted;
                var duration = t / 1000;
                var bitsLoaded = evt.loaded * 8;
                var speedBps = (bitsLoaded / duration).toFixed(2);
                var speedKbps = (speedBps / 1024).toFixed(2);
                var speedMbps = (speedKbps / 1024).toFixed(2);
                var msg = {
                    speed: 0,
                    unit: "Kbps"
                };
                if (speedMbps > 0.999) {
                    msg.speed = speedMbps;
                    msg.unit = "Mbps";
                } else if (speedKbps > 0.999) {
                    msg.speed = speedKbps;
                    msg.unit = "Kbps";
                } else if (speedBps > 0) {
                    msg.speed = speedBps;
                    msg.unit = "bps";
                }
                msg.raw = {};
                msg.raw.Kbps = parseFloat(speedKbps);
                ShowProgressMessage(msg);
            }, false);

            return xhr;
        },
        type: 'GET',
        url: "data.php",
        data: {count: Config.currentSize},
        async: true,
        beforeSend: function (xhr) {
            Config.timeStarted = (new Date()).getTime();
        },
        success: function (data) {
            Config.timeEnded = (new Date()).getTime();
        }
    }).always(StartChecking);
}
function generateGraph() {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Time');
    data.addColumn('number', 'Kbps');

    data.addRows(Graph.data);

    var options = {
        hAxis: {
            title: 'Time'
        },
        vAxis: {
            title: 'Speed'
        },
        animation: {duration: 10},
        backgroundColor: '#E4E4E4',
        vAxis: {
            gridlines: {
                color: 'transparent'
            }
        },
        hAxis: {
            gridlines: {
                color: 'transparent'
            },
            textPosition: 'none'
        },
        legend: {position: 'none'}
    };

    var chart = new google.visualization.LineChart(document.getElementById('chartContainer'));

    chart.draw(data, options);

}