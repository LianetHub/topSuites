export const select = () => {
    document.querySelectorAll(".dropdown").forEach(function (dropdownWrapper) {
        const dropdownBtn = dropdownWrapper.querySelector(".dropdown__button");
        const dropdownList = dropdownWrapper.querySelector(".dropdown__list");
        const dropdownItems = dropdownList.querySelectorAll(".dropdown__list-item");
        const dropdownInput = dropdownWrapper.querySelector(".dropdown__input");

        dropdownBtn.addEventListener("click", function () {
            dropdownList.classList.toggle("visible");
            this.classList.toggle("active");
        });

        dropdownItems.forEach(function (listItem) {
            listItem.addEventListener("click", function (e) {
                dropdownItems.forEach(function (el) {
                    el.classList.remove("active");
                });
                e.target.classList.add("active");
                dropdownBtn.innerHTML = this.innerHTML;
                dropdownBtn.classList.add("selected");
                dropdownInput.value = this.dataset.value;
                dropdownList.classList.remove("visible");
            });
        });

        // document.addEventListener("click", function (e) {
        //     if (e.target.closest(".dropdown__label")) return;
        //     if (e.target !== dropdownBtn) {
        //         dropdownBtn.classList.remove("active");
        //         dropdownList.classList.remove("visible");
        //     }
        // });

        document.addEventListener("keydown", function (e) {
            if (e.key === "Tab" || e.key === "Escape") {
                dropdownBtn.classList.remove("active");
                dropdownList.classList.remove("visible");
            }
        });
    });
};
