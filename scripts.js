document.getElementById('os-form').addEventListener('submit', function(e) {
    e.preventDefault();
    criarOrdemDeServico();
});

function adicionarItem() {
    const itensContainer = document.getElementById('itens-container');
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('form-group', 'item');

    itemDiv.innerHTML = `
        <div class="item-inputs">
            <label for="codigo">Código da Peça ou Serviço:</label>
            <input type="text" class="codigo" name="codigo">
        </div>
        <div class="item-inputs">
            <label for="quantidade">Quantidade:</label>
            <input type="number" class="quantidade" name="quantidade">
        </div>
    `;
    
    itensContainer.appendChild(itemDiv);
}

function criarOrdemDeServico() {
    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    const descricao = document.getElementById('descricao').value;

    const itensContainer = document.getElementById('itens-container');
    const items = itensContainer.getElementsByClassName('item');
    
    let itemsHTML = '';
    const itemsArray = [];
    for (let item of items) {
        const codigo = item.querySelector('.codigo').value;
        const quantidade = item.querySelector('.quantidade').value;
        if (codigo && quantidade) {
            itemsHTML += `
                <p><strong>Código:</strong> ${codigo}</p>
                <p><strong>Quantidade:</strong> ${quantidade}</p>
            `;
            itemsArray.push({codigo, quantidade});
        }
    }

    const osId = gerarIdUnico();
    const dataOs = new Date().toLocaleDateString('pt-BR');

    const ordemServico = {
        id: osId,
        data: dataOs,
        nome,
        telefone,
        descricao,
        itens: itemsArray
    };

    salvarOrdemDeServico(ordemServico);

    const ordemServicoDiv = document.createElement('div');
    ordemServicoDiv.innerHTML = `
        <h2>Ordem de Serviço</h2>
        <p><strong>ID da OS:</strong> ${ordemServico.id}</p>
        <p><strong>Data:</strong> ${ordemServico.data}</p>
        <p><strong>Nome do Cliente:</strong> ${ordemServico.nome}</p>
        <p><strong>Telefone:</strong> ${ordemServico.telefone}</p>
        <p><strong>Descrição:</strong> ${ordemServico.descricao}</p>
        <h3>Peças e Serviços</h3>
        <div id="items">
            ${itemsHTML}
        </div>
    `;

    const ordemDiv = document.getElementById('ordem-servico');
    ordemDiv.innerHTML = '';
    ordemDiv.appendChild(ordemServicoDiv);
}

function gerarIdUnico() {
    return 'OS-' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

function salvarOrdemDeServico(ordemServico) {
    const ordensDeServico = JSON.parse(localStorage.getItem('ordensDeServico')) || [];
    ordensDeServico.push(ordemServico);
    localStorage.setItem('ordensDeServico', JSON.stringify(ordensDeServico));
}
