from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
import cv2
import numpy as np
from deepface import DeepFace
import dlib
import requests

app = Flask(__name__)
CORS(app)

app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024

DLIB_MODEL_PATH = "model/shape_predictor_68_face_landmarks.dat"

detector = dlib.get_frontal_face_detector()
predictor = dlib.shape_predictor(DLIB_MODEL_PATH)

def read_image_from_base64(base64_str):
    img_data = base64.b64decode(base64_str)
    np_arr = np.frombuffer(img_data, np.uint8)
    img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
    return img

def read_image_from_url(url):
    response = requests.get(url)
    if response.status_code == 200:
        img_data = response.content
        np_arr = np.frombuffer(img_data, np.uint8)
        img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
        return img
    else:
        return None

def align_face(img):
    if img is None:
        return None
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces = detector(gray)
    for face in faces:
        landmarks = predictor(gray, face)
        return dlib.get_face_chip(img, landmarks)
    return None

@app.route('/service/verification', methods=['POST'])
def verify_face():
    data = request.json
    user_image_base64 = data['user_image']
    id_image_url = data['id_card_image']

    user_image = read_image_from_base64(user_image_base64)
    id_image = read_image_from_url(id_image_url)

    aligned_user_image = align_face(user_image)
    aligned_id_image = align_face(id_image)

    if aligned_user_image is None or aligned_id_image is None:
        return jsonify({"error": "Face not detected"}), 400

    result = DeepFace.verify(aligned_user_image, aligned_id_image, model_name='ArcFace', detector_backend='retinaface')

    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
