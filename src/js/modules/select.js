export const select = () => {
    const toggleDropdown = (dropdown, isOpen) => {
        const btn = dropdown.querySelector('.dropdown__button');
        const list = dropdown.querySelector('.dropdown__list');
        btn.setAttribute('aria-expanded', isOpen);
        list.setAttribute('aria-hidden', !isOpen);
        if (isOpen) {
            dropdown.classList.add('visible');
            btn.classList.add('active');
        } else {
            dropdown.classList.remove('visible');
            btn.classList.remove('active');
        }
    };

    const setupDropdown = dropdown => {
        const dropdownBtn = dropdown.querySelector('.dropdown__button');
        const dropdownList = dropdown.querySelector('.dropdown__list');
        const dropdownItems = dropdownList.querySelectorAll('.dropdown__list-item');

        dropdownBtn.addEventListener('click', () => {
            const isOpen = dropdownBtn.getAttribute('aria-expanded') === 'true';
            toggleDropdown(dropdown, !isOpen);
        });

        dropdownItems.forEach(item => {


            item.addEventListener('click', e => {
                e.preventDefault();

                const selectedLanguage = item.querySelector('.dropdown__link').dataset.lang;

                setCookie("language", selectedLanguage);

                dropdownBtn.textContent = item.querySelector('.dropdown__link').textContent;
                toggleDropdown(dropdown, false);

                setTimeout(() => {
                    window.location.href = item.querySelector('.dropdown__link').href;
                }, 100);
            });
        });
    };


    function setCookie(name, value, options) {
        options = options || {};
        var expires = options.expires;

        if (typeof expires == "number" && expires) {
            var d = new Date();
            d.setTime(d.getTime() + expires * 1000);
            expires = options.expires = d;
        }
        if (expires && expires.toUTCString) {
            options.expires = expires.toUTCString();
        }
        value = encodeURIComponent(value);
        var updatedCookie = name + "=" + value;

        for (var propName in options) {
            updatedCookie += "; " + propName;
            var propValue = options[propName];
            if (propValue !== true) {
                updatedCookie += "=" + propValue;
            }
        }

        document.cookie = updatedCookie;
    }

    const closeAllDropdownsOnClickOutside = e => {
        document.querySelectorAll('.dropdown.visible').forEach(dropdown => {
            if (!dropdown.contains(e.target)) {
                toggleDropdown(dropdown, false);
            }
        });
    };

    const closeAllDropdownsOnEscape = e => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.dropdown.visible').forEach(dropdown => {
                toggleDropdown(dropdown, false);
            });
        }
    };

    document.querySelectorAll('.dropdown').forEach(setupDropdown);
    document.addEventListener('click', closeAllDropdownsOnClickOutside);
    document.addEventListener('keydown', closeAllDropdownsOnEscape);
};
