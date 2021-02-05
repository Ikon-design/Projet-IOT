import flask
import json
import mariadb
from flask import jsonify
from flask_cors import CORS
from flask import request
app = flask.Flask(__name__)
app.config["DEBUG"] = True
CORS(app)

try:
    conn = mariadb.connect(
        user="clement",
        password="root",
        host="127.0.0.1",
        port=3306,
        database='iot'
    )
except mariadb.Error as e:
    print(f"Error connecting to MariaDB Plateform: {e}")
    sys.exit(1)


@app.route('/probe/<probeId>', methods=['GET'])
def home(probeId):
    cur = conn.cursor()
    cur.execute("SELECT * FROM probe LEFT JOIN temperatures ON probe.id = temperatures.probeId LEFT JOIN humidities ON probe.id = humidities.probeId WHERE probe.id = " + probeId)
    json = list(cur)
    return jsonify(json)


@app.route('/createProbe', methods=['POST'])
def createSonde():
    jsdata = request.form
    latitude = float(jsdata['latitude'])
    longitude = float(jsdata['longitude'])
    nameProbe = jsdata['probeName']
    ip = jsdata['ip']
    cur = conn.cursor()
    sql = "INSERT INTO probe (probeName, ip, latitude, longitude) VALUES (%s, %s, %s, %s)"
    create_sondes = cur.execute(sql, (nameProbe, ip, latitude, longitude))
    conn.commit()
    return jsonify(nameProbe, ip, latitude, longitude)


@app.route('/probes', methods=['GET'])
def temperatures():
    cur = conn.cursor()
    cur.execute("SELECT probeName FROM probe")
    json2 = list(cur)
    return jsonify(json2)


@app.route('/temperatures/<probeId>', methods=['GET'])
def reading(probeId):
    cur = conn.cursor()
    cur.execute("SELECT * FROM temperatures WHERE probeId = " + probeId + " ORDER BY readingDate LIMIT 0 , 6;")
    json = list(cur)
    return jsonify(json)

# def createSonde():
#       cur = conn.cursor()
#       create_sondes = cur.execure("INSERT INTO Sondes )


app.run(host="192.168.97.2", port=5000)
