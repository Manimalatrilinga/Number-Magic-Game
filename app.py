##############################################################################
# FileName: app.py
#
# Summary: This Python Flask application powers the Number Magic web game.
# It handles user interactions, generates the Admin's numbers based on
# a simple mathematical trick, and serves the HTML templates and static
# files for the game's frontend.
#
# Date Created: [Current Date - e.g., April 19, 2025]
#
# Author: [Your Name/Handle]
#
# Libraries Used:
# - Flask: For creating the web application and handling routing.
# - random: For generating the initial random number for the Admin.
# - jsonify: For converting Python dictionaries to JSON responses.
#
##############################################################################
# Copyright (C) 2025 [Your Name/Organization], [Your Website/GitHub]
# All rights reserved.
#
# For more scripts and sample code, check out
# [Your Website/GitHub]
#
# You may alter this code for your own *non-commercial* purposes. You may
# republish altered code as long as you include this copyright and give
# due credit.
#
#
# THIS CODE AND INFORMATION ARE PROVIDED "AS IS" WITHOUT WARRANTY OF
# ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT LIMITED
# TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR FITNESS FOR A
# PARTICULAR PURPOSE.
#
##############################################################################
from flask import Flask, render_template, request, jsonify
import random

app = Flask(__name__)

def generate_random_4_digit():
    return random.randint(1000, 9999)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/start_game')
def start_game():
    global user_numbers, admin_numbers, admin_first_number
    user_numbers = []
    admin_numbers = []
    admin_first_number = generate_random_4_digit()
    admin_numbers.append(admin_first_number)
    return jsonify({'admin_number': admin_first_number})

@app.route('/user_input', methods=['POST'])
def user_input():
    user_number = int(request.form['user_number'])
    user_numbers.append(user_number)
    admin_next_number = 9999 - user_number
    admin_numbers.append(admin_next_number)
    return jsonify({'user_number': user_number, 'admin_number': admin_next_number})

@app.route('/reveal_sum')
def reveal_sum():
    total_sum = sum(user_numbers) + sum(admin_numbers)
    return jsonify({'total_sum': total_sum, 'user_numbers': user_numbers, 'admin_numbers': admin_numbers})

if __name__ == '__main__':
    app.run(debug=True)
