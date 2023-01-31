import numpy as np
import scipy
import scipy.signal



def frequencyResponse(zeros, poles, gain):
    # w is The frequencies at which h was computed. By default, w is normalized to the range [0, pi).
    # h is The frequency response, as complex numbers.
    w, h = scipy.signal.freqz_zpk(zeros, poles, gain)
    magnitude = 20 * np.log10(np.abs(h))
    angels = np.unwrap(np.angle(h))
    #normalization
    w=w/max(w)
    # rounding 
    angles=np.around(angels, decimals=3)
    magnitude= np.around(magnitude, decimals=3)
    return w,angles,magnitude

def phaseResponse(a):
    w, h = scipy.signal.freqz([-a, 1.0], [1.0, -a])
    angels = np.zeros(512) if a==1 else np.unwrap(np.angle(h))
    w=w/max(w)
    angles=np.around(angels, decimals=3)
    return w,angles
    
 # convert zeros and poles to complex numbers
def parseToComplex(pairs):
    complexNumbers = [0]*len(pairs)
    for i in range(len(pairs)):
        x = round(pairs[i][0], 2)
        y = round(pairs[i][1], 2)
        complexNumbers[i] = x+ y*1j
    return complexNumbers