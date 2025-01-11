const button = document.querySelector('.button-add-task')
const input = document.querySelector('.input-task')
const listaCompleta = document.querySelector('.list-tasks')
const erroMensagem = document.createElement('div') // Div para mensagem de erro

let minhaListaDeItens = []

// Adiciona a mensagem de erro
erroMensagem.style.color = 'red'
erroMensagem.style.fontSize = '12px'
erroMensagem.style.marginTop = '5px'

button.addEventListener('click', adicionarNovaTarefa)

function adicionarNovaTarefa() {
    const tarefa = input.value.trim() // remove espaços extras no início e no final

    if (tarefa === '') {
        erroMensagem.textContent = 'Você precisa dar nome a tarefa!'
        input.after(erroMensagem) // Coloca a mensagem de erro logo abaixo do input
        return
    }

    // Se passou a verificação, adiciona a tarefa à lista
    minhaListaDeItens.push({
        tarefa: tarefa,
        concluida: false,
    })

    input.value = '' // Limpa o campo de input após adicionar a tarefa
    erroMensagem.textContent = '' // Limpa qualquer mensagem de erro anterior

    mostrarTarefas()
}

function mostrarTarefas() {
    listaCompleta.innerHTML = '' // Limpa a lista antes de renderizar

    minhaListaDeItens.forEach((item, posicao) => {
        let novaLi = document.createElement('li')
        novaLi.classList.add('task')
        if (item.concluida) {
            novaLi.classList.add('done')
        }

        let checkButton = document.createElement('img')
        checkButton.src = './img/outro.png'
        checkButton.alt = 'check-na-tarefa'
        checkButton.addEventListener('click', () => concluirTarefa(posicao))

        let tarefaTexto = document.createElement('p')
        tarefaTexto.textContent = item.tarefa

        let deleteButton = document.createElement('img')
        deleteButton.src = './img/excluir.png'
        deleteButton.alt = 'excluir-tarefa'
        deleteButton.addEventListener('click', () => deletarItem(posicao))

        novaLi.appendChild(checkButton)
        novaLi.appendChild(tarefaTexto)
        novaLi.appendChild(deleteButton)
        listaCompleta.appendChild(novaLi)
    })

    localStorage.setItem('lista', JSON.stringify(minhaListaDeItens))
}

function concluirTarefa(posicao) {
    minhaListaDeItens[posicao].concluida = !minhaListaDeItens[posicao].concluida
    mostrarTarefas()
}

function deletarItem(posicao) {
    minhaListaDeItens.splice(posicao, 1)
    mostrarTarefas()
}

function recarregarTarefas() {
    const tarefasDoLocalStorage = localStorage.getItem('lista')

    if (tarefasDoLocalStorage) {
        minhaListaDeItens = JSON.parse(tarefasDoLocalStorage)
    }

    mostrarTarefas()
}

recarregarTarefas()

erroMensagem.style.color = '#e83b31'; // Cor da mensagem de erro
erroMensagem.style.fontSize = '14px'; // Tamanho da fonte
erroMensagem.style.marginTop = '10px'; // Distância entre o input e a mensagem de erro
erroMensagem.style.fontWeight = 'bold'; // Deixa o texto em negrito
erroMensagem.style.fontFamily = "Montserrat" // Tipo da fonte

function editarTarefa(posicao) {
    const novaTarefa = prompt("Edite a tarefa:", minhaListaDeItens[posicao].tarefa)

    if (novaTarefa !== null && novaTarefa.trim() !== "") {
        minhaListaDeItens[posicao].tarefa = novaTarefa.trim()
        mostrarTarefas()
    }
}

const chk = document.getElementById('chk')

chk.addEventListener('change', () => {
    document.body.classList.toggle('dark')
})