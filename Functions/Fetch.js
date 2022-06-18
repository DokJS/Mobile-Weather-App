 export default FetchData = async url => {
     try {
         const response = await fetch(url)
         return response.json()
     } catch (error) {
         console.log(error)
    }
}