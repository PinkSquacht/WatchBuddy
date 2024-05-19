from . import api
from flask import request, jsonify, render_template
from app.recommendations import get_recommendations
import logging

@api.route('/recommendations', methods=['POST'])
def recommendations():
    logging.debug("Accessed /api/recommendations route")
    print("Accessed /api/recommendations route")
    try:
        # Check if the request contains JSON data
        if request.is_json:
            data = request.get_json()
        else:
            data = request.form.to_dict()

        logging.debug(f'Received data: {data}')
        print(f"Received data: {data}")

        if not data:
            error_message = "No data received"
            logging.error(error_message)
            print(error_message)
            return jsonify({"error": error_message}), 400

        mood = data.get('mood', '')
        if not mood:
            error_message = "Mood is required but not provided"
            logging.error(error_message)
            print(error_message)
            return jsonify({"error": error_message}), 400

        recommendations = get_recommendations(mood)
        logging.debug(f"Recommendations: {recommendations}")
        print(f"Recommendations: {recommendations}")
        return jsonify({"recommendations": recommendations})

    except Exception as e:
        error_message = f"Error: {str(e)}"
        logging.error(error_message)
        print(error_message)
        return jsonify({"error": "Internal Server Error"}), 500

@api.route('/form', methods=['GET'])
def form():
    return render_template('form.html')




