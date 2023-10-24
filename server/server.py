from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
import joblib
import numpy as np
import pandas as pd

app = Flask(__name__)
CORS(app)

model = joblib.load("./Models/model_101296.pkl")
rob_scaler = joblib.load("./Scaler/robust_scaler.pkl")
min_max_scaler = joblib.load("./Scaler/min_max.pkl")

new_columns = [
    "Time",
    "V1",
    "V2",
    "V3",
    "V4",
    "V5",
    "V6",
    "V7",
    "V8",
    "V9",
    "V10",
    "V11",
    "V12",
    "V13",
    "V14",
    "V15",
    "V16",
    "V17",
    "V18",
    "V19",
    "V20",
    "V21",
    "V22",
    "V23",
    "V24",
    "V25",
    "V26",
    "V27",
    "V28",
    "Amount",
]


def process_data(data):
    temp_np = np.array(data["data"], dtype=np.float64)
    new_df = pd.DataFrame(temp_np, columns=new_columns)

    new_df["Amount"] = rob_scaler.transform(new_df["Amount"].values.reshape(-1, 1))
    new_df["Time"] = min_max_scaler.transform(new_df["Time"].values.reshape(-1, 1))
    return new_df


@app.route("/")
def default():
    return "Hi there!"


# @app.route("/predict", methods=["OPTIONS"])
# def handle_preflight():
#     response = make_response()
#     response.headers.add(
#         "Access-Control-Allow-Origin",
#         "https://animated-invention-9rv667x9953p7j4-5173.app.github.dev",
#     )
#     response.headers.add("Access-Control-Allow-Headers", "Content-Type")
#     response.headers.add("Access-Control-Allow-Methods", "POST")
#     return response

results = {}


@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        processed_df = process_data(data)
        predictions = list(model.predict(processed_df))
        print(predictions)

        results = [
            ["Not Fraud Transaction" if int(value) == 0 else "Fraud Transaction!"]
            for value in predictions
        ]
        return jsonify(results)

    except Exception as e:
        return jsonify({"error": str(e)})


if __name__ == "__main__":
    app.run(debug=True)
