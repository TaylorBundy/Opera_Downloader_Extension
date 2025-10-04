from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess
import os
import uuid
import json
app = Flask(__name__)
CORS(app)  # 🔥 habilita CORS para todas las rutas

#app = Flask(__name__)

DOWNLOAD_DIR = os.path.join(os.getcwd(), "downloads")
os.makedirs(DOWNLOAD_DIR, exist_ok=True)


@app.route("/download", methods=["POST"])
def download():
    data = request.json
    url = data.get("url")
    nombre = data.get("nombre", f"video_{uuid.uuid4().hex[:6]}")
    resolucion = data.get("resolucion", "480")  # 👈 paráme
    print(resolucion)

    try:
        # Usar yt-dlp para descargar
        salida = os.path.join(DOWNLOAD_DIR, f"{nombre}.%(ext)s")
        if resolucion == "480":
            formato = "bestvideo[height=854]+bestaudio/best[height=480]"
        elif resolucion == "720":
            formato = "bestvideo[height=720]+bestaudio/best[height=720]"
        else:
            formato = "bestvideo+bestaudio/best"
        #comando = ["yt-dlp", "-o", salida, url]
        comando = ["yt-dlp", "-f", formato, "-o", salida, url]

        subprocess.run(comando, check=True)

        return jsonify({"status": "ok", "file": f"{nombre}"})
    except Exception as e:
        return jsonify({"status": "error", "error": str(e)}), 500


@app.route("/convert", methods=["POST"])
def convert():
    data = request.json
    archivo = data.get("archivo")
    formato = data.get("formato", "mp4")

    try:
        entrada = os.path.join(DOWNLOAD_DIR, archivo)
        salida = os.path.join(DOWNLOAD_DIR, f"convertido_{archivo}.{formato}")

        comando = [
            "ffmpeg", "-i", entrada,
            "-c:v", "libx264", "-c:a", "aac",
            salida
        ]
        subprocess.run(comando, check=True)

        return jsonify({"status": "ok", "file": salida})
    except Exception as e:
        return jsonify({"status": "error", "error": str(e)}), 500

@app.route("/resoluciones", methods=["POST"])
def resoluciones():
    data = request.json
    url = data.get("url")
    if not url:
        return jsonify({"status": "error", "error": "No se proporcionó URL"}), 400

    try:
        # Obtenemos los formatos en JSON
        result = subprocess.run(
            ["yt-dlp", "-J", url],
            capture_output=True, text=True, check=True
        )
        info = json.loads(result.stdout)
        formatos = info.get("formats", [])

        resoluciones = set()
        for f in formatos:
            if f.get("height"):
                resoluciones.add(f["height"])

        resoluciones = sorted(resoluciones)
        resoluciones_str = [f"{r}p" for r in resoluciones]

        return jsonify({"status": "ok", "resoluciones": resoluciones_str})
    except Exception as e:
        return jsonify({"status": "error", "error": str(e)}), 500

@app.route("/ping", methods=["GET"])
def ping():
    return jsonify({"status": "ok"})


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
