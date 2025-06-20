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

inputEntrada.addEventListener("keypress", (evento) => {
    if (evento.key === "Enter") {
        evento.preventDefault();
        const textoTag = inputEntrada.value.trim();
        if (textoTag !== "") {
            const novaTag = document.createElement("li");
            novaTag.innerHTML = `<p>${textoTag}<p><img src="./img/close-black.svg" class="remove-tag">`;
            listaDeTags.appendChild(novaTag);
            inputEntrada.value = "";
        }
    }
})