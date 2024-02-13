Element.prototype.appendAfter = function (element) {
    element.parentNode.insertBefore(this, element.nextSibling)
}

function noop() {

}

function _createModalFooter(button = []) {
    if (button.length === 0) {
        return document.createElement('div')
    }
    const wrap = document.createElement('div')
    wrap.classList.add('modal-footer')

    button.forEach(btn => {
        const $btn = document.createElement('button')
        $btn.textContent = btn.text
        $btn.classList.add(`${btn.styleBtn || 'secondary'}`)
        $btn.onclick = btn.handler || noop
        $btn.type = `${btn.type}` || 'button'
        $btn.dataset.btn = `${btn.dataset || ''}`
        wrap.appendChild($btn)
    })
    return wrap

}

function _createModal(options) {
    const modal = document.createElement('div')
    modal.classList.add('vmodal')
    modal.insertAdjacentHTML('afterbegin', `
        <div class="modal-overlay" data-close="true">
            <form class="modal-window" method="post" style="width: ${options.width || '600px'}">
                ${csrf}
                <div class="modal-header">
                    <span class="modal-title">${options.title || 'Окно'}</span>
                    ${options.closable ? `<span class="modal-close" data-close="true">&times;</span>` : ''}
                </div>
                <div class="modal-body" data-content>
                    ${options.content || ''}
                </div>
            </form>
        </div>
    `)
    const footer = _createModalFooter(options.footerButtons)
    footer.appendAfter(modal.querySelector('[data-content]'))
    document.body.appendChild(modal)
    return modal
}

$.modal = function (options) {
    const ANIMATION_SPEED = 200
    const $modal = _createModal(options)
    let closing = false
    let destroyed = false

    const modal = {
        open() {
            !closing && $modal.classList.add('open')
            if (destroyed) {

            }
        },
        close() {
            closing = true
            $modal.classList.remove('open')
            $modal.classList.add('hide')
            setTimeout(() => {
                $modal.classList.remove('hide')
                closing = false
            }, ANIMATION_SPEED)
        },
    }

    let listener = event => {
        if (event.target.dataset.close) {
            modal.close()
        }
    }

    $modal.addEventListener('click', listener)

    return Object.assign(modal, {
        destroy() {
            $modal.parentNode.removeChild($modal)
            $modal.removeEventListener('click', listener)
            destroyed = true
        },
        setContent(html) {
            $modal.querySelector('[data-content]').innerHTML = html
        }
    })
}