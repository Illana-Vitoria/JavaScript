const API_KEY = '50f92e7e120422042e513fc57ccecd32';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';  // imagem dos posters dos filmes

// Função principal que inicializa a aplicação
async function inicializar() {
    try {
        console.log("1. Lhama acordando...");
        const generosMapeados = await buscarGeneros();

        console.log("2. Buscando filmes populares...");

        // URL para buscar filmes populares
        const urlPopular = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR&page=1`;
        const response = await fetch(urlPopular);
        const data = await response.json();

        if (data.results) {
            console.log("3. Filmes encontrados! Renderizando...");
            exibirFilmes(data.results.slice(0, 10), generosMapeados);
        }
    } catch (error) {
        // trata erros de requisição ou execução
        console.error("A Lhama tropeçou:", error);
        document.getElementById('lista-filmes').innerHTML = `<p class='text-danger'>Erro ao carregar os dados.</p>`;
    }
}

// Função que busca a lista de gêneros de filmes
async function buscarGeneros() {
    // requisição para obter os gêneros
    const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=pt-BR`);
    const data = await response.json();
    const mapa = {};
    data.genres.forEach(g => mapa[g.id] = g.name);

    return mapa;
}

// Função responsável por renderizar os filmes na tela
function exibirFilmes(filmes, mapaGeneros) {
    // seleciona o container onde os filmes serão exibidos
    const container = document.getElementById('lista-filmes');
    container.innerHTML = "";

    filmes.forEach(filme => {
        // converte os IDs de gênero em nomes
        const nomesGeneros = filme.genre_ids.map(id => mapaGeneros[id] || "Outros").join(', ');

        // converte a nota (0–10) para escala de 0–5
        const notaNum = Math.round(filme.vote_average / 2);

        // define a imagem da nota (mínimo 1)
        const imgNota = `nota${notaNum || 1}.png`;

        // cria o HTML do card do filme
        const card = `
            <div class="col">
                <div class="card h-100 shadow border-0">
                    <!-- Imagem do poster do filme -->
                    <img src="${IMG_URL + filme.poster_path}" class="card-img-top" alt="${filme.title}">
                    
                    <div class="card-body d-flex flex-column">
                        <!-- Título clicável que abre o modal -->
                        <h5 class="card-title text-warning mb-1" style="cursor:pointer" 
                            onclick="abrirModal('${encodeURIComponent(JSON.stringify({ ...filme, nomesGeneros }))}')">
                            ${filme.title}
                        </h5>
                        
                        <!-- Lista de gêneros -->
                        <p class="text-muted small mb-2">${nomesGeneros}</p>
                        
                        <!-- Sinopse resumida -->
                        <p class="card-text small flex-grow-1">
                            ${filme.overview ? filme.overview.substring(0, 80) + '...' : 'Sem sinopse.'}
                        </p>
                        
                        <!-- Rodapé do card -->
                        <div class="mt-auto border-top pt-2 d-flex justify-content-between align-items-center">
                            <!-- Ano de lançamento -->
                            <small class="text-secondary">${filme.release_date.split('-')[0]}</small>
                            
                            <!-- Nota representada por imagem -->
                            <div class="nota-lhama-container">
                                <img src="imgs/${imgNota}" class="mini-lhama" alt="nota">
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;

        container.innerHTML += card;
    });
}

// Função que abre o modal com os detalhes do filme
function abrirModal(dadosCodificados) {
    // decodifica os dados recebidos e converte para objeto
    const filme = JSON.parse(decodeURIComponent(dadosCodificados));
    const modalCorpo = document.getElementById('modal-conteudo');

    const notaNum = Math.round(filme.vote_average / 2);

    // preenche o conteúdo do modal
    modalCorpo.innerHTML = `
        <div class="row g-4">
            <div class="col-md-5">
                <!-- Poster do filme -->
                <img src="${IMG_URL + filme.poster_path}" class="img-fluid rounded-4" alt="${filme.title}">
            </div>
            
            <div class="col-md-7">
                <!-- Título -->
                <h2 class="text-warning">${filme.title}</h2>
                
                <!-- Gêneros -->
                <p class="text-muted"><strong>Gêneros:</strong> ${filme.nomesGeneros}</p>
                
                <!-- Sinopse -->
                <h6>Sinopse:</h6>
                <p>${filme.overview || 'Sem descrição.'}</p>
                
                <!-- Nota destacada -->
                <div class="p-3 rounded-4" style="background: #fff9e6; border: 2px solid #f3ce13;">
                    <span class="fw-bold">Nota da Lhama: ${notaNum}/5</span>
                    <img src="imgs/nota${notaNum}.png" style="width: 30px; margin-left: 10px;">
                </div>
            </div>
        </div>`;

    // cria a instância do modal do Bootstrap
    const meuModal = new bootstrap.Modal(document.getElementById('movieModal'));

    meuModal.show();
}

inicializar();