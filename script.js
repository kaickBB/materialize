/* ===================================================================
   EDUARDO KOBRA — script.js
   - index.html  : inicializa o parallax (via M.Parallax.init) e tooltips
   - artes.html  : controla o carrossel clássico do Materialize
                    (autoplay a cada 3s) e o pagination "Impactando
                    o mundo", que troca a galeria conforme o país
=================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // Inicializa componentes comuns do Materialize, excluindo o parallax 
  // para inicializá-lo manualmente com mais controle
  M.AutoInit();

  // Inicialização manual do Parallax com verificação de carregamento
  const parallaxElems = document.querySelectorAll('.parallax');
  if (parallaxElems.length > 0) {
    window.addEventListener('load', () => {
      M.Parallax.init(parallaxElems);
    });
  }

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ----------------------------------------------------------------
     1) ARTES — carrossel clássico
  ---------------------------------------------------------------- */
  const artesCarouselEl = document.getElementById('artesCarousel');

  if (artesCarouselEl) {
    const carouselInstance = M.Carousel.init(artesCarouselEl, {
      indicators: true,
      duration: 300
    });

    let carouselTimer = null;

    const stopAutoplay = () => carouselTimer && clearInterval(carouselTimer);
    const startAutoplay = () => {
      stopAutoplay();
      if (reducedMotion) return;
      // ALTERADO: de 5000 para 3000 (3 segundos)
      carouselTimer = setInterval(() => carouselInstance.next(), 3000); 
    };

    artesCarouselEl.addEventListener('mouseenter', stopAutoplay);
    artesCarouselEl.addEventListener('mouseleave', startAutoplay);
    artesCarouselEl.addEventListener('focusin', stopAutoplay);
    artesCarouselEl.addEventListener('focusout', startAutoplay);

    startAutoplay();
  }

  /* ----------------------------------------------------------------
     2) ARTES — Impactando o mundo: pagination por país
  ---------------------------------------------------------------- */
  const countries = [
    {
      flag: '🇯🇵',
      name: 'Japão',
      images: [
        { src: 'https://www.eduardokobra.com/uploads/img/projetos/24/projetos_fotos/e3630a46aeefe24a80860b176e406675.jpg', caption: 'Mural de Eduardo Kobra — Japão' },
        { src: 'https://www.eduardokobra.com/uploads/img/projetos/24/projetos_fotos/6b4768c8909166b90f6a48213c3af21f.jpg', caption: 'Mural de Eduardo Kobra — Japão' },
        { src: 'https://www.eduardokobra.com/uploads/img/projetos/24/projetos_fotos/f4201a5d44d235590952bdc490c22b51.jpg', caption: 'Mural de Eduardo Kobra — Japão' }
      ]
    },
    {
      flag: '🇺🇸',
      name: 'Estados Unidos',
      images: [
        { src: 'https://www.eduardokobra.com/uploads/img/projetos/57/projetos_fotos/3422ad1487cfb5c00dc24f478e189be7.jpg', caption: 'Mural de Eduardo Kobra — Estados Unidos' },
        { src: 'https://www.eduardokobra.com/uploads/img/projetos/3/projetos_fotos/20699149814463924c80f58c0a45f868.jpeg', caption: 'Mural de Eduardo Kobra — Estados Unidos' },
        { src: 'https://www.eduardokobra.com/uploads/img/projetos/5/projetos_fotos/d5d13676a3e13e12a6bec2b480085f33.jpeg', caption: 'Mural de Eduardo Kobra — Estados Unidos' },
        { src: 'https://www.eduardokobra.com/uploads/img/projetos/13/projetos_fotos/7f4b8218ec95d4475a7a512a17a6d4a9.jpg', caption: 'Mural de Eduardo Kobra — Estados Unidos' },
        { src: 'https://www.eduardokobra.com/uploads/img/projetos/11/projetos_fotos/thumb-1200-0/739510ad52f1ab95fbfcc528fc0f2517.jpg', caption: 'Ellis Island — Nova York, 2018' },
        { src: 'https://www.eduardokobra.com/uploads/img/projetos/14/projetos_fotos/7e4a3bb7b2bb76c8c051e35f7fd62566.jpeg', caption: 'Mural de Eduardo Kobra — Estados Unidos' }
      ]
    },
    {
      flag: '🇮🇹',
      name: 'Itália',
      images: [
        { src: 'https://www.eduardokobra.com/uploads/img/projetos/58/projetos_fotos/4523197edae39c6664bf93d00d2d2788.jpg', caption: 'Mural de Eduardo Kobra — Itália' },
        { src: 'https://www.eduardokobra.com/uploads/img/projetos/23/projetos_fotos/f4f5c41b299e6123f45a4bc19ee4ae34.jpg', caption: 'Mural de Eduardo Kobra — Itália' },
        { src: 'https://www.eduardokobra.com/uploads/img/projetos/23/projetos_fotos/23394e0e1a8588133abe049db9d50e8c.jpg', caption: 'Mural de Eduardo Kobra — Itália' },
        { src: 'https://www.eduardokobra.com/uploads/img/projetos/16/projetos_fotos/dd587ed4ea9856d86b902c9eeb9ae517.jpg', caption: 'Mural de Eduardo Kobra — Itália' }
      ]
    }
  ];

  const headerEl = document.getElementById('countryHeader');
  const galleryEl = document.getElementById('countryGallery');
  const paginationEl = document.getElementById('countryPagination');

  if (headerEl && galleryEl && paginationEl) {
    let currentIndex = 0;

    const renderHeader = (country) => {
      headerEl.innerHTML = `
        <span class="country-flag">${country.flag}</span>
        <div>
          <span class="country-tag">Página 0${currentIndex + 1} de 0${countries.length}</span>
          <h3>${country.name}</h3>
        </div>
        <span class="country-count">${country.images.length} ${country.images.length === 1 ? 'obra' : 'obras'}</span>
      `;
    };

    const renderGallery = (country) => {
      galleryEl.classList.remove('is-visible');

      const update = () => {
        galleryEl.innerHTML = country.images.map((img, index) => {
          // Define a classe de coluna baseada no padrão (1 inteira, 2 metades)
          const colClass = (index % 3 === 0) ? 'col s12' : 'col s12 m6';

          return `
            <div class="${colClass}">
              <div class="card kobra-card">
                <div class="card-image">
                  <img src="${img.src}" class="materialboxed" data-caption="${img.caption}" alt="${img.caption}" loading="lazy">
                </div>
              </div>
            </div>
          `;
        }).join('');

        M.Materialbox.init(galleryEl.querySelectorAll('.materialboxed'));
        galleryEl.classList.add('is-visible');
      };

      reducedMotion ? update() : setTimeout(update, 180);
    };

    const renderPagination = () => {
      const isFirst = currentIndex === 0;
      const isLast = currentIndex === countries.length - 1;

      let html = `<li class="${isFirst ? 'disabled' : 'waves-effect'}" data-action="prev">
                     <a href="#!"><i class="material-icons">chevron_left</i></a>
                   </li>`;

      countries.forEach((country, i) => {
        html += `<li class="${i === currentIndex ? 'active' : 'waves-effect'}" data-index="${i}">
                   <a href="#!">${country.flag} ${country.name}</a>
                 </li>`;
      });

      html += `<li class="${isLast ? 'disabled' : 'waves-effect'}" data-action="next">
                 <a href="#!"><i class="material-icons">chevron_right</i></a>
               </li>`;

      paginationEl.innerHTML = html;

      paginationEl.querySelectorAll('li[data-index]').forEach(li => {
        li.addEventListener('click', () => goTo(parseInt(li.dataset.index, 10)));
      });

      if (!isFirst) {
        paginationEl.querySelector('[data-action="prev"]')
          .addEventListener('click', () => goTo(currentIndex - 1));
      }
      if (!isLast) {
        paginationEl.querySelector('[data-action="next"]')
          .addEventListener('click', () => goTo(currentIndex + 1));
      }
    };

    function goTo(index) {
      if (index < 0 || index >= countries.length || index === currentIndex) return;
      currentIndex = index;
      renderHeader(countries[currentIndex]);
      renderGallery(countries[currentIndex]);
      renderPagination();
    }

    renderHeader(countries[currentIndex]);
    renderGallery(countries[currentIndex]);
    renderPagination();
  }

});