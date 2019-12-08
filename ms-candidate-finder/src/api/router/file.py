from flask import request, jsonify
from src.handlers.file_handler import FileHandler
from src.config import Config

def create_or_get_file(request):
    if request.method == 'GET':
        try:
            return jsonify({'data': 'data_to_send'}), 200
        except BaseException as ex:
            return jsonify({'message': 'Error occured: ' + str(ex)})
    
    if request.method == 'POST':
        try:
            # TODO: Replace this with user email from auth token once middleware is implemented
            file_info, file = request.form.to_dict(), request.files['file']
            file_handler = FileHandler(file_info['userEmail'])
            file_handler.save_file(file_info, file)
            return jsonify({'data': 'data_to_send'}), 200
        except BaseException as ex:
            return jsonify({'message': 'Error occured: ' + str(ex)})