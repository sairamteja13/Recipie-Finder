let searchbtn = document.getElementById("searchbtn");
let recipieslist = document.getElementById('recipieitems');
let recipiescontainer = document.getElementById('recipiecontainer');
let ingridient = document.getElementById('ingridientsearch');



searchbtn.addEventListener('click', search);
ingridient.addEventListener('keyup', function (event) {
    if (event.key === "Enter") {
        search();
    }
});

function search(e) {

    console.log(e);

    let recipies = fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${ingridient.value}`)

    recipies.then(response => response.json())
        .then((response) => {

            console.log(response);
            let recipiewrapper = document.getElementById('recipieswrapper');
            const recipies = response.meals;
            recipiescontainer.innerHTML = "";
            recipiewrapper.innerHTML = "";
            if (response.status == 0 || recipies === null) {

                let msg = document.createElement('h1');
                msg.classList.add("msg");
                msg.textContent = "NO Recipie's Found Search other Item"
                recipiewrapper.prepend(msg)
            } else {
                for (let i = 0; i < recipies.length && i <= 30; i++) {
                    recipiewrapper.appendChild(recipiescontainer)
                    
                    let newrecipies = document.createElement('div');
                    newrecipies.className = "recipiesitems";
                    newrecipies.innerHTML = `<img src="${recipies[i].strMealThumb}" alt="game-wallpaper" id="recipieimg">
                                <h1 id="recipietitle">${recipies[i].strMeal}</h1>
                                <a id="recipielink" href="${recipies[i].strYoutube}" target="_blank"><button id="recipiebtn">Recipie</button></a>`;
                    recipiescontainer.appendChild(newrecipies);
                }
            }


        })
        .catch(err => console.error(err));



}








