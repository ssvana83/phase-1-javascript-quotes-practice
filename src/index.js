
const quoteList = document.querySelector('#quote-list')
const newQuoteForm = document.querySelector('#new-quote-form')
getAllQuotes()

//******************************************ADD EVENT LISTENERS**************** */
newQuoteForm.addEventListener("submit", gatherFormData)



function getAllQuotes() {
  fetch("http://localhost:3000/quotes?_embed=likes")
  .then(response => response.json())
  .then(addQuotesToPage)
}

function createQuote(quoteObj) {
  fetch("http://localhost:3000/quotes", {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(quoteObj)
  })
  .then(response => response.json())
  .then(addSingleQuoteToDom)
}
 

function addQuotesToPage(allQuotes) {
  allQuotes.forEach(quote => {
    quoteList.innerHTML += `
  <li class='quote-card'>
      <blockquote class="blockquote">
        <p class="mb-0">${quote.quote}</p>
        <footer class="blockquote-footer">${quote.author}</footer>
        <br>
        <button class='btn-success'>Likes: <span>${quote.likes.length}</span></button>
        <button class='btn-danger'>Delete</button>
      </blockquote>
    </li>
    `
  })
}

function addSingleQuoteToDom(singleQuote) {
  
}

function gatherFormData(e) {
  e.preventDefault()

  const quote = e.target.quote.value
  const author = e.target.author.value

  const quoteObj = {
    quote: quote,
    author: author
  }
  createQuote(quoteObj)
}

