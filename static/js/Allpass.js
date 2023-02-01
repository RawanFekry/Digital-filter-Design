const allPassPhase = document.getElementById('all-pass-phase-response');
const finalPhase = document.getElementById('final-filter-phase-response');
const checkList = document.getElementById('list1')
document.querySelector('#listOfA').addEventListener('input', updateAllPassCoeff)
document.querySelector('#new-all-pass-coef').addEventListener('click', addNewA)


function addNewA() {
    var newA_real = document.getElementById('real').value
    var newA_img = document.getElementById('imaginary').value
    var newA = math.complex(newA_real,newA_img)
    // if(newA > 1 || newA < -1){
    //     alert(`invalid ${newA} as Filter Coefficient`)
    //     return
    // }
    document.getElementById(
        'listOfA'
    ).innerHTML += `<li><input class = "target1" type="checkbox" data-avalue="${newA}"/>${newA}</li>`
    clearCheckBoxes()
}

async function updateFilterPhase(allPassCoeff){
    const { zeros, poles } = filter_plane.getZerosPoles(radius)
    const { angels: allPassAngels } = await postData(
        'http://127.0.0.1:8000//getAllPassFilter',
        {
            a: allPassCoeff,
        }
    )
    const { w, angels: finalFilterPhase } = await postData(
        'http://127.0.0.1:8000//getFinalFilter',
        {
            zeros,
            poles,
            a: allPassCoeff,
        }
    )
    Plotly.newPlot(
        allPassPhase,
        [{x: w, y: allPassAngels}],
       {xaxis: {autorange: true,}, yaxis: { autorange: true,  }, },
       { staticPlot: true })
    Plotly.newPlot(
        finalPhase,
        [{x: w, y: finalFilterPhase}],
       {xaxis: {autorange: true,}, yaxis: { autorange: true,  }, },
       { staticPlot: true })   
   
}

function updateAllPassCoeff(){
    let allPassCoeff = []
    document.querySelectorAll('.target1').forEach(item => {
        let aValue = parseFloat(item.dataset.avalue)
        let checked = item.checked
        if (checked) allPassCoeff.push(aValue)
    })
    updateFilterPhase(allPassCoeff)
}