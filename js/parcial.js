'use strict';

/*
 *	GARCIA, ALI

 */
const d = document;
const boxTotal = d.getElementById('boxTotal');
const boxCantidad = d.getElementById('boxCantidad');
const boxTotal2 = d.getElementById('boxTotal2');
const boxCantidad2 = d.getElementById('boxCantidad2');
const miniCarrito = d.getElementById('minicarrito');
const carrito1 = d.getElementById('carrito1');
const productos = d.querySelector('#productos');
const contacto = d.querySelector('#contacto');
const nosotros = d.querySelector('#nosotros');
const slider = d.querySelector('#slider');
const navbarList = d.querySelector('#navbar-list');
const subscribe = d.querySelector('aside');
const iframe = d.querySelector('iframe');
const catTitle = d.querySelector('.catalogo-title');
const carritoFlotante = d.getElementById('flotante');
const cartTable = d.getElementById('cartTable');
const checkout = d.getElementById('checkout');

const palCheckout = d.getElementById('testButton');

let carrito = {
	productos: [],
	cantidad: [],
	cantidadGeneral: 0,
	total: 0,
};

if(localStorage.carrito){
    carrito = JSON.parse(localStorage.carrito);

}else{
    localStorage.carrito = JSON.stringify(carrito);
}

window.onload = function() {
	boxCantidad2.innerText = carrito.cantidadGeneral;
	boxTotal2.innerText = carrito.total;
  };


let valorTotal = 0;



let aProductos = [
	{
		id: 1,
		imagen: 'reme1.jpg',
		nombre: 'Remera David',
		descripcion: 'Remera con bordado lineal style - Composición 100% algodón.',
		precio: 1399,
	},
	{	id: 2,
		imagen: 'reme2.jpg',
		nombre: 'Remera Saturno',
		descripcion: 'Remera con bordado lineal style - Composición 100% algodón.',
		precio: 1399,
	},
	{	id: 3,
		imagen: 'reme3.jpg',
		nombre: 'Remera Send Help',
		descripcion: 'Remera con estampado a color - Composición 100% algodón.',
		precio: 1599,
	},
	{	id: 4,
		imagen: 'reme4.jpg',
		nombre: 'Remera Toque',
		descripcion: 'Remera con bordado lineal style - Composición 100% algodón.',
		precio: 1399,
	},
	{	id: 5,
		imagen: 'reme5.jpg',
		nombre: 'Remera Rose',
		descripcion: 'Remera con bordado lineal style - Composición 100% algodón.',
		precio: 1399,
	},
	{	id: 6,
		imagen: 'reme6.jpg',
		nombre: 'Remera Kanagawa',
		descripcion: 'Remera con estampado frontal - Composición 100% algodón.',
		precio: 1599,
	},
];


for (let producto of aProductos){
	
	let pCard = d.createElement('article');
	pCard.className = 'col-md-6 col-lg-4';

	let pBoxAmpliar = d.createElement('div');
	pBoxAmpliar.className = 'div-img-title';
		pCard.appendChild(pBoxAmpliar);

	let pImg = d.createElement('img');
		pImg.src = `img/${producto.imagen}`;
		pImg.alt = producto.descripcion;
		pBoxAmpliar.appendChild(pImg);
	
	let pName = d.createElement('h3');
		pName.innerText = producto.nombre;
		pBoxAmpliar.appendChild(pName);

	let pPrice = d.createElement('p');
		pPrice.className = 'catalogo-price';
		pPrice.innerText = `$${producto.precio}`;
		pCard.appendChild(pPrice);

	let btnBox = d.createElement('div');
		btnBox.className = 'btn-box';
		pCard.appendChild(btnBox);

	let addBtn = d.createElement('button');
		addBtn.innerText = 'Agregar al carrito';
		addBtn.className = 'add-btn';
		addBtn.dataset.id = producto.id;
		addBtn.dataset.precio = producto.precio;
		btnBox.appendChild(addBtn);



		addBtn.onclick = function () {
			let id = parseInt(this.dataset.id);
			let precio = parseInt(this.dataset.precio);
			let indice = carrito.productos.indexOf(id);

			if (indice == -1) {
				carrito.productos.push(id);
				carrito.cantidad.push(1);
				carrito.cantidadGeneral++;

			} else {
				carrito.cantidad[indice]++;
				carrito.cantidadGeneral++;
			}
			

			carrito.total = parseInt(carrito.total) + precio;
			boxCantidad2.innerText = carrito.cantidadGeneral;
			boxTotal2.innerText = carrito.total;
			
			localStorage.carrito= JSON.stringify(carrito);
			
			console.log(carrito);
		}


	pBoxAmpliar.addEventListener('click', (e) => {
		let modalProducto = d.createElement('div');
		modalProducto.id = 'modal-producto';
		modalProducto.className = 'modal-producto';
		d.querySelector('body').appendChild(modalProducto);

		let containerModalP = d.createElement('div');
		containerModalP.className = 'container-modal-p container';
		
		let imgPM = d.createElement('img');
			imgPM.src = `img/${producto.imagen}`;
			imgPM.alt = producto.descripcion;
		
		let namePM = d.createElement('h3');
			namePM.innerText = producto.nombre;
		
		let descPM = d.createElement('p');
			descPM.className = 'text-white';
			descPM.innerText = producto.descripcion;
	
		let pricePM = d.createElement('p');
			pricePM.className = 'precio-modal-p text-white';
			pricePM.innerText = `$${producto.precio}`;
	
		let btnBoxPM = d.createElement('div');
			btnBoxPM.className = 'btn-box';

		let addBtnPM = d.createElement('button');
			addBtnPM.innerText = 'Agregar al carrito';
			addBtnPM.className = 'add-btn';
			addBtnPM.dataset.id = producto.id;
			addBtnPM.dataset.precio = producto.precio;
			btnBoxPM.appendChild(addBtnPM);

		let closeBtnPM = d.createElement('a');
			closeBtnPM.innerText = 'X';
			closeBtnPM.href = "#";
			closeBtnPM.addEventListener('click', cerrarModalProducto);


		containerModalP.appendChild(imgPM);
		containerModalP.appendChild(namePM);
		containerModalP.appendChild(descPM);
		containerModalP.appendChild(pricePM);
		containerModalP.appendChild(btnBoxPM);
		containerModalP.appendChild(closeBtnPM);
		modalProducto.appendChild(containerModalP);


		addBtnPM.onclick = function () {
			let id = parseInt(this.dataset.id);
			let precio = parseInt(this.dataset.precio);
			let indice = carrito.productos.indexOf(id);

			if (indice == -1) {
				carrito.productos.push(id);
				carrito.cantidad.push(1);
				carrito.cantidadGeneral++;

			} else {
				carrito.cantidad[indice]++;
				carrito.cantidadGeneral++;
			}
			

			carrito.total = parseInt(carrito.total) + precio;
			boxCantidad2.innerText = carrito.cantidadGeneral;
			boxTotal2.innerText = carrito.total;
			
			localStorage.carrito= JSON.stringify(carrito);
			
			console.log(carrito);
		}

		
	
		})

		

productos.appendChild(pCard);
}



//MODAL CARRITO

carritoFlotante.addEventListener('click', (e) => {

	let modalCarrito = d.createElement('div');
	modalCarrito.id = 'modal-carrito';
	modalCarrito.className = 'modal';
	modalCarrito.style.zIndex = '3000';
	d.querySelector('body').appendChild(modalCarrito);

	let divContentCarrito = d.createElement('div');
	divContentCarrito.className = 'divContentCarrito';
	modalCarrito.appendChild(divContentCarrito);

	let divHeaderCarrito = d.createElement('div');
	divHeaderCarrito.className = 'table-header';
	divContentCarrito.appendChild(divHeaderCarrito);

	/*let tdH1 = d.createElement('td');
	tdH1.className = 'empty-td';
	trHeader.appendChild(tdH1);

	let tdH2 = d.createElement('td');
	tdH2.className = 'empty-td';
	trHeader.appendChild(tdH2);

	let tdH3 = d.createElement('td');
	tdH3.innerText = 'Producto';
	trHeader.appendChild(tdH3);*/

	/*let tdH4 = d.createElement('td');
	tdH4.innerText = 'Precio';
	trHeader.appendChild(tdH4);

	let tdH5 = d.createElement('td');
	trHeader.appendChild(tdH5);

	let tdH6 = d.createElement('td');
	tdH6.innerText = 'Cantidad';
	trHeader.appendChild(tdH6);

	let tdH7 = d.createElement('td');
	trHeader.appendChild(tdH7);*/

	let divNombrePro = d.createElement('div');
	divNombrePro.innerHTML = '<span>Producto</span>';
	divHeaderCarrito.appendChild(divNombrePro);

	let divSub = d.createElement('div');
	divSub.innerHTML = '<span>Subtotal</span>';
	divHeaderCarrito.appendChild(divSub);

	let closeBtnCM = d.createElement('a');
		closeBtnCM.innerText = 'X';
		closeBtnCM.href = "#";
		closeBtnCM.addEventListener('click', cerrarModal);
		modalCarrito.appendChild(closeBtnCM);

		for (let i = 0; i < carrito.productos.length; i++) {
			let productoId = carrito.productos[i];

			for (let item of aProductos) {
				if (item.id == productoId) {

					if (carrito.cantidad[i] >= 1){

					/*let tr = d.createElement('tr');
					tr.className = 'shoppingCartItem';
					tBody.appendChild(tr);*/

					let divPro = d.createElement('div');
					divPro.className = 'shoppingCartItem d-flex align-items-center';
					divContentCarrito.appendChild(divPro);

					/*let tdRemoveProductBtn = d.createElement('td');
					tdRemoveProductBtn.setAttribute('onclick', 'return this.parentNode.remove()');
					
					tr.appendChild(tdRemoveProductBtn);*/
					

					let divXBtn = d.createElement('div');
					divXBtn.setAttribute('onclick', 'return this.parentNode.remove()');
					divPro.appendChild(divXBtn);

					
					/*let removeProductBtn = d.createElement('button');
					removeProductBtn.innerText = 'x';
					tdRemoveProductBtn.appendChild(removeProductBtn);*/
					let xBtn = d.createElement('button');
					xBtn.innerText = 'x';
					divXBtn.appendChild(xBtn);

					let divProductoData = d.createElement('div');
					divProductoData.className = "divProductoData w-100 d-flex align-items-center justify-content-between";
					divPro.appendChild(divProductoData);
					let divImgData = d.createElement('div');
					divImgData.className = "d-flex align-items-center";
					divProductoData.appendChild(divImgData);
					
					/*let tdImg = d.createElement('td');
					tr.appendChild(tdImg);*/
					let boxImg = d.createElement('div');
					divImgData.appendChild(boxImg);

					let img = d.createElement('img');
					img.src = `img/${item.imagen}`;
					img.alt = item.descripcion;
					boxImg.appendChild(img);

					let boxNombre = d.createElement('div');
					divImgData.appendChild(boxNombre);

					let nombre = d.createElement('h3');
					nombre.innerText = item.nombre;
					boxNombre.appendChild(nombre);

					/*let tdPrecio = d.createElement('td');
					tr.appendChild(tdPrecio);*/

					let precio = d.createElement('span');
					precio.innerText = `$${item.precio}`;
					boxNombre.appendChild(precio);

					/*let tdAdd = d.createElement('td');
					tr.appendChild(tdAdd);*/

					let addRemoveBox = d.createElement('div');
					addRemoveBox.className = 'addRemoveBox';
					boxNombre.appendChild(addRemoveBox);
					
					let removeBtn = d.createElement('button');
					removeBtn.innerText = '-';
					addRemoveBox.appendChild(removeBtn);

					/*let tdCantidad = d.createElement('td');
					tdCantidad.className = 'unidades';
					tr.appendChild(tdCantidad);*/

					/*let tdRemove = d.createElement('td');
					tr.appendChild(tdRemove);*/

					let cantidad = d.createElement('span');
					cantidad.innerText = `${carrito.cantidad[i]}`;
					addRemoveBox.appendChild(cantidad);

					let addBtn = d.createElement('button');
					addBtn.innerText = '+';
					addRemoveBox.appendChild(addBtn);

					

					let divSubtotal = d.createElement('div');
					divProductoData.appendChild(divSubtotal);

					let subtotal = d.createElement('span');
					subtotal.innerText = `$${carrito.cantidad[i] * item.precio}`;
					divSubtotal.appendChild(subtotal);


					/**FUNCIONES DE LOS BOTONES*/

					xBtn.onclick = function () {
						let id = parseInt(item.id);
						let precio = parseInt(item.precio);
						let indice = carrito.productos.indexOf(id);
						let labelTotal = d.querySelector('.total-carrito');
						

						if (indice !== -1) {
							if(carrito.cantidad[indice] > 0){
								carrito.cantidadGeneral = carrito.cantidadGeneral - carrito.cantidad[indice];
								carrito.total = parseInt(carrito.total) - (precio * carrito.cantidad[indice]);
								boxCantidad2.innerText = carrito.cantidadGeneral;
								boxTotal2.innerText = carrito.total;
					
								delete carrito.productos[indice];
								delete carrito.cantidad[indice];
								console.log(`cantidad general: ${carrito.cantidadGeneral}`);
								localStorage.carrito = JSON.stringify(carrito);
								labelTotal.innerText = `Total: $${carrito.total}`;
							}
							carritoVacio();
						console.log(carrito);
						
					}
					}

					addBtn.onclick = function () {
						let id = parseInt(item.id);
						let precio = parseInt(item.precio);
						let indice = carrito.productos.indexOf(id);
						let labelTotal = d.querySelector('.total-carrito');
			
						if (indice == -1) {
							carrito.productos.push(id);
							carrito.cantidad.push(1);
							carrito.cantidadGeneral++;
							
			
						} else {
							carrito.cantidad[indice]++;
							carrito.cantidadGeneral++;
						}
						
			
						carrito.total = parseInt(carrito.total) + precio;
						boxCantidad2.innerText = carrito.cantidadGeneral;
						boxTotal2.innerText = carrito.total;
						labelTotal.innerText = `Total: $${carrito.total}`;
						cantidad.innerText = `${carrito.cantidad[i]}`;
						subtotal.innerText = `$${carrito.cantidad[i] * item.precio}`;
						
						localStorage.carrito= JSON.stringify(carrito);
						
						console.log(carrito);
					}

					removeBtn.onclick = function () {
						let id = parseInt(item.id);
						let precio = parseInt(item.precio);
						let indice = carrito.productos.indexOf(id);
						let labelTotal = d.querySelector('.total-carrito');
			
						if (indice !== -1) {
							if(carrito.cantidad[indice] > 1){
								carrito.cantidad[indice]--;
								carrito.cantidadGeneral--;
								carrito.total = parseInt(carrito.total) - precio;
								boxCantidad2.innerText = carrito.cantidadGeneral;
								boxTotal2.innerText = carrito.total;

								labelTotal.innerText = `Total: $${carrito.total}`;
								cantidad.innerText = `${carrito.cantidad[i]}`;
								subtotal.innerText = `$${carrito.cantidad[i] * item.precio}`;
			
								localStorage.carrito= JSON.stringify(carrito);
							}
							
			
						}
			
						console.log(carrito);
						
					}

					

					}
				}
			}
		}

		
	let vaciadoMsj = d.createElement('div');
	vaciadoMsj.innerHTML = 'Haz vaciado el carrito';
	carritoVacio();
			
	const divTotal = d.createElement('div');
	modalCarrito.appendChild(divTotal);
	divTotal.className = 'total-box-carrito';

	let labelTotal = d.createElement('span');
	labelTotal.innerText = `Total: $${carrito.total}`;
	labelTotal.className = 'total-carrito';
	divTotal.appendChild(labelTotal);

	const btnBoxCarrito = d.createElement('div');
	modalCarrito.appendChild(btnBoxCarrito);
	btnBoxCarrito.className = 'btn-box-carrito';


	const vaciar = d.createElement('button');
	vaciar.innerText = 'Vaciar Carrito';
	vaciar.className = 'btn-vaciar';
	btnBoxCarrito.appendChild(vaciar);
	vaciar.onclick = function () {
		localStorage.clear();
		location.reload();
		productos.appendChild(vaciadoMsj);
	}

	function carritoVacio(){
		if (carrito.total == 0){
			console.log('HOLA ESTOY DENTRO DE CARRITO VACIO');
			const carritoVacio = d.createElement('span');
			carritoVacio.className = 'carrito-vacio';
			carritoVacio.innerText = `¡No hay productos en tu carrito!`;
			modalCarrito.appendChild(carritoVacio);

            const removeTable = document.querySelector(".divContentCarrito");
			removeTable.parentNode.removeChild(removeTable);

			const removeBtnBox = document.querySelector(".btn-box-carrito");
			removeBtnBox.parentNode.removeChild(removeBtnBox);

			const removeBoxTotal = document.querySelector(".total-box-carrito");
			removeBoxTotal.parentNode.removeChild(removeBoxTotal);
		} else {
			console.log(`${carrito.total}`);
	  }
	}

	let checkoutBtn = d.createElement('button');
	checkoutBtn.innerText = 'Iniciar Compra';
	checkoutBtn.className = 'checkout-btn';
	btnBoxCarrito.appendChild(checkoutBtn);

	checkoutBtn.addEventListener('click', (e) => {

		productos.remove();
		nosotros.remove();
		contacto.remove();
		iframe.remove();
		subscribe.remove();
		slider.remove();
		navbarList.remove()
		catTitle.remove();
		document.querySelector('.modal').remove();
		carritoFlotante.remove();

		let checkoutContainer0 = d.createElement('div');
		checkoutContainer0.id = 'checkout-container0';
		checkoutContainer0.className = 'row bg-white';
		checkout.appendChild(checkoutContainer0);

		let checkoutContainer = d.createElement('div');
		checkoutContainer.id = 'checkout-container';
		checkoutContainer.className = 'row bg-white d-flex flex-column-reverse flex-lg-row';
		checkout.appendChild(checkoutContainer);
		
		let checkoutTitle = d.createElement('h2');
		checkoutTitle.className = 'col-12';
		checkoutTitle.innerText = 'Checkout';
		checkoutContainer0.appendChild(checkoutTitle);
	
		let div1 = d.createElement('div');
		div1.id = 'div1';
		div1.className = 'col-lg-6 px-5';
		checkoutContainer.appendChild(div1);
	
		let facturacionBox = d.createElement('div');
		div1.appendChild(facturacionBox);
	
		let factTitle = d.createElement('h3');
		factTitle.innerText = 'Datos de facturación';
		facturacionBox.appendChild(factTitle);
	
		let factForm =d.createElement('form');
		factForm.onsubmit = continuar;
		factForm.setAttribute('name', 'facturacion');
		facturacionBox.appendChild(factForm);
	
		let nameL = d.createElement('label');
		nameL.style.display = 'none';
		nameL.innerText = 'Nombre';
		nameL.setAttribute('for', 'nombre');
		factForm.appendChild(nameL);
	
		let nameI = d.createElement('input');
		nameI.setAttribute('name', 'nombre');
		nameI.setAttribute('type', 'text');
		nameI.setAttribute('required', '');
		nameI.placeholder = 'Nombre';
		factForm.appendChild(nameI);
	
		let lastnameL = d.createElement('label');
		lastnameL.style.display = 'none';
		lastnameL.innerText = 'Apellido';
		lastnameL.setAttribute('for', 'apellido');
		factForm.appendChild(lastnameL);
	
		let lastnameI = d.createElement('input');
		lastnameI.setAttribute('name', 'apellido');
		lastnameI.setAttribute('type', 'text');
		lastnameI.setAttribute('required', '');
		lastnameI.placeholder = 'Apellido';
		factForm.appendChild(lastnameI);
	
		let phoneL = d.createElement('label');
		phoneL.style.display = 'none';
		phoneL.innerText = 'Teléfono';
		phoneL.setAttribute('for', 'telefono');
		factForm.appendChild(phoneL);
	
		let phoneI = d.createElement('input');
		phoneI.setAttribute('name', 'telefono');
		phoneI.setAttribute('type', 'number');
		phoneI.setAttribute('required', '');
		phoneI.setAttribute('pattern', '[0-9]{10}')
		phoneI.placeholder = 'Teléfono';
		factForm.appendChild(phoneI);
	
		let emailL = d.createElement('label');
		emailL.style.display = 'none';
		emailL.innerText = 'Correo electrónico';
		emailL.setAttribute('for', 'correo');
		factForm.appendChild(emailL);
	
		let emailI = d.createElement('input');
		emailI.setAttribute('name', 'correo');
		emailI.setAttribute('type', 'email');
		emailI.setAttribute('required', '');
		emailI.placeholder = 'Correo electrónico';
		factForm.appendChild(emailI);
	
		let streetL = d.createElement('label');
		streetL.style.display = 'none';
		streetL.innerText = 'Calle y número';
		streetL.setAttribute('for', 'calle');
		factForm.appendChild(streetL);
	
		let streetI = d.createElement('input');
		streetI.setAttribute('name', 'calle');
		streetI.setAttribute('type', 'text');
		streetI.setAttribute('required', '');
		streetI.placeholder = 'Calle y número';
		factForm.appendChild(streetI);
	
		let deptoL = d.createElement('label');
		deptoL.style.display = 'none';
		deptoL.innerText = 'Departamento';
		deptoL.setAttribute('for', 'departamento');
		factForm.appendChild(deptoL);
	
		let deptoI = d.createElement('input');
		deptoI.setAttribute('name', 'departamento');
		deptoI.setAttribute('required', '');
		deptoI.setAttribute('type', 'text');
		deptoI.placeholder = 'Departamento';
		factForm.appendChild(deptoI);
	
		let barrioL = d.createElement('label');
		barrioL.style.display = 'none';
		barrioL.innerText = 'Barrio';
		barrioL.setAttribute('for', 'barrio');
		factForm.appendChild(barrioL);
	
		let barrioI = d.createElement('input');
		barrioI.setAttribute('name', 'barrio');
		barrioI.setAttribute('type', 'text');
		barrioI.setAttribute('required', '');
		barrioI.placeholder = 'Barrio';
		factForm.appendChild(barrioI);
	
		let cityL = d.createElement('label');
		cityL.style.display = 'none';
		cityL.innerText = 'Ciudad';
		cityL.setAttribute('for', 'ciudad');
		factForm.appendChild(cityL);
	
		let cityI = d.createElement('input');
		cityI.setAttribute('name', 'ciudad');
		cityI.setAttribute('type', 'text');
		cityI.setAttribute('required', '');
		cityI.placeholder = 'Ciudad';
		factForm.appendChild(cityI);
	
		let cpL = d.createElement('label');
		cpL.style.display = 'none';
		cpL.innerText = 'Código Postal';
		cpL.setAttribute('for', 'cp');
		factForm.appendChild(cpL);
	
		let cpI = d.createElement('input');
		cpI.setAttribute('name', 'cp');
		cpI.setAttribute('type', 'number');
		cpI.setAttribute('required', '');
		cpI.placeholder = 'Código Postal';
		factForm.appendChild(cpI);
	
		let provinciaL = d.createElement('label');
		provinciaL.style.display = 'none';
		provinciaL.innerText = 'Provincia';
		provinciaL.setAttribute('for', 'provincia');
		factForm.appendChild(provinciaL);
	
		let provinciaI = d.createElement('input');
		provinciaI.setAttribute('name', 'provincia');
		provinciaI.setAttribute('type', 'text');
		provinciaI.setAttribute('required', '');
		provinciaI.placeholder = 'Provincia';
		factForm.appendChild(provinciaI);
	
		let notasL = d.createElement('label');
		notasL.innerText = 'Notas';
		notasL.setAttribute('for', 'notas');
		factForm.appendChild(notasL);
	
		let notasI = d.createElement('textarea');
		notasI.setAttribute('name', 'notas');
		notasI.setAttribute('rows', '4');
		notasI.setAttribute('cols', '25');
		notasI.placeholder = 'Información adicional que consideres oportuna (Opcional)';
		factForm.appendChild(notasI);
	
		let datosSubmit = d.createElement('input');
		datosSubmit.setAttribute('type', 'submit');
		datosSubmit.setAttribute('value', 'Continuar');
		factForm.appendChild(datosSubmit);

		
	
	
		//Orden
	
		let div2 = d.createElement('div');
		div2.id = 'div2';
		div2.className = 'col-lg-6 px-5 mt-5 mt-lg-0';
		checkoutContainer.appendChild(div2);
	
		let ordenBox = d.createElement('div');
		ordenBox.className = 'orden-box';
		div2.appendChild(ordenBox);
	
		let ordenTitle = d.createElement('h3');
		ordenTitle.innerText = 'Tu Orden';
		ordenBox.appendChild(ordenTitle);
	
		let table = d.createElement('table');
		ordenBox.appendChild(table);
	
		let tBody = d.createElement('tbody');
		table.appendChild(tBody);
	
	
			for (let i = 0; i < carrito.productos.length; i++) {
				let productoId = carrito.productos[i];
				
				for (let item of aProductos) {
					if (item.id == productoId) {
						let tr = d.createElement('tr');
						tBody.appendChild(tr);
	
						let tdImg = d.createElement('td');
						tr.appendChild(tdImg);
	
						let img = d.createElement('img');
						img.src = `img/${item.imagen}`;
						img.alt = item.descripcion;
						tdImg.appendChild(img);
	
						let tdNombre = d.createElement('td');
						tr.appendChild(tdNombre);
	
						let nombre = d.createElement('h4');
						nombre.innerText =`${item.nombre} x  ${carrito.cantidad[i]}`;
						tdNombre.appendChild(nombre);
	
						let tdCantidad = d.createElement('td');
						tr.appendChild(tdCantidad);
	
						let tdSubtotal = d.createElement('td');
						tr.appendChild(tdSubtotal);
	
						let subtotal = d.createElement('span');
						subtotal.innerText = `$${carrito.cantidad[i] * item.precio}`;
						tdSubtotal.appendChild(subtotal);
					
					}
				}
			}
	
	
	
			let tr = d.createElement('tr');
			tr.className = 'trTotal';
			tBody.appendChild(tr);
	
			let td1 = d.createElement('td');
			tr.appendChild(td1);
			let td2 = d.createElement('td');
			tr.appendChild(td2);
	
			let td4 = d.createElement('td');
			tr.appendChild(td4);
			let labelTotal = d.createElement('span');
			labelTotal.innerText = 'Total:';
			td1.appendChild(labelTotal);
	
			let tdTotal = d.createElement('td');
			tr.appendChild(tdTotal);
			let total = d.createElement('span');
			total.innerText = `$${carrito.total}`;
			tdTotal.appendChild(total);

			let btnVolver = d.createElement('button');
			btnVolver.innerHTML = '<span class="chevron">&#8249;</span> Volver a la tienda';
			btnVolver.className = 'btn-volver';
			div2.appendChild(btnVolver);

			btnVolver.addEventListener('click', (e) => {
				location.reload();
			});
	
	
			function continuar(){
				factForm.remove();
	
				factTitle.innerText = 'Medios de Pago';
	
				let tarjetaBox = d.createElement('div');
				tarjetaBox.id = 'tarjeta-box';
				div1.appendChild(tarjetaBox);
	
				let tbTitle = d.createElement('h4');
				tbTitle.innerHTML = 'Tarjeta de crédito y débito';
				tarjetaBox.appendChild(tbTitle);

				const formTarjeta = d.createElement('form');
					formTarjeta.onsubmit = graciasTarjeta;
					tarjetaBox.appendChild(formTarjeta);
	
					let numTarjetaL = d.createElement('label');
					numTarjetaL.style.display = 'none';
					numTarjetaL.innerText = 'Número de tarjeta';
					numTarjetaL.setAttribute('for', 'numero-tarjeta');
					formTarjeta.appendChild(numTarjetaL);
	
					let numTarjetaI = d.createElement('input');
					numTarjetaI.setAttribute('name', 'numero-tarjeta');
					numTarjetaI.setAttribute('type', 'number');
					numTarjetaI.setAttribute('required', '');
					numTarjetaI.placeholder = 'Número de tarjeta';
					formTarjeta.appendChild(numTarjetaI);
	
					let titularL = d.createElement('label');
					titularL.style.display = 'none';
					titularL.innerText = 'Titular de la tarjeta';
					titularL.setAttribute('for', 'titular');
					formTarjeta.appendChild(titularL);
	
					let titularI = d.createElement('input');
					titularI.setAttribute('name', 'titular');
					titularI.setAttribute('type', 'text');
					titularI.setAttribute('required', '');
					titularI.placeholder = 'Titular de la tarjeta';
					formTarjeta.appendChild(titularI);
	
					let vencimientoL = d.createElement('label');
					vencimientoL.style.display = 'none';
					vencimientoL.innerText = 'Vencimiento de la tarjeta';
					vencimientoL.setAttribute('for', 'vencimiento');
					formTarjeta.appendChild(vencimientoL);
	
					let vencimientoI = d.createElement('input');
					vencimientoI.setAttribute('name', 'vencimiento');
					vencimientoI.setAttribute('type', 'number');
					vencimientoI.setAttribute('required', '');
					vencimientoI.placeholder = 'Vencimiento (MM/AA)';
					formTarjeta.appendChild(vencimientoI);
	
					let cvvL = d.createElement('label');
					cvvL.style.display = 'none';
					cvvL.innerText = 'Código de la tarjeta';
					cvvL.setAttribute('for', 'cvv');
					formTarjeta.appendChild(cvvL);
	
					let cvvI = d.createElement('input');
					cvvI.setAttribute('name', 'cvv');
					cvvI.setAttribute('type', 'number');
					cvvI.setAttribute('required', '');
					cvvI.placeholder = 'CVV';
					formTarjeta.appendChild(cvvI);
	
					let dniL = d.createElement('label');
					dniL.style.display = 'none';
					dniL.innerText = 'DNI del titular';
					dniL.setAttribute('for', 'dni');
					formTarjeta.appendChild(dniL);
	
					let dniI = d.createElement('input');
					dniI.setAttribute('name', 'dni');
					dniI.setAttribute('type', 'number');
					dniI.setAttribute('required', '');
					dniI.placeholder = 'DNI del titular';
					formTarjeta.appendChild(dniI);
	
					let tarjetaSubmit = d.createElement('input');
					tarjetaSubmit.setAttribute('type', 'submit');
					tarjetaSubmit.setAttribute('value', 'REALIZAR PEDIDO');
					formTarjeta.appendChild(tarjetaSubmit);
	
	
				function graciasTarjeta(){
						checkout.remove();
	
					let modalGraciasTarjeta = d.createElement('div');
					modalGraciasTarjeta.id = 'modal-gracias-tarjeta';
					modalGraciasTarjeta.className = 'modal';
					d.querySelector('body').appendChild(modalGraciasTarjeta);
					
					let boxMsj = d.createElement('div');
					boxMsj.className = 'box-msj';
					modalGraciasTarjeta.appendChild(boxMsj);
						
					let logo = d.createElement('img');
					logo.src = 'img/marca.jpg';
					logo.alt = 'Logo de Qüinto Placebo';
					boxMsj.appendChild(logo);
					
					let gTarjeta = d.createElement('h2');
					gTarjeta.innerText = 'Gracias por tu pedido :)';
					boxMsj.appendChild(gTarjeta);
	
					let gTarjetaP = d.createElement('p');
					boxMsj.appendChild(gTarjetaP);
					gTarjetaP.innerText = 'Te enviaremos un mail con la factura e información de envío.';

					let closeBtnGT = d.createElement('a');
					closeBtnGT.innerText = 'X';
					closeBtnGT.href = "#";
					closeBtnGT.addEventListener('click', cerrarModalGracias);
					modalGraciasTarjeta.appendChild(closeBtnGT);
			
			};

			function graciasTransfe(){
				checkout.remove();

			let modalGraciasTarjeta = d.createElement('div');
			modalGraciasTarjeta.id = 'modal-gracias-tarjeta';
			modalGraciasTarjeta.className = 'modal';
			d.querySelector('body').appendChild(modalGraciasTarjeta);
			
			let boxMsj = d.createElement('div');
			boxMsj.className = 'box-msj';
				modalGraciasTarjeta.appendChild(boxMsj);
				
			let logo = d.createElement('img');
			logo.src = 'img/marca.jpg';
			logo.alt = 'Logo de Qüinto Placebo';
			boxMsj.appendChild(logo);
			
			let gTarjeta = d.createElement('h2');
			gTarjeta.innerText = 'Gracias por tu pedido :)';
			boxMsj.appendChild(gTarjeta);

			let gTarjetaP = d.createElement('p');
			boxMsj.appendChild(gTarjetaP);
			gTarjetaP.innerText = 'Te enviaremos un mail con los datos bancarios para la transferencia.';

			let closeBtnGT = d.createElement('a');
			closeBtnGT.innerText = 'X';
			closeBtnGT.href = "#";
			closeBtnGT.addEventListener('click', cerrarModalGracias);
			modalGraciasTarjeta.appendChild(closeBtnGT);
	
	};

					
				let transfeBox = d.createElement('div');
				transfeBox.id = 'transfe-box';
				div1.appendChild(transfeBox);
	
				let trbTitle = d.createElement('h4');
				trbTitle.innerHTML = 'Transferencia Bancaria';
				transfeBox.appendChild(trbTitle);

				let trMsj = d.createElement('p');
					trMsj.innerText = 'Por favor confirma tu email. Al presionar el botón de REALIZAR PEDIDO recibirás un correo con la info bancaria para realizar la transferencia.'
					transfeBox.appendChild(trMsj);

					
					let trForm = d.createElement('form');
					transfeBox.appendChild(trForm);
					trForm.onsubmit = graciasTransfe;
	
					let confirmEmailL = d.createElement('label');
					confirmEmailL.innerText = 'Correo Electrónico';
					confirmEmailL.style.display = 'none';
					confirmEmailL.setAttribute('for', 'correo');
					trForm.appendChild(confirmEmailL);
	
					let confirmEmailI = d.createElement('input');
					confirmEmailI.setAttribute('name', 'correo');
					confirmEmailI.setAttribute('type', 'email');
					confirmEmailI.setAttribute('required', '');
					trForm.appendChild(confirmEmailI);
					confirmEmailI.placeholder = 'Correo Electrónico';
	
					let trSubmit = d.createElement('input');
					trSubmit.setAttribute('type', 'submit');
					trSubmit.setAttribute('value', 'REALIZAR PEDIDO');
					trForm.appendChild(trSubmit);

				//Funciones toggle medios de pago
	
				trbTitle.addEventListener('click', (e) => {

					if (transfeBox.classList.contains('active')){
						transfeBox.classList.remove('active');
					} else {
						transfeBox.className= 'active';

						if (tarjetaBox.classList.contains('active')){
							tarjetaBox.classList.remove('active');
						}
					}
					
				})

				tbTitle.addEventListener('click', (e) => {
					
					if (tarjetaBox.classList.contains('active')){
						tarjetaBox.classList.remove('active');
					} else {
					tarjetaBox.className= 'active';
					if (transfeBox.classList.contains('active')){
						transfeBox.classList.remove('active');
					}
					}
				});
				
	
	
	
			};
	});
	

	

	

}
);

const cerrarModal = (e) => {

    document.querySelector('.modal').remove();

}

const cerrarModalProducto = (e) => {

    document.querySelector('.modal-producto').remove();

}

const cerrarModalGracias = (e) => {
	localStorage.clear();
	location.reload();
    document.querySelector('.modal').remove();

}


function graciasSuscripcion(){

	let modalGraciasTarjeta = d.createElement('div');
	modalGraciasTarjeta.id = 'modal-gracias-tarjeta';
	modalGraciasTarjeta.className = 'modal';
	d.querySelector('body').appendChild(modalGraciasTarjeta);
	
	let boxMsj = d.createElement('div');
	boxMsj.className = 'box-msj';
		modalGraciasTarjeta.appendChild(boxMsj);
		
	let logo = d.createElement('img');
	logo.src = 'img/marca.jpg';
	logo.alt = 'Logo de Qüinto Placebo';
	boxMsj.appendChild(logo);
	
	let gTarjeta = d.createElement('h2');
	gTarjeta.innerText = 'Gracias por susbcribirte :)';
	boxMsj.appendChild(gTarjeta);

	let gTarjetaP = d.createElement('p');
	boxMsj.appendChild(gTarjetaP);
	gTarjetaP.innerText = 'Te enviaremos mails cada que hayan nuevas promociones.';

	let closeBtnGT = d.createElement('a');
	closeBtnGT.innerText = 'X';
	closeBtnGT.href = "#";
	closeBtnGT.addEventListener('click', cerrarModal);
	modalGraciasTarjeta.appendChild(closeBtnGT);

};

function graciasContacto(){

	let modalGraciasTarjeta = d.createElement('div');
	modalGraciasTarjeta.id = 'modal-gracias-tarjeta';
	modalGraciasTarjeta.className = 'modal';
	d.querySelector('body').appendChild(modalGraciasTarjeta);
	
	let boxMsj = d.createElement('div');
	boxMsj.className = 'box-msj';
		modalGraciasTarjeta.appendChild(boxMsj);
		
	let logo = d.createElement('img');
	logo.src = 'img/marca.jpg';
	logo.alt = 'Logo de Qüinto Placebo';
	boxMsj.appendChild(logo);
	
	let gTarjeta = d.createElement('h2');
	gTarjeta.innerText = 'Gracias por tu consulta :)';
	boxMsj.appendChild(gTarjeta);

	let gTarjetaP = d.createElement('p');
	boxMsj.appendChild(gTarjetaP);
	gTarjetaP.innerText = 'Te responderemos a la brevedad.';

	let closeBtnGT = d.createElement('a');
	closeBtnGT.innerText = 'X';
	closeBtnGT.href = "#";
	closeBtnGT.addEventListener('click', cerrarModal);
	modalGraciasTarjeta.appendChild(closeBtnGT);

};
function infoAlumno(){

	let modalGraciasTarjeta = d.createElement('div');
	modalGraciasTarjeta.id = 'modal-alumno';
	modalGraciasTarjeta.className = 'modal';
	d.querySelector('body').appendChild(modalGraciasTarjeta);
	
	let boxMsj = d.createElement('div');
	boxMsj.className = 'box-msj';
	modalGraciasTarjeta.appendChild(boxMsj);
	boxMsj.innerHTML = `
	<section class="container mb-5">
				<div class="row justify-content-center">
					<h2 class="col-lg-4">Datos del Alumno</h2>
					<div class="col-12 bg-white">
						<div class="nosotros-cont mx-auto py-5 d-flex flex-column flex-md-row align-items-center">
                            <figure>
                                    <picture id="pic-alumno" class="col-12 text-center">
                                    <img src="img/fotodeperfil.png" class="figure-img img-fluid" alt="Ali Garcia">
                                  </picture>
                            </figure>
                            <div id="data-alumno">
                                <h3 class="text-left">Alí García</h3>
                                <ul class="list-unstyled">
                                    <li><span class="font-weight-bold">Carrera:</span> Diseño y Programación Web</li>
                                    <li><span class="font-weight-bold">Materia:</span> Interacción con Dispositivos Móviles</li>
                                    <li><span class="font-weight-bold">Comisión:</span> A</li>
                                    <li><span class="font-weight-bold">Turno:</span> Mañana</li>
                                    <li><span class="font-weight-bold">Cuatrimestre:</span> 2</li>
                                    <li><span class="font-weight-bold">Año:</span> 2020</li>
                                    <li><span class="font-weight-bold">Docente:</span> Omar Toyos</li>
                                    <li><span class="font-weight-bold">Carácter de entrega:</span> Final</li>
                                    
                                </ul>
                            </div>
						</div>
					</div>
				</div>
			</section>
	`;
		

	let closeBtnGT = d.createElement('a');
	closeBtnGT.innerText = 'X';
	closeBtnGT.href = "#";
	closeBtnGT.addEventListener('click', cerrarModal);
	modalGraciasTarjeta.appendChild(closeBtnGT);

};

function submitForm (){
	let formSubmit = d.getElementById('subscribe');
	formSubmit.onsubmit = graciasSuscripcion;
	let formSubmitContact = d.getElementById('form-contacto');
	formSubmitContact.onsubmit = graciasContacto;
}

function infoAlumnoOpen (){
	let infoAlumnoBtn = d.getElementById('info-alumno');
	infoAlumnoBtn.onclick = infoAlumno;
}

submitForm();
infoAlumnoOpen();




