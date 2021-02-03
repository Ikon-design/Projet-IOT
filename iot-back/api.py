import flask
import json
import mariadb
from flask import jsonify
from flask_cors import CORS

app = flask.Flask(__name__)
app.config["DEBUG"] = True
CORS(app)

try:
        conn = mariadb.connect (
                user = "clement",
                password = "root",
                host="127.0.0.1",
                port=3306,
                database = 'iot'
        )
except mariadb.Error as e:
        print(f"Error connecting to MariaDB Plateform: {e}")
        sys.exit(1)

@app.route('/probe/<probeId>', methods=['GET'])
def home(probeId):
        cur = conn.cursor()
        cur.execute("SELECT * FROM probe JOIN temperatures ON probe.id = temperatures.probeId JOIN humidities ON probe.id = humidities.probeId WHERE probe.id = " + probeId)
        json = list(cur)
        return jsonify(json)

@app.route('/probes', methods=['GET'])
def temperatures():
        cur = conn.cursor()
        cur.execute("SELECT probeName id FROM probe")
        json2 = list(cur)
        return jsonify(json2)

#def createSonde():
#       cur = conn.cursor()
#       create_sondes = cur.execure("INSERT INTO Sondes )

app.run(host = "192.168.97.2", port = 5000)

