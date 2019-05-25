<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Internet Speed Test - Initedit</title>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <!-- <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script> -->
        <script src="script.js?v=2.0"></script>
        <link rel="icon" href="/favicon.png">
        <link rel="stylesheet" href="styles.css?v=2.0">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body>
        <div class="container">
            <div class="content">
                <div class="graph">
                    <div id="chartContainer"></div>
                    <div class="overlay"></div>
                </div>
                <div class="speed">
                    <div id="speedNumber">0</div>
                    <div id="speedUnit">Kbps</div>
                    <div class="refresh">
                        <button class="btn-start">START</button>
                        <button class="btn-stop">STOP</button>
                    </div>
                </div>
            </div>
            <div class="powered-by">
                Powered By <a href="https://github.com/initedit-project">Initedit</a>
            </div>
        </div>

    </body>
</html>
