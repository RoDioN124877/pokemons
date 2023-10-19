const container = document.querySelector('.container');
const pokemons = document.querySelector('.pokemons');
const pok_one = document.querySelector('.pok_one');
const pok_two = document.querySelector('.pok_two');
const exe = document.querySelector('.exe');
const win = document.querySelector('.win');
const Fight = document.querySelector('.Fight');
let index = 0;
let pok_num = null;

function get_api(step) {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${step}`)
        .then(res => res.json())
        .then(data => {
            return data;

        });
}

async function start() {
    const pokemonDataPromises = [];

    for (let i = 1; i < 100; i++) {
        pokemonDataPromises.push(get_api(i));
    }

    const pokemonData = await Promise.all(pokemonDataPromises);
    pokemonData.forEach(render_pokemon);
}

function render_pokemon(info) {
    index++;
    container.innerHTML += `
        <div id='${index}'>
            <img class="img" src="${info.sprites.front_shiny}">
            <p class="name">${info.name}</p>
            <h4>stats:</h4>
            <p class="hp">hp: ${info.stats[0].base_stat}</p>
            <p class="attack">attack: ${info.stats[1].base_stat}</p>
            <p class="defense">defense: ${info.stats[2].base_stat}</p>
            <p class="special-attack">special-attack: ${info.stats[3].base_stat}</p>
            <p class="special-defense">special-defense: ${info.stats[4].base_stat}</p>
            <p class="speed">speed: ${info.stats[5].base_stat}</p>
            <button class="add">get pokemon</button>
        </div>
    `;
}

async function add_pock() {
    await start();
    const btns = document.querySelectorAll('.add');
    btns.forEach(i => {
        i.addEventListener('click', () => {
            console.log(i);
            const block_pcmn = i.parentNode;
            const img = block_pcmn.querySelector('.img').src;
            const name = block_pcmn.querySelector('.name');
            const hp = block_pcmn.querySelector('.hp');
            const attack = block_pcmn.querySelector('.attack');
            const defense = block_pcmn.querySelector('.defense');
            const special_attack = block_pcmn.querySelector('.special-attack');
            const special_defense = block_pcmn.querySelector('.special-defense');
            const speed = block_pcmn.querySelector('.speed');
            render_new_pok(name, img, hp, attack, defense, special_attack, special_defense, speed);

            const poks = document.querySelectorAll('.poks');
            poks_get_arr(poks)
            console.log(poks);
        });
    });
}

function render_new_pok(name_n, img_n, hp_n, attack_n, defense_n, special_attack_n, special_defense_n, speed_n) {
    if (pok_num === 1) {
        pok_one.innerHTML = `
        <div class="poks">
            <img  src="${img_n}">
            <p class="name">${name_n.textContent}</p>
            <h4>stats:</h4>
            <p class="hp">${hp_n.textContent}</p>
            <p class="attack">${attack_n.textContent}</p>
            <p class="defense">${defense_n.textContent}</p>
            <p class="special-attack">${special_attack_n.textContent}</p>
            <p class="special-defense">${special_defense_n.textContent}</p>
            <p class="speed">${speed_n.textContent}</p>
        </div>
    `;
    } else if (pok_num === 2) {
        pok_two.innerHTML = `
        <div class="poks">
            <img  src="${img_n}">
            <p class="name">${name_n.textContent}</p>
            <h4>stats:</h4>
            <p class="hp">${hp_n.textContent}</p>
            <p class="attack">${attack_n.textContent}</p>
            <p class="defense">${defense_n.textContent}</p>
            <p class="special-attack">${special_attack_n.textContent}</p>
            <p class="special-defense">${special_defense_n.textContent}</p>
            <p class="speed">${speed_n.textContent}</p>
        </div>
        `;
    }
}

function poks_get_arr(arr){

    console.log(arr);
    let hp_one =  Number(arr[0].querySelectorAll('.hp')[0].textContent.substring(4));
    let attack_one =  Number(arr[0].querySelectorAll('.attack')[0].textContent.substring(8));
    let defense_one =  Number(arr[0].querySelectorAll('.defense')[0].textContent.substring(9));
    let special_attack_one = Number( arr[0].querySelectorAll('.special-attack')[0].textContent.substring(16));
    let special_defense_one =  Number(arr[0].querySelectorAll('.special-defense')[0].textContent.substring(17));
    let speed_one =  Number(arr[0].querySelectorAll('.speed')[0].textContent.substring(7));

    let hp_two =  Number(arr[1].querySelectorAll('.hp')[0].textContent.substring(4));
    let attack_two =  Number(arr[1].querySelectorAll('.attack')[0].textContent.substring(8));
    let defense_two=  Number(arr[1].querySelectorAll('.defense')[0].textContent.substring(9));
    let special_attack_two =  Number(arr[1].querySelectorAll('.special-attack')[0].textContent.substring(16));
    let special_defense_two =  Number(arr[1].querySelectorAll('.special-defense')[0].textContent.substring(17));
    let speed_two = Number(arr[1].querySelectorAll('.speed')[0].textContent.substring(7));

    Fight.addEventListener('click', () => {
        let res_one = ((attack_one*speed_one)+special_attack_one)/((hp_two*defense_two)+special_defense_two)
        let res_two = ((attack_two*speed_two)+special_attack_two)/((hp_one*defense_one)+special_defense_one)
        res_one>res_two?win.innerHTML=`первый покимон по имени - ${arr[0].querySelector('.name').textContent} победил!`:
        win.innerHTML=`второй покимон по имени - ${arr[1].querySelector('.name').textContent} победил!`;
    });
}

pok_one.addEventListener('click', () => {
    pok_num = 1;
    pokemons.style.display = "flex";
});

pok_two.addEventListener('click', () => {
    pok_num = 2;
    pokemons.style.display = "flex";
});

container.addEventListener('click', () => {
    pokemons.style.display = "flex";
});

pokemons.addEventListener('click', () => {
    pokemons.style.display = "none";
});

add_pock();



