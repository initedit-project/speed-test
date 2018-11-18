<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Internet Speed Test - Initedit</title>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
        <script src="script.js?v=<?php echo time();?>"></script>
        <link rel="icon" href="/favicon.png">
        <link rel="stylesheet" href="styles.css?v=<?php echo time();?>">
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
                        <img src="reload.png" id="refresh" onclick="StartChecking()"/>
                    </div>
                </div>
            </div>
            <div class="powered-by">
                Powered By <a href="https://github.com/initedit-project">Initedit</a>
            </div>
        </div>

    </body>
</html>
