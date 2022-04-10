.\venv\scripts\activate
$env:FLASK_ENV="development";
$env:FLASK_APP="server/app.py";
#start powershell {.\start_npm_server.ps1}
flask run;
