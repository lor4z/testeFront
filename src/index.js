document.addEventListener('DOMContentLoaded', function() {
    
    function saveFormData() {
        const formData = {
            razaoSocial: document.getElementById('razaoSocial').value,
            cnpj: document.getElementById('cnpj').value,
            nomeFantasia: document.getElementById('nomeFantasia').value,
            inscricaoEstadual: document.getElementById('inscricaoEstadual').value,
            cep: document.getElementById('cep').value,
            inscricaoMunicipal: document.getElementById('inscricaoMunicipal').value,
            endereco: document.getElementById('endereco').value,
            numero: document.getElementById('numero').value,
            complemento: document.getElementById('complemento').value,
            bairro: document.getElementById('bairro').value,
            municipio: document.getElementById('municipio').value,
            estado: document.getElementById('estado').value,
            contato: document.getElementById('contato').value,
            telefone: document.getElementById('telefone').value,
            email: document.getElementById('email').value,
            produtos: []
        };

        // Seleciona todos os cards de produtos
        document.querySelectorAll('.product-card').forEach(function(card, index) {
            const produtoData = {
                produto: card.querySelector('[id^="produto"]').value,
                undMedida: card.querySelector('[id^="undMedida"]').value,
                qtdEstoque: card.querySelector('[id^="qtdEstoque"]').value,
                valorUnit: card.querySelector('[id^="valorUnit"]').value,
                valorTotal: card.querySelector('[id^="valorTotal"]').value
            };
            formData.produtos.push(produtoData);
        });

        localStorage.setItem('formData', JSON.stringify(formData));
        
        let displayText = `
            - TODOS OS CAMPOS PREENCHIDOS - 
            Razão Social: ${formData.razaoSocial}
            CNPJ: ${formData.cnpj}
            Nome Fantasia: ${formData.nomeFantasia}
            Inscrição Estadual: ${formData.inscricaoEstadual}
            CEP: ${formData.cep}
            Inscrição Municipal: ${formData.inscricaoMunicipal}
            Endereço: ${formData.endereco}
            Número: ${formData.numero}
            Complemento: ${formData.complemento}
            Bairro: ${formData.bairro}
            Município: ${formData.municipio}
            Estado: ${formData.estado}
            Contato: ${formData.contato}
            Telefone: ${formData.telefone}
            E-mail: ${formData.email}
            Produtos:
        `;

        formData.produtos.forEach((produto, index) => {
            displayText += `
                Produto ${index + 1}:
                Produto: ${produto.produto || 'Não informado'}
                UND. Medida: ${produto.undMedida || 'Não informado'}
                QTD. em Estoque: ${produto.qtdEstoque || 'Não informado'}
                Valor Unitário: ${produto.valorUnit || 'Não informado'}
                Valor Total: ${produto.valorTotal || 'Não informado'}
            `;
        });

        alert(displayText);

        console.log('Dados salvos no localStorage:', formData);
    }

    document.querySelector('.btn-green-footer').addEventListener('click', function(event) {
        event.preventDefault(); 
        saveFormData();
    });
});

document.getElementById('addAttachmentBtn').addEventListener('click', function () {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (file) {
        const attachmentList = document.getElementById('attachmentsList');

        const attachmentItem = document.createElement('div');
        attachmentItem.classList.add('attachment-item', 'd-flex', 'justify-content-between', 'align-items-center', 'mb-2');
        
        const attachmentName = document.createElement('span');
        attachmentName.textContent = file.name;
        
        const buttonGroup = document.createElement('div');
        buttonGroup.classList.add('btn-group');

        const viewButton = document.createElement('button');
        viewButton.classList.add('btn', 'btn-primary', 'btn-sm');
        viewButton.innerHTML = '<i class="bi bi-eye"></i> Visualizar';
        viewButton.addEventListener('click', function () {
            const fileURL = URL.createObjectURL(file);
            window.open(fileURL, '_blank');
        });
        
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteButton.innerHTML = '<i class="bi bi-trash-fill"> </i> Excluir';
        deleteButton.addEventListener('click', function () {
            attachmentList.removeChild(attachmentItem);
        });

        buttonGroup.appendChild(viewButton);
        buttonGroup.appendChild(deleteButton);

        attachmentItem.appendChild(attachmentName);
        attachmentItem.appendChild(buttonGroup);

        attachmentList.appendChild(attachmentItem);

        fileInput.value = ''; 
    }
});
document.addEventListener('DOMContentLoaded', function () {
    let productCount = 1;

    function updateTotal(card) {
        const qtyInput = card.querySelector('[id^="qtdEstoque"]');
        const priceInput = card.querySelector('[id^="valorUnit"]');
        const totalInput = card.querySelector('[id^="valorTotal"]');

        const quantity = parseFloat(qtyInput.value) || 0;
        const unitPrice = parseFloat(priceInput.value) || 0;
        const total = quantity * unitPrice;

        totalInput.value = total.toFixed(2); // Mantém 2 casas decimais
    }

    document.querySelectorAll('.calculate').forEach(input => {
        input.addEventListener('input', function() {
            updateTotal(this.closest('.product-card'));
        });
    });

    document.querySelector('.btn-add-product').addEventListener('click', function () {
        productCount++;
        const productTemplate = document.querySelector('.product-card').cloneNode(true);
        productTemplate.querySelector('.product-card-header').textContent = 'Produto - ' + productCount;
        
        // Atualiza os IDs e nomes dos inputs
        productTemplate.querySelectorAll('input, select').forEach((input) => {
            const name = input.name.match(/\D+/)[0]; // Extrai a parte textual do nome
            input.id = name + productCount;
            input.name = name + productCount;
            input.value = ''; // Limpa o valor do campo
        });

        // Adiciona evento de cálculo automático ao novo bloco
        productTemplate.querySelectorAll('.calculate').forEach(input => {
            input.addEventListener('input', function() {
                updateTotal(this.closest('.product-card'));
            });
        });

        // Adiciona evento de remoção ao botão de exclusão
        productTemplate.querySelector('.delete-btn').addEventListener('click', function () {
            productTemplate.remove();
        });

        // Insere o novo produto no contêiner
        document.getElementById('productContainer').insertBefore(productTemplate, document.querySelector('.btn-add-product'));
    });

    // Adiciona evento de remoção ao primeiro botão de exclusão
    document.querySelector('.delete-btn').addEventListener('click', function () {
        if (productCount > 1) {
            this.closest('.product-card').remove();
        }
    });
});
