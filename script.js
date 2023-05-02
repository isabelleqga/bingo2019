// lista de jogadores
var jogadores = [];
// qnt de jogadores pra facilitar minha vida
var jogadoresqnt = 0;
// posso declarar isso em outro canto mas
// nao vou mexer no q ta quieto
var complet;
var divi;
var numSort;

alert("-------------REGRAS \n • O limite de jogadores é 6 \n • O máximo de números por jogador é 10 \n • Os números escolhidos devem estar entre 0 - 20 \n • O jogador deve cadastrar todos os seus números de uma vez \n • O nome deve ter no máximo 8 caracteres \n • Dois jogadores não podem ter o mesmo nome \n • O mesmo jogador não pode escolher o mesmo número duas vezes \n --- May the odds be ever in your favour :)");

function addPart(){ 
// pega td a string
    complet = document.getElementById("part").value;
//divide a string entre as virgulas e limita a qnt de numeros
    divi = complet.split(",",11);
// ve se o nome eh grande dms
    if (divi[0].length > 8) {
        alert("Escolha um nome menor.");
// ve se n tem jogador dms
    }else if(jogadoresqnt>=6){
        alert("Rodada lotada.");
    }else if(divi.length < 2){
// ve se adicionou pelo menos um numero
        alert("Adicione algum numero para jogar.");
    }else{
        // adiciona jogador na lista
        jogadores.push(divi[0]);
        // passos de validacao
        // explica nas funcoes
            if(validarJogador()){
                if(validarNum2()){
                    if(validarNumeros()){

                        jogadoresqnt++;
                        var table = document.getElementById("tabela1");

                        var row = table.insertRow(0);
                        var cell = row.insertCell(0);
                        cell.innerHTML = divi[0];

                        for (var i = 1; i <= divi.length - 1; i++) {
                            var cell = row.insertCell(i);
                            cell.innerHTML = parseInt(divi[i]);
                        }
                        //zera as variaveis
                        complet=[];
                        divi=[];

                    }else{
                        alert("Escolha o mesmo numero so uma vez.");
                        jogadores.pop();
                    }
                }else{
                    alert("Algum dos seus numeros nao segue as regras.");
                    jogadores.pop();
                }
            }else{
                alert("Escolha outro user.");
                jogadores.pop();
            }
    }
}

function validarJogador(){
    // ve se n tem dois jogadores com o msm nome
    var validade = true;
    for (var i = 0; i <= jogadores.length - 1; i++) {
        for (var j = 0; j <= jogadores.length - 1; j++) {
            if(i!=j){
                if(jogadores[i] == jogadores[j]){
                validade = false;
                }
            }   
        }
    }return validade;
}

function validarNumeros(){
    // ve se os numeros q a pessoa escolheu n estao repetidos
    var validaden = true;
    for (var i = 0; i <= divi.length - 1; i++) {
        for (var j = 0; j <= divi.length - 1; j++) {
            if(i!=j){
                if(divi[i] == divi[j]){
                    validaden = false;
                }
            }   
        }
    }return validaden;
}


function remPart(){
    if(jogadoresqnt>0){
        if(jogardorExiste()){
                // pra isso funcionar tem q inverter a array
            jogadores.reverse();
            var a = jogadores.indexOf(document.getElementById("dpart").value);
            document.getElementById("tabela1").deleteRow(a);
            jogadores.splice(a, 1); 
                // ai inverte d nv dps de tirar
            jogadores.reverse();
            jogadoresqnt--;
        }
    }else{
        alert("Esse jogador nao existe.");
        // aq é se n tiver jogadores
        // parece redundancia mas tava dando errado
    }
    
}

function jogardorExiste(){
    // vai checar se o jogador q ta tentando tirar existe
    var vale = false;
        for (var i = 0; i <= jogadores.length - 1; i++) {
            if(document.getElementById("dpart").value==jogadores[i]){
                vale = true;
            }
        }
        // isso ta meio enrolado mas da crt
        if(vale){
            return true;
        }else{
        // aq é se o jogador n existir
            alert("Esse jogador nao existe.");
        }
}

function sortearNum(){
    // sorteia nums entre 0 e 20
    numSort = Math.floor((Math.random() * 20) + 1);
    // marca na tabela e ve se alguem ganhou
    verificar();
    // no lugar de um alert decidi fazer uma caixa com os numsorteados
    var boxx = document.getElementById('oQsaiu');
    boxx.value = numSort;
}

function verificar(){
    // tabela
    var oTabela = document.getElementById('tabela1');
    // linha
    var linhaTam = oTabela.rows.length;
    // loop nas linhas    
    for (i = 0; i < linhaTam; i++){
        // celulas da linha
        var oCels = oTabela.rows.item(i).cells;
        // qntds cels na linha
        var celTam = oCels.length;
        // loop nas cels da linha
        for(var j = 1; j < celTam; j++){
            // valor das cels
            var celVal = parseInt(oCels.item(j).innerHTML);
            if(celVal==numSort){
                oCels[j].style.backgroundColor = "lightblue";
                // pinta as cels sorteadas
            }
        }
        var celCrt = 0;
        for(var j = 0; j < celTam; j++){    
            if (oCels[j].style.backgroundColor=="lightblue"){
                celCrt++;
                // conta as cels pintadas
            }
        }       
        if (celTam-1 == celCrt){
            // ve se tds as cels estao pintadas
            oCels[0].style.backgroundColor = "lightblue";
            // pinta nome do ganhdor
            var nomeGan = oCels.item(0).innerHTML;
            // anuncia
            alert(nomeGan+" ganhou! Parabéns :)");
            //novoJogo();
        }
    }
}


function novoJogo(){
    location.reload();
}


function validarNum2(){
    // checa se
    // os numeros selecionados estao no limite (0-20)
    // foram selecionados !numeros!
    var numOk = true;
    for (var i = 1; i <= divi.length - 1; i++) {
        if(parseInt(divi[i]) > 20 || parseInt(divi[i])<0 || isNaN(parseInt(divi[i]))){
            numOk = false;
        }
    }return numOk;
}