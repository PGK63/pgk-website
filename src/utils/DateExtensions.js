
export function correctionDate(dateString) {
    const date = new Date(dateString)
    const month = getMonthValue(date.getMonth())

    return `${date.getDate()} ${month} ${date.getFullYear()}`
}

export function getMonthValue(monthNumber) {
    const month = [
        "Январь",
        "Февраль",
        "Март",
        "Апрель",
        "Май",
        "Июнь",
        "Июль",
        "Август",
        "Сентябрь",
        "Октябрь",
        "Ноябрь",
        "Декабрь"
    ];

    return month[monthNumber]
}