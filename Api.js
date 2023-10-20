//привет ! это краткий экскурс по коду, 
//тебе ничего не нуждно кроме самой первой переменной
//ее значение это то сколько покемонов вывести, 
//чем больше тем дольше грузит сайт 
//↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
let ta_samaia_peremennaya = 10;

const container = document.querySelector('.container');
const pokemons = document.querySelector('.pokemons');
const pok_one = document.querySelector('.pok_one');
const pok_two = document.querySelector('.pok_two');
const exe = document.querySelector('.exe');
const win = document.querySelector('.win');
const Fight = document.querySelector('.Fight');
const rest = document.querySelector('.rest');
const searchInput = document.querySelector('.searchInput');
const sortButtons = document.querySelectorAll('.sort-button');
const sortSelect = document.querySelector('#sortSelect');
const pokemonsContainer = document.querySelector('.pokemons');
const info_card = document.querySelector('.info_card')
const info_information = document.querySelector('.info_information')

let originalOrder = [];
let index = 0;
let pok_num = null;
let sortOrder = 0;

function get_api(step) {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${step}`)
        .then(res => res.json())
        .then(data => {
            return data;
        });
}

async function start() {
    const pokemonDataPromises = [];

    for (let i = 1; i < ta_samaia_peremennaya; i++) {
        pokemonDataPromises.push(get_api(i));
    }

    const pokemonData = await Promise.all(pokemonDataPromises);
    pokemonData.forEach(render_pokemon);
}

function render_pokemon(info) {
    index++;
    if (info.types.length > 1) {
        container.innerHTML += `
        <div id='${index}' class="poks_search">
            <img class="img" src="${info.sprites.front_shiny}">
            <p class="name">${info.name}</p>
            <h4>stats:</h4>
            <p class="hp">hp: ${info.stats[0].base_stat}</p>
            <p class="attack">attack: ${info.stats[1].base_stat}</p>
            <p class="defense">defense: ${info.stats[2].base_stat}</p>
            <p class="special-attack">special-attack: ${info.stats[3].base_stat}</p>
            <p class="special-defense">special-defense: ${info.stats[4].base_stat}</p>
            <p class="speed">speed: ${info.stats[5].base_stat}</p>
            <p class="types">types: ${info.types[0].type.name}, ${info.types[1].type.name}</p>
            <button class="add">get pokemon</button>
        </div>
    `;
    }
    else if (info.types.length == 1) {
        container.innerHTML += `
        <div id='${index}' class="poks_search">
            <img class="img" src="${info.sprites.front_shiny}">
            <p class="name">${info.name}</p>
            <h4>stats:</h4>
            <p class="hp">hp: ${info.stats[0].base_stat}</p>
            <p class="attack">attack: ${info.stats[1].base_stat}</p>
            <p class="defense">defense: ${info.stats[2].base_stat}</p>
            <p class="special-attack">special-attack: ${info.stats[3].base_stat}</p>
            <p class="special-defense">special-defense: ${info.stats[4].base_stat}</p>
            <p class="speed">speed: ${info.stats[5].base_stat}</p>
            <p class="types">types: ${info.types[0].type.name}</p>
            <button class="add">get pokemon</button>
        </div>
    `;
    }
}

async function add_pock() {
    await start();
    const btns = document.querySelectorAll('.add');
    btns.forEach(i => {
        i.addEventListener('click', () => {
            const block_pcmn = i.parentNode;
            const img = block_pcmn.querySelector('.img').src;
            const name = block_pcmn.querySelector('.name');
            const hp = block_pcmn.querySelector('.hp');
            const attack = block_pcmn.querySelector('.attack');
            const defense = block_pcmn.querySelector('.defense');
            const special_attack = block_pcmn.querySelector('.special-attack');
            const special_defense = block_pcmn.querySelector('.special-defense');
            const speed = block_pcmn.querySelector('.speed');
            const types = block_pcmn.querySelector('.types');
            render_new_pok(name, img, hp, attack, defense, special_attack, special_defense, speed, types);

            const poks = document.querySelectorAll('.poks');
            poks_get_arr(poks)
            pokemons.classList.remove('flexD');
        });
    });
    originalOrder = Array.from(document.querySelectorAll('.poks_search'));
}
function render_new_pok(name_n, img_n, hp_n, attack_n, defense_n, special_attack_n, special_defense_n, speed_n, types_n) {
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
            <p class="types">${types_n.textContent}</p>
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
            <p class="types">${types_n.textContent}</p>

        </div>
        `;
    }
}

function poks_get_arr(arr) {
    let hp_one = Number(arr[0].querySelectorAll('.hp')[0].textContent.substring(4));
    let attack_one = Number(arr[0].querySelectorAll('.attack')[0].textContent.substring(8));
    let defense_one = Number(arr[0].querySelectorAll('.defense')[0].textContent.substring(9));
    let special_attack_one = Number(arr[0].querySelectorAll('.special-attack')[0].textContent.substring(16));
    let special_defense_one = Number(arr[0].querySelectorAll('.special-defense')[0].textContent.substring(17));
    let speed_one = Number(arr[0].querySelectorAll('.speed')[0].textContent.substring(7));

    if (arr.length > 1) {
        let hp_two = Number(arr[1].querySelectorAll('.hp')[0].textContent.substring(4));
        let attack_two = Number(arr[1].querySelectorAll('.attack')[0].textContent.substring(8));
        let defense_two = Number(arr[1].querySelectorAll('.defense')[0].textContent.substring(9));
        let special_attack_two = Number(arr[1].querySelectorAll('.special-attack')[0].textContent.substring(16));
        let special_defense_two = Number(arr[1].querySelectorAll('.special-defense')[0].textContent.substring(17));
        let speed_two = Number(arr[1].querySelectorAll('.speed')[0].textContent.substring(7));

        Fight.addEventListener('click', () => {
            arr[0].parentNode.classList.remove('lose_p')
            arr[0].parentNode.classList.remove('win_p')
            arr[1].parentNode.classList.remove('win_p')
            arr[1].parentNode.classList.remove('lose_p2')

            arr[0].parentNode.classList.add('box_animate_1')
            arr[1].parentNode.classList.add('box_animate_2')

            setTimeout(() => {
                arr[0].parentNode.classList.remove('box_animate_1')
                arr[1].parentNode.classList.remove('box_animate_2')
            }, 2000)
            let res_one = ((attack_one * speed_one) + special_attack_one) / ((hp_two * defense_two) + special_defense_two)
            let res_two = ((attack_two * speed_two) + special_attack_two) / ((hp_one * defense_one) + special_defense_one)
            if (res_one > res_two) {
                setTimeout(() => {
                    win.innerHTML = `первый покимон по имени - ${arr[0].querySelector('.name').textContent} победил!`
                    arr[0].parentNode.classList.add('win_p')
                    arr[1].parentNode.classList.add('lose_p2')
                }, 2100)
            }
            else if (res_one < res_two) {
                setTimeout(() => {
                    win.innerHTML = `второй покимон по имени - ${arr[1].querySelector('.name').textContent} победил!`;
                    arr[0].parentNode.classList.add('lose_p')
                    arr[1].parentNode.classList.add('win_p')
                }, 2100)

            }

            else if (res_one == res_two) {
                setTimeout(() => {
                    win.innerHTML = `ничья - ${arr[0].querySelector('.name').textContent} и ${arr[1].querySelector('.name').textContent} оказались равны!`;
                }, 2100)
            }
        });
        rest.addEventListener('click', () => {
            arr[0].parentNode.classList.remove('lose_p')
            arr[0].parentNode.classList.remove('win_p')
            arr[1].parentNode.classList.remove('win_p')
            arr[1].parentNode.classList.remove('lose_p2')
            win.innerHTML = ``

        })
    }
}

pok_one.addEventListener('click', () => {
    pok_num = 1;
    pokemons.classList.add('flexD');
    pokemons.classList.remove('noneD');

});

pok_two.addEventListener('click', () => {
    pok_num = 2;
    pokemons.classList.add('flexD');
    pokemons.classList.remove('noneD');

});

container.addEventListener('click', () => {

});

exe.addEventListener('click', () => {
    pokemons.classList.add('noneD');
    pokemons.classList.remove('flexD');

});

add_pock();

function searchPokemonByName() {
    const searchName = searchInput.value.toLowerCase();
    const poksSearch = document.querySelectorAll('.poks_search');

    poksSearch.forEach((pokContainer) => {
        const name = pokContainer.querySelector('.name').textContent.toLowerCase();
        if (name.includes(searchName)) {
            pokContainer.style.display = 'block';
        } else {
            pokContainer.style.display = 'none';
        }
    });
}

searchInput.addEventListener('input', searchPokemonByName);


function resetSort() {
    container.innerHTML = '';
    originalOrder.forEach((pok) => {
        container.appendChild(pok);
    });
    win.innerHTML = '';
    sortSelect.value = 'none';
}

function sortPokemonContainer(sortBy) {
    const poksSearch = document.querySelectorAll('.poks_search');
    const sortedPoks = Array.from(poksSearch);

    sortedPoks.sort((a, b) => {
        for (let i = 0; i < sortBy.length; i++) {
            const sortByAttribute = sortBy[i];
            const valueA = getSortValue(a, sortByAttribute);
            const valueB = getSortValue(b, sortByAttribute);

            if (valueA < valueB) return -1;
            if (valueA > valueB) return 1;
        }

        return 0;
    });

    if (sortOrder === 1) {
        sortedPoks.reverse();
    }

    container.innerHTML = '';

    sortedPoks.forEach((pokContainer) => {
        container.appendChild(pokContainer);
    });
}
function getSortValue(pokContainer, sortBy) {
    switch (sortBy) {
        case 'hp':
            return Number(pokContainer.querySelector('.hp').textContent.substring(4));
        case 'attack':
            return Number(pokContainer.querySelector('.attack').textContent.substring(8));
        case 'defense':
            return Number(pokContainer.querySelector('.defense').textContent.substring(9));
        case 'special-attack':
            return Number(pokContainer.querySelector('.special-attack').textContent.substring(16));
        case 'special-defense':
            return Number(pokContainer.querySelector('.special-defense').textContent.substring(17));
        case 'speed':
            return Number(pokContainer.querySelector('.speed').textContent.substring(7));
        default:
            return 0;
    }
}
sortSelect.addEventListener('change', () => {
    const selectedSortBy = sortSelect.value;
    if (selectedSortBy === 'none') {
        resetSort();
    } else {
        sortPokemonContainer([selectedSortBy]);
        sortOrder = 0; // Устанавливаем порядок сортировки в начальное положение
    }
});



info_card.addEventListener('click',()=>{
    info_information.classList.toggle('sc')
})