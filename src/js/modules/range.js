export const range = () => {

    const rangeSliders = document.querySelectorAll('.range-slider');

    rangeSliders?.forEach(rangeSlider => {
        const startValue = rangeSlider.dataset.start ? +rangeSlider.dataset.start : 0;
        const endValue = rangeSlider.dataset.end ? +rangeSlider.dataset.end : 100;
        const input = rangeSlider.querySelector('.range-slider__input');
        const rangeBlock = rangeSlider.querySelector('.range-slider__block');

        const slider = noUiSlider.create(rangeBlock, {
            start: [input.value || startValue, endValue],
            connect: true,
            range: {
                'min': startValue,
                'max': endValue
            }
        });

        // slider.on('update', (values) => {
        //     const currentValue = Math.round(values[0]);
        //     input.value = currentValue;
        // });


        // input.addEventListener('input', () => {
        //     let value = +input.value;

        //     if (value < startValue) value = startValue;
        //     if (value > endValue) value = endValue;

        //     slider.set(value);
        // });

    })

}