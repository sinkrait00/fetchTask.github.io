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
getContent('http://46.101.146.101:8081/categories/').then(body=> {
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
