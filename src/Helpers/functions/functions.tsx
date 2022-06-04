export function generateSheduleData(days:number){

    let shedule = []

    for (let i = 1; i <= days; i++) {
        shedule.push({id:i, persons:[]})
    }

    return shedule;
}

export function daysInMonth (month:number, year:number) {
    return new Date(year, month, 0).getDate();
}