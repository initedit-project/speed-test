<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Internet Speed Test - Initedit</title>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
        <script src="script.js?v=1.0.0"></script>
        <link rel="icon" href="/favicon.png">
        <style>
            body{
                margin: 0;
                padding: 0;
                font-family: arial,sans-serif;
            }
            .container{
                width: 100%;
                height: 100vh;
                background-color: #F6F6F6;
                color: #666;
                display: flex;
            }
            .content{
                margin: auto auto;
                width: 500px;
                height: 400px;
            }
            .graph{
                height: 35%;
            }
            .speed{
                height: 40%;   
                text-align: center;
                font-size: 64pt;
            }
            #speedUnit{
                font-size: 80%;
            }
            .refresh{
                text-align: center;
                margin-top: 2vh;
            }
            .refresh img{
                max-width: 70px;
                opacity: 0.7;
                display: none;
                cursor: pointer;
            }
            .refresh img:hover{
                opacity: 1;
            }
            .graph{
                position: absolute;
                top: 0px;
                left: 0px;
                width: 100%;
                height: 100%;
                z-index: -1;
            }
            .container{
                position: fixed;
                top: 0px;
                left: 0px;
            }
            .overlay{
                position: fixed;
                top: 0px;
                left: 0px;
                background-color: rgba(0,126,255,0.6);
                width: 100%;
                height: 100%;
            }
            .graph #chartContainer{
                height: 100vh;
            }
            .powered-by{
                position: fixed;
                bottom: 10px;
                right: 10px;
                color:#FFF;
            }
            .powered-by a{
                text-decoration: none;
                color:#333;
                font-weight: bold;
            }
        </style>
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
                </div>
                <div class="refresh">
                    <img src="reload.png" id="refresh" onclick="StartChecking()"/>
                </div>
            </div>
            <div class="powered-by">
                            Powered By <a href="">Initedit</a>
            </div>
        </div>
    </body>
</html>
