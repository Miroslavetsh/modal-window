let fruits = [
    {id: 1, title: 'Apples', price: 20, img: 'https://aif-s3.aif.ru/images/018/624/ded4f53e7867f09b37f3f4d8d0c0a327.jpg'},
    {id: 2, title: 'Oranges', price: 30, img: 'https://www.gastronom.ru/binfiles/images/20141003/b3c0313e.jpg'},
    {id: 3, title: 'Mangos', price: 40, img: 'https://www.menslife.com/upload/iblock/d23/mango.jpg'},
]

const toHTML = fruit => `
    <div class="col">
        <div class="card">
            <img src="${fruit.img}" style="height: 300px;" class="card-img-top" alt="${fruit.title}">
            <div class="card-body">
                <h5 class="card-title">${fruit.title}</h5>
                <a href="#" class="btn btn-primary" data-btn="price" data-id="${fruit.id}">Check price</a>
                <a href="#" class="btn btn-danger" data-btn="remove" data-id="${fruit.id}">Delete</a>
            </div>
        </div>
    </div>
`

function render() {
    const html = fruits.map(toHTML).join('')
    document.querySelector('#fruits').innerHTML = html
    
}

render()

const myModal = $.modal({
    title: 'Myro modal',
    closable: true,
    content: `
        <h2>Modal works!!!</h2>
        <p>Lorem ipsum dolor sit.</p>
    `,
    width: '400px',
    footerButtons: [
        {text: 'Ok', type: 'primary', handler() {
            console.log('Primary btn')
        }},
        {text: 'Cancel', type: 'danger', handler() {
            myModal.close()            
        }},
    ],
})

const priceModal = $.modal({
    title: 'Price!',
    closable: true,
    width: '400px',
    footerButtons: [
        {text: 'Close', type: 'danger', handler() {
            priceModal.close()            
        }},
    ],
})

document.addEventListener('click', event => {
    event.preventDefault()
    const btnType = event.target.dataset.btn
    const id = +event.target.dataset.id
    const fruit = fruits.find(f => f.id === id)
    
    if(btnType === 'price') {
        priceModal.setContent(`
            <p>${fruit.title} price: <strong>${fruit.price}$</strong></p>
        `)
        priceModal.open()
    } else if (btnType === 'remove') {
        $.confirm({
            title: 'Are you sure?',
            content: `<p>Are you sure to delete: <strong>${fruit.title}$</strong>?</p>`,
        })
        .then(() => {
            fruits = fruits.filter(f => f.id !== id)
            render()
        })
        .catch(() => {})
    }
})