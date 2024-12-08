window.onload = () => {
    // Carregar o estado das cartas salvas no localStorage
    const savedCards = JSON.parse(localStorage.getItem('cards')) || [];

    // Adicionar a classe 'clicked' para as cartas que estavam marcadas anteriormente
    document.querySelectorAll('.image-item').forEach(item => {
        const cardId = item.getAttribute('data-id');
        if (savedCards.includes(cardId)) {
            item.classList.add('clicked');
        }
    });

    // Adicionar o evento de clique nas imagens
    document.querySelectorAll('.image-item').forEach(item => {
        item.addEventListener('click', () => {
            // Alterna a classe 'clicked' quando a carta é clicada
            item.classList.toggle('clicked');

            // Obter o ID da carta
            const cardId = item.getAttribute('data-id');

            // Carregar as cartas salvas do localStorage
            let savedCards = JSON.parse(localStorage.getItem('cards')) || [];

            if (item.classList.contains('clicked')) {
                // Se a carta for marcada, adiciona o ID à lista
                if (!savedCards.includes(cardId)) {
                    savedCards.push(cardId);
                }
            } else {
                // Se a carta for desmarcada, remove o ID da lista
                savedCards = savedCards.filter(id => id !== cardId);
            }

            // Salvar a lista atualizada no localStorage
            localStorage.setItem('cards', JSON.stringify(savedCards));
        });
    });
};

// Função de easing - easeOutQuad
const easeOutQuad = (t) => {
    return t * (2 - t); // Função de easing (desaceleração)
};

// Função para rolagem suave personalizada
const smoothScrollTo = (targetY, duration) => {
    const startY = window.scrollY;
    const distance = targetY - startY;
    const startTime = performance.now();

    const scrollStep = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1); // Progresso da rolagem (de 0 a 1)
        const easedProgress = easeOutQuad(progress); // Aplica o easing para suavizar a rolagem

        window.scrollTo(0, startY + distance * easedProgress); // Aplica a rolagem com easing

        if (progress < 1) {
            requestAnimationFrame(scrollStep); // Continua rolando até chegar no final
        }
    };

    requestAnimationFrame(scrollStep); // Inicia a animação de rolagem
};

// Adiciona rolagem suave a todos os links de ancoragem
const links = document.querySelectorAll('a[href^="#"]');  // Todos os links com href que começam com #

links.forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();  // Impede o comportamento padrão de rolagem

        const targetId = this.getAttribute('href').substring(1);  // Obtém o ID de destino
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            const targetY = targetElement.offsetTop; // Obtém a posição vertical do destino
            smoothScrollTo(targetY, 1000); // Chama a função de rolagem suave (duração de 1000ms)
        } else {
            console.log(`Elemento com ID "${targetId}" não encontrado.`);
        }
    });
});
