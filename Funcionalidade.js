//Codiginho

document.getElementById("btnBuscar").addEventListener("click", buscarPokemon);

async function buscarPokemon() {
    const nomePokemon = document.getElementById("inputPokemon").value.trim().toLowerCase();
    const divResultado = document.getElementById("resultado");

    divResultado.innerHTML = "<p>Buscando...</p>";

    if (nomePokemon === "") {
        divResultado.innerHTML = `<p class="erro">Por favor, digite o nome de um Pokémon!</p>`;
        return;
    }

    try {
        const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nomePokemon}`);

        if (!resposta.ok) {
            throw new Error("Pokémon não encontrado!");
        }

        const dados = await resposta.json();

        const tipos = dados.types.map(tipoInfo => tipoInfo.type.name).join(', ');

        const imagem = dados.sprites.other['official-artwork'].front_default || dados.sprites.front_default;

        divResultado.innerHTML = `
            <h2>${dados.name}</h2>
            <p><strong>Tipo(s):</strong> ${tipos}</p>
            <img src="${imagem}" alt="${dados.name}">
        `;

    } catch (erro) {
        divResultado.innerHTML = `<p class="erro">${erro.message}</p>`;
    }

}