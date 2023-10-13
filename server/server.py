from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)
model = joblib.load("model_476655.pkl")


@app.route("/")
def default():
    return "Hi there!"


@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        temp_np = np.array(data["data"], dtype=np.float64)
        new_np = temp_np.reshape(1, -1)
        print(new_np)
        predictions = model.predict(new_np)
        return jsonify({"predictions": int(predictions[0])})

    except Exception as e:
        return jsonify({"error": str(e)})


if __name__ == "__main__":
    app.run()
