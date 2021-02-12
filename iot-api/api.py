import flask
import json
import mariadb
from flask import jsonify
from flask_cors import CORS
from flask import request
from flask_restx import Api, Resource
app = flask.Flask(__name__)
api = Api(title='météoji', doc="/api")
app.config["DEBUG"] = True
CORS(app)

try:
    conn = mariadb.connect(
        user="root",
        password=")B3dEi4d",
        host="localhost",
        port=3306,
        database='iot'
    )
except mariadb.Error as e:
    print(f"Error connecting to MariaDB Plateform: {e}")
    sys.exit(1)


@app.route('/createProbe', methods=['POST'])
def createSonde():
    jsdata = request.form
    latitude = float(jsdata['latitude'])
    longitude = float(jsdata['longitude'])
    nameProbe = jsdata['probeName']
    ip = jsdata['ip']
    cur = conn.cursor()
    sql = "INSERT INTO probes (probeName, ip, latitude, longitude) VALUES (%s, %s, %s, %s)"
    create_sondes = cur.execute(sql, (nameProbe, ip, latitude, longitude))
    conn.commit()
    return jsonify(nameProbe, ip, latitude, longitude)


@app.route('/probes', methods=['GET'])
def temperatures():
    sql = "SELECT * FROM probes"
 cur = conn.cursor(dictionary=True)
    cur.execute(sql)
    data = list(cur)
    return jsonify(data)

@app.route('/numberOfProbes', methods=['GET'])
def numberOfProbes():
        cur = conn.cursor()
        cur.execute("SELECT id FROM probes")
        json = list(cur)
        return jsonify(json)

@app.route('/updateProbe', methods=['POST'])
def updateProbes():
    jsdata = request.form
    probeId = int(jsdata['probeId'])
    latitude = float(jsdata['latitude'])
    longitude = float(jsdata['longitude'])
    nameProbe = jsdata['probeName']
    ip = jsdata['ip']
    cur = conn.cursor()
    sql = ("UPDATE probes SET probeName = %s, ip = %s, latitude = %s, longitude = %s WHERE id = %s")
    update_probe = cur.execute(sql, (nameProbe, ip, latitude, longitude, probeId))
    conn.commit()
    return jsonify(nameProbe, ip, latitude, longitude, probeId)

@app.route('/addReading', methods=['POST'])
def post():
    temperature = api.payload['temperature']
    humidite = api.payload['humidity']
    probeId = api.payload['probeId']
    cur = conn.cursor()
    sql = "INSERT INTO readings (probeId, temperature, humidity, readingDate) VALUES (%s, %s, %s, NOW())"
    create_reading = cur.execute(sql, (probeId, temperature, humidite))
    print(create_reading)
    conn.commit()
    return jsonify(probeId, temperature, humidite)

@app.route('/readingProbe/<probeId>', methods=['GET'])
def home(probeId):
    sql = "SELECT * FROM readings WHERE probeId = " + probeId "ORDER BY readingDate LIMIT 0 , 1"
    cur = conn.cursor(dictionary=True)
    cur.execute(sql)
    data = list(cur)
    return jsonify(data)

@app.route('/reading/<probeId>', methods=['GET'])
def reading(probeId):
    sql = "SELECT temperature FROM readings WHERE probeId = " + probeId
    cur = conn.cursor(dictionary=True)
    cur.execute(sql)
    data = list(cur)
    return jsonify(data)


app.run(host="192.168.43.16", port=5000)
