from flask import Flask, request, jsonify
import numpy as np
import cv2
import joblib
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow requests from frontend

# Load the trained model
model_path = "model.pkl"
if not os.path.exists(model_path):
    raise FileNotFoundError("Model file not found. Train and save the model first.")

model = joblib.load(model_path)

# Preprocessing function
def preprocess_image(image_path, target_size=(256, 256)):
    image = cv2.imread(image_path)
    if image is None:
        raise ValueError("Could not read the image.")
    image = cv2.resize(image, target_size)
    image = image.astype("float32") / 255.0  # Normalize
    image = np.expand_dims(image, axis=0)  # Add batch dimension
    return image

@app.route("/predict", methods=["POST"])
def predict():
    if "file" not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files["file"]
    file_path = "temp.jpg"
    file.save(file_path)  # Save temporarily

    try:
        image = preprocess_image(file_path)
        prediction = model.predict(image)[0][0]  # Predict
        result = "Infection" if prediction > 0.5 else "No Infection"
        return jsonify({"prediction": result, "confidence": float(prediction)})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
