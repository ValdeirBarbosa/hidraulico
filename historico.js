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
                <tr>
                <td> ${item.codigo}</td>
                <td>${item.quantidade}</td>
                </tr>
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
                <div class="list-group list-group-flush">
                    <div class="list-group-item">
                        <div><strong>ID da OS:</strong> ${ordem.id}</div>
                        <div><strong>Data:</strong> ${ordem.data}</div>
                    </div>
                    <div class="list-group-item">
                        <div><strong>Nome do Cliente:</strong> ${ordem.nome}</div>
                        <div><strong>Telefone:</strong> ${ordem.telefone}</div>
                    </div>
                    <div class="list-group-item">
                        <div><strong>Descrição:</strong> ${ordem.descricao}</div>
                    </div>
                </div>
            </div>
            <div class="card-footer">
                <h5 class="card-title">Peças e Serviços</h5>
                <div id="items" class="card-text">
                <table>
                <tr><th>Código</th><th>Qtd.</th></tr>
                    ${itemsHTML}
                </table>
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

  const ordem = ordensDeServico.find((os) => os.nome === pesquisaId);
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
