from flask import Blueprint, render_template, jsonify
import os, json

bp = Blueprint ('main', __name__)
@bp.route('/')
def index():
	json_path = os.path.join(os.path.dirname(__file__), 'tabla.json')
	with open(json_path, 'r', encoding="utf-8") as f:
		data = json.load(f)
	return render_template('index.html', tabla=data)