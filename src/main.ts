import background from '/bg-image-random-quote.svg'
import link from '/link.svg'
import regroup from '/Regroup.svg'

const title: HTMLTitleElement = document.querySelector('.quote')!,
  author: HTMLTitleElement = document.querySelector('#author')!,
  quoteContainer: HTMLDivElement = document.querySelector('.quote__container')!,
  btnRandom: HTMLButtonElement = document.querySelector('#random__quote')!,
  btnCopy: HTMLButtonElement = document.querySelector('#copy__quote')!

const copyContent = async () => {
  try {
    await navigator.clipboard.writeText(title.innerHTML);
    alertMessage()
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
}

const messageElement = document.getElementById("message")!

const alertMessage = () => {
  messageElement.textContent = "Text Copied to Clipboard"
  messageElement.style.display = "block"
  messageElement.style.background = "linear-gradient(#20293A, #2c3546)"
  messageElement.style.color = "white"
  messageElement.style.padding = "10px 30px"
  messageElement.style.borderRadius = "10px"
  messageElement.style.position = "absolute"
  messageElement.style.fontFamily = "Output, sans-serif"
  messageElement.style.top = "20px"
  messageElement.style.right = "10px"
  setTimeout(() => {
    messageElement.style.display = "none"
  }, 2000)
}

quoteContainer.style.backgroundImage = `url(${background})`

btnRandom.innerHTML = `<img src="${regroup}" alt="random" />`
btnCopy.innerHTML = `<img src="${link}" alt="copy" />`

type Quote = {
  text: string;
  author: string;
}

async function fetchQuote() {
  try {
    // API call
    const response = await fetch('https://type.fit/api/quotes')
    const data: Quote[] = await response.json()
    console.log(data)
    // Random quote
    const randomIndex = Math.floor(Math.random() * data.length)
    // Display quote and author
    title.textContent = `"${data[randomIndex].text}"`
    const filteredString = removeWordsAfterComma(`${data[randomIndex].author}`)
    author.textContent = filteredString
  } catch (error) {
    console.log(error)
  }
}

fetchQuote()

btnRandom.addEventListener('click', fetchQuote)
btnCopy.addEventListener('click', copyContent)

function removeWordsAfterComma(str: string): string {
  const words = str.split(',')
  const filteredWords = words[0].trim()
  return filteredWords
}