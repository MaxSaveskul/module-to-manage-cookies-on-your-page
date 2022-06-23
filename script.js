function setCookie(cname, cvalue, exdays) {
	const d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	let expires = "expires=" + d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
	let name = cname + "=";
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(';');
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

function checkCookie() {
	let user = getCookie("username");
	if (user != "") {
		return
	} else {
		user = prompt("Now we have no cookies! Please enter some: What's your name?", "");
		if (user != "" && user != null) {
			setCookie("username", user, 30);
		}
	}
}

checkCookie();

document.body.style.fontFamily = 'Arial, Helvetica, sans-serif';

let background = document.createElement('div');

background.style.cssText = `
 	display: none;
	position: fixed;
	z-index: 1;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.282);
	overflow: auto;
`;

let modal = document.createElement('div');

modal.style.cssText = `
	color: white;
	background-color: rgba(195, 51, 51, 0.622);
	border: 2px solid blue;
	width: 60%;
	padding-top: 10px;
	padding-bottom: 50px;
	padding-right: 25px;
	margin: 200px auto;
	border-radius: 30px;
`;

let modalCloseButton = document.createElement('div');

modalCloseButton.innerText = 'x';

modalCloseButton.style.cssText = `
	height: 70px;
	float: right;
	cursor: pointer;
	font-size: 30px;
	color: blue;
`;


modalCloseButton.addEventListener('click', () => {
	background.style.display = 'none';
	modal.removeChild(modal.querySelector('table'));
});

modal.appendChild(modalCloseButton);
background.appendChild(modal);

let cookiesGuardButton = document.createElement('button');

cookiesGuardButton.innerText = 'Cookies Guard';

cookiesGuardButton.style.cssText = `
	background-color: rgb(195, 51, 51);
	color: white;
	border-radius: 50%;
	border: 2px solid blue;
	margin: auto 0;
	padding: 25px 0px;
	font-size: 19px;
	position: absolute;
	bottom: 35px;
	right: 48px;
	width: 100px;
	text-align: center;
	cursor: pointer;
	opacity: 0.9;
	z-index: 2;
`;

let getCookies = () => {
	let cookies = document.cookie.split('; ');
	let cookiesObject = {};
	cookies.forEach((cookie) => {
		let [key, value] = cookie.split('=');
		cookiesObject[key] = value;
	});
	return cookiesObject
}

let createTable = (content) => {
	let table = document.createElement('table');
	table.style.width = "100%";
	let thead = document.createElement("thead");
	let tr = document.createElement("tr");
	let th1 = document.createElement("th");
	th1.innerText = 'Cookie Name';
	th1.style.cssText = `
	padding-bottom: 40px;
	font-size: 23px;
	color: lightgrey;
	`;
	let th2 = document.createElement("th");
	th2.innerText = 'Value';
	th2.style.cssText = `
	padding-bottom: 40px;
	font-size: 23px;
	color: lightgrey;
	`;
	let th3 = document.createElement("th");

	tr.appendChild(th1);
	tr.appendChild(th2);
	tr.appendChild(th3);
	thead.appendChild(tr);
	table.appendChild(thead);

	let tbody = document.createElement('tbody');

	for (let key in content) {
		let tr = document.createElement('tr');
		let td1 = document.createElement('td');
		td1.innerText = key;
		td1.style.textAlign = 'center';
		td1.style.fontSize = '20px';
		let td2 = document.createElement('td');
		td2.innerText = content[key];
		td2.style.textAlign = 'center';
		td2.style.fontSize = '20px';
		let td3 = document.createElement('td');
		td3.innerText = 'delete';
		td3.style.cssText = `
		cursor: pointer;
		text-align: center;
		color: blue;
		font-size: 18px;
		font-style: italic;
		`;
		td3.addEventListener('click', () => {
			document.cookie = key + '=; Max-Age=0';
			location.reload();
		});

		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.appendChild(td3);
		tbody.appendChild(tr);
	}
	table.appendChild(tbody);
	return table;
}

cookiesGuardButton.addEventListener('click', () => {
	let cookies = getCookies();
	background.style.display = 'block';
	let table = createTable(cookies);
	modal.appendChild(table);
})


document.body.appendChild(background);
document.body.appendChild(cookiesGuardButton);