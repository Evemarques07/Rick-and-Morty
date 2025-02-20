const formulario = document.querySelector("#formulario");
const personagemInput = document.querySelector("#personagem");
const sectionCards = document.querySelector("#cards");
const botaoVerMais = document.querySelector(".VerMais");
const mensagemErro = document.querySelector("#mensagemErro");
const botaoListarTodos = document.querySelector("#listarTodos");

let paginaAtual = null;

async function buscarPersonagens(url) {
  try {
    const resposta = await fetch(url);
    const dados = await resposta.json();

    if (dados.error) {
      throw new Error(dados.error);
    }

    if (dados.results.length === 0) {
      throw new Error("Nenhum personagem encontrado.");
    }

    sectionCards.innerHTML = "";
    dados.results.forEach((personagem) => {
      const card = criarCard(personagem);
      sectionCards.appendChild(card);
    });

    if (dados.info.next) {
      botaoVerMais.style.display = "block";
      paginaAtual = dados.info.next;
    } else {
      botaoVerMais.style.display = "none";
      paginaAtual = null;
    }

    mensagemErro.textContent = "";
    personagemInput.value = "";
    personagemInput.focus();
  } catch (erro) {
    console.error("Erro na busca:", erro);
    sectionCards.innerHTML = "";
    botaoVerMais.style.display = "none";
    mensagemErro.textContent = erro.message;
  }
}

function criarCard(personagem) {
  const card = document.createElement("div");
  card.classList.add("card");

  card.innerHTML = `
        <img src="${personagem.image}" alt="Foto de ${personagem.name}">
        <div class="card-content">
            <h2>${personagem.name}</h2>
            <p>Espécie: ${personagem.species}</p>
            <p>Status: ${personagem.status}</p>
            <p>Localização: ${personagem.location.name}</p>
        </div>
    `;

  return card;
}

botaoVerMais.addEventListener("click", () => {
  if (paginaAtual) {
    buscarPersonagens(paginaAtual);
  }
});

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const nomePersonagem = personagemInput.value.trim();

  if (nomePersonagem) {
    buscarPersonagens(
      `https://rickandmortyapi.com/api/character/?name=${nomePersonagem}`
    );
  } else {
    mensagemErro.textContent = "Por favor, digite o nome de um personagem.";
    sectionCards.innerHTML = "";
    botaoVerMais.style.display = "none";
  }
});

botaoListarTodos.addEventListener("click", () => {
  buscarPersonagens("https://rickandmortyapi.com/api/character");
});

buscarPersonagens("https://rickandmortyapi.com/api/character");
