/* Elma Big Festas — todo o conteúdo editável do site fica aqui. */
(function () {
  const fone = "5581993393896";
  const endereco = "Avenida Almirante Paulo Moreira, 554, Garapu, Cabo de Santo Agostinho - PE";
  const wa = (msg) => `https://wa.me/${fone}?text=${encodeURIComponent(msg)}`;

  window.EF = {
    wa,
    links: {
      whatsapp: `https://wa.me/${fone}`,
      whatsappTexto: "(81) 99339-3896",
      conversa: wa("Olá, Elma Festas! Vim pelo site e queria uma informação."),
      helio: wa("Olá, Elma Festas! Queria saber sobre balões com gás hélio."),
      instagram: "https://www.instagram.com/elmabigfestas/",
      instagramUser: "@elmabigfestas",
      mapa: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(endereco),
      waze: "https://waze.com/ul?q=" + encodeURIComponent("Avenida Almirante Paulo Moreira, 554, Cabo de Santo Agostinho") + "&navigate=yes",
      mapaEmbed: "https://www.google.com/maps?q=" + encodeURIComponent(endereco) + "&output=embed"
    },
    endereco: {
      linha1: "Av. Almirante Paulo Moreira, 554",
      linha2: "Garapu · Cabo de Santo Agostinho – PE"
    },
    slogan: "Com você em todos os momentos",

    dias: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
    // [dia 0 = domingo]: lista de intervalos [abre, fecha] em horas decimais (13.67 = 13h40). [] = fechado.
    // Loja: bio do Instagram (Seg. a Sáb. 08h às 18h | Dom. 08h às 12h)
    loja: [[[8, 12]], [[8, 18]], [[8, 18]], [[8, 18]], [[8, 18]], [[8, 18]], [[8, 18]]],
    // Atendimento online no WhatsApp: arte "Horários de atendimento online"
    online: [[], [[9, 12], [13.67, 16.5]], [[9, 12], [13.67, 16.5]], [[9, 12], [13.67, 16.5]], [[9, 12], [13.67, 16.5]], [[9, 12], [13.67, 16.5]], [[9, 12], [13.67, 16.5]]],

    /* Departamentos. "itens" são exemplos do que aparece no Instagram/destaques; o mix completo deve ser confirmado com a loja. */
    departamentos: [
      {
        id: "festa", nome: "Artigos de festa", cor: "azul", icone: "festa",
        sub: "Decoração, temas, velas e lembrancinhas para todo tipo de comemoração.",
        itens: ["Kit decoração por tema", "Painel e toalha de mesa", "Velas de aniversário", "Lembrancinhas", "Suportes para bolo e doces", "Chapéus, línguas de sogra e apitos"]
      },
      {
        id: "baloes", nome: "Balões & gás hélio", cor: "aqua", icone: "balao",
        sub: "Látex, metalizados, números, letras e balões personalizados com nome.",
        itens: ["Balões de látex", "Balões metalizados (estrela, coração)", "Balões de número", "Balão ABC / formatura", "Balão bubble personalizado", "Enchimento com gás hélio"]
      },
      {
        id: "confeitaria", nome: "Confeitaria", cor: "rosa", icone: "bolo",
        sub: "Tudo para bolos e doces em um só lugar: chocolates, coberturas e bicos.",
        itens: ["Gotas de chocolate", "Chocolate em pó e cacau", "Açúcar de confeiteiro", "Pasta americana", "Corantes", "Bicos de confeitar"]
      },
      {
        id: "embalagens", nome: "Embalagens", cor: "amarelo", icone: "caixa",
        sub: "Para quem vende doces: potes, caixas, forminhas e sacos.",
        itens: ["Potes para bolo no pote", "Caixas para doces e bolos", "Forminhas para brigadeiro", "Sacos e saquinhos", "Fitas e laços", "Etiquetas e tags"]
      },
      {
        id: "bomboniere", nome: "Bomboniere", cor: "verde", icone: "doce",
        sub: "Balas, chocolates, pirulitos e pipocas para a mesa e as sacolinhas.",
        itens: ["Chocolates em pacote", "Balas e chicletes", "Pirulitos", "Pipocas doces", "Paçoca e amendoim", "Doces para sacolinha surpresa"]
      },
      {
        id: "descartaveis", nome: "Descartáveis", cor: "azul", icone: "copo",
        sub: "Pratos, copos, talheres e guardanapos para festa e para o seu negócio.",
        itens: ["Pratos e copos", "Talheres descartáveis", "Guardanapos", "Toalhas plásticas", "Marmitas e embalagens", "Papel-alumínio e filme"]
      },
      {
        id: "naturais", nome: "Produtos naturais", cor: "verde", icone: "folha",
        sub: "Grãos, castanhas, mel e itens a granel para o dia a dia.",
        itens: ["Amendoim cru em grãos", "Castanhas e mix", "Mel", "Granola", "Farinhas e grãos", "Temperos"]
      },
      {
        id: "datas", nome: "Datas comemorativas", cor: "rosa", icone: "estrela",
        sub: "Natal, Dia das Crianças, Dia dos Pais, formaturas e Outubro Rosa.",
        itens: ["Enfeites de Natal", "Árvore e acessórios", "Lembrancinhas de formatura", "Dia das Crianças", "Kits de presente", "Decoração temática"]
      }
    ],

    /* Novidades: posts recentes do Instagram. Sem preço (não publicado). */
    novidades: [
      { foto: "gotas", titulo: "Gotas Premium Ki-Kakau", sub: "Ao leite e meio amargo, 1,010 kg. Não precisam de choque térmico.", dep: "confeitaria" },
      { foto: "amendoim", titulo: "Amendoim cru em grãos", sub: "Fonte de proteína vegetal, fibras e gorduras boas.", dep: "naturais" },
      { foto: "mel", titulo: "Mel Zumbi dos Palmares", sub: "700 g, prontinho na garrafa.", dep: "naturais" },
      { foto: "bomboniere", titulo: "Reposição de bomboniere", sub: "Bolibol, Chup Rossetto, Ovisco, Ovinhos de Ouro e moedas de chocolate.", dep: "bomboniere" }
    ],

    feed: ["loja", "helio", "mesa", "gotas", "natal", "bomboniere", "amendoim", "mel"],

    /* Personalizador de balão */
    balao: {
      formatos: [
        { id: "estrela", nome: "Estrela metalizada" },
        { id: "bubble", nome: "Bubble transparente" },
        { id: "redondo", nome: "Redondo metalizado" },
        { id: "numero", nome: "Número" },
        { id: "coracao", nome: "Coração" }
      ],
      cores: [
        { id: "azul", nome: "Azul", hex: "#1F6FE5" },
        { id: "azul-bebe", nome: "Azul bebê", hex: "#8FD3FF" },
        { id: "rosa", nome: "Rosa", hex: "#FF6FAE" },
        { id: "lilas", nome: "Lilás", hex: "#A98BF0" },
        { id: "dourado", nome: "Dourado", hex: "#E3B341" },
        { id: "prata", nome: "Prata", hex: "#B9C3D1" },
        { id: "verde", nome: "Verde", hex: "#3FC48A" },
        { id: "vermelho", nome: "Vermelho", hex: "#E5484D" }
      ]
    }
  };
})();
