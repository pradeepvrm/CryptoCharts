from flask import Flask, render_template, jsonify
from polygon import RESTClient
import datetime
from datetime import timedelta
from api_key import API_KEY

client = RESTClient(api_key = API_KEY)

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.htm")

@app.route("/data/<symbol>/<period>")
def getdata(symbol, period):  
    endDate = datetime.datetime.now()
    startDate = endDate
    interval = "day"
    multiplier = 1

    if period == "2year":
        startDate = endDate - timedelta(days=730)
        interval = "day"
        multiplier = 2
    elif period == "1year":
        startDate = endDate - timedelta(days=365)
        interval = "day"
        multiplier = 1
    elif period == "6month":
        startDate = endDate - timedelta(days=180)
        interval = "day"
        multiplier = 1
    elif period == "1month":
        startDate = endDate - timedelta(days=30)
        interval = "day"
        multiplier = 1
    elif period == "1week":
        startDate = endDate - timedelta(days=7)
        interval = "hour"
        multiplier = 1
    elif period == "1day":
        startDate = endDate - timedelta(days=2)
        interval = "hour"
        multiplier = 1

    try:

        aggs = client.get_aggs(
            "X:"+symbol+"USD",
            multiplier,
            interval,
            startDate,
            endDate
        )

        formatted_data = [
            {
                "open": agg.open,
                "high": agg.high,
                "low": agg.low,
                "close": agg.close,
                "time": datetime.datetime.fromtimestamp(agg.timestamp / 1000).strftime('%Y-%m-%d %H:%M:%S')  
            } for agg in aggs
        ]
        return jsonify(formatted_data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
