
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

export function getMonthNetworkValue(monthNumber) {
    const month = [
        "NotSet", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ];

    return month[monthNumber]
}

export function times() {
    const currentHour= new Date().getHours();

    if(currentHour >=0 && currentHour <6)  return "Доброй ночи"
    else if (currentHour >=6 && currentHour <12) return "Доброе утро"
    else if (currentHour >=12 && currentHour <18)  return "Добрый день"
    else  return "Добрый вечер"
}
export function getWeekDay() {
    const date = new Date()
    let days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

    return days[date.getDay()];
}
export function getClock(){
    const date = new Date(),
        hours = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours(),
        minutes = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes()
      return hours + ':' + minutes;
}

export function networkDateFormat(date) {
    let day = date.getDate()
    let month = date.getMonth() + 1
    const year = date.getFullYear()

    if(month.toString().length === 1){
        month = `0${month}`
    }

    if(day.toString().length === 1){
        day = `0${day}`
    }

    return `${year}-${month}-${day}`
}