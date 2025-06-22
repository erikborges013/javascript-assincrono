const uploadBtn = document.getElementById("upload-btn");
const inputUpload = document.getElementById("image-upload")

uploadBtn.addEventListener("click", () => {
    inputUpload.click();
})

function lerConteudoDoArquivo(arquivo) {
    return new Promise((resolve, reject) => {
        const leitor = new FileReader();
        leitor.onload = () => {
            resolve({url: leitor.result, nome: arquivo.name});
        };
        leitor.onerror = () => {
            reject(`Erro ao tentar ler o arquivo ${arquivo.name}`);
        } ;
        leitor.readAsDataURL(arquivo);
    });
}

const imagemPrincipal = document.querySelector(".main-imagem");
const nomeDaImagem = document.querySelector(".container-imagem-nome p")

inputUpload.addEventListener("change", async(evento) => {
    const arquivo = evento.target.files[0];
    if (arquivo) {
        try{
        const conteudoDoArquivo = await lerConteudoDoArquivo(arquivo);
        imagemPrincipal.src = conteudoDoArquivo.url;
        nomeDaImagem.textContent = conteudoDoArquivo.nome;
        } catch (error) {
            console.error("Erro ao tentar exibir imagem");
        }
        
    }
});

//Adicione a funcionalidade de inserir tags no seu projeto.

const inputEntrada = document.getElementById("categoria");
const listaDeTags = document.querySelector(".lista-tags");



//Implemente a funcionalidade de remover tags.



listaDeTags.addEventListener("click", (evento) => {
    if (evento.target.classList.contains("remove-tag")) {
        const tagQueQueremosRemover = evento.target.parentElement;
        listaDeTags.removeChild(tagQueQueremosRemover);
    }
})

const listaDeTagsDisponiveis = ["Front-end", "Programação", "Data Science", "Full-stack", "HTML", "CSS", "JavaScript"];

async function verificarTagsDisponiveis(textoTag) {
    return new Promise((resolve) => {
        setTimeout(()=> {
            resolve(listaDeTagsDisponiveis.includes(textoTag))
        }, 1000)
    })
}

inputEntrada.addEventListener("keypress", async(evento) => {
    if (evento.key === "Enter") {
        evento.preventDefault();
        const textoTag = inputEntrada.value.trim();
        if (textoTag !== "") {
            try {
                const tagExiste = await verificarTagsDisponiveis(textoTag);
                if (tagExiste) {
                const novaTag = document.createElement("li");
                novaTag.innerHTML = `<p>${textoTag}</p><img src="./img/close-black.svg" class="remove-tag">`;
                listaDeTags.appendChild(novaTag);
                inputEntrada.value = "";
                } else {
                alert("Essa tag não é permitida.");
            }
            
        } catch (error) {
            console.error("Erro ao verificar a existência da tag.")
            alert("Erro ao inserir tag");
            }
        }
        
    }
})