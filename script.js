function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({
    behavior: "smooth"
  });
}

// estado da conversa
let etapa = "inicio"

function responder(msg){
  msg = msg.toLowerCase()

  // COMANDO SAIR (reset)
  if(msg.includes("sair")){
    etapa = "inicio"
    return "Atendimento encerrado 👋 Se precisar novamente, digite 'oi'."
  }

  // INÍCIO
  if(etapa === "inicio"){
    if(msg.includes("oi") || msg.includes("olá")){
      etapa = "menu"
      return "Olá! 🏗️ Bem-vindo à loja de materiais de construção.\n\nComo posso ajudar?\n\n1️⃣ Orçamento de materiais\n2️⃣ Catálogo de produtos\n3️⃣ Ferramentas\n4️⃣ Entrega\n5️⃣ Falar com atendente"
    }
    return "Digite 'oi' para iniciar o atendimento 🙂"
  }

  // MENU
  if(etapa === "menu"){
    if(msg.includes("1") || msg.includes("orçamento")){
      etapa = "orcamento_tipo"
      return "Qual tipo de material você precisa?\n- Básico (cimento, areia, tijolo)\n- Estrutural (ferro, concreto)\n- Acabamento (piso, tinta)"
    }
    if(msg.includes("2") || msg.includes("catálogo")){
      etapa = "catalogo"
      return "📦 Catálogo de produtos:\n1️⃣ Materiais básicos\n2️⃣ Elétrica\n3️⃣ Hidráulica\n4️⃣ Acabamento\nDigite o número ou nome da categoria."
    }
    if(msg.includes("3") || msg.includes("ferramentas")){
      etapa = "ferramentas"
      return "🛠️ Ferramentas disponíveis:\n- Furadeira\n- Serra\n- Parafusadeira\n- Kit completo\nDigite o nome da ferramenta."
    }
    if(msg.includes("4") || msg.includes("entrega")){
      etapa = "entrega"
      return "🚚 Informe seu CEP para calcular prazo e valor da entrega."
    }
    if(msg.includes("5") || msg.includes("atendente")){
      etapa = "atendente"
      return "Encaminhando para um atendente 👨‍💼"
    }
    return "Escolha uma opção válida: 1, 2, 3, 4 ou 5."
  }

  // ORÇAMENTO
  if(etapa === "orcamento_tipo"){
    etapa = "orcamento_quantidade"
    return "Qual a quantidade aproximada que você precisa? (ex: 50 sacos, 100 tijolos)"
  }

  if(etapa === "orcamento_quantidade"){
    etapa = "orcamento_resultado"
    return "Qual o nível de qualidade?\n- Econômico\n- Intermediário\n- Premium"
  }

  if(etapa === "orcamento_resultado"){
    let preco = ""
    if(msg.includes("econ")) preco = "💰 Estimativa: R$ 1.000 a R$ 3.000"
    else if(msg.includes("inter")) preco = "💰 Estimativa: R$ 3.000 a R$ 7.000"
    else if(msg.includes("prem")) preco = "💰 Estimativa: R$ 7.000+"
    else return "Escolha: econômico, intermediário ou premium."

    etapa = "final"
    return `${preco}\nDeseja ver produtos ou falar com um atendente?`
  }

  // CATÁLOGO
  if(etapa === "catalogo"){
    if(msg.includes("1") || msg.includes("básico")){
      return "🧱 Materiais básicos:\n- Cimento\n- Areia\n- Brita\n- Tijolo\n- Argamassa"
    }
    if(msg.includes("2") || msg.includes("elétrica")){
      return "💡 Elétrica:\n- Fios\n- Cabos\n- Disjuntores\n- Tomadas\n- Interruptores"
    }
    if(msg.includes("3") || msg.includes("hidráulica")){
      return "🚿 Hidráulica:\n- Tubos PVC\n- Conexões\n- Caixas d'água\n- Registros"
    }
    if(msg.includes("4") || msg.includes("acabamento")){
      return "🎨 Acabamento:\n- Pisos\n- Revestimentos\n- Tintas\n- Vernizes\n- Massa corrida"
    }
    return "Escolha uma categoria válida."
  }

  // FERRAMENTAS
  if(etapa === "ferramentas"){
    if(msg.includes("furadeira")){
      return "🔧 Furadeira disponível a partir de R$ 150."
    }
    if(msg.includes("serra")){
      return "🪚 Serra elétrica a partir de R$ 250."
    }
    if(msg.includes("parafusadeira")){
      return "🔩 Parafusadeira a partir de R$ 180."
    }
    if(msg.includes("kit")){
      return "🧰 Kit completo com desconto especial!"
    }
    return "Digite: furadeira, serra, parafusadeira ou kit."
  }

  // ENTREGA
  if(etapa === "entrega"){
    etapa = "final"
    return "🚚 Entrega calculada!\nPrazo médio: 2 a 5 dias úteis.\nDeseja continuar comprando?"
  }

  // ATENDENTE
  if(etapa === "atendente"){
    return "Um atendente entrará em contato em breve 📞\nDigite 'sair' para encerrar."
  }

  // FINAL
  if(etapa === "final"){
    if(msg.includes("sim") || msg.includes("continuar")){
      etapa = "menu"
      return "Voltando ao menu:\n1️⃣ Orçamento\n2️⃣ Catálogo\n3️⃣ Ferramentas\n4️⃣ Entrega\n5️⃣ Atendente"
    }
    if(msg.includes("atendente")){
      etapa = "atendente"
      return "Encaminhando para um atendente 👨‍💼"
    }
    return "Digite 'menu' para voltar ou 'sair' para encerrar."
  }

  return "Não entendi 🤔 Pode reformular?"
}

function adicionarMensagem(texto, classe) {

  let div = document.createElement("div");
  div.className = classe;

  const agora = new Date();
  const hora =
    agora.getHours().toString().padStart(2, "0")
    + ":" +
    agora.getMinutes().toString().padStart(2, "0");

  if (classe === "bot") {
  div.innerHTML = `
    <img class="avatar-bot" src="./Construd4.jpeg" alt="Bot">
    <div class="conteudo-msg">
      <div class="texto-msg">${texto.replace(/\n/g, "<br>")}</div>
      <span class="hora-msg">${hora}</span>
    </div>
  `;
} else {
  div.innerHTML = `
    <div class="texto-msg">${texto.replace(/\n/g, "<br>")}</div>
    <span class="hora-msg">${hora}</span>
  `;
}


  document.getElementById("messages")
    .appendChild(div);

  document.getElementById("messages")
    .scrollTop =
    document.getElementById("messages")
    .scrollHeight;
}

function mostrarDigitando() {
  let div = document.createElement("div");
  div.className = "bot digitando";
  div.id = "digitando";
  div.innerHTML = "Constru'D está digitando<span>.</span><span>.</span><span>.</span>";

  document.getElementById("messages").appendChild(div);
  document.getElementById("messages").scrollTop = document.getElementById("messages").scrollHeight;
}

function removerDigitando() {
  let digitando = document.getElementById("digitando");
  if (digitando) {
    digitando.remove();
  }
}

// ENVIAR
function enviar() {
  let input = document.getElementById("input");
  let msg = input.value.trim();

  if (msg === "") return;

  adicionarMensagem(msg, "user");

  let resposta = responder(msg);

  mostrarDigitando();

  setTimeout(() => {
    removerDigitando();
    adicionarMensagem(resposta, "bot");
  }, 900);

  input.value = "";
}

// ENTER
document.getElementById("input").addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    enviar();
  }
});

function abrirChatbot() {
  document.getElementById("overlayChat")
    .classList.add("ativo");

  const messages = document.getElementById("messages");

  // evita repetir mensagem toda vez
  if (messages.children.length === 0) {
    setTimeout(() => {
      adicionarMensagem(
        "Olá 👋\nBem-vindo à Loja Constru'D 🏗️\n\nDigite 'oi' para iniciar o atendimento.",
        "bot"
      );
    }, 300);
  }
}

function fecharChatbot() {
  document.getElementById("overlayChat").classList.remove("ativo");
}

document.getElementById("overlayChat").onclick = function(e) {
  if (e.target.id === "overlayChat") {
    fecharChatbot();
  }
};

function abrirCategoria(categoria) {

  const dados = {
    cimento: {
      titulo: "Cimento e Argamassa",
      produtos: ["Cimento", "Argamassa", "Reboco", "Massa Corrida"]
    },

    ferramentas: {
      titulo: "Ferramentas",
      produtos: ["Martelo", "Furadeira", "Parafusadeira", "Serra"]
    },

    tintas: {
  titulo: "Tintas e Vernizes",

  produtos: [
    {
      nome: "Tinta Coral",
      preco: "R$ 189,90",
      imagem: "img/tinta-coral.jpg"
    }
  ]
},

    hidraulica: {
      titulo: "Hidráulica",
      produtos: ["Tubo PVC", "Registro", "Torneira", "Conexão"]
    },

    eletrica: {
      titulo: "Elétrica",
      produtos: ["Tomada", "Disjuntor", "Fio", "Interruptor"]
    },

    madeiras: {
      titulo: "Madeiras",
      produtos: ["Tábua", "Compensado", "Viga", "Madeira Tratada"]
    },

    pisos: {
      titulo: "Pisos e Revestimentos",
      produtos: ["Cerâmica", "Porcelanato", "Revestimento", "Piso Vinílico"]
    },

    ferragens: {
      titulo: "Ferragens",
      produtos: ["Parafuso", "Prego", "Dobradiça", "Fechadura"]
    }
  };

  const pagina = document.getElementById("paginaCategoria");
  const titulo = document.getElementById("tituloPaginaCategoria");
  const produtos = document.getElementById("produtosPagina");

  titulo.innerText = dados[categoria].titulo;

  produtos.innerHTML = "";

  dados[categoria].produtos.forEach(produto => {

  produtos.innerHTML += `
    <div class="produto-card">

      <img src="${produto.imagem}" alt="${produto.nome}">

      <div class="produto-info">

        <h3>${produto.nome}</h3>

        <p>Produto da categoria ${dados[categoria].titulo}</p>

        <span class="preco-produto">
          ${produto.preco}
        </span>

        <button class="btn-produto">
          Consultar
        </button>

      </div>
    </div>
  `;
});

  document.getElementById("sobre").style.display = "none";

  pagina.classList.add("ativo");

  pagina.scrollIntoView({
    behavior: "smooth"
  });
}

function voltarCategorias() {
  document.getElementById("paginaCategoria")
    .classList.remove("ativo");

  document.getElementById("sobre")
    .style.display = "block";

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}