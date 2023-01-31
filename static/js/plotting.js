const filterDesignMagnitude = document.querySelector('#filter-mag-response')
const filterDesignPhase = document.querySelector('#filter-phase-response')


async function postData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    return response.json()
}

async function updateFilterDesign(data) {
    data.gain = 1
    let { w, angels, magnitude } = await postData(`${API}/getFilter`, data)
   Plotly.newPlot(
        filterDesignMagnitude,
        [{ x: w, y: magnitude, line: { color: '#red' } }, ],
       {xaxis: {autorange: true,}, yaxis: { autorange: true,  }, },
       { staticPlot: true })
        
    Plotly.newPlot(
        filterDesignPhase,
        [{ x: w, y: angels, line: { color: '#red' } }, ],
       {xaxis: {autorange: true,}, yaxis: { autorange: true,  }, },
       { staticPlot: true })
  
}



