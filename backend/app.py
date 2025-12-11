from flask import Flask, jsonify
import mysql.connector
import os

app = Flask(__name__)

# Database config (paikallisesti docker-composen env:stä, tuotannossa Kubernetes-secreteistä)
db_config = {
    'user': 'root',
    'password': os.getenv('MYSQL_ROOT_PASSWORD', 'test_password'),
    'host': 'mysql',
    'database': 'test_db'
}

@app.route('/health')
def health():
    return jsonify({'status': 'healthy'})

# Uusi toiminnallisuus: Hae käyttäjät MySQL:stä
@app.route('/api/users', methods=['GET'])
def get_users():
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()
        cursor.execute("SELECT id, name FROM users")  # Olettaen taulu 'users' (id, name)
        users = cursor.fetchall()
        cursor.close()
        conn.close()
        return jsonify([{'id': row[0], 'name': row[1]} for row in users])
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)