var personagens;


/***********************************/
//             ONLOAD
/***********************************/


$(function(){
    personagens = localStorage.getItem("personagens");// Recupera os dados armazenados
    personagens = JSON.parse(personagens); // Converte string para objeto
    if(personagens == null) // Caso não haja conteúdo, iniciamos um vetor vazio
    	personagens = [];
    else{
    	carregarPersonagens();
    }
    
});

/************************************/


/***********************************/
//           My Objects
/***********************************/


function Personagem(imagem,nome,descricao){
	this.imagem=imagem;
	this.nome=nome;
	this.descricao=descricao;
}

/***********************************/



/***********************************/
//           My Functions
/***********************************/

function carregarPersonagens(){
	var meusPersonagens = document.getElementById("my-pers");
	//Inicializa o corpo da página com uma tabela
	//Que será preenchida com os personagens
    	meusPersonagens.innerHTML = "<table id='caractersTable'></table>";
    	var table = document.getElementById("caractersTable");
		//Percorro o array com todos os personagens cadastrados
		//E para cada personagem eu crio uma tag tr com todos os seus atributos
		//Foi utilizada esta solução por conta do armazenamento da imagem em base64
		for(var i in personagens){
			var personagem = personagens[i];
			var tr = document.createElement('tr');
    		var td1 = document.createElement('td');
    		var td2 = document.createElement('td');
    		var imagem = document.createElement('img');
    		var span1 = document.createElement('span');
    		var span2 = document.createElement('span');
    		var br = document.createElement('br');
    		var h4 = document.createElement('h4');
    		var center1 = document.createElement('center');
    		var center2 = document.createElement('center');
    		
    		imagem.setAttribute('src',personagem.imagem);
    		span1.innerHTML= personagem.nome;
    		
    		center1.appendChild(span1);
    		center1.appendChild(br);
    		center1.appendChild(imagem);
    		td1.appendChild(center1);

    		h4.innerHTML = "Descrição";
    		span2.innerHTML = personagem.descricao;
    		center2.appendChild(h4);
    		center2.appendChild(span2);

    		td2.appendChild(center2);
    		tr.appendChild(td1);
    		tr.appendChild(td2);
    		table.appendChild(tr);
    	}
	}

//Esta função serve para iniciar a imagem 
//Selecionada pelo usuário dentro da modal
function showImage(input){
	if(input.files && input.files[0]){
		var reader = new FileReader();

		reader.onload = function(e){
			$('#img-upload').attr('src', e.target.result);
		}
		reader.readAsDataURL(input.files[0]);
	}
}

function adicionarPersonagem(){
	//São pegos todos os atributos do personagem
	var nome = $("#myPerson").val();
	var descricao = $("#persDescription").val();
	var imagem = document.getElementById("img-upload");
	//Testa se foi ou não escolhida uma imagem
	if(imagem.src==""){
		alert("Erro, foto não selecionada!");
	}else if(descricao==""||nome==""){ //Testa se todos os campos foram preenchidos
		alert("Preencha todos os campos!");
	}else{
		/*Para o salvamento da imagem dentro do local storage
		foi feito uma cópia da imagem para dentro de um atributo canvas.
		Este atributo posteriormete foi convertido para base64
		para que seja possivel colocá-lo dentro do local storage
		*/
		var imgCanvas = document.createElement("canvas");
    	var imageContext = imgCanvas.getContext("2d");
   		imgCanvas.width = 200;
	    imgCanvas.height = 200;
	    imageContext.drawImage(imagem, 0, 0, 200, 200);
	    imagem = imgCanvas.toDataURL("image/png");

	    var personagem = new Personagem(imagem,nome,descricao);
	    personagens.push(personagem);
	    localStorage.setItem("personagens",JSON.stringify(personagens));
	    alert("Salvo com sucesso!");
	    fechaModal();
	    carregarPersonagens();
	}
}
