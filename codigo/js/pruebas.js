
//Principal
oCarRenting = new CarRenting();

//Clientes
miCliente = new Cliente("12345678l","aaa","123", "a@a.aa","casa de a");
oCarRenting.clientes.push(miCliente);

miCliente = new Cliente("98765432k","ccc","123", "c@c.c","casa de c");
oCarRenting.clientes.push(miCliente);

miCliente = new Cliente("36925814f","ddd","123", "d@d.d","casa de d");
oCarRenting.clientes.push(miCliente);

console.log(oCarRenting.clientes[0].toHTMLRow());

//oCarRenting.modificarCliente("1","2","bbb","456","b@b.bb","casa de b");

//console.log(oCarRenting.clientes[0].toHTMLRow());

oCarRenting.borrarCliente("36925814f");

oTurismo = new Turismo("3920GJB","1","Seat","Ibiza","gasolina","15/03/2014","5");
oCarRenting.vehiculos.push(oTurismo);

oCamion = new Camion("5009CKF","2","Opel","Astra","gasolina","07/07/2001","250");
oCarRenting.vehiculos.push(oCamion);
oCamion2 = new Camion("2345RGF","2","fiat","Scudo","gasolina","07/07/2001","350");
oCarRenting.vehiculos.push(oCamion2);

oCarRenting.alquileres.push(new Alquiler("8366l","12345678l","3920GJB",new Date(2014,5-1,15),new Date(2010,5-1,15),"150"));
oCarRenting.alquileres.push(new Alquiler("45345l","12345678l","3920GJB",new Date(2017,5-1,15),new Date(2010,5-1,15),"150"));
oCarRenting.alquileres.push(new Alquiler("11345l","12345678l","5009CKF",new Date(2017,5-1,15),new Date(2010,5-1,15),"150"));