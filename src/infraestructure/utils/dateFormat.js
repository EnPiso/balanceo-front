export const monthDayYear = (date) => {
   return  new Intl.DateTimeFormat("es-ES", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    }).format(new Date(date))
}
export const hourMinuteSecond = (date) => {
   return new Intl.DateTimeFormat("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    }).format(new Date(date))
}