window.addEventListener("load",cargar,false);

function cargar () {
	//Alta Cliente
	btnAceptarCliente = formAltaCliente.btnAltaCliente;

	document.getElementById("aFormularioAltaCliente").addEventListener("click",mostrarFormularioCliente,false);
	document.getElementById("aFormularioModificacion").addEventListener("click",mostrarSelectCliente, false);
	document.getElementById("clientesModificar").addEventListener("change",mostrarClienteModificar,false);
	document.getElementById("aFormularioBorrar").addEventListener("click",mostrarFormBorrarCliente,false);
	formBorrarCliente.btnBorrarCliente.addEventListener("click",borrarCliente,false);
	document.querySelector(".titulo").addEventListener("click",ocultarTodosFormularios,false);
	document.getElementById("aFormAluiler").addEventListener("click",mostrarFormAlquiler,false);

	// vehiculo----------------------------------
    //formulario-----------------
    btnAceptarVehiculo = fv1.btnAltaVehiculo;
    document.getElementById('altaV').addEventListener("click",mostrarFormularioAltaV,false);
    document.getElementById('modV').addEventListener("click",mostrarFormularioModV,false);
    document.getElementById('borrV').addEventListener("click",mostrarFormularioBorrV,false);
    fbv.btnBorrarVehiculo.addEventListener("click",borrarVehiculo,false);

     //validacion---------------------
    // document.fv1.addEventListener("submit",validarAltaV,false);
     //document.fmv.addEventListener("submit",validarModV,false);

		 //evento sobre el select de vehiculos
		 document.fmv.vehiculosModificar.addEventListener("change",mostrarVehiculoModificar,false);
		 document.fv1.selectTipoV.addEventListener("change",mostrarTipoV,false);



     //--Listados----------------------->
     document.getElementById("listadoV").addEventListener("click",listarVehiculosAlquilados,false);
     document.getElementById("listadoVDis").addEventListener("click",listarVehiculosDiponibles,false);
     document.getElementById("listadoAl").addEventListener("click",listarAlquiler,false);

      //--fin Listados----------------------->
      /// Seguro ---------------------------------------------------------------------
		    //formulario-----------------
		    btnAceptarSeguro = fs.btnAltaSeguro;
		    document.getElementById('altaS').addEventListener("click",mostrarFormularioAltaS,false);
		    document.getElementById('modS').addEventListener("click",mostrarFormularioModS,false);
		    document.getElementById('borrS').addEventListener("click",mostrarFormularioBorrS,false);
		    fbs.btnBorrarSeguro.addEventListener("click",borrarSeguro,false);

		 //evento sobre el select de vehiculos
		 document.fms.segurosModificar.addEventListener("change",mostrarSeguroModificar,false);

      //--Listado Seguro----------------------->
      document.getElementById("listadoS").addEventListener("click",listarSeguro,false);
      //--fin Listado  Seguro----------------------->

      document.getElementById("listadoClientes").addEventListener("click", crearTablaCliente);
      document.getElementById("aFormBorrarAlquiler").addEventListener("click",mostrarFormBorrarAlquiler, false);


  }


//Alta Cliente
function mostrarFormularioCliente () {
	ocultarTodosFormularios();
	document.getElementById("formularioCliente").style.display = "block";
	btnAceptarCliente.addEventListener("click",darAltaCliente, false);
	btnAceptarCliente.removeEventListener("click",modificacionCliente, false);
	btnAceptarCliente.setAttribute("value", "Dar de alta");

	var oTexto = document.createTextNode("Alta Cliente");
	document.getElementById("tituloFormCliente").removeChild(document.getElementById("tituloFormCliente").childNodes[0]);
	document.getElementById("tituloFormCliente").appendChild(oTexto);

	document.getElementById("lblCif").style.display = "none";

	document.getElementById("tipoCliente").style.display = "block";

	formAltaCliente.selectIdCliente.addEventListener("change",cambiarId,false);

	formAltaCliente.txtDNI.disabled = false;

}

function ocultarForularioCliente () {
	document.getElementById("formularioCliente").style.display = "none";	
}

function darAltaCliente () {
	if (validarCliente()) {
		oCliente = new Cliente(formAltaCliente.txtDNI.value,formAltaCliente.txtNombre.value, formAltaCliente.txtTelefono.value, formAltaCliente.txtEmail.value, formAltaCliente.txtDireccion.value);
		var msj = oCarRenting.altaCliente(oCliente);

		if (msj.indexOf("Alta") != -1) {
			mensaje("correcto",msj);
			ocultarForularioCliente();
		} else {
			mensaje("error",msj);
		}

	};
}

function cambiarId () {
	if(formAltaCliente.selectIdCliente.value == "2"){
		document.getElementById("lblDni").style.display = "none";
		document.getElementById("lblCif").style.display = "block";
	} else{
		document.getElementById("lblDni").style.display  = "block";
		document.getElementById("lblCif").style.display = "none";
	}
}

//Modificar Cliente
function mostrarSelectCliente () {
	ocultarTodosFormularios();
	document.getElementById("capaFormSelectCliente").style.display = "block";
	eleminarClientesSelect();
	cargarDesplegableModificarCliente();
	
}

function eleminarClientesSelect () {
	var oSelect = document.getElementById("clientesModificar");	
	
	while (oSelect.hasChildNodes()) {
		oSelect.removeChild(oSelect.childNodes[0]);
	}
}

function cargarDesplegableModificarCliente () {
	var oSelect = document.getElementById("clientesModificar");

	var oOption = document.createElement("option");

	oOption.setAttribute("value", "");

	var oTexto = document.createTextNode("Seleccionar Cliente");
	oOption.appendChild(oTexto);

	oSelect.appendChild(oOption);

	for (var i = 0; i < oCarRenting.clientes.length; i++) {
		var oOption = document.createElement("option");

		oOption.setAttribute("value", oCarRenting.clientes[i].idCliente);
		var oTexto = document.createTextNode(oCarRenting.clientes[i].nombre + " - " + oCarRenting.clientes[i].idCliente);
		oOption.appendChild(oTexto);

		oSelect.appendChild(oOption);		
	};
}

function modificacionCliente () {
	txtIdCliente = formAltaCliente.txtDNI.value;
	txtNombre = formAltaCliente.txtNombre.value;
	txtTelefono = formAltaCliente.txtTelefono.value;
	txtDireccion = formAltaCliente.txtDireccion.value;
	txtEmail = formAltaCliente.txtEmail.value;

	if (validarCliente()) {
		ocultarTodosFormularios();
		mensaje("correcto",oCarRenting.modificarCliente(txtIdCliente, txtNombre, txtTelefono, txtEmail, txtDireccion));
	};
}

function mostrarClienteModificar() {

	if (validarModificacionCliente()) {
		document.getElementById("formularioCliente").style.display = "block";
		var valor = document.getElementById("clientesModificar").value;

		btnAceptarCliente.addEventListener("click",modificacionCliente, false);
		btnAceptarCliente.removeEventListener("click",darAltaCliente, false);
		btnAceptarCliente.setAttribute("value", "Modificar");
		var oTexto = document.createTextNode("Modificar Cliente");
		document.getElementById("tituloFormCliente").removeChild(document.getElementById("tituloFormCliente").childNodes[0]);
		document.getElementById("tituloFormCliente").appendChild(oTexto);
		document.getElementById("tipoCliente").style.display = "none";

		var cliente = oCarRenting.buscarCliente(valor);
		formAltaCliente.txtDNI.disabled = true;
		formAltaCliente.txtDNI.value = cliente.idCliente;
		formAltaCliente.txtNombre.value = cliente.nombre;
		formAltaCliente.txtTelefono.value = cliente.telefono;
		formAltaCliente.txtDireccion.value = cliente.direccion;
		formAltaCliente.txtEmail.value = cliente.email;
	} else {
		document.getElementById("formularioCliente").style.display = "none";
	}

}

//Borrar Cliente

function mostrarFormBorrarCliente () {
	ocultarTodosFormularios();
	document.getElementById("capaFormSelectClienteBorrar").style.display="block";
	eleminarClientesSelectBorrar();
	cargarDesplegableBorrarCliente();
}

function eleminarClientesSelectBorrar () {
	var oSelect = document.getElementById("clientesBorrar");	
	
	while (oSelect.hasChildNodes()) {
		oSelect.removeChild(oSelect.childNodes[0]);
	}
}

function cargarDesplegableBorrarCliente () {
	var oSelect = document.getElementById("clientesBorrar");

	var oOption = document.createElement("option");

	oOption.setAttribute("value", "");
	var oTexto = document.createTextNode("Seleccionar Cliente");
	oOption.appendChild(oTexto);
	oSelect.appendChild(oOption);

	for (var i = 0; i < oCarRenting.clientes.length; i++) {
		var oOption = document.createElement("option");

		oOption.setAttribute("value", oCarRenting.clientes[i].idCliente);
		var oTexto = document.createTextNode(oCarRenting.clientes[i].nombre + " - " + oCarRenting.clientes[i].idCliente);
		oOption.appendChild(oTexto);

		oSelect.appendChild(oOption);		
	};
}

function borrarCliente () {
	var msj = oCarRenting.borrarCliente(formBorrarCliente.selectBorrarCliente.value);
	ocultarTodosFormularios();
	mensaje("correcto",msj);
	
}

//Alta alquiler
function mostrarFormAlquiler () {
	ocultarTodosFormularios();
	document.getElementById("capaFormAltaAlquiler").style.display = "block";
	cargarDesplegableClientesAlquiler();
	cargarDesplegableVehiculosAlquiler();

	document.getElementById("btnAlquiler").addEventListener("click",altaAlquiler,false);
}

function cargarDesplegableClientesAlquiler () {
	eleminarClientesSelectAlquiler();
	var oSelect = document.getElementById("selectClienteAlquiler");

	var oOption = document.createElement("option");

	oOption.setAttribute("value", "");
	var oTexto = document.createTextNode("Seleccionar Cliente");
	oOption.appendChild(oTexto);
	oSelect.appendChild(oOption);

	for (var i = 0; i < oCarRenting.clientes.length; i++) {
		var oOption = document.createElement("option");

		oOption.setAttribute("value", oCarRenting.clientes[i].idCliente);
		var oTexto = document.createTextNode(oCarRenting.clientes[i].idCliente + " - " + oCarRenting.clientes[i].nombre);
		oOption.appendChild(oTexto);

		oSelect.appendChild(oOption);		
	};
}

function eleminarClientesSelectAlquiler () {
	var oSelect = document.getElementById("selectClienteAlquiler");	
	
	while (oSelect.hasChildNodes()) {
		oSelect.removeChild(oSelect.childNodes[0]);
	}
}

function cargarDesplegableVehiculosAlquiler () {
	eleminarVehiculosSelectAlquiler();
	var oSelect = document.getElementById("selectVehiculoAlquiler");

	var oOption = document.createElement("option");

	oOption.setAttribute("value", "");
	var oTexto = document.createTextNode("Seleccionar Cliente");
	oOption.appendChild(oTexto);
	oSelect.appendChild(oOption);

	for (var i = 0; i < oCarRenting.vehiculos.length; i++) {
		var oOption = document.createElement("option");

		oOption.setAttribute("value", oCarRenting.vehiculos[i].Matricula);
		var oTexto = document.createTextNode(oCarRenting.vehiculos[i].Matricula + " - " + oCarRenting.vehiculos[i].Marca + " " + oCarRenting.vehiculos[i].Modelo);
		oOption.appendChild(oTexto);

		oSelect.appendChild(oOption);		
	};
}

function eleminarVehiculosSelectAlquiler () {
	var oSelect = document.getElementById("selectVehiculoAlquiler");	
	
	while (oSelect.hasChildNodes()) {
		oSelect.removeChild(oSelect.childNodes[0]);
	}
}

//Tarifa
function loadXMLDoc(filename)
{
	if (window.XMLHttpRequest)
	{
		xhttp=new XMLHttpRequest();
	}
	else // code for IE5 and IE6
	{
		xhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xhttp.open("GET",filename,false);
	
	xhttp.send();
	
	return xhttp.responseXML;
}

function calcularTarifa (fechaini, fechafin, tipo, id) {
	
	//cargar XML
	var oXML = loadXMLDoc("./documentos/tarifas.xml");
	var diasAlquiler = (((fechafin-fechaini)/86400)/1000);
	//calcular importe segun:
	//tipo
	//var tarifas = $('tarifa',oXML);

	var tarifas = oXML.getElementsByTagName("tarifa");
	var encontrado = false;

	if (diasAlquiler > 10) {
		if (tipo == 1) {
			precio = tarifas[tarifas.length/2-1].getElementsByTagName("precioDia")[0].textContent;
		}else{
			precio = tarifas[tarifas.length-1].getElementsByTagName("precioDia")[0].textContent;
		}
	}

	for (var i = 0; i < tarifas.length; i++) {
		if (tarifas[i].getElementsByTagName("tipoCoche")[0].textContent == tipo) {
			if (diasAlquiler >= tarifas[i].getElementsByTagName("diasMin")[0].textContent && diasAlquiler <= tarifas[i].getElementsByTagName("diasMax")[0].textContent) {
				precio = tarifas[i].getElementsByTagName("precioDia")[0].textContent;
			};
		}; 
	};

	console.log("precio " + precio);

	var tarifa = new Tarifa(id, fechaini, fechafin, tipo, parseInt(precio)*parseInt(diasAlquiler), precio);

	return tarifa;
}

function altaAlquiler () {

	if (validarAlquiler()) {
		if (!cocheAlquilado(formAltaAlquiler.selectVehiculoAlquiler.value)) {
			var id = new Date().getTime();

			var fechaEntrada = new Date(formAltaAlquiler.anyoEntradaAlquiler.value,(parseInt(formAltaAlquiler.mesEntradaAlquiler.value)-1),formAltaAlquiler.diaEntradaAlquiler.value);
			var fechaSalida = new Date(formAltaAlquiler.anyoSalidaAlquiler.value,(parseInt(formAltaAlquiler.mesSalidaAlquiler.value)-1),formAltaAlquiler.diaSalidaAlquiler.value);

			var oVehiculo = oCarRenting.buscarVehiculo(formAltaAlquiler.selectVehiculoAlquiler.value);

			var tipo = oVehiculo instanceof Turismo ? "1" : "2";

			var oTarifa = calcularTarifa(fechaSalida,fechaEntrada,tipo,id);

			var oAlquiler = new Alquiler (id,formAltaAlquiler.selectClienteAlquiler.value, formAltaAlquiler.selectVehiculoAlquiler.value, fechaEntrada, fechaSalida, formAltaAlquiler.txtKms.value, id);

			var oFactura = new Factura(id,id,oTarifa.importe,oTarifa.fechaFin);

			ocultarTodosFormularios();
			oCarRenting.altaTarifa(oTarifa);
			oCarRenting.altaFactura(oFactura);			
			mensaje("correcto",oCarRenting.altaAlquiler(oAlquiler));
		} else {
			mensaje("error","coche alquilado");
		}
	};

}
function mostrarFormBorrarAlquiler () {
	ocultarTodosFormularios();
	document.getElementById("capaFormSelectAlquilerBorrar").style.display = "block";
	cargarSelectFacturas();
	formBorrarAlquiler.btnBorrarAlquiler.addEventListener("click", borrarAlquiler, false);

}

function cargarSelectFacturas () {
	eleminarFacturasSelectBorrarAlquiler();
	var oSelect = document.formBorrarAlquiler.selectBorrarAlquiler;

	var oOption = document.createElement("option");

	oOption.setAttribute("value", "");
	var oTexto = document.createTextNode("Seleccionar factura");
	oOption.appendChild(oTexto);

	oSelect.appendChild(oOption);

	for (var i = 0; i < oCarRenting.facturas.length; i++) {
		var oOption = document.createElement("option");

		oOption.setAttribute("value", oCarRenting.facturas[i].IdFactura);
		var oTexto = document.createTextNode(oCarRenting.facturas[i].IdFactura);
		oOption.appendChild(oTexto);

		oSelect.appendChild(oOption);
	};
}

function borrarAlquiler () {

	if (validarBorrarAlquiler()) {
		var id = document.formBorrarAlquiler.selectBorrarAlquiler.value;

		oCarRenting.borrarFactura(id);
		oCarRenting.borrarTarifa(id);
		mensaje("correcto", oCarRenting.borrarAlquiler(id));

		cargarSelectFacturas();
		ocultarTodosFormularios();
	};

}

function eleminarFacturasSelectBorrarAlquiler () {
	var oSelect = document.formBorrarAlquiler.selectBorrarAlquiler	
	
	while (oSelect.hasChildNodes()) {
		oSelect.removeChild(oSelect.childNodes[0]);
	}
}

//Validaciones

function validarCliente () {
	var bValido = true;
	var sErrores = "";
	//dni
	var sDni = formAltaCliente.txtDNI.value.trim();
	formAltaCliente.txtDNI.value = formAltaCliente.txtDNI.value.trim();

	var oExpReg =/^\d{8}[a-zA-Z]{1}$/;
	var oExpReg2 = /^[a-zA-Z]{1}[0-9]{7}[0-9a-zA-Z]{1}$/;
	
	if (oExpReg.test(sDni) == false && oExpReg2.test(sDni) == false){

		if(bValido == true){
			bValido = false;		
			//Este campo obtiene el foco
			formAltaCliente.txtDNI.focus();		
		}		
		
		//Marcar error
		formAltaCliente.txtDNI.classList.add("error");

	}
	else {
		//Desmarcar error
		formAltaCliente.txtDNI.classList.remove("error");
	}

	//Nombre
	var sNombre = formAltaCliente.txtNombre.value.trim();
	formAltaCliente.txtNombre.value = formAltaCliente.txtNombre.value.trim();

	var oExpReg =/^[a-zA-Z]+\s*/;
	
	if (oExpReg.test(sNombre) == false){

		if(bValido == true){
			bValido = false;		
			//Este campo obtiene el foco
			formAltaCliente.txtNombre.focus();		
		}		
		
		//Marcar error
		formAltaCliente.txtNombre.classList.add("error");

	}
	else {
		//Desmarcar error
		formAltaCliente.txtNombre.classList.remove("error");
	}

	//Direccion
	var sDireccion = formAltaCliente.txtDireccion.value.trim();
	formAltaCliente.txtDireccion.value = formAltaCliente.txtDireccion.value.trim();
	if (oExpReg.test(sDireccion) == false){

		if(bValido == true){
			bValido = false;		
			//Este campo obtiene el foco
			formAltaCliente.txtNombre.focus();		
		}		
		
		//Marcar error
		formAltaCliente.txtDireccion.classList.add("error");

	}
	else {
		//Desmarcar error
		formAltaCliente.txtDireccion.classList.remove("error");
	}

	//telefono
	var sTelefono = formAltaCliente.txtTelefono.value.trim();
	formAltaCliente.txtTelefono.value = formAltaCliente.txtTelefono.value.trim();

	var oExpReg =/^\d{9}$/;
	
	if (oExpReg.test(sTelefono) == false){

		if(bValido == true){
			bValido = false;		
			//Este campo obtiene el foco
			formAltaCliente.txtTelefono.focus();		
		}		
		
		//Marcar error
		formAltaCliente.txtTelefono.classList.add("error");

	}
	else {
		//Desmarcar error
		formAltaCliente.txtTelefono.classList.remove("error");
	}

	//emails
	var sEmail = formAltaCliente.txtEmail.value.trim();
	formAltaCliente.txtEmail.value = formAltaCliente.txtEmail.value.trim();

	var oExpReg =/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/;
	
	if (oExpReg.test(sEmail) == false){

		if(bValido == true){
			bValido = false;		
			//Este campo obtiene el foco
			formAltaCliente.txtEmail.focus();		
		}		
		
		//Marcar error
		formAltaCliente.txtEmail.classList.add("error");

	}
	else {
		//Desmarcar error
		formAltaCliente.txtEmail.classList.remove("error");
	}

	return bValido;
}

function validarAlquiler () {
	var bValido = true;
	var sErrores = "";

	//cliente
	var cliente = formAltaAlquiler.selectClienteAlquiler.value;
	
	if (cliente == ""){

		if(bValido == true){
			bValido = false;		
			//Este campo obtiene el foco
			formAltaAlquiler.selectClienteAlquiler.focus();		
		}		
		
		//Marcar error
		formAltaAlquiler.selectClienteAlquiler.classList.add("error");

	}
	else {
		//Desmarcar error
		formAltaAlquiler.selectClienteAlquiler.classList.remove("error");
	}

	//vehiculo
	var vehiculo = formAltaAlquiler.selectVehiculoAlquiler.value;
	
	if (vehiculo == ""){

		if(bValido == true){
			bValido = false;		
			//Este campo obtiene el foco
			formAltaAlquiler.selectVehiculoAlquiler.focus();		
		}		
		
		//Marcar error
		formAltaAlquiler.selectVehiculoAlquiler.classList.add("error");

	}
	else {
		//Desmarcar error
		formAltaAlquiler.selectVehiculoAlquiler.classList.remove("error");
	}

	//fecha salida
	var diaS = formAltaAlquiler.diaSalidaAlquiler.value;
	var mesS = formAltaAlquiler.mesSalidaAlquiler.value;
	var anyoS = formAltaAlquiler.anyoSalidaAlquiler.value;
	
	if (diaS == "" || mesS == "" || anyoS == ""){

		if(bValido == true){
			bValido = false;		
			//Este campo obtiene el foco
			formAltaAlquiler.diaSalidaAlquiler.focus();		
		}		
		
		//Marcar error
		formAltaAlquiler.diaSalidaAlquiler.classList.add("error");
		formAltaAlquiler.mesSalidaAlquiler.classList.add("error");
		formAltaAlquiler.anyoSalidaAlquiler.classList.add("error");

	}
	else {
		//Desmarcar error
		formAltaAlquiler.diaSalidaAlquiler.classList.remove("error");
		formAltaAlquiler.mesSalidaAlquiler.classList.remove("error");
		formAltaAlquiler.anyoSalidaAlquiler.classList.remove("error");
	}

	//fecha entrada
	var diaE = formAltaAlquiler.diaEntradaAlquiler.value;
	var mesE = formAltaAlquiler.mesEntradaAlquiler.value;
	var anyoE = formAltaAlquiler.anyoEntradaAlquiler.value;
	
	if (diaE == "" || mesE == "" || anyoE == ""){

		if(bValido == true){
			bValido = false;		
			//Este campo obtiene el foco
			formAltaAlquiler.diaEntradaAlquiler.focus();		
		}		
		
		//Marcar error
		formAltaAlquiler.diaEntradaAlquiler.classList.add("error");
		formAltaAlquiler.mesEntradaAlquiler.classList.add("error");
		formAltaAlquiler.anyoEntradaAlquiler.classList.add("error");

	}
	else {
		//Desmarcar error
		formAltaAlquiler.diaEntradaAlquiler.classList.remove("error");
		formAltaAlquiler.mesEntradaAlquiler.classList.remove("error");
		formAltaAlquiler.anyoEntradaAlquiler.classList.remove("error");
	}

	var salida = new Date(anyoS,mesS,diaS);
	var entrada = new Date(anyoE,mesE,diaE);

	if (salida > entrada) {
		if(bValido == true){
			bValido = false;		
			//Este campo obtiene el foco
			formAltaAlquiler.diaEntradaAlquiler.focus();	
		}

		formAltaAlquiler.diaEntradaAlquiler.classList.add("error");
		formAltaAlquiler.mesEntradaAlquiler.classList.add("error");
		formAltaAlquiler.anyoEntradaAlquiler.classList.add("error");

		formAltaAlquiler.diaSalidaAlquiler.classList.add("error");
		formAltaAlquiler.mesSalidaAlquiler.classList.add("error");
		formAltaAlquiler.anyoSalidaAlquiler.classList.add("error");

	}
	else {
		//Desmarcar error
		formAltaAlquiler.diaEntradaAlquiler.classList.remove("error");
		formAltaAlquiler.mesEntradaAlquiler.classList.remove("error");
		formAltaAlquiler.anyoEntradaAlquiler.classList.remove("error");

		formAltaAlquiler.diaSalidaAlquiler.classList.remove("error");
		formAltaAlquiler.mesSalidaAlquiler.classList.remove("error");
		formAltaAlquiler.anyoSalidaAlquiler.classList.remove("error");
	}


	//kms
	var kms = formAltaAlquiler.txtKms.value;
	var oExpReg =/^\d+/;
	
	if (oExpReg.test(kms) == false){

		if(bValido == true){
			bValido = false;		
			//Este campo obtiene el foco
			formAltaAlquiler.txtKms.focus();		
		}
		
		
		//Marcar error
		formAltaAlquiler.txtKms.classList.add("error");

	}
	else {
		//Desmarcar error
		formAltaAlquiler.txtKms.classList.remove("error");
	}

	return bValido;
}

function validarModificacionCliente () {
	var correcto = true;
	if(document.getElementById("clientesModificar").value == ""){
		document.getElementById("clientesModificar").classList.add("error");
		correcto = false;
	} else {
		document.getElementById("clientesModificar").classList.remove("error");
	}

	return correcto;
}

function validarBorrarCliente () {
	var correcto = true;
	if(document.getElementById("clientesBorrar").value == ""){
		document.getElementById("clientesBorrar").classList.add("error");
		correcto = false;
	} else {
		document.getElementById("clientesBorrar").classList.remove("error");
	}

	return correcto;
}

function validarBorrarAlquiler () {
	var correcto = true;
	if(document.getElementById("selectBorrarAlquiler").value == ""){
		document.getElementById("selectBorrarAlquiler").classList.add("error");
		correcto = false;
	} else {
		document.getElementById("selectBorrarAlquiler").classList.remove("error");
	}

	return correcto;
}

function resetCamposForm () {
	var elementos = document.querySelectorAll("input[type=text]");

	for (var i = 0; i < elementos.length; i++) {
		elementos[i].classList.remove("error");
		elementos[i].value = "";
	};

	var	elem = document.querySelectorAll("select");
	for (var i = 0; i < elem.length; i++) {
		elem[i].value = "";
	};
}

function cocheAlquilado (matricula) {

	var alquilado = false;
	
	for (var i = 0; i < oCarRenting.alquileres.length; i++) {
		if(oCarRenting.alquileres[i].matricula == matricula){
			if(oCarRenting.alquileres[i].fechaEntrada > new Date()){
				alquilado = true;
			}
		}
	}

	return alquilado;
}
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
//Vehiculo
function mostrarFormularioAltaV()
{
	
	ocultarTodosFormularios();
	ocultarChildrenListados();
	mostrarTipoV();
	document.getElementById("fv").style.display = "block";
	resetCamposForm();
	cargarDesplegableSegurosAltaV();
	document.fv1.matricula.disabled = false;
	document.fv1.selectTipoV.disabled = false;
	btnAceptarVehiculo.addEventListener("click",altaVehiculo, false);
	btnAceptarVehiculo.removeEventListener("click",modificacionVehiculo, false);
	btnAceptarVehiculo.setAttribute("value", "Dar de Alta");
	var oTexto = document.createTextNode("Alta Vehiculo");
	document.getElementById("tituloFormVehiculo").removeChild(document.getElementById("tituloFormVehiculo").childNodes[0]);
	document.getElementById("tituloFormVehiculo").appendChild(oTexto);
	
	
}
function mostrarTipoV(){
	var tipo=document.fv1.selectTipoV.value;
	if (tipo=="Camion") {
		document.getElementById("tipoV").textContent="Carga:";
		document.getElementById("tipoV2").setAttribute("name","carga");
		document.getElementById("tipoV2").setAttribute("placeholder","carga");


	} else{
		document.getElementById("tipoV").textContent="NumPlazas:";
		document.getElementById("tipoV2").setAttribute("name","numPlaza");
		document.getElementById("tipoV2").setAttribute("placeholder","numPlaza");
	};
}

function mostrarFormularioModV()
{
	ocultarTodosFormularios();
	ocultarChildrenListados();
	document.getElementById("fmodV").style.display = "block";
	resetCamposForm();
	eleminarVehiculoSelect();
	cargarDesplegableModificarVehiculo();

}
function mostrarFormularioBorrV()
{
	ocultarTodosFormularios();
	ocultarChildrenListados();
	document.getElementById("fborrV").style.display = "block";
	resetCamposForm();
	eleminarVehiculoBorrarSelect();
	cargarDesplegableBorrarVehiculo();

}
function eleminarVehiculoBorrarSelect () {
	var oSelect = document.fbv.vehiculosBorrar;

	while (oSelect.hasChildNodes()) {
		oSelect.removeChild(oSelect.childNodes[0]);
	}
}
function cargarDesplegableBorrarVehiculo(){
	var oSelect = document.fbv.vehiculosBorrar;

	var oOption = document.createElement("option");

	oOption.setAttribute("value", "");
	var oTexto = document.createTextNode("Seleccionar Vehiculo");
	oOption.appendChild(oTexto);
	oSelect.appendChild(oOption);

	for (var i = 0; i < oCarRenting.vehiculos.length; i++) {
		var oOption = document.createElement("option");

		oOption.setAttribute("value", oCarRenting.vehiculos[i].Matricula);
		var oTexto = document.createTextNode(oCarRenting.vehiculos[i].Matricula + " - " + oCarRenting.vehiculos[i].Marca + " " + oCarRenting.vehiculos[i].Modelo);
		oOption.appendChild(oTexto);
		oSelect.appendChild(oOption);
	};
}
function borrarVehiculo () {
	if (validarBorrV()) {
		res=oCarRenting.borrarVehiculo(fbv.vehiculosBorrar.value);
		ocultarTodosFormularios();
		if (res=="correcto") {
			mensaje(res,"el vehiculo ha sido borrado correctamente");
		} else{
			mensaje(res,"error en el borrar vehiculo");
		};

	};
}

function cargarDesplegableModificarVehiculo(){
	
	var oSelect = document.fmv.vehiculosModificar;
	while (oSelect.hasChildNodes()) {
		oSelect.removeChild(oSelect.childNodes[0]);
	}
	var oOption = document.createElement("option");

	oOption.setAttribute("value", "");
	var oTexto = document.createTextNode("Seleccionar Vehiculo");
	oOption.appendChild(oTexto);
	oSelect.appendChild(oOption);

	for (var i = 0; i < oCarRenting.vehiculos.length; i++) {
		var oOption = document.createElement("option");

		oOption.setAttribute("value", oCarRenting.vehiculos[i].Matricula);
		var oTexto = document.createTextNode(oCarRenting.vehiculos[i].Matricula + " - " + oCarRenting.vehiculos[i].Marca + " " + oCarRenting.vehiculos[i].Modelo);
		oOption.appendChild(oTexto);
		oSelect.appendChild(oOption);
	};
}

function eleminarVehiculoSelect() {
	var oSelect = document.fmv.vehiculosModificar;

	while (oSelect.hasChildNodes()) {
		oSelect.removeChild(oSelect.childNodes[0]);
	}
}
function mostrarVehiculoModificar() {
	if (validarModV()) {
		document.getElementById("fv").style.display = "block";
		cargarDesplegableSegurosAltaV();
		var valor = document.fmv.vehiculosModificar.value;
		var vehiculo = oCarRenting.buscarVehiculo(valor);

		btnAceptarVehiculo.addEventListener("click",modificacionVehiculo, false);
		btnAceptarVehiculo.removeEventListener("click",altaVehiculo, false);
		btnAceptarVehiculo.setAttribute("value", "Modificar");
		var oTexto = document.createTextNode("Modificar Vehiculo");
		document.getElementById("tituloFormVehiculo").removeChild(document.getElementById("tituloFormVehiculo").childNodes[0]);
		document.getElementById("tituloFormVehiculo").appendChild(oTexto);
		var constructor=vehiculo.constructor.name;
		resetCamposForm();	
		document.fv1.matricula.disabled = true;
		document.fv1.selectTipoV.disabled = true;
		document.fv1.matricula.value = vehiculo.Matricula;
		document.fv1.idSeguro.value = vehiculo.IdSeguro;
		document.fv1.marca.value = vehiculo.Marca;
		document.fv1.modelo.value = vehiculo.Modelo;
		document.fv1.combustible.value = vehiculo.TipoCombustible;
		var dia=parseInt(vehiculo.FechaAdquisicion.substr(0,2));
		var mes=parseInt(vehiculo.FechaAdquisicion.substr(3,5));
		var año=parseInt(vehiculo.FechaAdquisicion.substr(6,10));
		document.fv1.day.value=dia;
		document.fv1.month.value=mes;
		document.fv1.year.value=año;


		if (constructor=="Camion") {
			document.fv1.selectTipoV.value=constructor;
			mostrarTipoV();
			document.fv1.carga.value=vehiculo.Pma;
		} else if (constructor=="Turismo"){
			document.fv1.selectTipoV.value=constructor;
			mostrarTipoV();
			document.fv1.numPlaza.value=vehiculo.NumPlazas;
		};

	} else{
		document.getElementById("fv").style.display = "none";
	};

//	document.fv1.day.value=vehiculo;
	//document.fv1.month.value=vehiculo;
	//document.fv1.year.value=vehiculo;

}
function modificacionVehiculo () {
	var sMatricula = document.fv1.matricula.value.trim();
	var sIDSeguro =parseInt(document.fv1.idSeguro.value.trim());
	var sMarca = document.fv1.marca.value.trim();
	var smodelo = document.fv1.modelo.value.trim();
	var sCombustible = document.fv1.combustible.value;
	
	var vDia =parseInt(document.fv1.day.value);
	var vMes = parseInt(document.fv1.month.value);
	var vAnyo = parseInt(document.fv1.year.value);
	var fecha= vDia+"/"+vMes+"/"+vAnyo; 
	var tipo=document.fv1.selectTipoV.value;
	if (tipo=="Turismo") {
		var sCargaPlaza =parseInt(document.fv1.numPlaza.value.trim());
	}else{
		var sCargaPlaza =parseInt(document.fv1.carga.value.trim());
	}

	if (validarAltaV()) {
		res=oCarRenting.modificacionVehiculo(sMatricula,sIDSeguro,sMarca,smodelo,sCombustible,fecha,sCargaPlaza);
		ocultarTodosFormularios();
		if (res=="correcto") {
			mensaje(res,"el vehiculo ha sido modificado correctamente");
		} else{
			mensaje(res,"error en la modificacion");
		};
		
	};


}
function validarAltaV(oEvento){
	var oE = oEvento || window.event;
	var bValido = true;
	var sErrores = "";
//--------------------------------------------------------------------------------------------
	// Validaciones
	//Campo matricula
	var sMatricula = document.fv1.matricula.value.trim();
	// Trim
	document.fv1.matricula.value = document.fv1.matricula.value.trim();

	var oExpReg =/^\d{4}[A-Z]{3}$/;

	if (oExpReg.test(sMatricula) == false){

		if(bValido == true){
			bValido = false;
			//Este campo obtiene el foco
			document.fv1.matricula.focus();
		}

		sErrores += "-Matricula incorrecta";


		//Marcar error
		document.fv1.matricula.className = "form-control error";

	}
	else {
		//Desmarcar error
		document.fv1.matricula.className = "form-control";
	}


//--------------------------------------------------------------------------------------------
	//Campo idSeguro
	var sIDSeguro = document.fv1.idSeguro;

	if (sIDSeguro.selectedIndex==0){

		if(bValido == true){
			bValido = false;

		}

		sErrores += "-idSeguro incorrecta";

		//Marcar error
		document.fv1.idSeguro.className = "form-control error";

	}
	else {
		//Desmarcar error
		document.fv1.idSeguro.className = "form-control";
	}


//--------------------------------------------------------------------------------------------
	//Campo marca
	var sMarca = document.fv1.marca.value.trim();
	// Trim
	document.fv1.marca.value = document.fv1.marca.value.trim();

	var oExpReg =/^[A-Za-z]/;

	if (oExpReg.test(sMarca) == false){

		if(bValido == true){
			bValido = false;
			//Este campo obtiene el foco
			document.fv1.marca.focus();
		}

		sErrores += "-marca incorrecta";

		//Marcar error
		document.fv1.marca.className = "form-control error";

	}
	else {
		//Desmarcar error
		document.fv1.marca.className = "form-control";
	}


//--------------------------------------------------------------------------------------------
	//Campo modelo
	var smodelo = document.fv1.modelo.value.trim();
	// Trim
	document.fv1.modelo.value = document.fv1.modelo.value.trim();

	var oExpReg =/^[A-Za-z]/;

	if (oExpReg.test(smodelo) == false){

		if(bValido == true){
			bValido = false;
			//Este campo obtiene el foco
			document.fv1.modelo.focus();
		}

		sErrores += "-modelo incorrecta";

		//Marcar error
		document.fv1.modelo.className = "form-control error";

	}
	else {
		//Desmarcar error
		document.fv1.modelo.className = "form-control";
	}

//--------------------------------------------------------------------------------------------
//Combo tipoCombustible
var sCombustible = document.fv1.combustible;


if (sCombustible.selectedIndex==0){

	if(bValido == true){
		bValido = false;

	}

	sErrores += "-Atencion Debe seleccionar tipo de Combustible";

		//Marcar error
		document.fv1.combustible.className = "form-control error";

	}
	else {
		//Desmarcar error
		document.fv1.combustible.className = "form-control";
	}



//--------------------------------------------------------------------------------------------
//validar Fecha
var sDia = document.fv1.day;
var sMes = document.fv1.month;
var sAnyo = document.fv1.year;

var vDia =parseInt(document.fv1.day.value);
var vMes = parseInt(document.fv1.month.value);
var vAnyo = parseInt(document.fv1.year.value);


if (sDia.selectedIndex==0 || sMes.selectedIndex==0 || sAnyo.selectedIndex==0 ){

	if(bValido == true){
		bValido = false;

	}

	sErrores += "-Fecha incorrecta";

		//Marcar error
		document.fv1.day.className = "form-control error";
		document.fv1.month.className = "form-control error";
		document.fv1.year.className = "form-control error";

	}else{

		if (vMes==2) { if (vDia>29) {
			bValido=false;
			sErrores += "-Fecha incorrecta";
		};
	}

	if (vMes==4) { if (vDia>30) {
		bValido=false;
		sErrores += "-Fecha incorrecta";
	};
}

if (vMes==6) { if (vDia>30) {
	bValido=false;
	sErrores += "-Fecha incorrecta";
};
}

if (vMes==9) { if (vDia>30) {
	bValido=false;
	sErrores += "-Fecha incorrecta";
};
}

if (vMes==11) { if (vDia>30) {
	bValido=false;
	sErrores += "-Fecha incorrecta";
};
}


}


//--------------------------------------------------------------------------------------------
	//validamos los campos numPlazaa o Carga
	var tipo=document.fv1.selectTipoV.value;
	if (tipo=="Turismo") {
	//Campo numPlaza
	var sNumPlaza = document.fv1.numPlaza.value.trim();
	// Trim
	document.fv1.numPlaza.value = document.fv1.numPlaza.value.trim();

	var oExpReg =/^\d/;

	if (oExpReg.test(sNumPlaza) == false){

		if(bValido == true){
			bValido = false;
			//Este campo obtiene el foco
			document.fv1.numPlaza.focus();
		}

		sErrores += "-numPlaza incorrecto";

		//Marcar error
		document.fv1.numPlaza.className = "form-control error";

	}
	else {
		//Desmarcar error
		document.fv1.numPlaza.className = "form-control";
	}
}else{
		//Campo Carga
		var sCarga = document.fv1.carga.value.trim();
	// Trim
	document.fv1.carga.value = document.fv1.carga.value.trim();

	var oExpReg =/^\d/;

	if (oExpReg.test(sCarga) == false){

		if(bValido == true){
			bValido = false;
			//Este campo obtiene el foco
			document.fv1.carga.focus();
		}

		sErrores += "-campo carga incorrecto";

		//Marcar error
		document.fv1.carga.className = "form-control error";

	}
	else {
		//Desmarcar error
		document.fv1.carga.className = "form-control";
	}
}

//--------------------------------------------------------------------------------------------



//mensaje("error",sErrores);
return bValido;

}
function validarModV(oEvento){
	var oE = oEvento || window.event;
	var bValido = true;
	var sErrores = "";
//--------------------------------------------------------------------------------------------
	// Validaciones

//Combo matricula
var sVehiculosModificar = document.fmv.vehiculosModificar;


if (sVehiculosModificar.selectedIndex==0){

	if(bValido == true){
		bValido = false;

	}

	sErrores += "\nAtencion Debe seleccionar una matricula";

		//Marcar error
		document.fmv.vehiculosModificar.className = "form-control error";

	}
	else {
		//Desmarcar error
		document.fmv.vehiculosModificar.className = "form-control";
	}


	return bValido;

}
function validarBorrV(oEvento){
	var oE = oEvento || window.event;
	var bValido = true;
	var sErrores = "";
//--------------------------------------------------------------------------------------------
	// Validaciones

//Combo matricula
var sVehiculosBorrar = document.fbv.vehiculosBorrar;


if (sVehiculosBorrar.selectedIndex==0){

	if(bValido == true){
		bValido = false;

	}

	sErrores += "\nAtencion Debe seleccionar una matricula";

		//Marcar error
		document.fbv.vehiculosBorrar.className = "form-control error";

	}
	else {
		//Desmarcar error
		document.fbv.vehiculosBorrar.className = "form-control";
	}


	return bValido;

}
function altaVehiculo(){
	var sMatricula = document.fv1.matricula.value.trim();
	var sIDSeguro =parseInt(document.fv1.idSeguro.value.trim());
	var sMarca = document.fv1.marca.value.trim();
	var smodelo = document.fv1.modelo.value.trim();
	var sCombustible = document.fv1.combustible.value;
	
	
	var vDia =parseInt(document.fv1.day.value);
	var vMes = parseInt(document.fv1.month.value);
	var vAnyo = parseInt(document.fv1.year.value);
	//var fecha=new Date(vAnyo,vMes-1,vDia);
	var fecha= vDia+"/"+vMes+"/"+vAnyo; 
	var tipo=document.fv1.selectTipoV.value;
	if (tipo=="Camion") {
		var sCarga =parseInt(document.fv1.carga.value.trim());
		if (validarAltaV()) {
			res=oCarRenting.altaVehiculo(new Camion(sMatricula,sIDSeguro,sMarca,smodelo,sCombustible,fecha,sCarga));
			ocultarTodosFormularios();
			if (res=="correcto") {
				mensaje(res,"el vehiculo ha sido dado de alta");
			} else{
				mensaje(res,"error el vehiculo ya existe");
			};
			// ocultarForularioCliente();
			// resetCamposFormAlta();
		};
	}else if(tipo=="Turismo"){
		var sNumPlaza =parseInt(document.fv1.numPlaza.value.trim());
		if (validarAltaV()) {
			res=oCarRenting.altaVehiculo(new Turismo(sMatricula,sIDSeguro,sMarca,smodelo,sCombustible,fecha,sNumPlaza));
			ocultarTodosFormularios();
			if (res=="correcto") {
				mensaje(res,"el vehiculo ha sido dado de alta");
			} else{
				mensaje(res,"error el vehiculo ya existe");
			};
	// ocultarForularioCliente();
	// resetCamposFormAlta();
};
}
document.getElementById("fv").style.display = "none";


}
////-------------------------------------------------------------------------------
 //-------------------------------------------------------------------------------
//Seguro
function mostrarFormularioAltaS()
{
	ocultarTodosFormularios();
	document.getElementById("faltaS").style.display = "block";
	resetCamposForm();
	btnAceptarSeguro.addEventListener("click",altaSeguro, false);
	btnAceptarSeguro.removeEventListener("click",modificacionSeguro, false);
	btnAceptarSeguro.setAttribute("value", "Dar de Alta");
	var oTexto = document.createTextNode("Alta Seguro");
	document.getElementById("tituloFormSeguro").removeChild(document.getElementById("tituloFormSeguro").childNodes[0]);
	document.getElementById("tituloFormSeguro").appendChild(oTexto);
	document.fs.idSeguro.disabled = false;
	
}
function mostrarFormularioModS()
{
	ocultarTodosFormularios();
	document.getElementById("fmodS").style.display = "block";
	resetCamposForm();
	eleminarSeguroSelect();
	cargarDesplegableModificarSeguro();

}
function mostrarFormularioBorrS()
{
	ocultarTodosFormularios();
	document.getElementById("fborrS").style.display = "block";
	resetCamposForm();
	eleminarSeguroBorrarSelect();
	cargarDesplegableBorrarSeguro();

}
function eleminarSeguroSelect(){
	var oSelect = document.fms.segurosModificar;

	while (oSelect.hasChildNodes()) {
		oSelect.removeChild(oSelect.childNodes[0]);
	}
}
function eleminarSeguroBorrarSelect () {
	var oSelect = document.fbs.segurosBorrar;

	while (oSelect.hasChildNodes()) {
		oSelect.removeChild(oSelect.childNodes[0]);
	}
}
function cargarDesplegableBorrarSeguro(){
	var oSelect = document.fbs.segurosBorrar;

	var oOption = document.createElement("option");

	oOption.setAttribute("value", "");
	var oTexto = document.createTextNode("Seleccionar Seguro");
	oOption.appendChild(oTexto);
	oSelect.appendChild(oOption);

	for (var i = 0; i < oCarRenting.seguros.length; i++) {
		var oOption = document.createElement("option");

		oOption.setAttribute("value", oCarRenting.seguros[i].IdSeguro);
		var oTexto = document.createTextNode(oCarRenting.seguros[i].IdSeguro + " - " +oCarRenting.seguros[i].Descripcion );
		oOption.appendChild(oTexto);

		oSelect.appendChild(oOption);
	};
}
function borrarSeguro () {

	if(validarBorrS()){
		res=oCarRenting.borrarSeguro(fbs.segurosBorrar.value);
		ocultarTodosFormularios();
		if (res=="correcto") {
			mensaje(res,"el seguro ha sido borrado correctamente");
		} else{
			mensaje(res,"error en borrar el seguro");
		};

	}
}

function eleminarVehiculoSelect () {
	var oSelect = document.fms.segurosModificar;

	while (oSelect.hasChildNodes()) {
		oSelect.removeChild(oSelect.childNodes[0]);
	}
}
function cargarDesplegableModificarSeguro(){
	var oSelect = document.fms.segurosModificar;

	var oOption = document.createElement("option");

	oOption.setAttribute("value", "");
	var oTexto = document.createTextNode("Seleccionar Seguro");
	oOption.appendChild(oTexto);
	oSelect.appendChild(oOption);

	for (var i = 0; i < oCarRenting.seguros.length; i++) {
		var oOption = document.createElement("option");

		oOption.setAttribute("value", oCarRenting.seguros[i].IdSeguro);
		var oTexto = document.createTextNode(oCarRenting.seguros[i].IdSeguro + " - " +oCarRenting.seguros[i].Descripcion );
		oOption.appendChild(oTexto);

		oSelect.appendChild(oOption);
	};
}
function cargarDesplegableSegurosAltaV(){
	var oSelect = document.fv1.idSeguro;
	while (oSelect.hasChildNodes()) {
		oSelect.removeChild(oSelect.childNodes[0]);
	}
	var oOption = document.createElement("option");

	oOption.setAttribute("value", "");
	var oTexto = document.createTextNode("Seleccionar Seguro");
	oOption.appendChild(oTexto);
	oSelect.appendChild(oOption);

	

	for (var i = 0; i < oCarRenting.seguros.length; i++) {
		var oOption = document.createElement("option");

		oOption.setAttribute("value", oCarRenting.seguros[i].IdSeguro);
		var oTexto = document.createTextNode(oCarRenting.seguros[i].IdSeguro + " - " +oCarRenting.seguros[i].Descripcion );
		oOption.appendChild(oTexto);
		oSelect.appendChild(oOption);
	};
}
function mostrarSeguroModificar() {
	
	if (validarModS()) {
		document.getElementById("faltaS").style.display = "block";

	//mostrarSelectCliente()
	var valor = document.fms.segurosModificar.value;

	btnAceptarSeguro.addEventListener("click",modificacionSeguro, false);
	btnAceptarSeguro.removeEventListener("click",altaSeguro, false);
	btnAceptarSeguro.setAttribute("value", "Modificar");
	var oTexto = document.createTextNode("Modificacion Seguro");
	document.getElementById("tituloFormSeguro").removeChild(document.getElementById("tituloFormSeguro").childNodes[0]);
	document.getElementById("tituloFormSeguro").appendChild(oTexto);

	var seguro = oCarRenting.buscarSeguro(valor);
	resetCamposForm();
	document.fs.idSeguro.disabled = true;
	document.fs.idSeguro.value = seguro.IdSeguro;
	document.fs.descripcion.value = seguro.Descripcion;
	document.fs.precio.value = seguro.Precio;

} else{
	document.getElementById("faltaS").style.display = "none";
};

}
function modificacionSeguro () {
	
	var sIDSeguro =parseInt(document.fs.idSeguro.value.trim());
	var sDescripcion = document.fs.descripcion.value.trim();
	var sPrecio =parseInt(document.fs.precio.value.trim());
	

	if (validarAltaS()) {
		res=oCarRenting.modificacionSeguro(sIDSeguro,sDescripcion,sPrecio);
		ocultarTodosFormularios();
		if (res=="correcto") {
			mensaje(res,"el Seguro ha sido modificado correctamente");
		} else{
			mensaje(res,"error en modificar el seguro");
		};
		
	};



}
function validarAltaS(oEvento){
	var oE = oEvento || window.event;
	var bValido = true;
	var sErrores = "";
//--------------------------------------------------------------------------------------------
	//Campo idSeguro
	var sIDSeguro = document.fs.idSeguro.value.trim();
	// Trim
	document.fs.idSeguro.value = document.fs.idSeguro.value.trim();

	var oExpReg =/^\d/;

	if (oExpReg.test(sIDSeguro) == false){

		if(bValido == true){
			bValido = false;
			//Este campo obtiene el foco
			document.fs.idSeguro.focus();
		}

		sErrores += "\nidSeguro incorrecta";

		//Marcar error
		document.fs.idSeguro.className = "form-control error";

	}
	else {
		//Desmarcar error
		document.fs.idSeguro.className = "form-control";
	}

//--------------------------------------------------------------------------------------------
	//Campo Descripcion
	var sDescripcion = document.fs.descripcion.value.trim();
	// Trim
	document.fs.descripcion.value = document.fs.descripcion.value.trim();

	var oExpReg =/^[A-Za-z]/;

	if (oExpReg.test(sDescripcion) == false){

		if(bValido == true){
			bValido = false;
			//Este campo obtiene el foco
			document.fs.descripcion.focus();
		}

		sErrores += "\ndescripcion incorrecto";

		//Marcar error
		document.fs.descripcion.className = "form-control error";

	}
	else {
		//Desmarcar error
		document.fs.descripcion.className = "form-control";
	}

//--------------------------------------------------------------------------------------------
	//Campo Precio
	var sPrecio = document.fs.precio.value.trim();
	document.fs.precio.value=document.fs.precio.value.trim();

	var oExpReg =/^\d/;

	if (oExpReg.test(sPrecio) == false){

		if(bValido == true){
			bValido = false;
			//Este campo obtiene el foco
			document.fs.precio.focus();
		}

		sErrores += "\nprecio incorrecto";

		//Marcar error
		document.fs.precio.className = "form-control error";

	}
	else {
		//Desmarcar error
		document.fs.precio.className = "form-control";
	}


//--------------------------------------------------------------------------------------------




return bValido;

}
function validarModS(oEvento){
	var oE = oEvento || window.event;
	var bValido = true;
	var sErrores = "";
//--------------------------------------------------------------------------------------------
	// Validaciones

//Combo isSeguro
var sSegurosModificar = document.fms.segurosModificar;


if (sSegurosModificar.selectedIndex==0){

	if(bValido == true){
		bValido = false;

	}

	sErrores += "\nAtencion Debe seleccionar un idSeguro";

		//Marcar error
		document.fms.segurosModificar.className = "form-control error";

	}
	else {
		//Desmarcar error
		document.fms.segurosModificar.className = "form-control";
	}

	
	return bValido;

}
function validarBorrS(oEvento)
{
	var oE = oEvento || window.event;
	var bValido = true;
	var sErrores = "";

	var sSegurosBorrar = document.fbs.segurosBorrar;


	if (sSegurosBorrar.selectedIndex==0){

		if(bValido == true){
			bValido = false;

		}

		sErrores += "\nAtencion Debe seleccionar un idSeguro";

				//Marcar error
				document.fbs.segurosBorrar.className = "form-control error";

			}
			else {
				//Desmarcar error
				document.fbs.segurosBorrar.className = "form-control";
			}

			
			return bValido;

		}

		function altaSeguro(){
			var sIDSeguro =parseInt(document.fs.idSeguro.value.trim());
			var sDescripcion = document.fs.descripcion.value.trim();
			var sPrecio =parseInt(document.fs.precio.value.trim());



			if (validarAltaS()) {
				res=oCarRenting.altaSeguro(new Seguro(sIDSeguro,sDescripcion,sPrecio));
				ocultarTodosFormularios();
				alert(res);
				if (res=="correcto") {
					mensaje(res,"el Seguro ha sido dado de alta correctamente");
				} else{
					mensaje(res,"error  el seguro ya existe ");
				};
			};
		//ocultarForularioCliente();


	}
 //-------------------------------------------------------------------------------
//listado de vehiculo
function crearTablaCliente () {
	ocultarTodosFormularios();
	ocultarChildrenListados();
	var capaListado=document.getElementById("listados");
	var filaCabeza=new Array("Dni/Cif","nombre", "telefono", "email", "direccion");
	lista=oCarRenting.clientes;
	if(lista.length==0){
		mensaje("error","no hay datos de clientes");
	}else{
		crearTabla(lista,filaCabeza);	
	}
}
//listado de vehiculo
function listarVehiculosAlquilados(){
	ocultarTodosFormularios();
	ocultarChildrenListados();
	var capaListado=document.getElementById("listados");
	var filaCabeza=new Array("Matricula","ID_Seguro","Marca","Modelo","Combustible","Fecha_Adquisicion","NumPlazas/Carga");
	vehiculos=oCarRenting.vehiculos;
	alquileres=oCarRenting.alquileres;
	var lista=new Array();

    //vehiculos alquilados
    for (var i = 0; i < vehiculos.length; i++) {		    	
    	for (var j = 0; j < alquileres.length; j++) {
    		var sFecha=alquileres[j].fechaEntrada;
    		if (vehiculos[i].Matricula==alquileres[j].matricula) {    			
    			if(sFecha > new Date()){
    				lista.push(vehiculos[i]);
    			}
    		}						
    	};
    };
	
	if(lista.length==0){
		mensaje("error","no hay datos de vehiculos");
	}else{
		crearTabla(lista,filaCabeza);	
	}
}

function listarVehiculosDiponibles () {
	ocultarTodosFormularios();
	ocultarChildrenListados();
	var capaListado=document.getElementById("listados");
	var filaCabeza=new Array("Matricula","ID_Seguro","Marca","Modelo","Combustible","Fecha_Adquisicion","NumPlazas/Carga");
	var vehiculos=oCarRenting.vehiculos;
	alquileres=oCarRenting.alquileres;
	var lista = vehiculos.slice();

	

    //vehiculos no alquilados
   for (var i = 0; i < vehiculos.length; i++) {

		for (var j = 0; j < alquileres.length; j++) {
			if (vehiculos[i].Matricula==alquileres[j].matricula) {
				if(alquileres[j].fechaEntrada < new Date()){

					if (lista.indexOf(vehiculos[i])==-1) {
						lista.push(vehiculos[i]);
					};


				}else {
					if (lista.indexOf(vehiculos[i])!=-1) {
						var indice = lista.indexOf(vehiculos[i]);
						lista.splice(indice,1);
					};
				}
			}

		};

	};
	
	if(lista.length==0){
		mensaje("error","no hay datos de vehiculos");
	}else{
		crearTabla(lista,filaCabeza);	
	}
}

/*
//vehiculos non alquilados
	
*/

function listarSeguro(){
	ocultarTodosFormularios();
	ocultarChildrenListados();
	var capaListado=document.getElementById("listados");
	var filaCabeza=new Array("ID_Seguro","Descripcion","Precio");
	lista=oCarRenting.seguros;
	if(lista.length==0){
		mensaje("error","no hay datos de seguros");
	}else{
		crearTabla(lista,filaCabeza);	
	}
}
function listarAlquiler(){
	ocultarTodosFormularios();
	ocultarChildrenListados();
	var capaListado=document.getElementById("listados");
	var filaCabeza=new Array("ID_Alquiler","ID_Cliente", "Matricula", "FechaEntrada", "FechaSalida", "kmsIniciales", "ID_Tarifa");
	var lista=oCarRenting.alquileres;
	if(lista.length==0){
		mensaje("correcto","no hay datos de Alquileres");
	}else{
		crearTabla(lista,filaCabeza);	
	}
}


function crearTabla(lista,filaCabeza){
	var table = document.createElement("table");
	table.setAttribute("border", "2px");
	table.classList.add('table');



	var row = table.insertRow(-1);
/*    Object.getOwnPropertyNames(lista[0]).forEach(function(val, idx, array) {
          
	 	var cell = row.insertCell(-1);
	 	cell.appendChild(document.createTextNode(val));

	 });*/
for (var i = 0; i < filaCabeza.length; i++) {

	var cell = row.insertCell(-1);
	cell.appendChild(document.createTextNode(filaCabeza[i]));
};

for (var i = 0; i < lista.length; i++) {
	var row2 = table.insertRow(-1);
	Object.getOwnPropertyNames(lista[i]).forEach(function(val, idx, array) {
		var cell = row2.insertCell(-1);
		cell.appendChild(document.createTextNode(lista[i][val]));

	});
	;
}
var capaListado=document.getElementById("listados");
capaListado.appendChild(table);
capaListado.classList.add('table-responsive');
capaListado.classList.add('bounce');
capaListado.classList.add('animated');
}

 //--------------------------------------------------------------------------------

 function mensaje(tipo,mensaje){
 	var cMensaje=document.getElementById("mensaje");
 	document.getElementById("mensaje").classList.remove("animated");
 	if(tipo=="correcto"){
 		cMensaje.querySelector("div").classList.remove("panel-danger");
 		cMensaje.querySelector("div").classList.add("panel-success");
 	}else if (tipo=="error") {
 		cMensaje.querySelector("div").classList.remove("panel-succes");
 		cMensaje.querySelector("div").classList.add("panel-danger");
 	}


 	cMensaje.querySelector("div").removeChild(cMensaje.querySelector("div").childNodes[0]);
 	h3=document.createElement("h3");
 	h3.setAttribute("class", "panel-title");
 	h3.appendChild(document.createTextNode(mensaje));
 	div=document.createElement("div");
 	div.setAttribute("class", "panel-heading");
 	div.appendChild(h3);
 	cMensaje.querySelector("div").appendChild(div);
 	cMensaje.style.display = "block";

	//cMensaje.querySelector("strong").appendChild(document.createTextNode(tipo));
	//cMensaje.querySelector("h3").appendChild(document.createTextNode(texto));

	cMensaje.classList.add("animated");
}
function ocultarTodosFormularios(){
	ocultarChildrenListados();
	var formularios=document.querySelector("#contForm").children;

	for (var i = 0; i < formularios.length; i++) {
		formularios[i].style.display="none";
	};

	resetCamposForm();
}
function ocultarChildrenListados(){
	var sNodos=document.querySelector("#listados").children;
	document.getElementById("mensaje").style.display="none";
	if (sNodos.length>0) {
		for (var i = 0; i < sNodos.length; i++) {
			document.querySelector("#listados").removeChild(sNodos[i]);
		};

	}
	
}

function fecha(oFecha){
	var dia=parseInt(oFecha.substr(0,2));
	var mes=parseInt(oFecha.substr(3,5));
	var año=parseInt(oFecha.substr(6,10));
	var sFecha=new Date(año,mes-1,dia);

	return sFecha;
}
