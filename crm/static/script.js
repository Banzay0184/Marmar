// // // // Get the modal
// // // var modal = document.getElementById("myModal");
// // //
// // // // Get the button that opens the modal
// // // var btn = document.getElementById("myBtn");
// // //
// // // // Get the <span> element that closes the modal
// // // var span = document.getElementsByClassName("close")[0];
// // //
// // //
// // // let projectBtns = document.querySelectorAll('.modal-project-btn')
// // //
// // // projectBtns.forEach(btn => {
// // //     btn.addEventListener('click', () => {
// // //         modal = document.querySelector('#modal-project-' + btn.getAttribute('id'))
// // //
// // //         modal.style.display = "block";
// // //     })
// // // })
// // //
// // // function closeModal(id) {
// // //     document.querySelector('.modal#' + id).style.display = "none"
// // // }
// // //
// // // // When the user clicks on the button, open the modal
// // // // btn.onclick = function () {
// // // //     modal.style.display = "block";
// // // // }
// // //
// // // // When the user clicks on <span> (x), close the modal
// // // // span.onclick = function () {
// // // //     modal.style.display = "none";
// // // // }
// // //
// // //
// // // // Get the modal
// // // var editmodal = document.getElementById("EditModal");
// // // ``
// // // // Get the button that opens the modal
// // // var editbtn = document.getElementById("Editbtn");
// // //
// // // // Get the <span> element that closes the modal
// // // var editspan = document.getElementsByClassName("editclose")[0];
// // //
// // // // When the user clicks on the button, open the modal
// // // editbtn.onclick = function () {
// // //     editmodal.style.display = "block";
// // // }
// // //
// // // // When the user clicks on <span> (x), close the modal
// // // // editspan.onclick = function () {
// // // //     editmodal.style.display = "none";
// // // // }
// // //
// // // let burger = document.querySelector('.hamburger-menu')
// // // let burgerMenu = document.querySelector('.burger-menu')
// // // let navbarBurger = document.querySelector('.navbar-burger')
// // //
// // // burger.addEventListener('click', () => navbarBurger.style.display = 'inline')
// // // burgerMenu.addEventListener('click', () => navbarBurger.style.display = 'none')
// //
// // // Clients page
// // const clientBtn = document.querySelectorAll('#client')
// // const clientModals = document.querySelectorAll('.clientModal')
// // const clientEditButton = document.querySelectorAll('#client_edit')
// // const formEdit = document.querySelector('#formModalEdit')
// // const formModal = document.querySelector('.formModal')
// //
// // clientBtn.forEach(client => {
// //     client.addEventListener('click', (e) => {
// //         document.getElementById(`client${client.dataset.id}`).classList.remove('hidden')
// //     })
// // })
// //
// // clientModals.forEach(item => {
// //     item.addEventListener('click', () => {
// //         item.classList.add('hidden')
// //     })
// // })
// //
// //
// // clientEditButton.forEach((btn) => {
// //     btn.addEventListener("click", (e) => {
// //         const id = e.target.dataset.id
// //         const modal = document.querySelector(`#client_edit_modal${id}`)
// //         modal.classList.remove('hidden')
// //         window.onclick = function (event) {
// //             if (event.target == modal) {
// //                 modal.classList.add('hidden')
// //                 formEdit.reset()
// //             }
// //         }
// //     })
// // })
// //
// //
// // // Modal
// // const modal = document.querySelector(".modal");
// // const openModalBtn = document.querySelector(".btn-open");
// //
// //
// // const openModal = function () {
// //     modal.classList.remove("hidden");
// // };
// //
// // openModalBtn.addEventListener("click", openModal);
// //
// // window.onclick = function (event) {
// //     if (event.target === modal) {
// //         modal.classList.add('hidden');
// //         formModal.reset()
// //     }
// // }
// //
// // // Project page
// // const orderBtn = document.querySelectorAll('#order')
// // const orderModals = document.querySelectorAll('.orderModal')
// //
// // orderBtn.forEach(order => {
// //     order.addEventListener('click', (e) => {
// //         document.getElementById(`order${order.dataset.id}`).classList.remove('hidden')
// //     })
// // })
// //
// // const orderDelBtn = document.querySelector("#orderDelBtn");
// // // const openDelModalBtn = document.querySelector(".delbtn-open");
// //
// // // const openModalDel = function () {
// // //     delModal.classList.remove("hidden");
// // // };
// // orderDelBtn.addEventListener('click', (e) => {
// //     console.log(e.target.getAttribute('data-id'))
// //     // document.getElementById(`orderDel${order.dataset.id}`).classList.remove('hidden')
// // })
//
//
// // openDelModalBtn.addEventListener("click", openModalDel);
//
//
// // ************************************************************************************* //
// const body = document.querySelector('body')
//
//
// window.addEventListener('click', (e) => {
//     const typeM = e.target.getAttribute('data-typeModel')
//     if (typeM === 'clientsCreat') {
//         creatModal(dataForm, csrf)
//     }
//     if (typeM === 'projectsCreat') {
//         creatModal(dataForm, csrf)
//     }
//     if (typeM === 'clientsInfo') {
//
//     }
// })
//
//
// function creatModal(formData, csrf) {
//     const newModal = document.createElement('div')
//     newModal.classList.add('modal-overlay')
//     newModal.insertAdjacentHTML('afterbegin', `
//         <div class="modal-window">
//             <div class="modal-header">
//                 <h3>Информация:</h3>
//             </div>
//                 <form  class="formModal py-[20px] px-[20px]" id="formModal"  method="post">
//                     ${csrf}
//                     <div class="flex mt-[20px] gap-[10px]">
//                         <button
//                             class=' ml-[12px] border bg-green-600 text-[#ffff] text-center rounded-[10px] p-[5px] hover:border hover:text-[#000] border-green-600 hover:bg-[#ffff]'
//                             type='submit'>Сохранить
//                         </button>
//                     </div>
//                 </form>
//         </div>
//         `)
//     body.append(newModal)
//     creatModalBody(formData)
//
//     const close = document.querySelector('.modal-overlay')
//     close.addEventListener('click', (e) => {
//         if (e.target.classList.value === 'modal-overlay') {
//             newModal.remove()
//         }
//     })
// }
//
// function creatModalBody(formData) {
//     const formModal = document.querySelector('#formModal')
//     let bodyModal = document.createElement('table')
//     bodyModal.classList.add('w-full')
//     formData.forEach(item => {
//         bodyModal.insertAdjacentHTML('afterbegin', `
//         <tbody class="w-100%">
//             <tr class="w-96 hover:bg-gray-100 transition-colors group">
//                 <td class="py-4 px-4 text-start">${item.title}</td>
//                 <td class="py-4 px-4 text-start">${item.form}</td>
//             </tr>
//         </tbody>
//     `)
//     })
//     formModal.append(bodyModal)
// }
