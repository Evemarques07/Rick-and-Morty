
const formulario = document.querySelector("#formulario")
const personagem = document.querySelector("#usuario")
const sectionCards = document.querySelector("#cards")
const botao_VerMais = document.querySelector(".VerMais")

const error = document.createElement("p")

async function buscarPersonagens(url) {
    try {
        const request = await fetch(url)
        const response = await request.json()
        console.log(response)
        if (response.error || response.results.length === 0) { 
            error.textContent = "Personagem não encontrado"
        } else {
            error.textContent = ""
            response.results.forEach((personagem) => {
                const card = criarCard(personagem)
                sectionCards.appendChild(card)
            })
            if (response.info.next) {
                botao_VerMais.style.display = "block"
                botao_VerMais.id = response.info.next
            } else {
                botao_VerMais.style.display = "none"
            }
        }
        personagem.value = ""
        personagem.focus()
    } catch (error) {
        console.log(error)
    }
}

function criarCard(personagem) {
    const card = document.createElement("div")
    card.classList.add("card")

    const foto_do_personagem = document.createElement("img")
    foto_do_personagem.src = personagem.image
    foto_do_personagem.alt = "Foto do perfil do Personagem"
    foto_do_personagem.width = "300"

    const card_infos = document.createElement("div")
    const nome_do_personagem = document.createElement("h2")
    nome_do_personagem.classList.add("nome")
    const especie_do_personagem = document.createElement("p")
    const status_do_personagem = document.createElement("p")
    const localizacao_do_personagem = document.createElement("p")
    nome_do_personagem.innerHTML = `Nome: <span class="spanNome"> ${personagem.name} </span>` 
    especie_do_personagem.innerHTML = `Espécie: <span class="spanEspecie"> ${personagem.species} </span>`
    status_do_personagem.innerHTML = `Status: <span class="spanStatus"> ${personagem.status} </span>`
    localizacao_do_personagem.innerHTML = `Localização: <span class="spanLoc"> ${personagem.location.name} </span>` || "Desconhecido"

    card_infos.append(nome_do_personagem, especie_do_personagem, status_do_personagem, localizacao_do_personagem)

    card.append(foto_do_personagem, card_infos, error)
    
    return card
}

botao_VerMais.addEventListener("click", function(e) {
    const px_pagina = e.target.id
    if (px_pagina) {
        buscarPersonagens(px_pagina)
    }
})

formulario.addEventListener("submit", function(e) {
    e.preventDefault()
    sectionCards.innerHTML = ""
    buscarPersonagens(`https://rickandmortyapi.com/api/character/?name=${personagem.value}`)
})




buscarPersonagens("https://rickandmortyapi.com/api/character/?name=")