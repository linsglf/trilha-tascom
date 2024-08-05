const prompt = require('prompt-sync')();
const cpfCheck = require('cpf-check');
const validator = require('validator');

let usuarios = [];
let n = 0;
let id = 0;

function cadastro(){
  let usuario = {
    userId: id,
    userName: null,
    userEmail: null,
    userCpf: null
  };

  let u = prompt('Digite o nome do usuario: ');
  usuario.userName = u;

  u = prompt('Digite o email do usuario: ');
  usuario.userEmail = u;

  let emailValido = false;
  while (!emailValido) {
    if (validator.isEmail(u)) {
      usuario.userEmail = u;
      emailValido = true;
    } else {
      console.log('Email inválido. Tente novamente.');
      u = prompt('Digite o email do usuario: ');
    }
  }

  u = prompt('Digite o CPF do usuario: ');
  usuario.userCpf = u;

  let cpfValido = false;
  while (!cpfValido) {
    if (cpfCheck.validate(u)) {
      usuario.userCpf = u;
      cpfValido = true;
    } else {
      console.log('CPF inválido. Tente novamente.');
      u = prompt('Digite o CPF do usuario: ');
    }
  }

  usuarios.push(usuario);
  id++;
}

function visualizarUsuario(i) {

  let flag = false;

  for (let usuario of usuarios) {
    if(usuario.userId === i){
      console.log(usuario.userId);
      console.log(usuario.userName);
      console.log(usuario.userEmail);
      console.log(usuario.userCpf);

      flag = true;
    }
  }

  if (!flag) console.log('Usuario nao encontrado');

  prompt('Pressione enter para continuar');
}

function editarUsuario() {
  let i = parseInt(prompt('Digite o id do usuario: '));

  visualizarUsuario(i);

  let flag = false;

  for (let usuario of usuarios) {
    if(usuario.userId === i){
      let u = prompt('Digite o nome do usuario: ');
      usuario.userName = u;

      u = prompt('Digite o email do usuario: ');
      usuario.userEmail = u;

      u = prompt('Digite o CPF do usuario: ');
      usuario.userCpf = u;

      flag = true;
    }
  }

  if (!flag) console.log('Usuario nao encontrado');

  prompt('Pressione enter para continuar');
}

function excluirUsuario() {
  let i = parseInt(prompt('Digite o id do usuario: '));

  let flag = false;

  for (let usuario of usuarios) {
    if(usuario.userId === i){
      usuarios.splice(i, 1);
      flag = true;

      console.log('Usuario excluido com sucesso');
      prompt('Pressione enter para continuar');
    }
  }

  if (!flag) console.log('Usuario nao encontrado');
  
  prompt('Pressione enter para continuar');
}

function exibirTodosUsuarios() {
  for (let usuario of usuarios) {
    console.log(`-------------------`);
    console.log(usuario.userId);
    console.log(usuario.userName);
    console.log(usuario.userEmail);
    console.log(usuario.userCpf);
    console.log(`-------------------`);
  }

  prompt('Pressione enter para continuar');
}


while(n != 5){
  console.log('1 - Cadastrar Usuário');
  console.log('2 - Visualizar Usuário');
  console.log('3 - Editar Usuário');
  console.log('4 - Excuir Usuário');
  console.log('5 - Sair');

  n = parseInt(prompt('Escolha uma opcao: '));

  switch (n) {
    case 1:
      cadastro();
      console.clear();
      break;

    case 2:
      let i = parseInt(prompt('Digite o id do usuario: '));
      visualizarUsuario(i);
      console.clear();
      break;

    case 3:
      editarUsuario();
      console.clear();
      break;

    case 4:
      excluirUsuario();
      console.clear();
      break;

    case 704:
      exibirTodosUsuarios();
      console.clear();
      break;

    default:
      console.log('Opcao invalida');
      break;
  }
}