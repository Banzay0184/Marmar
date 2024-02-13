const img = document.querySelectorAll('.project_detail_img')
const body = document.querySelector('body')
img.forEach(item => {
    item.addEventListener('click', e => {
        console.log(e.target.attributes.id.nodeValue)
        const box = document.createElement('div')
        box.className = 'fixed z-[1000] top-[0] w-[100%] h-[100%]'
        box.style.background = 'rgba(0, 0, 0, 0.70)'
        body.appendChild(box)

        let img = document.createElement('img')
        img.src = e.target.src
        img.className = 'object-cover w-[50%] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'
        box.appendChild(img)

        box.addEventListener('click', e => {
            box.remove()
        })
    })
})