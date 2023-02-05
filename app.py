from flask import Flask , request, render_template,jsonify
import json
import scipy
import scipy.signal
from flask_cors import CORS, cross_origin
from Functions import *

app = Flask(__name__) 
app.secret_key = "secret key"
CORS(app)


zero=[]
pole=[]
k=[]
output=[]
 
@app.route('/', methods= ['GET','POST'])
def home():
    return render_template('index.html')

# def phaseCorrection():
#     return render_template('allPass.html')


@app.route('/getFilter', methods=['POST'])
@cross_origin()
def getFrequencyResponce():
    global zero, pole, k
    if request.method == 'POST':
        zerosAndPoles = json.loads(request.data)
        zeros = parseToComplex(zerosAndPoles['zeros'])
        poles = parseToComplex(zerosAndPoles['poles'])
        gain = zerosAndPoles['gain']
        w, angles, magnitude = frequencyResponse(zeros, poles, gain)
        response_data = {
                'w': w.tolist(),
                'angels': angles.tolist(),
                'magnitude': magnitude.tolist()
            }
        zero= zeros
        pole= poles
        k= gain
    return jsonify(response_data)

@app.route('/getAllPassFilter', methods=['POST', 'GET'])
def getAllPassFilterData():
    if request.method == 'POST':
        data = json.loads(request.data)
        filterCoeffients = data['a']
        w, filter_angles = getAllPassFrequencyResponse(filterCoeffients)
        response_data = {
            'w': w.tolist(),
            'angels': filter_angles.tolist(),
        }
        return jsonify(response_data)
    else:
        return 'There is no Post request'

@app.route('/getFinalFilter', methods=['POST', 'GET'])
@cross_origin()
def getFinalFilter():
    if request.method == 'POST':
        zerosAndPoles = json.loads(request.data)
        zeros = parseToComplex(zerosAndPoles['zeros'])
        poles = parseToComplex(zerosAndPoles['poles'])
        gain = 1

        a = zerosAndPoles['a']

        w, allPassAngles = getAllPassFrequencyResponse(a)
        w, filterAngels, filterMagnitude = frequencyResponse(zeros, poles, gain)

        finalAngles = np.add(allPassAngles, filterAngels)
        finalMagnitude = filterMagnitude*1

        response_data = {
                'w': w.tolist(),
                'angels': finalAngles.tolist(),
                'magnitude': finalMagnitude.tolist()
            }
    return jsonify(response_data)
@app.route('/applyFilter', methods=['GET','POST'])
@cross_origin()
def filtered_signal():
    global output
    if request.method == 'POST':
        unfiltered_signal = json.loads(request.data)      #this converts the json output to a python dictionary
        key= list(unfiltered_signal.keys())[0]
        output = apply_filter(zeros=zero, poles=pole, gain=k, signal=unfiltered_signal.get(key))
        response_signal = {
                'output': output.tolist(),
            }
        
    return jsonify(response_signal)


if __name__ == '__main__':
    app.run(debug=True, port=8000)