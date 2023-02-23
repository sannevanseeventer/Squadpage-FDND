import express from 'express'

// Deze link staat in verbiding met de database van alle squads
const url = 'https://whois.fdnd.nl/api/v1/squad/'

// Maak een nieuwe express app
const app = express()

// Stel in hoe we express gebruiken
app.set('view engine', 'ejs') // verwijst naar de htmlcode
app.set('views', './views') // verwijst naar de footer, header en de index
app.use(express.static('public')) // verwijst naar alle zichtbare onderdelen in de public map

// Maakt een route voor de index, get = informate die je terugkrijgt vanuit de database
app.get('/', (request, response) => { // Dit zorg ervoor dat je de informatie ontvangt. Je vraagt en krijgteen antwoord terug
  console.log(request.query.squad) // test met de onderstaande slug squad-a-2022

  let slug = request.query.squad || 'squad-a-2022' // Deze squad is standaard zichtbaar bij een request
  let orderBy = request.query.orderBy || 'name' // Voor als je wilt sorteren op naam ipv op squad
  let squadUrl = url + slug + '?orderBy=' + orderBy + '&direction=ASC' // bovenstaande url regel 4 + slug + orderby + volgorde voor naar achter

  fetchJson(squadUrl).then((data) => { // bij gebruik url -> zie je data -> vervolgens response met de index +  data
    response.render('index', data)
  })

})

// Stelt het poortnummer in en start express
app.set('port', process.env.PORT || 4000)
app.listen(app.get('port'), function () {
  console.log(`Application started on http://localhost:${app.get('port')}`) // test met de localhost
})

/**
 * Wraps the fetch api and returns the response body parsed through json
 * @param {*} url the api endpoint to address
 * @returns the json response from the api endpoint
 */
async function fetchJson(url) {
  return await fetch(url) // await zorgt ervoor dat er wordt gewacht voordat alle data beschikbaar is
    .then((response) => response.json())
    .catch((error) => error)
}