const clientEditModal = $.modal({
    title: 'Изменить информацию',
    closable: true,
    width: '400px',
    footerButtons: [
        {
            text: 'Cancel', styleBtn: 'danger', type: 'button', handler() {
                clientEditModal.close()
            }
        },
        {
            text: 'Save', styleBtn: 'primary', type: 'submit', handler() {

            }
        },
    ],
})

const ClientInfoModal = $.modal({
    title: 'Информация',
    closable: true,
    width: '400px',
    footerButtons: [
        {
            text: 'Cancel', styleBtn: 'danger', type: 'button', handler() {
                ClientInfoModal.close()
            }
        },
        {
            text: 'Edit', styleBtn: 'primary', type: 'button', dataset: 'clientEdit', handler() {
                ClientInfoModal.close()
            }
        },
    ],
})

const clientFormModal = $.modal({
    title: 'Добавить клиента',
    closable: true,
    width: '500px',
    footerButtons: [
        {
            text: 'Cancel', styleBtn: 'danger', type: 'button', handler() {
                clientFormModal.close()
            }
        },
        {
            text: 'Save', styleBtn: 'primary', type: 'submit', handler() {

            }
        },
    ]
})

const projectFormModal = $.modal({
    title: 'Новый проект:',
    closable: true,
    width: '800px',
    footerButtons: [
        {
            text: 'Cancel', styleBtn: 'danger', type: 'button', handler() {
                clientFormModal.close()
            }
        },
        {
            text: 'Save', styleBtn: 'primary', type: 'submit', handler() {

            }
        },
    ]
})

const documentFormModal = $.modal({
    title: 'Добавить документ:',
    closable: true,
    width: '600px',
    footerButtons: [
        {
            text: 'Cancel', styleBtn: 'danger', type: 'button', handler() {
                documentFormModal.close()
            }
        },
        {
            text: 'Save', styleBtn: 'primary', type: 'submit', handler() {

            }
        },
    ]
})

const projectFormDocumentEditModal = $.modal({
    title: 'Информация',
    closable: true,
    width: '400px',
    footerButtons: [
        {
            text: 'Cancel', styleBtn: 'danger', type: 'button', handler() {
                projectFormDocumentEditModal.close()
            }
        },
        {
            text: 'Save', styleBtn: 'primary', type: 'submit', handler() {
            }
        },
    ],
})

const projectFormEditModal = $.modal({
    title: 'Информация',
    closable: true,
    width: '800px',
    footerButtons: [
        {
            text: 'Cancel', styleBtn: 'danger', type: 'button', handler() {
                projectFormEditModal.close()
            }
        },
        {
            text: 'Save', styleBtn: 'primary', type: 'submit', handler() {
            }
        },
    ],
})


document.addEventListener('click', event => {
    const btnType = event.target.dataset.btn
    const id = +event.target.dataset.id
    // Clients
    if (btnType === 'clientInfo') {
        const setData = document.querySelector(`[data-btn='clientEdit']`)
        setData.setAttribute('data-id', `${id}`)
        const data = dataClientInfo.find(i => +i.id === id)
        const dataInfo = data.info.map(i => `
            <tr class="w-96 hover:bg-gray-100 transition-colors group">
                <td class="py-4 px-4 text-start">${i.title}</td>
                <td class="py-4 px-4 text-start">${i.typ}</td>
            </tr>
        `).toString().replaceAll(',', '')

        ClientInfoModal.setContent(`
            <table class="w-full text-[#051937]">
                <tbody class="w-100%">
                ${dataInfo}
                </tbody>
            </table>
        `)
        ClientInfoModal.open()
    }
    if (btnType === 'clientCreat') {
        const data = dataClientForm.map(i => `
        <tr class="w-96 hover:bg-gray-100 transition-colors group">
            <td class="py-4 px-4 text-start">${i.title}</td>
                <td class="py-4 px-4 text-start">
                    ${i.form}
                </td>
        </tr>
        `).toString().replaceAll(',', '')
        clientFormModal.setContent(`
        <div class="py-[20px] px-[20px]">
                <table class="w-full text-[#051937] ">
                    <tbody class="w-100%">
                    ${data}
                    </tbody>
                </table>
        </div>
        `)
        clientFormModal.open()
    }
    if (btnType === 'clientEdit') {
        const data = dataClientEdit.find(i => +i.id === id)
        const dataInfo = data.info.map(i =>
            `
            <tr class="w-96 hover:bg-gray-100 transition-colors group ${i.style}">
                <td class="py-4 px-4 text-start">${i.title}</td>
                <td class="py-4 px-4 text-start">
                <input class="rounded border px-[5px]" name="${i.name}" type="${i.input || 'input'}"
                                                           value="${i.typ}"></td>
            </tr>
        `
        ).toString().replaceAll(',', '')

        const dataForm = data.form.map(i =>
            `
            <tr class="w-96 hover:bg-gray-100 transition-colors group">
                <td class="py-4 px-4 text-start">${i.title}</td>
                <td class="py-4 px-4 text-start">
                    <label class="mr-1" >Instagram</label>
                    <input class="rounded border px-[5px]" name="${i.name}" type="radio" value="Instagram" ${data.form.map(item => item.id === 'Instagram' ? 'checked' : '')}>
                    <label class="mr-1" >Facebook</label>
                    <input class="rounded border px-[5px]" name="${i.name}" type="radio" value="Facebook" ${data.form.map(item => item.id === 'Facebook' ? 'checked' : '')}>
                </td>
            </tr>
        `
        ).toString().replaceAll(',', '')

        const dataStatus = data.status.map(i =>
            `
            <tr class="w-96 hover:bg-gray-100 transition-colors group">
                <td class="py-4 px-4 text-start">${i.title}</td>
                <td class="py-4 px-4 text-start">
                    <label class="mr-1" >Ожидание</label>
                    <input class="rounded border px-[5px]" name="${i.name}" type="radio" value="1" ${data.status.map(item => item.id === '1' ? 'checked' : '')}>
                    <label class="mr-1" >Встреча</label>
                    <input class="rounded border px-[5px]" name="${i.name}" type="radio" value="2" ${data.status.map(item => item.id === '2' ? 'checked' : '')}>
                    <label class="mr-1" >Договор</label>
                    <input class="rounded border px-[5px]" name="${i.name}" type="radio" value="3" ${data.status.map(item => item.id === '3' ? 'checked' : '')}>
                    <label class="mr-1" >Архив</label>
                    <input class="rounded border px-[5px]" name="${i.name}" type="radio" value="4" ${data.status.map(item => item.id === '4' ? 'checked' : '')}>
                </td>
            </tr>
        `
        ).toString().replaceAll(',', '')

        clientEditModal.setContent(`
            <table class="w-full text-[#051937]">
                <tbody class="w-100%">
                    <input class="hide" name="id" type="text" value="${id}">
                    ${dataInfo}
                    ${dataForm}
                    ${dataStatus}
                </tbody>
            </table>
        `)
        clientEditModal.open()
    }
    // Project
    if (btnType === 'projectCreat') {
        const data = dataFormProject.map(i => `
        <tr class="w-96 hover:bg-gray-100 transition-colors group">
            <td class="py-4 px-4 text-start">${i.title}</td>
                <td class="py-4 px-4 text-start">
                    ${i.form}
                </td>
        </tr>
        `).toString().replaceAll(',', '')
        projectFormModal.setContent(`
        <div class="py-[20px] px-[20px]">
                <table class="w-full text-[#051937] ">
                    <tbody class="w-100%">
                    ${data}
                    </tbody>
                </table>
        </div>
        `)
        projectFormModal.open()
    }
    if (btnType === 'projectDocumentEdit') {
        const setData = document.querySelector(`[data-btn='projectDocumentEdit']`)
        setData.setAttribute('data-id', `${id}`)
        const data = dataPro.find(i => +i.id === id)

        const dataSelect = data.select.map(i => `
            <input type="checkbox" name="username" value="${i.id}" ${data.usertrue.map(item => item.username === i.value ? 'checked' : '')} >${i.value}
        `)


        const dataInfo = data.info.map(i => `
            <tr class="w-96">
                <td class="flex gap-[12px] py-4 px-4 text-start">
                    <label>${i.title}</label>
                    <input name="project_serves_id" class="hide" value="${id}">
                    <input class="border px-[5px] group-hover:bg-gray-100 transition-colors" type="number" min="0.1" max="1000" step="0.1" name="percent" value="${i.value}" id="forms-department">
                </td>
                <td class="flex gap-[12px] py-4 px-4 text-start">
                    <label>${i.title2}</label>
                    <input class="border px-[5px] group-hover:bg-gray-100 transition-colors" type="number" min="1" max="100" name="max_parcent" value="${i.value2}" id="forms-department-two">
                </td>
                <td class="flex gap-[12px] py-4 px-4 text-start">
                    <label>${i.title2}</label>
                    ${dataSelect}
                   
                </td>
            </tr>
        `).toString().replaceAll(',', '')

        projectFormDocumentEditModal.setContent(`
            <table class="w-full text-[#051937]">
                <tbody class="w-100%">
                    ${dataInfo}
                </tbody>
            </table>
        `)
        projectFormDocumentEditModal.open()
    }
    if (btnType === 'projectDocumentCreat') {
        const data = dataDocumentForm.map(i => `
        <tr class="w-96 hover:bg-gray-100 transition-colors group">
            <td class="py-4 px-4 text-start">${i.title}</td>
                <td class="py-4 px-4 text-start">
                    ${i.form}
                </td>
        </tr>
        `).toString().replaceAll(',', '')
        documentFormModal.setContent(`
        <div class="py-[20px] px-[20px]">
                <table class="w-full text-[#051937] ">
                    <tbody class="w-100%">
                    ${data}
                    </tbody>
                </table>
        </div>
        `)
        documentFormModal.open()
    }
    if (btnType === 'projectEdit') {
        const data = dataFormEdit.find(i => +i.id === id)
        
        const dataInfo = data.info.map(i =>
            `
            <tr class="w-96 hover:bg-gray-100 transition-colors group ${i.style}">
                <td class="py-4 px-4 text-start">${i.title}</td>
                <td class="py-4 px-4 text-start">
                    <input class="border px-[5px] group-hover:bg-gray-100 transition-colors" name="${i.name}" type="text" value="${i.value}">
                </td>
            </tr>
        `
        ).toString().replaceAll(',', '')

        const dataSelect = data.select.map(i =>
            `
            <tr class="w-96 hover:bg-gray-100 transition-colors group ${i.style}">
                <td class="py-4 px-4 text-start">${i.title}</td>
                <td class="py-4 px-4 text-start">
                    <select name="client">
                        ${i.value.map(item=>`<option ${i.id === item.id ? 'selected': ''} value="${item.id}" >${item.name}  </option>`).toString().replaceAll(',', '')}
                    </select>
                </td>
            </tr>
        `
        ).toString().replaceAll(',', '')

        const dataCheckboxUser = data.checkbox.map(i => `
            <div class="flex gap-[12px]">
                        <input type="checkbox" name="username" value="${i.id}" ${data.usertrue.map(item => item.username === i.value ? 'checked' : '')} >${i.value}
            </div>
        `).toString().replaceAll(',', '')

        const dataCheckboxService = data.service.map(i => `
            <div class="flex gap-[12px]">
                        <input type="checkbox" name="service" value="${i.id}" ${data.servicetrue.map(item => item.username === i.id ? 'checked' : '')} >${i.value}
            </div>
        `).toString().replaceAll(',', '')

        projectFormEditModal.setContent(`
            <table class="w-full text-[#051937]">
                <tbody class="w-100%">
                    <input class="hide" type="text" name="order_id" value="${id}">
                    ${dataSelect}
                    ${dataInfo}
                    <tr class="w-96 hover:bg-gray-100 transition-colors group">
                        <td class="py-4 px-4 text-start">Сотрудник</td>
                        <td class="py-4 px-4 text-start">${dataCheckboxUser}</td>
                    </tr>
                    
                    <tr class="w-96 hover:bg-gray-100 transition-colors group">
                        <td class="py-4 px-4 text-start">Услуга</td>
                        <td class="py-4 px-4 text-start">${dataCheckboxService}</td>
                    </tr>
                </tbody>
            </table>
        `)
        projectFormEditModal.open()
    }

})