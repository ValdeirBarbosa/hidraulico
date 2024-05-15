document.addEventListener("DOMContentLoaded", function () {
  exibirOrdensDeServico();
});

function exibirOrdensDeServico() {
  const ordensDeServico =
    JSON.parse(localStorage.getItem("ordensDeServico")) || [];
  const historicoDiv = document.getElementById("historico-ordens-servico");
  historicoDiv.innerHTML = "";

  ordensDeServico.forEach((ordem) => {
    let itemsHTML = "";
    ordem.itens.forEach((item) => {
      itemsHTML += `
                <p><strong>Código:</strong> ${item.codigo}</p>
                <p><strong>Quantidade:</strong> ${item.quantidade}</p>
            `;
    });

    const ordemDiv = document.createElement("div");
    ordemDiv.classList.add("ordem-servico");
    ordemDiv.innerHTML = `
            <h2>Ordem de Serviço</h2>
            <div class="card">
    <div class="card-header">
        <h5 class="card-title">Detalhes da Ordem de Serviço</h5>
    </div>
    <div class="card-body">
        <ul class="list-group list-group-flush">
            <li class="list-group-item"><strong>ID da OS:</strong> ${ordem.id}</li>
            <li class="list-group-item"><strong>Data:</strong> ${ordem.data}</li>
            <li class="list-group-item"><strong>Nome do Cliente:</strong> ${ordem.nome}</li>
            <li class="list-group-item"><strong>Telefone:</strong> ${ordem.telefone}</li>
            <li class="list-group-item"><strong>Descrição:</strong> ${ordem.descricao}</li>
        </ul>
    </div>
    <div class="card-footer">
        <h5 class="card-title">Peças e Serviços</h5>
        <div id="items" class="card-text">
            ${itemsHTML}
        </div>
    </div>
</div>

        `;
    // ordemDiv.innerHTML = `
    //     <h2>Ordem de Serviço</h2>
    //     <p><strong>ID da OS:</strong> ${ordem.id}</p>
    //     <p><strong>Data:</strong> ${ordem.data}</p>
    //     <p><strong>Nome do Cliente:</strong> ${ordem.nome}</p>
    //     <p><strong>Telefone:</strong> ${ordem.telefone}</p>
    //     <p><strong>Descrição:</strong> ${ordem.descricao}</p>
    //     <h3>Peças e Serviços</h3>
    //     <div id="items">
    //         ${itemsHTML}
    //     </div>
    // `;

    historicoDiv.appendChild(ordemDiv);
  });
}

function pesquisarOrdemDeServico() {
  const pesquisaId = document.getElementById("pesquisa-id").value.trim();
  const ordensDeServico =
    JSON.parse(localStorage.getItem("ordensDeServico")) || [];
  const resultadoDiv = document.getElementById("resultado-pesquisa");
  resultadoDiv.innerHTML = "";

  const ordem = ordensDeServico.find((os) => os.id === pesquisaId);
  if (ordem) {
    let itemsHTML = "";
    ordem.itens.forEach((item) => {
      itemsHTML += `
                <p><strong>Código:</strong> ${item.codigo}</p>
                <p><strong>Quantidade:</strong> ${item.quantidade}</p>
            `;
    });

    const ordemDiv = document.createElement("div");
    ordemDiv.classList.add("ordem-servico");
    ordemDiv.innerHTML = `
            <h2>Ordem de Serviço</h2>
            <p><strong>ID da OS:</strong> ${ordem.id}</p>
            <p><strong>Data:</strong> ${ordem.data}</p>
            <p><strong>Nome do Cliente:</strong> ${ordem.nome}</p>
            <p><strong>Telefone:</strong> ${ordem.telefone}</p>
            <p><strong>Descrição:</strong> ${ordem.descricao}</p>
            <h3>Peças e Serviços</h3>
            <div id="items">
                ${itemsHTML}
            </div>
        `;

    resultadoDiv.appendChild(ordemDiv);
  } else {
    resultadoDiv.innerHTML = "<p>Ordem de Serviço não encontrada.</p>";
  }
}
