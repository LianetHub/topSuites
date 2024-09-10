"use strict";

// import { Fancybox } from '@fancyapps/ui';
// import Swiper from 'swiper';
import * as devFunctions from './modules/functions.js';


document.addEventListener('DOMContentLoaded', () => {

    devFunctions.isWebp();
    devFunctions.OS();
    devFunctions.spollers();
    devFunctions.floatingLabels();
    devFunctions.formSubmit();
    devFunctions.intInputMask();
    devFunctions.animation();
    devFunctions.select()


    // init Fancybox Gallery
    if (typeof Fancybox !== "undefined" && Fancybox !== null) {
        Fancybox.bind("[data-fancybox]", {
            dragToClose: false,
            caption: function (fancybox, slide) {
                if (slide.contentEl.classList.contains('popup')) {
                    fancybox.container.classList.add('hidden-footer');
                    return;
                } else {
                    return slide.thumbEl?.alt || "";

                }

            },
            Toolbar: {
                display: {
                    left: [],
                    middle: ["infobar"],
                    right: ["close"],
                },
            },
            infobar: {
                tpl: '<div class="fancybox__infobar" tabindex="-1"><span data-fancybox-current-index></span> of <span data-fancybox-count></span></div>',
            },
            Thumbs: false,
            defaultDisplay: "flex",
            on: {
                close: (fancybox, event) => {
                    if (fancybox.container.querySelectorAll('.param-input')) {
                        fancybox.container.querySelectorAll('.param-input').forEach(input => input.remove())
                    }

                }
            }
        });
    }


    // event handlers
    document.addEventListener('click', (e) => {
        const target = e.target;

        if (target.closest('.icon-menu') || (target.classList.contains('menu') && target.classList.contains('active'))) {
            getMenu()
        }

        if (window.innerWidth < 576 && target.classList.contains('fancybox__slide')) {
            Fancybox.close()
        }

        if (target.hasAttribute('data-loadmore')) {
            getGallery(target.dataset.loadmore)
        }

        if (target.hasAttribute('data-params')) {
            let params = target.dataset.params;
            let modalId = target.getAttribute('href').replace('#', '');
            getParamsToModal(params, modalId);

        }


    })

    async function getGallery(url) {

        try {
            const RESPONSE_URL = url;
            let response = await fetch(RESPONSE_URL, {
                method: "GET"
            });

            if (response.ok) {
                let result = await response.json();
                renderGalleryItems(result)

            }

        } catch (err) {
            console.log(err);
        }
    }

    function renderGalleryItems(galleryResponse) {
        let galleryList = document.querySelector('.gallery__content');

        let { galleryData, status } = galleryResponse[0];

        galleryData.forEach(gallerySectionData => {

            let { galleryCaption, galleryItems } = gallerySectionData;

            let gallerySection = document.createElement('div');
            gallerySection.classList.add('gallery__section');

            let galleryTitle = document.createElement('h2');
            galleryTitle.classList.add('gallery__caption');
            galleryTitle.innerHTML = galleryCaption;


            let galleryGrid = document.createElement('div');
            galleryGrid.classList.add('gallery__grid');

            galleryItems.forEach(galleryItem => {
                let galleryBlock = document.createElement('a');
                galleryBlock.setAttribute('href', galleryItem);
                galleryBlock.setAttribute('data-fancybox', 'gallery');
                galleryBlock.classList.add('gallery__item');

                let galleryImage = document.createElement('img');
                galleryImage.setAttribute('src', galleryItem);
                galleryImage.setAttribute('alt', galleryCaption);
                galleryImage.classList.add('cover-image');

                galleryBlock.appendChild(galleryImage);
                galleryGrid.appendChild(galleryBlock);
            });

            gallerySection.appendChild(galleryTitle);
            gallerySection.appendChild(galleryGrid);

            galleryList.appendChild(gallerySection);




        });

        if (!status) {
            document.querySelector('[data-loadmore]').classList.add('hidden')
        }

    }

    function getMenu() {
        const iconMenu = document.querySelector('.icon-menu');
        const menuBody = document.querySelector('.menu');
        iconMenu.classList.toggle("active");
        menuBody.classList.toggle("active");
        devFunctions.toggleLocking();
    }

    function getParamsToModal(params, modalId) {
        const modal = document.getElementById(modalId);

        if (!modal) return;
        const modalForm = modal.querySelector('.form');
        let paramsArr = params.split(', ');

        let paramsObject = {};
        paramsArr.forEach(function (property) {
            let tup = property.split(':');
            paramsObject[tup[0]] = tup[1];
        });



        for (let key in paramsObject) {
            let input = document.createElement('input');
            input.type = "hidden";
            input.name = key;
            input.value = paramsObject[key].trim();
            input.classList.add('param-input');
            modalForm.appendChild(input);
        }




    }






    // sliders

    if (document.querySelector('.services__slider')) {
        new Swiper('.services__slider', {
            slidesPerView: "auto",
            slidesPerGroupAuto: true,
            spaceBetween: 26,
            watchOverflow: true,
            navigation: {
                nextEl: '.services__next',
                prevEl: '.services__prev'
            },
            breakpoints: {
                767.98: {
                    spaceBetween: 57,
                },
                1023.98: {
                    spaceBetween: 90,
                }
            }
        })
    }

    if (document.querySelector('.cases__slider')) {
        new Swiper('.cases__slider', {
            slidesPerView: 1,
            speed: 600,
            effect: 'fade',
            autoHeight: true,
            fadeEffect: {
                crossFade: true,
            },
            navigation: {
                nextEl: '.cases__next',
                prevEl: '.cases__prev'
            },
        })
    }

    if (document.querySelectorAll('.cases__item-slider')) {

        document.querySelectorAll('.cases__item-slider').forEach(caseSlider => {

            let prev = caseSlider.querySelector('.cases__item-prev');
            let next = caseSlider.querySelector('.cases__item-next');
            let pagintion = caseSlider.querySelector('.cases__item-pagination');
            let bullets = caseSlider.querySelector('.cases__item-bullets');

            let mainSlider = new Swiper(caseSlider, {
                slidesPerView: 1,
                speed: 600,
                effect: 'fade',

                fadeEffect: {
                    crossFade: true,
                },
                pagination: {
                    el: pagintion,
                    type: "fraction",
                    renderFraction: function (currentClass, totalClass) {
                        return '<span class="' + currentClass + '"></span>' +
                            ' of ' +
                            '<span class="' + totalClass + '"></span>';
                    }
                },
                navigation: {
                    nextEl: next,
                    prevEl: prev
                },
            });

            let paginationSlider = new Swiper(caseSlider, {
                effect: 'fade',
                fadeEffect: {
                    crossFade: true,
                },
                pagination: {
                    el: bullets,
                    clickable: true,
                    dynamicBullets: true,

                }
            });

            mainSlider.controller.control = paginationSlider;
            paginationSlider.controller.control = mainSlider;

        });
    }


    if (document.querySelector('.types__list')) {
        setBreakpointSlider('.types__list', {
            slidesPerView: 'auto',
            speed: 600,
            spaceBetween: 56,
            breakpoints: {
                1264: {
                    spaceBetween: 0,
                }
            }
        }, "window.innerWidth <= 1263.98 && window.innerWidth >= 768")
    }

    if (document.querySelector('.why__list')) {
        setBreakpointSlider('.why__list', {
            slidesPerView: 'auto',
            speed: 600,
            spaceBetween: 24,
            breakpoints: {
                767.98: {
                    spaceBetween: 88,
                }
            }
        }, "window.innerWidth <= 1263.98 && window.innerWidth >= 768")
    }



    function setBreakpointSlider(sliderName, options, media = null) {

        let mediaQuery = media ? media : "window.innerWidth <= 1263.98";

        // console.log(mediaQuery);
        let init = false;
        let swiper = null;

        function getSwiper() {
            if (mediaQuery) {
                if (!init) {
                    init = true;
                    swiper = new Swiper(sliderName, options);
                }
            } else if (init) {
                swiper.destroy();
                swiper = null;
                init = false;
            }
        }
        getSwiper();
        window.addEventListener("resize", getSwiper);
    }


})

