var Config = {
    timeStarted: 0,
    timeEnded: 0,
    ajax: null,
    graph: {
        data: [],
        point: {},
    },
    timeout: null,
    isTimeout: false
}
var Graph = Config.graph;
Graph.point.add = function (point) {
    Graph.data.push([(new Date()).toLocaleTimeString(), point.raw.Kbps]);
    if(Graph.data.length>55){
        Graph.data.shift();
    }
}
$(document).ready(initSpeedTestPhp);

function initSpeedTestPhp() {
    $(".btn-stop").click(function(){
        Config.ajax.abort();
        StopChecking();
    });
    $(".btn-start").click(function(){
        StartChecking();
    });
    StartChecking();
}

function CalculateAverageSpeed() {
    var speed = Graph.data.map(function (item) {
        return item[1];
    });
    var kbps = speed.reduce(function (a, b) {
        return a + b
    }, 0);
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
    UpdateSpeedUI(msg);
}

function StopChecking() {
    if (Config.timeout) {
        clearInterval(Config.timeout);
        Config.timeout = null;
    }
    $(".btn-start").show();
    $(".btn-stop").hide();
    CalculateAverageSpeed();
    Graph.data = [];
    Config.currentDownloadIndex = 0;

}

function StartChecking() {
    $(".btn-start").hide();
    $(".btn-stop").show();
    MeasureConnectionSpeed();
    if (!Config.timeout) {
        Config.timeout = setTimeout(function () {
            Config.ajax.abort();
        }, 15*1000);
    }
}

function UpdateSpeedUI(msg){
    $("#speedNumber").html(msg.speed);
    $("#speedUnit").html(msg.unit);
}

function ShowProgressMessage(msg) {
    UpdateSpeedUI(msg);
    Graph.point.add(msg);
}
function MeasureConnectionSpeed() {
    Config.ajax = $.ajax({
        xhr: function () {
            var xhr = new window.XMLHttpRequest();

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
        data: {},
        async: true,
        beforeSend: function (xhr) {
            Config.timeStarted = (new Date()).getTime();
        },
        success: function (data) {
            Config.timeEnded = (new Date()).getTime();
            StopChecking();
        }
    })
}