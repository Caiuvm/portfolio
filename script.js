// Dados dos projetos (para simular um backend)
const projetosData = [
    {
        id: 1,
        nome: "GynLog",
        descricao: "Sistema de Gerenciamento de Frota",
        descricaoCompleta: "O GynLog é um sistema desktop desenvolvido com o objetivo de realizar o controle e gerenciamento de frotas de veículos, permitindo o acompanhamento detalhado de veículos, despesas e movimentações. O sistema foi desenvolvido utilizando a linguagem Java, com interface gráfica construída através do Java Swing na IDE Apache NetBeans, proporcionando uma experiência visual simples, funcional e intuitiva.",
        problema: "O sistema GynLog foi desenvolvido para resolver a dificuldade no controle manual e desorganizado de frotas de veículos, muito comum em pequenas empresas ou operações logísticas.",
        tecnologias: ["Java", "Java Swing", "Manipulação de Arquivos"],
        imagem: "assets/projetos/GynLogHome.png",
        imagensDetalhe: [
            "assets/projetos/GynLogHome.png",
            "assets/projetos/GynLogCadastro.png",
            "assets/projetos/GynLogDespesa.png",
            "assets/projetos/GynLogMovimentacao.png"
        ],
        linkProjeto: "#",
        linkCodigo: "https://github.com/Caiuvm/Projeto-Integrador-GynLog"
    },
    
];

// Função para renderizar os cards de projeto
function renderizarProjetos() {
    const grid = document.getElementById('projetosGrid');
    if (!grid) return;

    grid.innerHTML = '';
    projetosData.forEach(projeto => {
        const card = document.createElement('div');
        card.className = 'card-projeto';

        card.innerHTML = `
            <img src="${projeto.imagem}" alt="${projeto.nome}" class="card-imagem">
            <div class="card-conteudo">
                <h3 class="card-titulo">${projeto.nome}</h3>
                <p class="card-descricao">${projeto.descricao}</p>
                <div class="card-tecnologias">
                    ${projeto.tecnologias.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
                </div>
                <div class="card-botoes">
                    <button class="btn-projeto" data-id="${projeto.id}" data-acao="ver">Ver projeto</button>
                    <a href="${projeto.linkCodigo}" target="_blank" class="btn-projeto">Ver código</a>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });

    // Adicionar eventos aos botões "Ver projeto"
    document.querySelectorAll('.btn-projeto[data-acao="ver"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(btn.getAttribute('data-id'));
            const projeto = projetosData.find(p => p.id === id);
            if (projeto) abrirModal(projeto);
        });
    });
}

// Abrir modal com detalhes do projeto
function abrirModal(projeto) {
    const modal = document.getElementById('modalProjeto');
    const modalBody = document.getElementById('modalBody');

    modalBody.innerHTML = `
        <h3>${projeto.nome}</h3>
        <p><strong>Descrição completa:</strong> ${projeto.descricaoCompleta}</p>
        <p><strong>Problema que resolve:</strong> ${projeto.problema}</p>
        <div><strong>Tecnologias usadas:</strong></div>
        <div class="modal-tecnologias">
            ${projeto.tecnologias.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
        </div>
        <div><strong>Imagens do sistema:</strong></div>
        <div class="modal-imagens">
            ${projeto.imagensDetalhe.map(img => `<img src="${img}" alt="Print do projeto">`).join('')}
        </div>
        <div class="modal-botoes">
            ${projeto.linkProjeto && projeto.linkProjeto !== "#" 
                ? `<a href="${projeto.linkProjeto}" target="_blank" class="btn btn-primary">Acessar projeto</a>` 
                : ""}
            <a href="${projeto.linkCodigo}" target="_blank" class="btn btn-secondary">Ver código</a>
        </div>
    `;

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Fechar modal
function fecharModal() {
    const modal = document.getElementById('modalProjeto');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Menu hambúrguer
function initMenuHamburger() {
    const hamburger = document.getElementById('menuHamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Fechar menu ao clicar em um link
        document.querySelectorAll('.nav-list a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }
}

// Scroll suave para links internos
function initScrollSuave() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Download do currículo
function initCurriculo() {
    const btnCurriculo = document.getElementById('btnCurriculo');
    if (btnCurriculo) {
        btnCurriculo.addEventListener('click', (e) => {
            e.preventDefault();
            const link = document.createElement('a');
                link.href = 'assets/curriculo.pdf';
                link.download = 'Curriculo-Caio-Vinicius-Souza-Martins.pdf';
                link.click();
        });
    }
}

// Inicializar tudo quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    renderizarProjetos();
    initMenuHamburger();
    initScrollSuave();
    initCurriculo();

    // Evento de fechar modal
    const modal = document.getElementById('modalProjeto');
    const fecharBtn = document.querySelector('.modal-fechar');
    if (fecharBtn) {
        fecharBtn.addEventListener('click', fecharModal);
    }
    window.addEventListener('click', (e) => {
        if (e.target === modal) fecharModal();
    });
});