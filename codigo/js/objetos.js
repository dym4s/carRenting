//--------------------------------------------------------------------------------------------------------------------
//azizz
//--------------------------------------------------------------------------------------------------------------------
// Objeto Vehiculo
function Vehiculo(matricula,idSeguro,marca,modelo,tipoCombustible,fechaAdquisicion){
    this.Matricula=matricula;
    this.IdSeguro=idSeguro;
	this.Marca = marca;
	this.Modelo=modelo;
	this.TipoCombustible = tipoCombustible;
	this.FechaAdquisicion= fechaAdquisicion;
}


//--------------------------------------------------------------------------------------------------
// Objeto Turismo
function Turismo(matricula,idSeguro,marca,modelo,tipoCombustible,fechaAdquisicion,numPlazas){
   Vehiculo.apply(this,[ matricula,idSeguro,marca,modelo,tipoCombustible,fechaAdquisicion ]);

	this.NumPlazas=numPlazas;
}
// Heredamos de Vehiculo
Turismo.prototype = Object.create(Vehiculo.prototype);
Turismo.prototype.constructor = Turismo;

//--------------------------------------------------------------------------------------------------
// Objeto camion
function Camion(matricula,idSeguro,marca,modelo,tipoCombustible,fechaAdquisicion,pma){
   Vehiculo.apply(this,[ matricula,idSeguro,marca,modelo,tipoCombustible,pma ]);
	this.Pma=pma;

}
// Heredamos de Vehiculo
Camion.prototype = Object.create(Vehiculo.prototype);
Camion.prototype.constructor = Camion;
// metodo de Camion



//--------------------------------------------------------------------------------------------------
// Objeto seguro
function Seguro(idSeguro,descripcion,precio){
    this.IdSeguro=idSeguro;
	this.Descripcion = descripcion;
	this.Precio=precio;
	
}
Seguro.prototype.constructor = Seguro;


//--------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------
// Objeto Factura
function Factura(idFactura,idALquiler,importe,fechaEntrega){
    this.IdFactura=idFactura;
	this.IdALquiler = idALquiler;
	this.Importe=importe;
	this.FechaEntrega=fechaEntrega;
}
Factura.prototype.constructor = Factura;

Factura.prototype.toHTMLRow = function (){
	return "<tr><td>" + this.idFactura + "</td><td>" + this.idALquiler + "</td><td>" +this.importe+ "</td><td>" +this.fechaEntrega+ "</td></tr>";

}
//--------------------------------------------------------------------------------------------------------------------
//daniel
//--------------------------------------------------------------------------------------------------------------------

//Prototype Cliente
function Cliente (idCliente, nombre, telefono, email, direccion) {
	this.idCliente = idCliente;
	this.nombre = nombre;
	this.telefono = telefono;
	this.email = email;
	this.direccion = direccion;
}

//Metodos Cliente
Cliente.prototype.toHTMLRow = function() {
	return "<tr><td>" + this.idCliente + "</td><td>" + this.nombre + "</td><td>" + this.telefono + "</td><td>" + this.email + "</td><td>"+this.direccion+"</td></tr>";
}

//Prototype Tarifa
function Tarifa (idTarifa, fechaInicio, fechaFin, tipoVehiculo, importe, importePorDia) {
	this.idTarifa = idTarifa;
	this.fechaInicio = fechaInicio;
	this.fechaFin = fechaFin;
	this.tipoVehiculo = tipoVehiculo;
	this.importe = importe;
	this.importePorDia = importePorDia;
}

//Metodos Tarifa
Tarifa.prototype.toHTMLRow = function() {
	return "<tr><td>" + this.idTarifa + "</td><td>" + this.fechaInicio + "</td><td>" + this.fechaFin + "</td><td>"+this.tipoVehiculo+"</td><td>" + this.importe + "</td><td>" + this.importePorDia + "</td></tr>";
}

//Prototype Alquiler
function Alquiler (id,idCliente, matricula, fechaEntrada, fechaSalida, kmsIniciales, idTarifa) {
	this.idAlquiler = id;
	this.idCliente = idCliente;
	this.matricula = matricula;
	this.fechaEntrada = fechaEntrada;
	this.fechaSalida = fechaSalida;
	this.kmsIniciales = kmsIniciales;
	this.idTarifa = idTarifa;
}


//Prototype CarRenting
function CarRenting () {
	this.vehiculos = new Array();
	this.clientes = new Array();
	this.alquileres = new Array();
	this.facturas = new Array();
	this.tarifas = new Array();
	this.seguros = new Array();
}

//Metodos CarRenting
CarRenting.prototype.buscarCliente = function(idCliente) {
	var aux = null;

	for (var i = 0; i < oCarRenting.clientes.length; i++) {
		if(oCarRenting.clientes[i].idCliente==idCliente){
			aux = oCarRenting.clientes[i];
		}
	}

	return aux;
}

CarRenting.prototype.altaCliente = function(oCliente) {
	var texto;

	if (oCarRenting.buscarCliente(oCliente.idCliente) == null) {

		oCarRenting.clientes.push(oCliente);
		texto = "Alta de cliente exitosa";
		console.log("Alta");

	} else {
		texto = "Ya existe un cliente con ese nif";
		console.log("Existe");
	}

	return texto;
}

CarRenting.prototype.modificarCliente = function (idCliente, nombre, telefono, email, direccion) {
	var cliente = oCarRenting.buscarCliente(idCliente);
	
	var flag = false; //flag para cortar el bucle
	var i = 0;
	while(!flag){
		if (oCarRenting.clientes[i].idCliente == idCliente) {

			oCarRenting.clientes[i].telefono = telefono;
			oCarRenting.clientes[i].email = email;
			oCarRenting.clientes[i].direccion = direccion;
			oCarRenting.clientes[i].nombre = nombre;

			flag = true;
		}
		i++;
	}
	var texto = "Modificacion exitosa";
	console.log("Modificacion cliente " + oCarRenting.clientes[i-1].idCliente);

	return texto;
}

CarRenting.prototype.borrarCliente = function(idCliente) {
	var texto;
	var cliente = CarRenting.prototype.buscarCliente(idCliente);
	if (cliente != null) {
		var indice = oCarRenting.clientes.indexOf(cliente);
		oCarRenting.clientes.splice(indice,1);

		texto = "Cliente " + cliente.idCliente + " borrado";
		console.log("Cliente " + cliente.idCliente + " borrado");

	} else {
		texto = "No existe un cliente con ese id";
		console.log("No existe");
	}

	return texto;
};

CarRenting.prototype.altaAlquiler = function(oAlquiler) {
	var texto;

	oCarRenting.alquileres.push(oAlquiler);
	texto = "Alta de alquiler exitosa";
	console.log("Alta alquiler " + oAlquiler.idAlquiler);

	return texto;
};

CarRenting.prototype.buscarAlquiler = function(idAlquiler) {
	var aux = null;

	for (var i = 0; i < oCarRenting.alquileres.length; i++) {
		if(oCarRenting.alquileres[i].idAlquiler==idAlquiler){
			aux = oCarRenting.alquileres[i];
		}
	}

	return aux;		
};

CarRenting.prototype.borrarAlquiler = function(idAlquiler) {
	var texto;
	var alquiler = CarRenting.prototype.buscarAlquiler(idAlquiler);

	var indice = oCarRenting.alquileres.indexOf(alquiler);
	oCarRenting.alquileres.splice(indice,1);

	texto = "Alquiler " + alquiler.idAlquiler + " borrado";
	console.log("Alquiler " + alquiler.idAlquiler + " borrado");

	return texto;
};

CarRenting.prototype.buscarFactura = function(idFactura) {
	var aux = null;

	for (var i = 0; i < oCarRenting.facturas.length; i++) {
		if(oCarRenting.facturas[i].IdFactura==idFactura){
			aux = oCarRenting.facturas[i];
		}
	}

	return aux;		
};

CarRenting.prototype.borrarFactura = function(idFactura) {
	var texto;
	var factura = CarRenting.prototype.buscarFactura(idFactura);

	var indice = oCarRenting.facturas.indexOf(factura);
	oCarRenting.facturas.splice(indice,1);

	texto = "Factura " + factura.IdFactura + " borrada";
	console.log("Factura " + factura.IdFactura + " borrada");

	return texto;
};

CarRenting.prototype.buscarTarifa = function(idTarifa) {
	var aux = null;

	for (var i = 0; i < oCarRenting.tarifas.length; i++) {
		if(oCarRenting.tarifas[i].idTarifa==idTarifa){
			aux = oCarRenting.tarifas[i];
		}
	}

	return aux;		
};

CarRenting.prototype.borrarTarifa = function(idTarifa) {
	var texto;
	var tar = CarRenting.prototype.buscarTarifa(idTarifa);
	
	var indice = oCarRenting.tarifas.indexOf(tar);
	oCarRenting.tarifas.splice(indice,1);

	texto = "Tarifa " + tar.idTarifa + " borrada";
	console.log("Tarifa " + tar.idTarifa + " borrada");

	return texto;
};

CarRenting.prototype.altaFactura = function (oFactura) {
	oCarRenting.facturas.push(oFactura);
	texto = "Alta de factura exitosa";
	console.log("Alta factura " + oFactura.IdFactura);

	return texto;
}

CarRenting.prototype.altaTarifa = function (oTarifa) {
	oCarRenting.tarifas.push(oTarifa);
	texto = "Alta de tarifa exitosa";
	console.log("Alta tarifa " + oTarifa.idTarifa);
	
	return texto;
}

//------------------------------------------------------------------------------------------------
  CarRenting.prototype.buscarVehiculo = function(sMatricula) {
	var aux = null;

	for (var i = 0; i < oCarRenting.vehiculos.length; i++) {
		if(oCarRenting.vehiculos[i].Matricula==sMatricula){
			aux = oCarRenting.vehiculos[i];
		}
	}

	return aux;
}

CarRenting.prototype.altaVehiculo = function(oVehiculo) {
	var texto;

	if (oCarRenting.buscarVehiculo(oVehiculo.matricula) == null) {

		oCarRenting.vehiculos.push(oVehiculo);
		texto = "Alta de vehiculo exitosa";
		console.log("Alta");
		alert(oCarRenting.vehiculos[0]);

	} else {
		texto = "Ya existe un vehiculo con ese matricula";
		console.log("Existe");
	}

	return texto;
}

CarRenting.prototype.modificacionVehiculo = function (matricula, idSeguro, marca,modelo,combustible,fadquisicion,numplaza) {
	var texto;

	var cliente = oCarRenting.buscarVehiculo(matricula);
	//if (cliente != null) {
		var flag = false; //flag para cortar el bucle
		var i = 0;
		while(!flag){
			if (oCarRenting.vehiculos[i].Matricula == matricula) {

				oCarRenting.vehiculos[i].IdSeguro =idSeguro;
				oCarRenting.vehiculos[i].Marca = marca;
				oCarRenting.vehiculos[i].Modelo = modelo;
				oCarRenting.vehiculos[i].TipoCombustible = combustible;
				oCarRenting.vehiculos[i].FechaAdquisicion = fadquisicion;
				oCarRenting.vehiculos[i].NumPlazas = numplaza;

				flag = true;
			}
			i++;
		}
		texto = "Modificacion exitosa";
		//console.log("Modificacion Vehiculo" + oCarRenting.vehiculos[i-1].Matricula);

	

	return texto;
}

CarRenting.prototype.borrarVehiculo = function(matricula) {
	var texto;
	var vehiculo = CarRenting.prototype.buscarVehiculo(matricula);
	if (vehiculo != null) {
		var indice = oCarRenting.vehiculos.indexOf(vehiculo);
		oCarRenting.vehiculos.splice(indice,1);

		texto = "Vehiculo " + vehiculo.Matricula + " borrada";
		

	} else {
		texto = "No existe un vehiculo con esa Matricula";
		
	}

	return texto;
};
//------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------
//vehiculo
  CarRenting.prototype.buscarSeguro = function(sIdSeguro) {
	var aux = null;

	for (var i = 0; i < oCarRenting.seguros.length; i++) {
		if(oCarRenting.seguros[i].IdSeguro==sIdSeguro){
			aux = oCarRenting.seguros[i];
		}
	}

	return aux;
}

CarRenting.prototype.altaSeguro = function(oSeguro) {
	var texto;

	if (oCarRenting.buscarSeguro(oSeguro.IdSeguro) == null) {

		oCarRenting.seguros.push(oSeguro);
		texto = "Alta de Seguro exitosa";

	} else {
		texto = "Ya existe un Seguro con ese idSeguro";
	}

	return texto;
}
CarRenting.prototype.modificacionSeguro = function (idSeguro,descripcion,precio) {
	var texto;

	var cliente = oCarRenting.buscarSeguro(idSeguro);
	//if (cliente != null) {
		var flag = false; //flag para cortar el bucle
		var i = 0;
		while(!flag){
			if (oCarRenting.seguros[i].IdSeguro == idSeguro) {

				oCarRenting.seguros[i].IdSeguro =idSeguro;
				oCarRenting.seguros[i].Descripcion = descripcion;
				oCarRenting.seguros[i].Precio = precio;

				flag = true;
			}
			i++;
		}
		texto = "Modificacion exitosa";
		//console.log("Modificacion Vehiculo" + oCarRenting.vehiculos[i-1].Matricula);

	

	return texto;
}

CarRenting.prototype.borrarSeguro = function(idSeguro) {
	var texto;
	var seguro = CarRenting.prototype.buscarSeguro(idSeguro);
	if (vehiculo != null) {
		var indice = oCarRenting.seguros.indexOf(seguro);
		oCarRenting.seguros.splice(indice,1);

		texto = "Seguro " + seguro.IdSeguro + " borrado";
		

	} else {
		texto = "No existe un seguro con esa idSeguro";
		
	}

	return texto;
};
//------------------------------------------------------------------------------------------------
