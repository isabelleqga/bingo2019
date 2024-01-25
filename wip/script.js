// Get the modal and buttons
var modal = document.getElementById('add-part');
var openModalBtn = document.getElementById('openModalBtn');
var closeModalBtn = document.getElementById('closeModalBtn');

// Open the modal
openModalBtn.onclick = function() {
    modal.style.display = 'block';
}

// Close the modal
closeModalBtn.onclick = function() {
    modal.style.display = 'none';
}

// Close the modal if the user clicks outside the modal
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

// lista de jogadores
var players = [];
// qnt de jogadores pra facilitar minha vida
var players_quantity = 0;
// posso declarar isso em outro canto mas
// nao vou mexer no q ta quieto
var name;
var numbers;
var numSort;

// alert("-------------REGRAS \n • O limite de jogadores é 6 \n • O máximo de números por jogador é 10 \n • Os números escolhidos devem estar entre 0 - 20 \n • O jogador deve cadastrar todos os seus números de uma vez \n • O nome deve ter no máximo 8 caracteres \n • Dois jogadores não podem ter o mesmo nome \n • O mesmo jogador não pode escolher o mesmo número duas vezes \n --- May the odds be ever in your favour :)");

function addPart() {
  // pega td a string
  name = document.getElementById("add-p-name").value;
  numbers = document.getElementById("add-p-numbers").value;
  //divide a string entre as virgulas e limita a qnt de numeros
  numbers = numbers.split(" ", 9);
  // ve se o nome eh grande dms
  if (name.length > 12) {
    alert("Escolha um nome menor.");
    // ve se n tem jogador dms
  } else if (players_quantity >= 5) {
    alert("Rodada lotada.");
  } else if (numbers.length < 9) {
    // ve se adicionou pelo menos um numero
    alert("Adicione nove números para jogar.");
  } else {
    // adiciona jogador na lista
    players.push(name);
    // passos de validacao
    if (sameNamePlayer()) {
      if (sameNumberTwice()) {
        if (numberOutOfRange()) {
          players_quantity++;
          var table = document.getElementById("table"+players_quantity);

          var header =  document.getElementById("h"+players_quantity);
          header.innerHTML = name;

          var a = 0;
          for (var i = 1; i < 4; i++) {
            for (var j = 1; j < 4; j++) {
              var cell = document.getElementById("c"+players_quantity+i+j);
              cell.innerHTML = parseInt(numbers[a]);
              a++;
            }
          }
          
          //zera as variaveis
          name = "";
          numbers = [];
          numbers_split = [];
        } else {
          alert("Escolha o mesmo numero so uma vez.");
          players.pop();
        }
      } else {
        alert("Algum dos seus numeros nao segue as regras.");
        players.pop();
      }
    } else {
      alert("Escolha outro nome.");
      players.pop();
    }
  }
}

function sameNamePlayer() {
  // ve se n tem dois jogadores com o msm nome
  var validade = true;
  for (var i = 0; i <= players.length - 1; i++) {
    for (var j = 0; j <= players.length - 1; j++) {
      if (i != j) {
        if (players[i] ==players[j]) {
          validade = false;
        }
      }
    }
  }
  return validade;
}

function sameNumberTwice() {
  // checa se
  // os numeros selecionados estao no limite (0-20)
  // foram selecionados !numeros!
  var numOk = true;
  for (var i = 1; i <= numbers.length - 1; i++) {
    if (
      parseInt(numbers[i]) > 70 ||
      parseInt(numbers[i]) < 0 ||
      isNaN(parseInt(numbers[i]))
    ) {
      numOk = false;
    }
  }
  return numOk;
}

function numberOutOfRange() {
  // ve se os numeros q a pessoa escolheu n estao repetidos
  var validaden = true;
  for (var i = 0; i <= numbers.length - 1; i++) {
    for (var j = 0; j <= numbers.length - 1; j++) {
      if (i != j) {
        if (numbers[i] == numbers[j]) {
          validaden = false;
        }
      }
    }
  }
  return validaden;
}

function remPart() {
  if (players_quantity > 0) {
    if (jogardorExiste()) {
      // pra isso funcionar tem q inverter a array
      players.reverse();
      var a = players.indexOf(document.getElementById("dpart").value);
      document.getElementById("tabela1").deleteRow(a);
      players.splice(a, 1);
      // ai inverte d nv dps de tirar
      players.reverse();
      players_quantity--;
    }
  } else {
    alert("Esse jogador nao existe.");
    // aq é se n tiver jogadores
    // parece redundancia mas tava dando errado
  }
}

function jogardorExiste() {
  // vai checar se o jogador q ta tentando tirar existe
  var vale = false;
  for (var i = 0; i <= players.length - 1; i++) {
    if (document.getElementById("dpart").value == players[i]) {
      vale = true;
    }
  }
  // isso ta meio enrolado mas da crt
  if (vale) {
    return true;
  } else {
    // aq é se o jogador n existir
    alert("Esse jogador nao existe.");
  }
}

function sortearNum() {
  // sorteia nums entre 0 e 20
  numSort = Math.floor(Math.random() * 60 + 1);
  // marca na tabela e ve se alguem ganhou
  fillMainTable();
  checkPlayerNumbers();
  // no lugar de um alert decidi fazer uma caixa com os numsorteados
  var boxx = document.getElementById("number-drawn");
  boxx.value = numSort;
}

function fillMainTable() {
  // tabela
  var main_table = document.getElementById("numbers-table");
  // loop nas linhas
  for (i = 0; i < 6; i++) {
    // celulas da linha
    var main_cells = main_table.rows.item(i).cells;
    // loop nas cels da linha
    for (var j = 1; j < 10; j++) {
      // valor das cels
      var cellValue = parseInt(main_cells.item(j).innerHTML);
      if (cellValue == numSort) {
        main_cells[j].style.backgroundColor = "#ede5a0";
        // pinta as cels sorteadas
      }
    }
  }
}

function checkPlayerNumbers() {
  for (player = 1; player <= players.length; player++) {
    // tabela
    var player_table = document.getElementById("table"+player);
    
    var cellsChecked = 0; 
    for (var i = 1; i < 4; i++) {
      for (var j = 1; j < 4; j++) {
        var cell = document.getElementById("c"+player+i+j);
        var cellValue = parseInt(cell.innerHTML);
        if (cellValue == numSort) {
          cell.style.backgroundColor = "#ede5a0";
          // pinta as cels sorteadas
        }
        if (cell.style.backgroundColor) {
          cellsChecked++;
          // conta as cels pintadas
        }
        console.log("player: "+player)
        console.log("cellsChecked: "+cellsChecked)
      }
    }

    if (cellsChecked == 9) {
        var nomeGan = document.getElementById("h"+player);
        // anuncia
        alert(nomeGan.innerHTML + " ganhou! Parabéns :)");
        //novoJogo();
    }
  }
  
}

function novoJogo() {
  location.reload();
}


