var personagens;
var numPersonagens=0;

$(function(){
    personagens = localStorage.getItem("personagens");// Recupera os dados armazenados
    personagens = JSON.parse(personagens); // Converte string para objeto
    if(personagens == null) // Caso não haja conteúdo, iniciamos um vetor vazio
    	personagens = [];
    else{
    	var meusPersonagens = document.getElementById("my-pers");
    	console.log("entrou");
    	meusPersonagens.innerHTML = "<table id='caractersTable'></table>";
    	var table = document.getElementById("caractersTable");

		// var box="";	
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
    		// tr.appendChild(td2);
    		tr.appendChild(td2);
    		table.appendChild(tr);
    	}	
		// 	numPersonagens++;
		// 	console.log(numPersonagens);
		// 	var meuId="img"+numPersonagens;
		// 	box+="<td>"+
		// 			"<center>"+
		// 			"<image src="+personagem.imagem+"/>"+
		// 			"<span>"+personagem.nome+" "+"</span>"+
		// 			"<span>"+personagem.descricao+"</span>"+
		// 		 	"</center>"+
		// 		 "</td>"+
		// 		 "</tr>"+
		// 		"</table>";
		// }
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
   		imgCanvas.width = 200;
	    imgCanvas.height = 200;
	    imageContext.drawImage(imagem, 0, 0, 200, 200);
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
