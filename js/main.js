(function () {
  const EF = window.EF;
  const L = EF.links;
  const page = document.body.dataset.page || "";
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  const sv = (p, extra = "") => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"${extra}>${p}</svg>`;
  const icons = {
    whats: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s.9 2.5 1 2.7c.1.2 1.8 2.8 4.4 3.9 1.6.7 2.3.8 3.1.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z"/></svg>',
    pin: sv('<path d="M12 22s7-6.3 7-12a7 7 0 0 0-14 0c0 5.7 7 12 7 12Z"/><circle cx="12" cy="10" r="2.5"/>'),
    clock: sv('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
    chat: sv('<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z"/><path d="M8.5 12h.01M12 12h.01M15.5 12h.01"/>'),
    insta: sv('<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>'),
    loja: sv('<path d="M4 10v10h16V10"/><path d="M3 10 5 4h14l2 6c0 1.7-1.3 3-3 3s-3-1.3-3-3c0 1.7-1.3 3-3 3s-3-1.3-3-3c0 1.7-1.3 3-3 3s-3-1.3-3-3Z"/><path d="M10 20v-5h4v5"/>'),
    lista: sv('<path d="M9 6h11M9 12h11M9 18h11"/><path d="m3.5 6 1 1 2-2M3.5 12l1 1 2-2M3.5 18l1 1 2-2"/>'),
    menu: sv('<path d="M4 7h16M4 12h16M4 17h16"/>'),
    close: sv('<path d="M6 6l12 12M18 6 6 18"/>'),
    // departamentos
    festa: sv('<path d="m3 21 4.5-12L15 16.5 3 21Z"/><path d="M14 4v1M19 9h1M17.5 5.5l-1 1M12 8.5c1-1 1-2.5 0-3.5M15.5 12c1-1 2.5-1 3.5 0"/>'),
    balao: sv('<path d="M12 15c3.3 0 6-3 6-6.5S15.3 2 12 2 6 4.9 6 8.5 8.7 15 12 15Z"/><path d="m11 15-1 2h4l-1-2M12 17c0 2-2 2.5-2 5"/>'),
    bolo: sv('<path d="M4 21V13a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8"/><path d="M4 16c1.5 1 2.5 1 4 0s2.5-1 4 0 2.5 1 4 0 2.5-1 4 0M3 21h18M12 8V11M12 5.5c-.8-.8-.8-1.7 0-2.5.8.8.8 1.7 0 2.5Z"/>'),
    caixa: sv('<path d="M3 8l9-5 9 5v8l-9 5-9-5V8Z"/><path d="m3 8 9 5 9-5M12 13v8"/>'),
    doce: sv('<circle cx="12" cy="12" r="4.5"/><path d="M8 9.5 3 7l1.5 5L3 17l5-2.5M16 9.5 21 7l-1.5 5 1.5 5-5-2.5"/>'),
    copo: sv('<path d="M6 3h12l-1.5 18h-9L6 3Z"/><path d="M6.6 9h10.8"/>'),
    folha: sv('<path d="M5 19c0-8 5-14 15-15-1 10-7 15-15 15Z"/><path d="M5 19 13 11"/>'),
    estrela: sv('<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z"/>')
  };

  /* ---------- horários (fuso de Recife) ---------- */
  const fmtH = (h) => { const hh = Math.floor(h), mm = Math.round((h - hh) * 60); return mm ? `${hh}h${String(mm).padStart(2, "0")}` : `${hh}h`; };
  const faixa = (iv) => iv.length ? iv.map(([a, b]) => `${fmtH(a)} às ${fmtH(b)}`).join(" · ") : "Fechado";
  function agoraRecife() {
    const parts = new Intl.DateTimeFormat("en-US", { timeZone: "America/Recife", weekday: "short", hour: "numeric", minute: "numeric", hour12: false }).formatToParts(new Date());
    const get = (t) => parts.find((p) => p.type === t).value;
    const dias = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    return { dia: dias[get("weekday")], hora: (+get("hour") % 24) + (+get("minute")) / 60 };
  }
  const agora = agoraRecife();
  function situacao(tabela) {
    const hoje = tabela[agora.dia];
    const atual = hoje.find(([a, b]) => agora.hora >= a && agora.hora < b);
    if (atual) return { aberto: true, txt: `Aberta agora · até ${fmtH(atual[1])}` };
    const maisTarde = hoje.find(([a]) => a > agora.hora);
    if (maisTarde) return { aberto: false, txt: `Fechada agora · abre às ${fmtH(maisTarde[0])}` };
    for (let i = 1; i <= 7; i++) {
      const d = (agora.dia + i) % 7;
      if (tabela[d].length) return { aberto: false, txt: `Fechada agora · abre ${i === 1 ? "amanhã" : EF.dias[d].toLowerCase()} às ${fmtH(tabela[d][0][0])}` };
    }
    return { aberto: false, txt: "Fechada agora" };
  }
  const st = situacao(EF.loja);
  document.querySelectorAll("[data-status]").forEach((el) => { el.textContent = st.txt; el.classList.add("status"); el.classList.toggle("is-open", st.aberto); });
  const stOn = situacao(EF.online);
  document.querySelectorAll("[data-status-online]").forEach((el) => {
    el.textContent = stOn.aberto ? `Atendimento online agora · até ${fmtH(EF.online[agora.dia].find(([a, b]) => agora.hora >= a && agora.hora < b)[1])}` : stOn.txt.replace("Fechada agora", "Atendimento online fora do horário").replace("abre", "volta");
    el.classList.add("status"); el.classList.toggle("is-open", stOn.aberto);
  });
  document.querySelectorAll("[data-hours]").forEach((el) => {
    const tabela = EF[el.dataset.hours];
    el.innerHTML = [1, 2, 3, 4, 5, 6, 0].map((d) => `<tr class="${d === agora.dia ? "is-today" : ""}"><td>${EF.dias[d]}${d === agora.dia ? " (hoje)" : ""}</td><td>${faixa(tabela[d])}</td></tr>`).join("");
  });

  /* ---------- cabeçalho e rodapé ---------- */
  const links = [
    ["index.html", "Início", "inicio"],
    ["departamentos.html", "Departamentos", "departamentos"],
    ["baloes.html", "Balão personalizado", "baloes"],
    ["contato.html", "Visite a loja", "contato"]
  ];
  const brand = `<a class="brand" href="index.html" aria-label="Elma Big Festas, página inicial"><img src="img/logo.png" alt="" width="46" height="46"><span>Elma Big Festas<small>Loja de festas · Cabo</small></span></a>`;

  const header = document.getElementById("header");
  if (header) {
    header.innerHTML = `
    <header class="topbar">
      <div class="container topbar__inner">
        ${brand}
        <nav class="nav" id="nav" aria-label="Principal">
          ${links.map(([href, t, id]) => `<a href="${href}"${id === page ? ' aria-current="page"' : ""}>${t}</a>`).join("")}
        </nav>
        <a class="btn btn--azul btn--sm" href="${L.conversa}" target="_blank" rel="noopener">${icons.whats}Fale com a gente</a>
        <button class="menu-toggle" type="button" aria-controls="nav" aria-expanded="false" aria-label="Abrir menu">${icons.menu}</button>
      </div>
    </header>`;
    const btn = header.querySelector(".menu-toggle");
    const nav = header.querySelector(".nav");
    const toggle = (open) => {
      nav.classList.toggle("is-open", open);
      btn.setAttribute("aria-expanded", open);
      btn.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
      btn.innerHTML = open ? icons.close : icons.menu;
    };
    btn.addEventListener("click", () => toggle(!nav.classList.contains("is-open")));
    nav.addEventListener("click", (e) => { if (e.target.closest("a")) toggle(false); });
  }

  const footer = document.getElementById("footer");
  if (footer) {
    footer.innerHTML = `
    <footer class="footer">
      <div class="container">
        <div class="footer__grid">
          <div>
            ${brand}
            <p class="footer__slogan">${EF.slogan}!</p>
            <p style="font-size:15px">Artigos para festas, confeitaria, produtos naturais e descartáveis no Garapu, Cabo de Santo Agostinho.</p>
          </div>
          <div>
            <h4>Páginas</h4>
            <ul>${links.map(([href, t]) => `<li><a href="${href}">${t}</a></li>`).join("")}</ul>
          </div>
          <div>
            <h4>Loja aberta</h4>
            <ul><li>Seg. a sáb. · 8h às 18h</li><li>Domingo · 8h às 12h</li></ul>
          </div>
          <div>
            <h4>Fale com a gente</h4>
            <ul>
              <li><a href="${L.conversa}" target="_blank" rel="noopener">WhatsApp ${L.whatsappTexto}</a></li>
              <li><a href="${L.instagram}" target="_blank" rel="noopener">Instagram ${L.instagramUser}</a></li>
              <li><a href="${L.mapa}" target="_blank" rel="noopener">${EF.endereco.linha1}<br>${EF.endereco.linha2}</a></li>
            </ul>
          </div>
        </div>
        <div class="footer__fim"><span>© ${new Date().getFullYear()} Elma Big Festas</span><span>Feito com balões e carinho no Cabo de Santo Agostinho.</span></div>
      </div>
    </footer>
    <a class="fab-whats" href="${L.conversa}" target="_blank" rel="noopener" aria-label="Falar no WhatsApp">${icons.whats}</a>
    <div class="mobile-cta">
      <a class="btn btn--whats" href="${L.conversa}" target="_blank" rel="noopener">${icons.whats}WhatsApp</a>
      <a class="btn btn--contorno" href="${L.mapa}" target="_blank" rel="noopener">${icons.pin}Como chegar</a>
    </div>`;
  }

  /* ---------- início ---------- */
  const depsEl = document.querySelector("[data-deps]");
  if (depsEl) depsEl.innerHTML = EF.departamentos.map((d) => `
    <a class="dep cor-${d.cor} reveal" href="departamentos.html#${d.id}">
      <span class="dep__ic">${icons[d.icone]}</span>
      <h3>${d.nome}</h3>
      <p>${d.sub}</p>
      <span class="dep__seta">Ver mais →</span>
    </a>`).join("");

  const novEl = document.querySelector("[data-novidades]");
  if (novEl) novEl.innerHTML = EF.novidades.map((n) => {
    const dep = EF.departamentos.find((d) => d.id === n.dep);
    return `
    <article class="nov reveal">
      <div class="nov__foto"><img src="img/fotos/${n.foto}.jpg" alt="${esc(n.titulo)}" loading="lazy"></div>
      <div class="nov__txt">
        <span class="pill">${dep.nome}</span>
        <h3>${n.titulo}</h3>
        <p>${n.sub}</p>
        <a class="mais" href="${EF.wa(`Olá, Elma Festas! Vi no site: ${n.titulo}. Tem disponível?`)}" target="_blank" rel="noopener">Perguntar no WhatsApp →</a>
      </div>
    </article>`;
  }).join("");

  const feedEl = document.querySelector("[data-feed]");
  if (feedEl) feedEl.innerHTML = EF.feed.map((f) => `<a href="${L.instagram}" target="_blank" rel="noopener" aria-label="Ver no Instagram"><img src="img/feed/${f}.jpg" alt="" loading="lazy" width="480" height="600"></a>`).join("");

  /* ---------- departamentos + lista de festa ---------- */
  const depPage = document.querySelector("[data-dep-page]");
  if (depPage) {
    const chips = document.querySelector("[data-chips]");
    chips.innerHTML = EF.departamentos.map((d, i) => `<a class="chip${i === 0 ? " is-active" : ""}" href="#${d.id}">${d.nome}</a>`).join("");
    depPage.innerHTML = EF.departamentos.map((d) => `
      <section class="depsec cor-${d.cor}" id="${d.id}" aria-labelledby="t-${d.id}">
        <div class="depsec__head">
          <span class="dep__ic">${icons[d.icone]}</span>
          <div><h2 id="t-${d.id}">${d.nome}</h2><p>${d.sub}</p></div>
        </div>
        <div class="checks">
          ${d.itens.map((it, i) => `
            <div class="check">
              <input type="checkbox" id="i-${d.id}-${i}" data-item="${esc(it)}" data-dep="${esc(d.nome)}">
              <label for="i-${d.id}-${i}">${it}</label>
            </div>`).join("")}
        </div>
        <div class="depsec__mais">Não achou o que procura?
          <a href="${EF.wa(`Olá, Elma Festas! Vocês têm em ${d.nome.toLowerCase()}: `)}" target="_blank" rel="noopener">Pergunte no WhatsApp →</a>
        </div>
      </section>`).join("");

    const chipEls = [...chips.querySelectorAll(".chip")];
    const obs = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      chipEls.forEach((c) => c.classList.toggle("is-active", c.getAttribute("href") === "#" + e.target.id));
      const a = chips.querySelector(".is-active");
      if (a) chips.scrollTo({ left: a.offsetLeft - 20, behavior: "smooth" });
    }), { rootMargin: "-160px 0px -60% 0px" });
    depPage.querySelectorAll(".depsec").forEach((s) => obs.observe(s));
    if (location.hash) { const alvo = document.getElementById(location.hash.slice(1)); if (alvo) requestAnimationFrame(() => alvo.scrollIntoView({ behavior: "auto" })); }
    iniciarLista();
  }

  function iniciarLista() {
    let lista = [];
    try { lista = JSON.parse(localStorage.getItem("ef-lista") || "[]") || []; } catch (e) { lista = []; }
    const salvar = () => { try { localStorage.setItem("ef-lista", JSON.stringify(lista)); } catch (e) { /* sem storage */ } };
    const chave = (x) => `${x.d}|${x.n}`;

    document.body.insertAdjacentHTML("beforeend", `
      <div class="lista-barra" role="region" aria-label="Sua lista de festa" aria-live="polite">
        <div class="lista-barra__info"><strong data-l-qtd></strong><span data-l-resumo></span></div>
        <button class="btn btn--branco" type="button" data-l-abrir>${icons.lista}Ver lista</button>
      </div>
      <dialog class="lista-dialog" aria-labelledby="l-titulo">
        <div class="lista-dialog__in">
          <div style="display:flex;justify-content:space-between;align-items:center;gap:12px">
            <h2 class="h3" id="l-titulo" style="margin:0">Sua lista de festa</h2>
            <button class="x" type="button" data-l-fechar aria-label="Fechar">×</button>
          </div>
          <ul data-l-lista></ul>
          <div class="duas">
            <label class="campo">Tema da festa<input type="text" data-l-tema placeholder="Ex.: Safari, Frozen…"></label>
            <label class="campo">Data<input type="date" data-l-data></label>
          </div>
          <label class="campo">Quantidades e detalhes
            <textarea data-l-obs rows="3" placeholder="Ex.: 50 copos, 30 pratos, balões azul e branco…"></textarea>
          </label>
          <p class="nota">A lista vai pelo WhatsApp. A loja responde com disponibilidade e valores.</p>
          <div class="btns">
            <button class="btn btn--contorno btn--sm" type="button" data-l-limpar>Limpar</button>
            <a class="btn btn--whats btn--sm" data-l-enviar target="_blank" rel="noopener" style="flex:1">${icons.whats}Enviar lista no WhatsApp</a>
          </div>
        </div>
      </dialog>`);

    const barra = document.querySelector(".lista-barra");
    const dlg = document.querySelector(".lista-dialog");
    const val = (s) => dlg.querySelector(s).value.trim();

    function mensagem() {
      const porDep = {};
      lista.forEach((x) => { (porDep[x.d] = porDep[x.d] || []).push(x.n); });
      const blocos = Object.entries(porDep).map(([d, its]) => `*${d}*\n${its.map((n) => `• ${n}`).join("\n")}`);
      const data = val("[data-l-data]");
      const extra = [
        val("[data-l-tema]") && `Tema: ${val("[data-l-tema]")}`,
        data && `Data da festa: ${data.split("-").reverse().join("/")}`,
        val("[data-l-obs]") && `Detalhes: ${val("[data-l-obs]")}`
      ].filter(Boolean);
      return `Olá, Elma Festas! Montei esta lista no site e queria saber disponibilidade e valores:\n\n${blocos.join("\n\n")}${extra.length ? `\n\n${extra.join("\n")}` : ""}`;
    }
    const atualizarLink = () => { dlg.querySelector("[data-l-enviar]").href = `${L.whatsapp}?text=${encodeURIComponent(mensagem())}`; };

    function render() {
      const n = lista.length;
      barra.classList.toggle("is-on", n > 0);
      document.body.classList.toggle("tem-lista", n > 0);
      barra.querySelector("[data-l-qtd]").textContent = `${n} ${n === 1 ? "item" : "itens"} na lista`;
      barra.querySelector("[data-l-resumo]").textContent = lista.map((x) => x.n).join(", ");
      dlg.querySelector("[data-l-lista]").innerHTML = n ? lista.map((x, i) => `
        <li><span>${esc(x.n)}<small>${esc(x.d)}</small></span><button class="x" type="button" data-l-tirar="${i}" aria-label="Tirar ${esc(x.n)}">×</button></li>`).join("") : "<li>Nenhum item ainda.</li>";
      const marcados = new Set(lista.map(chave));
      document.querySelectorAll("[data-item]").forEach((c) => { c.checked = marcados.has(`${c.dataset.dep}|${c.dataset.item}`); });
      atualizarLink();
      salvar();
    }

    document.addEventListener("change", (e) => {
      const c = e.target.closest("[data-item]");
      if (!c) return;
      const x = { d: c.dataset.dep, n: c.dataset.item };
      if (c.checked) { if (!lista.some((y) => chave(y) === chave(x))) lista.push(x); }
      else lista = lista.filter((y) => chave(y) !== chave(x));
      render();
    });
    document.addEventListener("click", (e) => {
      if (e.target.closest("[data-l-abrir]")) dlg.showModal();
      if (e.target.closest("[data-l-fechar]")) dlg.close();
      const t = e.target.closest("[data-l-tirar]");
      if (t) { lista.splice(+t.dataset.lTirar, 1); render(); if (!lista.length) dlg.close(); }
      if (e.target.closest("[data-l-limpar]")) { lista = []; render(); dlg.close(); }
    });
    dlg.addEventListener("input", atualizarLink);
    dlg.addEventListener("click", (e) => { if (e.target === dlg) dlg.close(); });
    render();
  }

  /* ---------- personalizador de balão ---------- */
  const perso = document.querySelector("[data-perso]");
  if (perso) {
    const B = EF.balao;
    perso.querySelector("[data-formatos]").innerHTML = B.formatos.map((f, i) => `<input type="radio" name="forma" id="f-${f.id}" value="${f.id}"${i === 0 ? " checked" : ""}><label for="f-${f.id}">${f.nome}</label>`).join("");
    perso.querySelector("[data-cores]").innerHTML = B.cores.map((c, i) => `<input type="radio" name="cor" id="c-${c.id}" value="${c.id}"${i === 0 ? " checked" : ""}><label for="c-${c.id}" style="--c:${c.hex}"><i></i>${c.nome}</label>`).join("");
    const prev = document.querySelector(".prev");
    const forma = prev.querySelector(".prev__forma");
    const get = (n) => perso.querySelector(`[name="${n}"]`);
    const checked = (n) => perso.querySelector(`[name="${n}"]:checked`).value;
    const enviar = document.querySelector("[data-p-enviar]");

    function atualizar() {
      const f = B.formatos.find((x) => x.id === checked("forma"));
      const c = B.cores.find((x) => x.id === checked("cor"));
      const nome = get("nome").value.trim();
      const frase = get("frase").value.trim();
      const num = get("numero").value.trim();
      prev.dataset.forma = f.id;
      forma.style.setProperty("--c", c.hex);
      perso.querySelector("[data-campo-numero]").hidden = f.id !== "numero";
      prev.querySelector(".prev__txt").innerHTML = `${esc(nome || "Seu nome")}${frase ? `<small>${esc(frase)}</small>` : ""}`;
      prev.querySelector(".prev__num").textContent = num || "5";
      const data = get("data").value;
      const linhas = [
        `Formato: ${f.nome}`,
        `Cor: ${c.nome}`,
        f.id === "numero" ? `Número: ${num || "[a definir]"}` : null,
        nome ? `Nome: ${nome}` : null,
        frase ? `Frase: ${frase}` : null,
        `Quantidade: ${get("qtd").value || 1}`,
        data ? `Para o dia: ${data.split("-").reverse().join("/")}` : null,
        get("helio").checked ? "Com gás hélio" : null,
        get("obs").value.trim() ? `Obs.: ${get("obs").value.trim()}` : null
      ].filter(Boolean);
      enviar.href = EF.wa(`Olá, Elma Festas! Quero encomendar um balão personalizado:\n\n${linhas.map((l) => `• ${l}`).join("\n")}\n\nPode me passar o valor e o prazo?`);
    }
    perso.addEventListener("input", atualizar);
    perso.addEventListener("change", atualizar);
    atualizar();
  }

  /* ---------- links e ícones dinâmicos ---------- */
  document.querySelectorAll("[data-link]").forEach((a) => {
    const k = a.dataset.link;
    if (L[k]) { a.href = L[k]; a.target = "_blank"; a.rel = "noopener"; }
  });
  document.querySelectorAll("[data-icon]").forEach((el) => { el.insertAdjacentHTML("afterbegin", icons[el.dataset.icon] || ""); });
  document.querySelectorAll("[data-endereco]").forEach((el) => { el.innerHTML = `${EF.endereco.linha1}<br>${EF.endereco.linha2}`; });
  document.querySelectorAll("[data-map]").forEach((el) => {
    el.innerHTML = `<iframe src="${L.mapaEmbed}" title="Mapa: ${EF.endereco.linha1}, ${EF.endereco.linha2}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`;
  });

  /* ---------- animação ao rolar ---------- */
  const rev = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting || e.boundingClientRect.top < 0) { e.target.classList.add("is-in"); io.unobserve(e.target); } }), { threshold: .12 });
    rev.forEach((r) => io.observe(r));
  } else rev.forEach((r) => r.classList.add("is-in"));
})();
