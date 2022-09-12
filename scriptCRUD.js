const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sID = document.querySelector('#m-id')
const sNome = document.querySelector('#m-nome')
const sCPF = document.querySelector('#m-cpf')
const sDtNascimento = document.querySelector('#m-datadenascimento')
const sEmail = document.querySelector('#m-email')
const sTelefone = document.querySelector('#m-telefone')

const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sID.value = itens[index].id
    sNome.value = itens[index].nome
    sCPF.value = itens[index].cpf
    sDtNascimento.value = itens[index].sdatadenascimento
    sEmail.value = itens[index].e-mail
    sTelefone.value = itens[index].telefone
    id = index

  } else {

    sID.value = ''
    sNome.value = ''
    sCPF.value = ''

    sDtNascimento.value = ''
    sEmail.value = ''
    sTelefone.value = ''
  }
  
}

// Função Edita Itens

function editItem(index) {

  openModal(true, index)
}

// Função Deleta Itens

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}


// Função Insere Itens

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.id}</td>
    <td>${item.nome}</td>
    <td> ${item.cpf}</td>

    <td>${item.datadenascimento}</td>
    <td>${item.email}</td>
    <td>${item.telefone}</td>


    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  
  if (sID.value == '' || sNome.value == '' || sCPF.value == '' || sDtNascimento.value == '' || sEmail.value == '' ||  sTelefone.value == '' ) {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].id = sID.value
    itens[id].nome = sNome.value
    itens[id].cpf = sCPF.value

    itens[id].datadenascimento = sDtNascimento.value
    itens[id].email = sEmail.value
    itens[id].telefone = sTelefone.value



  } else {
    itens.push({'id': sID.value, 'nome': sNome.value, 'cpf': sCPF.value, 'datadenascimento': sDtNascimento.value, 'email': sEmail.value, 'telefone': sTelefone.value  })
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

// Função Carrega Itens

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()


