export const calc = () => {

    if (!document.getElementById('#calc')) return;

    const squareInput = document.querySelector('input[name="square"]');
    const rangeInput = document.querySelector('input[name="range"]');
    const roomsInputs = document.querySelectorAll('input[name="rooms"]');
    const bathroomsInputs = document.querySelectorAll('input[name="bathrooms"]');
    const projectInputs = document.querySelectorAll('input[name="project"]');
    const kitchenInputs = document.querySelectorAll('input[name="exchange-kitchen"]');
    const cabinetsInputs = document.querySelectorAll('input[name="exchange-cabinets"]');
    const furnitureInputs = document.querySelectorAll('input[name="furniture"]');
    const totalValue = document.querySelector('.calc__total-value');

    const COSTS = {
        squareMeter: 1300,
        bathroom: 15000,
        project: { yes: 0, no: 200 },
        kitchen: { yes: 50000, no: 0 },
        cabinet: 8000,
        furniture: { perRoom: 10000, living: 25000 }
    };

    const calculateTotal = () => {
        // Площадь
        const square = parseFloat(squareInput.value) || 0;
        const squareCost = square * COSTS.squareMeter;

        // Комнаты
        const selectedRoom = [...roomsInputs].find(input => input.checked)?.value || 1;
        const rooms = parseInt(selectedRoom);

        // Ванные комнаты
        const selectedBathrooms = [...bathroomsInputs].find(input => input.checked)?.value || 1;
        const bathrooms = parseInt(selectedBathrooms);
        const bathroomsCost = bathrooms * COSTS.bathroom;

        // Есть проект?
        const project = [...projectInputs].find(input => input.checked)?.value || 1;
        const projectCost = project === "1" ? COSTS.project.yes : COSTS.project.no * square;

        // Замена кухни
        const kitchen = [...kitchenInputs].find(input => input.checked)?.value || 1;
        const kitchenCost = kitchen === "1" ? COSTS.kitchen.yes : COSTS.kitchen.no;

        // Замена шкафов
        const cabinets = [...cabinetsInputs].find(input => input.checked)?.value || 1;
        const cabinetsCost = cabinets === "1" ? rooms * COSTS.cabinet : 0;

        // Мебелировка
        const furniture = [...furnitureInputs].find(input => input.checked)?.value || 1;
        const furnitureCost = furniture === "1"
            ? rooms * COSTS.furniture.perRoom + COSTS.furniture.living
            : 0;

        // Итоговая стоимость
        const total = squareCost + bathroomsCost + projectCost + kitchenCost + cabinetsCost + furnitureCost;

        // Обновление значения на странице
        totalValue.textContent = `${total.toLocaleString()} AED`;
    };

    // Связываем события с расчетом
    [squareInput, rangeInput, ...roomsInputs, ...bathroomsInputs, ...projectInputs,
        ...kitchenInputs, ...cabinetsInputs, ...furnitureInputs].forEach(input => {
            input.addEventListener('input', calculateTotal);
            input.addEventListener('change', calculateTotal);
        });

    // Связь input range и input number
    rangeInput.addEventListener('input', () => {
        squareInput.value = rangeInput.value;
        calculateTotal();
    });

    squareInput.addEventListener('input', () => {
        rangeInput.value = squareInput.value;
        calculateTotal();
    });

    // Инициализация начального значения
    calculateTotal();

}