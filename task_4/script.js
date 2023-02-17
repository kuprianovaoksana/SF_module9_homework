// Напишите код приложения, интерфейс которого представляет собой 2 input и кнопку submit. В input можно ввести любое число.
// При клике на кнопку происходит следующее:
// Если оба числа не попадают в диапазон от 100 до 300 или введено не число — выводить ниже текст «одно из чисел вне диапазона от 100 до 300»;
// Если числа попадают в диапазон от 100 до 300 — сделать запрос c помощью fetch по URL https://picsum.photos/200/300, где первое число — ширина картинки, второе — высота.

const minValue = 100;
const maxValue = 300;

function msgAboutNumbers(firstNum, secNum){
    document.getElementById('msg').innerText = `Введите 2 числа в диапазоне от ${firstNum} до ${secNum}`;
}
msgAboutNumbers(minValue, maxValue);



document.querySelector(".button").addEventListener('click', () => {

    const value1 = Math.round(document.getElementById('input1').value);
    const value2 = Math.round(document.getElementById('input2').value);
    validation(value1, value2);
    document.getElementById('input1').value="";
    document.getElementById('input2').value="";
});

function validation(value1, value2){
    
    if((value1&&value2)>=minValue  &&  (value1&&value2)<=maxValue  &&  !isNaN(value1)  &&  !isNaN(value2)){
        document.querySelector('.warn_message').classList.remove('active');
        sendRequest(value1, value2);
    }
    else {
        document.querySelector('.warn_message').classList.add('active');
    }
}

function sendRequest(value1, value2) {

    fetch(`https://picsum.photos/${value1}/${value2}`)
        .then((response) => {
            return url = response.url;
        })
        .then((data) => { 
            initPictures(data, value1, value2);
        })
        .catch(() => {console.log('error')});  
}


function initPictures(url, width, height) {

    let image = `<div class = "insert_image">
    <img src="${url}" width = ${width}px height = ${height}px>
    </div>`;
    document.querySelector('.form').insertAdjacentHTML('afterend', image);
};