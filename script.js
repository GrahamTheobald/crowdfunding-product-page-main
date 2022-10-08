
const menu = document.querySelector(".header__nav__menu")
const menuOpenBtn = document.querySelector(".menu-open")
const menuCloseBtn = document.querySelector(".menu-close")
const greyFilter = document.querySelector(".grey-filter")
const bookmark = document.querySelector(".bookmark")
const selectBtns = document.querySelectorAll(".product-select")
const modal = document.querySelector(".modal")
const modalProducts = modal.querySelectorAll(".main__about__products__product")
const modalProductsSelectBtns = modal.querySelectorAll(".top__left-select")
const pledgeSubmitBtns = document.querySelectorAll(".pedge-submit")
const gotitBtn = document.querySelector(".button-gotit")
const modalCloseBtn = document.querySelector(".modal-close")

updateBar()

menuOpenBtn.addEventListener("click", menuToggle)
menuCloseBtn.addEventListener("click", menuToggle)

modalCloseBtn.addEventListener("click", ()=> {
    modalProducts.forEach(product => deselectModalProduct(product.dataset.product))
    modal.classList.add("hidden")})

gotitBtn.addEventListener("click", ()=> {
    renderSelectModal()
    modal.classList.add("hidden")
})

bookmark.addEventListener("click", () => bookmark.classList.toggle("bookmarked"))

selectBtns.forEach(button => {
    button.addEventListener("click", renderModal)
})

modalProductsSelectBtns.forEach(button => {
    button.addEventListener("click", modalProductSelect)
})

pledgeSubmitBtns.forEach(button => button.addEventListener('click', submitPledge))


function menuToggle() {
    menu.classList.toggle("hidden")
    menuOpenBtn.classList.toggle("hidden")
    menuCloseBtn.classList.toggle("hidden")
    greyFilter.classList.toggle("hidden")
}

function selectModalProduct(product) {
    const modalProductDiv = modal.querySelector(`[data-product="${product}"]`)
    modalProductDiv.classList.add("selected")
    modalProductDiv.querySelector(".top__left-select").classList.add("selected")
    modalProductDiv.querySelector(".b").classList.add("selected")
}

function deselectModalProduct(product) {
    const modalProductDiv = modal.querySelector(`[data-product="${product}"]`)
    modalProductDiv.classList.remove("selected")
    modalProductDiv.querySelector(".top__left-select").classList.remove("selected")
    modalProductDiv.querySelector(".b").classList.remove("selected")
}

function renderModal(e) {
    modal.classList.remove("hidden")
    const productDiv = e.target.closest("[data-product]")
    const product = productDiv.dataset.product
    const modalProductDiv = modal.querySelector(`[data-product="${product}"]`)
    document.documentElement.scrollTop = modalProductDiv.offsetTop - 200
    selectModalProduct(product)
}

function submitPledge(e) {
    const productDiv = e.target.closest("[data-product]")
    if (!enoughPledged(productDiv)) return 
    const product = productDiv.dataset.product 
    const input = productDiv.querySelector(".pledge-amount")
    const $pledged = (product == ' ') ? 0 : input.value

    updateStats($pledged)
    updateBar()
    updateDataLeft(product)

    modalProducts.forEach(product => deselectModalProduct(product.dataset.product))
    
    renderThanksModal()
    if (product == " ") return 

    input.value = input.min
    
}

function enoughPledged(productDiv) {
    if (productDiv.dataset.product == " ") return true
    const input = productDiv.querySelector(".pledge-amount")
    if (input.value < input.dataset.min) return false
    return true
}

function updateStats($) {
    const back = document.querySelector("[data-backers]")
    back.dataset.backers = parseInt(back.dataset.backers) + 1
    back.innerText = back.dataset.backers.toLocaleString()

    const amount = document.querySelector("[data-total-amount]")
    amount.dataset.totalAmount = parseInt(amount.dataset.totalAmount) + parseInt($)
    amount.innerText = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD', minimumFractionDigits: 0}).format(amount.dataset.totalAmount)

} 

function updateBar() {
    const complete = document.querySelector(".main__stats-bar-complete")
    const amount = parseInt(document.querySelector("[data-total-amount]").dataset.totalAmount)
    const needed = parseInt(document.querySelector("[data-needed]").dataset.needed)
    complete.style.width = `${Math.min(100, (amount / needed) * 100)}%`
}


function updateDataLeft(product) {
    if (product = " ") return 
    const products = document.querySelectorAll(`[data-product="${product}"]`)
    products.forEach(product => {
        const div = product.querySelector("[data-left]")
        div.dataset.left = div.dataset.left - 1
        div.innerText = div.dataset.left
    })
}
function renderThanksModal() {
    document.documentElement.scrollTop = 0
    modal.querySelector(".modal__content__select").classList.add("hidden")
    modal.querySelector(".modal__content__thanks").classList.remove("hidden")
}

function renderSelectModal() {
    modal.querySelector(".modal__content__select").classList.remove("hidden")
    modal.querySelector(".modal__content__thanks").classList.add("hidden")
}

function modalProductSelect(e) {
    const modalProductDiv = e.target.closest("[data-product]")
    modalProducts.forEach(product => deselectModalProduct(product.dataset.product))
    selectModalProduct(modalProductDiv.dataset.product)

}
