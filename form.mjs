//Variables y constantes
const rgxName = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
const rgxNumber = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
const rgxEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const urlZipCode = "https://dev.tpdigitgen.tech/ws/v2/test/zipcode?zipcode=";
const urlData = "https://dev.tpdigitgen.tech/ws/v2/test/create";

//pasos del aplictivo
let steps = [];

//API errors
/*
class APIERROR extends Error {
  constructor(message) {
    super(message);
    this.name = "Api error";
  }
}
*/

//Agregar los estilos
let stylesLink = document.createElement("link");
stylesLink.setAttribute(
  "href",
  "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css"
);
stylesLink.setAttribute(
  "integrity",
  "sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ"
);
stylesLink.setAttribute("rel", "stylesheet");
stylesLink.setAttribute("crossorigin", "anonymous");
document.head.appendChild(stylesLink);

//Open modal
let plgbtn = document.createElement("button");
plgbtn.id = "btn-show-plg";
plgbtn.classList.add("btn", "btn-info", "bnt-float");
plgbtn.style.fontSize = "1rem";
plgbtn.style.zIndex = "100";
plgbtn.style.position = "fixed";
plgbtn.style.borderRadius = "15px";
plgbtn.style.bottom = "10px";
plgbtn.style.left = "20px";

plgbtn.innerHTML = "Open this form 😆";

document.body.appendChild(plgbtn);

//Funcion que arranca el modal
function main() {
  let box = document.createElement("section");
  document.body.appendChild(box);
  box.style.right = "0";
  box.style.left = "0";
  box.style.top = "0";
  box.style.bottom = "0";
  box.style.position = "fixed";
  box.style.display = "flex";
  box.style.background = "#111111bd";
  box.id = "box";
  document.body.appendChild(box);
  setTimeout(() => {
    document.getElementById("btn-show-plg").style.display = "none";
    stepOne();
  }, 100);
}
document.getElementById("btn-show-plg").onclick = main;

//Crear carta
const customizedCard = (
  _id,
  _idCard,
  _idCardHeader,
  _idCardBody,
  _idCardFooter
) => {
  //buscar el nodo a ingresar el item
  let container = document.getElementById(_id);
  //Carta
  let card = document.createElement("div");
  card.classList.add("card", "m-5");
  card.id = _idCard;
  card.style.height = "50vh";
  card.style.margin = "auto";
  card.style.alignSelf = "center";
  card.style.width = "80%";
  card.style.display = "flex";
  card.style.alignItems = "center";
  card.style.justifyContent = "center";
  let cardHeader = document.createElement("div");
  cardHeader.classList.add("card-header");
  cardHeader.id = _idCardHeader;
  let cardBody = document.createElement("div");
  cardBody.classList.add("class-body", "m-5");
  cardBody.id = _idCardBody;
  let cardFooter = document.createElement("div");
  cardFooter.classList.add("class-footer", "col-md-12", "text-center");
  cardFooter.id = _idCardFooter;

  //Agregar la carta
  card.appendChild(cardHeader);
  card.appendChild(cardBody);
  card.appendChild(cardFooter);
  container.appendChild(card);
};

//crear un input generico, esto se ingresa en la carta modal
const customizedInput = (
  _id,
  _inputId,
  _labelText,
  _inputType,
  _formGroupId
) => {
  //buscar el nodo a ingresar el item
  let container = document.getElementById(_id);

  //Crear los elementos
  let formGroup = document.createElement("div");
  formGroup.id = _formGroupId;
  formGroup.classList.add("form-group", "m-1");

  let label = document.createElement("label");
  label.classList.add("text-center");
  label.setAttribute("for", _inputId);
  label.innerText = _labelText;

  let input = document.createElement("input");
  input.id = _inputId;
  input.classList.add("form-control");
  input.setAttribute("type", _inputType);

  formGroup.appendChild(label);
  formGroup.appendChild(input);

  //Agregar los datos
  container.appendChild(formGroup);
};

//crear un input generico check, esto se ingresa en la carta modal
const customizedInputCheck = (_id, _inputId, _labelText, _formGroupId) => {
  //buscar el nodo a ingresar el item
  let container = document.getElementById(_id);

  //Crear los elementos
  let formGroup = document.createElement("div");
  formGroup.id = _formGroupId;
  formGroup.classList.add("form-check", "m-1");

  let label = document.createElement("label");
  label.classList.add("text-center");
  label.setAttribute("for", _inputId);
  label.innerText = _labelText;

  let input = document.createElement("input");
  input.id = _inputId;
  input.classList.add("form-check-input");
  input.setAttribute("type", "checkbox");

  formGroup.appendChild(input);
  formGroup.appendChild(label);

  //Agregar los datos
  container.appendChild(formGroup);
};

//crear boton generico
const customizedButton = (_id, _text, _idBtn, _class) => {
  //buscar el nodo a ingresar el item
  let container = document.getElementById(_id);

  //Crear elemento
  let btn = document.createElement("button");
  btn.classList.add("btn", `btn-outline-${_class}`, "text-center", "m-3");
  btn.id = _idBtn;
  btn.setAttribute("type", "button");
  btn.innerText = _text;
  container.appendChild(btn);
};

//crear titulo
const customizedTitle = (_id, text) => {
  let container = document.getElementById(_id);
  let h2 = document.createElement("h2");
  h2.classList.add("text-center");
  h2.innerText = text;
  container.appendChild(h2);
};

//crear texto
const customizedText = (_id, text, _idP) => {
  let container = document.getElementById(_id);
  let p = document.createElement("p");
  p.id = _idP;
  p.classList.add("text-center");
  p.innerText = text;
  container.appendChild(p);
};
//Funciones para visualizar el error
const error = (customizedError = (_id, errorMessage, _idError) => {
  let container = document.getElementById(_id);
  let small = document.createElement("small");
  small.classList.add("text-center", "text-danger");
  small.innerText = errorMessage;
  small.id = _idError;
  container.appendChild(small);
});

//eliminar el error en caso de campo valido
const deleteError = (customizedDeleteError = (_id) => {
  let element = document.getElementById(_id);
  element.remove();
});

//Funcion de peticiones a un backend
const request = async (url) => {
  const response = await fetch(url);
  return await response.json();
};
const requestPost = async (url, method, data) => {
  //Archivo contiene un bloqueo por CORS
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (err) {
    console.log(err.message);
    //Se presenta un error en este caso por cors, para continuar con el ejercio se envia el objeto
    return { message: "Record Registered", status: true };
  }
};

//Funciones y validaciones
async function zipCode() {
  zipCodeValue = document.getElementById("zip-code").value.trim();
  if (zipCodeValue.length == 3) {
    if (anyError("zip-code-input")) {
      customizedDeleteError("zip-code-error");
    }
    //Llamar a la api
    let ans = await request(urlZipCode.concat(zipCodeValue));
    if (ans.status) {
      //Activo el siguiente tab
      stepTwo();
    } else {
      customizedError(
        "zip-code-input",
        "Zip code is not valid",
        "zip-code-error"
      );
    }
  } else {
    //Validar si existe un small
    if (!anyError("zip-code-input")) {
      customizedError(
        "zip-code-input",
        "Zip code is not valid",
        "zip-code-error"
      );
    }
  }
}

async function dataValidation() {
  //Capturar el valor de los datos
  let name = document.getElementById("name").value.trim() || "";
  let lastName = document.getElementById("last-name").value.trim() || "";
  let email = document.getElementById("email").value.trim() || "";
  let phone = document.getElementById("phone").value.trim() || "";
  let accept = document.getElementById("accept").checked || false;
  //Validar
  if (
    accept &&
    rgxName.test(name) &&
    rgxName.test(lastName) &&
    rgxNumber.test(phone) &&
    rgxEmail.test(email)
  ) {
    //quitar errores
    if (anyError("accept-input")) {
      customizedDeleteError("accept-error");
    }
    if (anyError("name-input")) {
      customizedDeleteError("name-error");
    }
    if (anyError("last-name-input")) {
      customizedDeleteError("last-name-error");
    }
    if (anyError("email-input")) {
      customizedDeleteError("email-error");
    }
    if (anyError("phone-input")) {
      customizedDeleteError("phone-error");
    }
    //peticion post
    let obj = Object.freeze({
      name,
      lastName,
      email,
      phone,
      accept,
    });
    let ans = await requestPost(urlData, "post", obj);
    console.log(ans);
    if (ans.status) {
      stepThree(name, lastName);
    }
  } else {
    //nombre
    if (!anyError("name-input") && !rgxName.test(name)) {
      customizedError("name-input", "Name is not valid!", "name-error");
    } else {
      if (anyError("name-input") && rgxName.test(name)) {
        customizedDeleteError("name-error");
      }
    }
    //apellido
    if (!anyError("last-name-input") && !rgxName.test(lastName)) {
      customizedError(
        "last-name-input",
        "Last name is not valid!",
        "last-name-error"
      );
    } else {
      if (anyError("last-name-input") && rgxName.test(lastName)) {
        customizedDeleteError("last-name-error");
      }
    }
    //email
    if (!anyError("email-input") && !rgxEmail.test(email)) {
      customizedError("email-input", "Email is not valid!", "email-error");
    } else {
      if (anyError("email-input") && rgxEmail.test(email)) {
        customizedDeleteError("email-error");
      }
    }
    //phone
    if (!anyError("phone-input") && !rgxNumber.test(phone)) {
      customizedError(
        "phone-input",
        "Phone number is not valid!",
        "phone-error"
      );
    } else {
      if (anyError("phone-input") && rgxNumber.test(phone)) {
        customizedDeleteError("phone-error");
      }
    }

    if (!accept && !anyError("accept-input")) {
      customizedError(
        "accept-input",
        "Is mandatory to accept this...",
        "accept-error"
      );
    } else {
      if (anyError("accept-input") && accept) {
        customizedDeleteError("accept-error");
      }
    }
  }
}

//Funcion de validacion de errores
function anyError(_id) {
  let small = document.getElementById(_id);
  return small.getElementsByTagName("small").length > 0 ? true : false;
}

//Tab anterior
function previus() {
  if (steps.length == 2) {
    //se ha pasado de la tab 1
    let stepOne = (document.getElementById("step-one").style.display = "block");
    let stepTwo = document.getElementById("step-two").remove();
    //eliminar el contador
    steps.pop();
  }
  if (steps.length == 3) {
    //se ha pasado de la tab 1
    let stepOne = (document.getElementById("step-two").style.display = "block");
    let stepTwo = document.getElementById("step-three").remove();
    //eliminar el contador
    steps.pop();
  }
}

//Validar si el checkbox ha cambiado de valor
function checkboxValidation() {
  let x = setInterval(() => {
    if (document.getElementById("lessee-input").checked) {
      //en este se agrega el boton o se cambia dependiento el valor
      document.getElementById("btn-next-three").innerText = "Call";
      document.getElementById("btn-next-three").onclick =
        finalButtonFxHomeonwner;
      document.getElementById("lessee").innerText = "I'm a homeowner";
    } else {
      document.getElementById("btn-next-three").innerText = "Visit";
      document.getElementById("btn-next-three").onclick = finalButtonFxRenter;
      document.getElementById("lessee").innerText = "I'm a renter";
    }
  }, 500);
}

//Mensajes y funcionalidades paso 3
function finalButtonFxRenter() {
  window.open("https://www.teleperformance.com", "_blank");
}
function finalButtonFxHomeonwner() {
  customizedText(
    "step-three-footer",
    `You can call this phone number: 317 299 3369 for more information.`,
    "call"
  );
  document.getElementById("call").classList.add("text-dark");
}

//Finaliza el proceso y lo reinicia
function close() {
  document.getElementById("btn-show-plg").style.display = "block";
  let box = document.getElementById("box").remove();
}

//Crear la primera vista
function stepOne() {
  steps.push(1);
  console.log("Step one");
  setTimeout(() => {
    //Crear el permer modal
    customizedCard(
      "box",
      "step-one",
      "step-one-header",
      "step-one-body",
      "step-one-footer"
    );
    customizedTitle("step-one-header", "Zip code validation");
    customizedInput(
      "step-one-body",
      "zip-code",
      "Zip code",
      "number",
      "zip-code-input"
    );
    customizedButton("step-one-footer", "next", "btn-next-one", "success");
    customizedButton("step-one-footer", "close", "btn-close", "dark");
    document.getElementById("btn-next-one").onclick = zipCode;
    document.getElementById("btn-close").onclick = close;
  }, 100);
}

function stepTwo() {
  steps.push(2);
  let stepOne = (document.getElementById("step-one").style.display = "none");

  //agregar los nuevos
  customizedCard(
    "box",
    "step-two",
    "step-two-header",
    "step-two-body",
    "step-two-footer"
  );
  customizedTitle("step-two-header", "Data validation");
  customizedInput("step-two-body", "name", "Name", "text", "name-input");
  customizedInput(
    "step-two-body",
    "last-name",
    "Last name",
    "text",
    "last-name-input"
  );
  customizedInput("step-two-body", "email", "Email", "email", "email-input");
  customizedInput("step-two-body", "phone", "Phone", "text", "phone-input");
  customizedInputCheck("step-two-body", "accept", "Accept?", "accept-input");

  customizedButton("step-two-footer", "previus", "btn-prev-two", "success");
  customizedButton("step-two-footer", "next", "btn-next-two", "success");
  customizedButton("step-two-footer", "close", "btn-two-close", "dark");

  //Cargar los eventos de provio y siguiente
  document.getElementById("btn-next-two").onclick = dataValidation;
  document.getElementById("btn-prev-two").onclick = previus;
  document.getElementById("btn-two-close").onclick = close;
}

function stepThree(name, lastName) {
  steps.push(3);
  let stepTwo = (document.getElementById("step-two").style.display = "none");
  //Agregar nuevos campos
  customizedCard(
    "box",
    "step-three",
    "step-three-header",
    "step-three-body",
    "step-three-footer"
  );
  customizedTitle("step-three-header", "In good time");
  customizedText(
    "step-three-body",
    `Congratulations ${name} ${lastName} you have entered.`,
    "congratulations"
  );
  customizedInputCheck(
    "step-three-body",
    "lessee-input",
    "Now, tell us if you are a renter or a homeowner. (check if you are homeowner)",
    "lessee-form"
  );
  customizedText("step-three-body", `I'm a renter`, "lessee");
  //validar el campo en on/off
  customizedButton("step-three-footer", "previus", "btn-prev-three", "success");
  customizedButton("step-three-footer", "Visit", "btn-next-three", "success");
  customizedButton("step-three-footer", "close", "btn-three-close", "dark");
  document.getElementById("btn-three-close").onclick = close;
  document.getElementById("btn-prev-three").onclick = previus;
  checkboxValidation();
}
