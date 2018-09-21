var personagens;
var numPersonagens=0;

$(function(){
    personagens = localStorage.getItem("personagens");// Recupera os dados armazenados
    personagens = JSON.parse(personagens);
    console.log(personagens) // Converte string para objeto
    if(personagens == null) // Caso não haja conteúdo, iniciamos um vetor vazio
    	personagens = [];
    else{
    	var meusPersonagens = $("#my-pers");
    	console.log("entrou");
    	meusPersonagens.innerHTML +=
    	 "<table>" +
			"<tr>";
		var box="";	
		for(var i in personagens){
			var personagem = personagens[i];
			numPersonagens++;
			console.log(numPersonagens);
			var meuId="img"+numPersonagens;
			box+="<td>"+
					"<center>"+
					"<image id="+meuId+"/>"+
					"<span>"+personagem.nome+"</span>"+
					"<span>"+personagem.descricao+"</span>"+
				 	"</center>"+
				 "</td>"+
				 "</tr>";
		}
		meusPersonagens+=box;
		console.log(box);
    }
});


function Personagem(imagem,nome,descricao){
	this.imagem=imagem;
	this.nome=nome;
	this.descricao=descricao;
}

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

	var nome = $("#myPerson").val();
	var descricao = $("#persDescription").val();
	var imagem = document.getElementById("img-upload");
	if(imagem.src==""){
		alert("Erro, foto não selecionada!");
	}else if(descricao==""||nome==""){
		alert("Preencha todos os campos!");
	}else{
		var imgCanvas = document.createElement("canvas");
    	var imageContext = imgCanvas.getContext("2d");
   		imgCanvas.width = imagem.width;
	    imgCanvas.height = imagem.height;
	    imageContext.drawImage(imagem, 0, 0, imagem.width, imagem.height);
	    imagem = imgCanvas.toDataURL("image/png");

	    var personagem = new Personagem(imagem,nome,descricao);
	    personagens.push(personagem);
	    localStorage.setItem("personagens",JSON.stringify(personagens));
	    alert("Salvo com sucesso!");
	}
    
    // imgSrc = JSON.parse(localStorage.getItem("imagem"));

    // var personagens = document.getElementById("aqui");
    // console.log(personagens);
    // personagens.innerHTML= "<image id='minhaImagem'/>";
    // minhaImagem.setAttribute('src',imgSrc);
}
