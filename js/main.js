document.addEventListener("DOMContentLoaded", ()=>{




const getContent = async (url)=>{
    const res = await fetch(url);
    if (!res.ok){
       const message = `Что то пошло не так... \nОшибка ${res.status} \nСамые опытные самураи уже сражаются с этой проблемой.`;
        errorHTML(message);
        return;
    }else{
    const body = await res.json();
    return body};
}
getContent('https://46.101.146.101:8081/categories/').then(body=> {
    body.forEach((el) => {
         blockHTML(el.id, el.title,el.category_image_url);
     });
    
});


const errorHTML = (message)=>{
   
    const p = document.createElement('p')
    p.innerText=message;
    document.getElementById('category-container').appendChild(p);
}

const blockHTML = (id, title, src)=>{
    const newDiv = document.createElement('div');
    newDiv.className = "category-block";
    newDiv.id = id;

    const img = document.createElement('img');
    img.src = src;
    img.className = 'category-block__img'

    const p = document.createElement('p');
    p.innerText = title;

    newDiv.appendChild(img);
    newDiv.appendChild(p);
    document.getElementById('category-container').appendChild(newDiv);
}


// ########################################################################################
// ########################################################################################
// ########################################################################################
// ########################################################################################
// ########################################################################################
// ########################################################################################


// неповторяющийся рандом
const generateArrayRandomNumber = (min, max)=>{
    var totalNumbers        = max - min + 1,
        arrayTotalNumbers   = [],
        arrayRandomNumbers  = [],
        tempRandomNumber;
    while (totalNumbers--) {
        arrayTotalNumbers.push(totalNumbers + min);
}
while (arrayTotalNumbers.length) {
  tempRandomNumber = Math.round(Math.random() * (arrayTotalNumbers.length - 1));
  arrayRandomNumbers.push(arrayTotalNumbers[tempRandomNumber]);
  arrayTotalNumbers.splice(tempRandomNumber, 1);
}
return arrayRandomNumbers;
}


//формирование ссылки и получение промиса
const getGifs = async (gif_title,gif_amount,api_key)=>{
    const url = `https://api.giphy.com/v1/gifs/search?q=${gif_title}&api_key=${api_key}&limit=${gif_amount}`;
    const res = await fetch(url);
    const body = await res.json();
    return body;
    };


 document.getElementById('get-gifs').addEventListener('click', ()=>{

    const gif_title = document.getElementById('req-input').value.trim();
    const gif_amount = 5 * document.getElementById('req-amount').value; 
    const api_key = '7Mp7iqDKV4Tk6vOLTB72oKUsJ4bld3dp';

    removeGif();

    //получение данных промиса
   getGifs(gif_title,gif_amount,api_key).then(({data}) =>{
   let random = generateArrayRandomNumber(0,gif_amount); //рандомные числа
   let getUrl = [];
   data.forEach(el=>{
       getUrl.push(el.images.downsized.url); //получение ссылок из промиса
   });
      
       for(let i=0;i<gif_amount/5;i++){   //конструкция по созданию неповторяющихся гифок 
      addGif(getUrl[random[i]]);
       }

}) 
});

//создание img элемента
function addGif(url){
    const img = document.createElement('img');
    img.className="imgGif";
    img.src=url;
    document.getElementById('giphy-container').appendChild(img);
};

//удаление старых гифок
function removeGif(){
    const amountGifNow = document.querySelectorAll('.imgGif')
        amountGifNow.forEach(el=>{
            el.remove();
        });
    
       
    
}




});
