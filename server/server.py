from flask import Flask, request, jsonify
import joblib
import numpy as np
import pandas as pd

app = Flask(__name__)
model = joblib.load("./Models/model_101296.pkl")
rob_scaler=joblib.load("./Scaler/robust_scaler.pkl")
min_max_scaler=joblib.load("./Scaler/min_max.pkl")


@app.route("/")
def default():
    return "Hi there!"


@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        temp_np = np.array(data["data"], dtype=np.float64)
        new_np = temp_np.reshape(1, -1)

        new_columns=['Time', 'V1', 'V2', 'V3', 'V4', 'V5', 'V6', 'V7', 'V8', 'V9', 'V10',
       'V11', 'V12', 'V13', 'V14', 'V15', 'V16', 'V17', 'V18', 'V19', 'V20',
       'V21', 'V22', 'V23', 'V24', 'V25', 'V26', 'V27', 'V28', 'Amount']
        
        new_df=pd.DataFrame(new_np.reshape(1,-1),columns=new_columns)

        new_df['Amount']=rob_scaler.transform(new_df['Amount'].values.reshape(-1,1))
        new_df['Time']=min_max_scaler.transform(new_df['Time'].values.reshape(-1,1))

        print(new_df.values)
        predictions = model.predict(new_df)

        return jsonify({"predictions": int(predictions[0])})

    except Exception as e:
        return jsonify({"error": str(e)})


if __name__ == "__main__":
    app.run()
