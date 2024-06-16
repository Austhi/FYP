import numpy as np
import pandas as pd
from tensorflow.keras.models import load_model
import joblib

scaler = joblib.load('scaler.joblib')
columns = joblib.load('columns.joblib')

model = load_model('model_lstm.keras')

def preprocess_new_data(new_data):
    new_data_df = pd.DataFrame(new_data, columns=["age", "restingBP", "gender", "chestpain", "serumcholestrol", 
                                                  "fastingbloodsugar", "restingrelectro", "maxheartrate", 
                                                  "exerciseangia", "oldpeak", "slope", "noofmajorvessels"])

    new_data_df = pd.get_dummies(new_data_df, columns=["gender", "chestpain", "fastingbloodsugar", "restingrelectro", "exerciseangia", "slope", "noofmajorvessels"])
    
    for col in columns:
        if col not in new_data_df:
            new_data_df[col] = 0
    new_data_df = new_data_df[columns]
    new_data_df[["age", "restingBP", "serumcholestrol", "maxheartrate", "oldpeak"]] = scaler.transform(new_data_df[["age", "restingBP", "serumcholestrol", "maxheartrate", "oldpeak"]])
    return new_data_df

def predict_new_data(new_data):
    preprocessed_data = preprocess_new_data(new_data)
    
    preprocessed_data = preprocessed_data.values.reshape((preprocessed_data.shape[0], 1, preprocessed_data.shape[1]))
    new_pred = model.predict(preprocessed_data, verbose=2)
    new_pred = (new_pred > 0.5).astype(int)
    return "Heart disease" if new_pred[0][0] == 1 else "no disease"

def get_data_for_prediction(filename): 
    file = open(filename, "r")
    content = file.read()
    lines = content.split('\n')
    array = lines[1].split(',')
    for i in range (len(array)):
        if (array[i].find('.') >= 0):
            array[i] = float(array[i])
        else:
            array[i] = int(array[i])
    # print(array, flush=True)
    return array

new_data = get_data_for_prediction("medic.csv")
new_data = np.array([new_data])
prediction = predict_new_data(new_data)
print("Prediction:", prediction)