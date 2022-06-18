const APIKEY = '70d816fcde4d8cf348cf5b17b57a1845'
// Used for properly format url's request in relation of current location 
// This takes as input the current location and returns url as String formatted with proper location 
export const createUrl = location => {
    return `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${APIKEY}&units=metric&lang=fr`
}
