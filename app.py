from flask import Flask , request, render_template,jsonify
import json
from flask_cors import CORS, cross_origin
from Functions import *

app = Flask(__name__) 
app.secret_key = "secret key"
CORS(app)


zero,pole,output= [0],[0],[0]
allpasszeros, allpasspoles= [0],[0]
filterangles, finalAngles, allPassAngles= [0],[0],[0]
totalzeros, totalpoles= [0],[0]
allpasscoefficients= [0]
k= 0
#change= False

 
 
@app.route('/', methods= ['GET','POST'])
def home():
    return render_template('index.html')

# def phaseCorrection():
#     return render_template('allPass.html')



@app.route('/getFilter', methods=['POST'])
@cross_origin()
def getFrequencyResponce():
    global zero, pole, k, filterangles, allPassAngles, totalzeros, totalpoles
    if request.method == 'POST':
        zerosAndPoles = json.loads(request.data)
        zeros = parseToComplex(zerosAndPoles['zeros'])
        poles = parseToComplex(zerosAndPoles['poles'])
        gain = zerosAndPoles['gain']
        w, filterangles, magnitude = frequencyResponse(zeros, poles, gain)
        filterangles= np.add(allPassAngles, filterangles)
        # if change==True: 
        #     filterangles=finalAngles
        response_data = {
                'w': w.tolist(),
                'angels': filterangles.tolist(),
                'magnitude': magnitude.tolist()
            }
        zero,pole,k= getfrompair(zeros,poles,gain)
        totalzeros= zero+allpasszeros
        totalpoles= poles+allpasspoles
    return jsonify(response_data)


@app.route('/getZerosAndPoles', methods=['POST'])
@cross_origin()
def getPoints():
    if request.method == 'POST':
        zerosAndPoles = json.loads(request.data)
        zeros = zerosAndPoles['zeros']
        poles = zerosAndPoles['poles']
        response_data = {
                'zeros': zeros,
                'poles': poles,
            }
        print(response_data)
    return jsonify(response_data)

@app.route('/getAllPassFilter', methods=['POST', 'GET'])
def getAllPassFilterData():
    count=0
    if request.method == 'POST':
        data = json.loads(request.data)
        filterCoeffients = data['a']
        for a in filterCoeffients:
            filterCoeffients[count]= convert(a)
            count+=1
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
    global finalAngles, allPassAngles, allpasscoefficients
    count=0
    if request.method == 'POST':
        #change= True
        zerosAndPoles = json.loads(request.data)
        zeros = parseToComplex(zerosAndPoles['zeros'])
        poles = parseToComplex(zerosAndPoles['poles'])
        gain = 1

        a = zerosAndPoles['a']
        allpasscoefficients= len(a)*[0]
        for a in a:
            allpasscoefficients[count]= convert(a)
            count+=1
        allpasszeros, allpasspoles= len(allpasscoefficients)*[0], len(allpasscoefficients)*[0]
        if a!=[]:        
            for cnt in range(0,len(allpasscoefficients)):
                coefficient= allpasscoefficients[cnt]
                allpasszeros[cnt], allpasspoles[cnt]= getzeroandpole(coefficient)

        w, allPassAngles = getAllPassFrequencyResponse(allpasscoefficients)
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
        output = apply_filter(zeros=totalzeros, poles=totalpoles, gain=k, signal=unfiltered_signal.get(key))
        response_signal = {
                'output': (output.real).tolist()
            } 
    return jsonify(response_signal)


if __name__ == '__main__':
    app.run(debug=True, port=8000)
