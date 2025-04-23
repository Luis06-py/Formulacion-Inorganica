function numeroRomano(num) {
	const numerosRomanos = ["", "(I)", "(II)", "(III)", "(IV)", "(V)"];
	return numerosRomanos[num] || "Número fuera de rango";
}

function obtenerMCD(a, b) {
	while (b !== 0) {
		let temp = b;
		b = a % b;
		a = temp;
	}
	return a;
}

function MCDtres(a, b, c) {
	return obtenerMCD(obtenerMCD(a, b), c)
}

function simplificar(a, b) {
	const mcd = obtenerMCD(a, b);
	return [a / mcd, b / mcd];
}

function simplificarTres(a, b, c) {
	let dc = MCDtres(a, b, c);
	return [a/dc, b/dc, c/dc]
}

function buscarHidruro(event) {
	event.preventDefault();
	const campoHidruro = document.getElementById('campoHidruro').value.trim();
	const valenciaHidruro = parseInt(document.getElementById('valenciaHidruro').value, 10);
	
	// Valencia única
	if (tabla.valencias && tabla.valencias[campoHidruro]) {
		const valencia = tabla.valencias[campoHidruro]["valencia"]
		let res = tabla.valencias[campoHidruro]["símbolo"] + "H" + valencia
		let res1 = res.replace(/1/g, ''); // Es el resultado quitando los 1
		const resH = document.getElementById('resHidruro');
		resH.textContent = "Hidruro de " + tabla.valencias[campoHidruro]["nombre"] + " " + res1;
		
	} 
	// Valencia múltiple
	else if (tabla.valencias2 && tabla.valencias2[campoHidruro]) {
		const valenciasList = tabla.valencias2[campoHidruro].valencia;
		if (valenciasList.includes(valenciaHidruro)) {
			let res = tabla.valencias2[campoHidruro]["símbolo"] + "H" + valenciaHidruro
			let res1 = res.replace(/1/g, ''); // Es el resultado quitando los 1
			const resH = document.getElementById('resHidruro');
			resH.textContent = "Hidruro de " + tabla.valencias2[campoHidruro]["nombre"] + " " + res1;
		} else {
			const resH = document.getElementById('resHidruro');
			resH.textContent = "La valencia no coincide con la del elemento";
		}
	}
	// Si no se encuentra en ninguno
	else {
		const resH = document.getElementById('resHidruro');
		resH.textContent = "No se ha encontrado el elemento";
	}
}

function buscarOxido(event) {
	event.preventDefault();
	const campoOxido = document.getElementById('campoOxido').value.trim();
	const valenciaOxido = parseInt(document.getElementById('valenciaOxido').value, 10);
	
	// Valencia única
	if (tabla.valencias && tabla.valencias[campoOxido]) {
		const valencia = tabla.valencias[campoOxido]["valencia"]
		const numeros = simplificar(2, valencia)
		let res = tabla.valencias[campoOxido]["símbolo"] + numeros[0] + "O" + numeros[1]
		let res1 = res.replace(/1/g, ''); // Es el resultado quitando los 1
		const resO = document.getElementById('resOxido');
		resO.textContent = "Óxido de " + tabla.valencias[campoOxido]["nombre"] + " " + res1;
		
	} 
	// Valencia múltiple
	else if (tabla.valencias2 && tabla.valencias2[campoOxido]) {
		const valenciasList = tabla.valencias2[campoOxido].valencia;
		if (valenciasList.includes(valenciaOxido)) {
			const numeros = simplificar(2, valenciaOxido)
			let res = tabla.valencias2[campoOxido]["símbolo"] + numeros[0] + "O" + numeros[1]
			let res1 = res.replace(/1/g, ''); // Es el resultado quitando los 1
			const resO = document.getElementById('resOxido');
			resO.textContent = `Óxido de ${tabla2.valencias[campoOxido].nombre} ${numeroRomano(valenciaOxido)} ${res1}`;

		} else {
			const resO = document.getElementById('resOxido');
			resO.textContent = "El elemento no tiene la valencia indicada";
		}
	}
	// Si no se encuentra en ninguno
	else {
		const resO = document.getElementById('resOxido');
		resO.textContent = "No se ha encontrado el elemento";
	}
}

function buscarSalBinaria(event) {
	event.preventDefault();
	const salBin1 = document.getElementById('salBin1').value.trim();
	const salBin2 = document.getElementById('salBin2').value.trim();
	let valencia2 = parseInt(document.getElementById('valenciaSalBin').value, 10);
	
	// Valencia del primer elemento
	if (tabla.valencias && tabla.valencias[salBin1]) {
		const valencia1 = tabla.valencias[salBin1]["valencia"]

		let temp;
		// Valencia del segundo número
		if (tabla.valencias && tabla.valencias[salBin2]) {
			valencia2 = tabla.valencias[salBin2]["valencia"]
			temp = true
		}
		else if (tabla.valencias2 && tabla.valencias2[salBin2]) {
			const valenciasList = tabla.valencias2[salBin2].valencia;
			if (valenciasList.includes(valencia2)) {
				temp = false
			} else {
				valencia2 = NaN
			}
		}
		let resB = document.getElementById('resBin');
		if (!isNaN(valencia2)) {
			if (!tabla.listaAbrv.includes(tabla.valencias[salBin1]["nombre"])) {
				resB.textContent = "No se puede abreviar el primer elemento";
			}
			else {
				const numeros = simplificar(valencia2, valencia1);
				const simbolo1 = tabla.valencias[salBin1]["símbolo"];
				const simbolo2 = temp ? tabla.valencias[salBin2]["símbolo"] : tabla.valencias2[salBin2]["símbolo"];
				let res = simbolo1 + numeros[0] + simbolo2 + numeros[1];
				let res1 = res.replace(/1/g, '');
				const resB = document.getElementById('resBin');
				let text = (tabla.abreviado[tabla.valencias[salBin1]["nombre"]].charAt(0).toUpperCase() + tabla.abreviado[tabla.valencias[salBin1]["nombre"]].slice(1).toLowerCase()) + "uro de ";
				const txt2 = temp ? tabla.valencias[salBin2]["nombre"] : tabla.valencias2[salBin2]["nombre"] + " " + numeroRomano(valencia2);
				resB.textContent = text + txt2 + " " + res1;
			}
		} else {
			const resB = document.getElementById('resBin');
			resB.textContent = "No se ha encontrado la valencia";
		}
	}
	else if (tabla.valencias2 && tabla.valencias2[salBin1]) {
		const resB = document.getElementById('resBin');
		resB.textContent = "El primer elemento debe tener valencia única";
	}

	else {
		const resB = document.getElementById('resBin');
		resB.textContent = "No se ha encontrado el primer elemento";
		
	}
}

function buscarAcido(event) {
	event.preventDefault();
	let prefEsp = parseInt(document.getElementById('prefEspAci').value.trim(), 10)
	let prefAci = document.getElementById('prefAci').value.trim()
	let sufAci = document.getElementById('sufAci').value.trim()
	const salAci = document.getElementById('salAci').value.trim()
	let acido;

	/* Meta (1 H2O) Piro (2 H2O) Orto (3 H2O) */

	/* Identificar el prefijo de forma hipo-oso, etc */
	if (prefAci !== "0") {
		acido = prefAci;
		if (sufAci !== "0") {
			acido += sufAci;
		} else {
			sufAci = "";
		}
	} else if (sufAci !== "0") {
		acido = "-" + sufAci;
		prefAci = ""
	} else {
		acido = null; /* No se rellenó ningun dato */
	}

	if (acido !== null && acido in tabla.ácidos) {
		
		let simbolo;
		let nombre;
		if (tabla.valencias && tabla.valencias[salAci]) {
			simbolo = tabla.valencias[salAci]["símbolo"];
			nombre = tabla.valencias[salAci]["nombre"];
			nombre = tabla.abreviado[nombre]
		} else if (tabla.valencias2 && tabla.valencias2[salAci]) {
			simbolo = tabla.valencias2[salAci]["símbolo"];
			nombre = tabla.valencias2[salAci]["nombre"]
			nombre = tabla.abreviado[nombre]
		} else {
			simbolo = null;
			nombre = null;
		}

		if (simbolo !== null) {
			const val = tabla.ácidos[acido][simbolo];

			/* Formular el Óxido */
			const numeros = simplificar(2, val);
			
			/* Óxido + H2O, (átomos Elemento + átomos Oxígeno + átomos Hidrógeno) */
			let mult = 1;
			let prefijoEsp = "";
			if (simbolo in tabla.especiales) {
				mult = parseInt(prefEsp)
				const list = ["Meta", "Piro", "(Orto)"];
				prefijoEsp = list[mult-1];
			}
			numeros[1] += mult*1
			numeros[2] = mult*2
			
			let resultado = simplificarTres(numeros[0], numeros[1], numeros[2]);
			let res1 = "H" + resultado[2] + simbolo + resultado[0] + "O" + resultado[1];
			res1 = res1.replace(/1/g, '');
			prefAci = prefAci.replace("-", "");
			console.log(prefAci)
			let res2 = "Ácido " + prefijoEsp + prefAci + nombre + sufAci + " " + res1
			const resA = document.getElementById('resAci');
			resA.textContent = res2
		} else {
			const resA = document.getElementById('resAci');
			resA.textContent = "El elemento no se ha podido identificar"
		}
	} else {
		const resA = document.getElementById('resAci');
		resA.textContent = "Has cometido un error"
	}

}