### useState

Ganchos (hooks)
Los ganchos ahora son una parte extremadamente importante de React, y comprenderlos es importante para tu crecimiento como desarrollador de React. Entonces, profundicemos en ellos de inmediato.

Un gancho, en general, es solo una función, ya sea incorporada o personalizada, que te permite "conectar" o usar una cierta funcionalidad. Entonces, supongamos que tienes el siguiente componente de clase:

import React, { Component } from 'react';
class Counter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clickCount: 0
        }
    }
 
    handleClick = () => this.setState({
        clickCount: this.state.clickCount + 1
    })
    render() {
        return (
            <div>
                {this.state.clickCount}
                <button onClick={this.handleClick}>Click Me</button>
            </div>
        );
    }
}
export default Counter;
copy
Tenemos acceso athis.statey podemos cambiarlo a través de setState.

Usando useState
Sin embargo, en un componente funcional, no tenemos tales habilidades. 

Introducimos ganchos. Con ganchos, podemos definir y establecer el estado de un componente funcional. Necesitaremos la siguiente importación:

import React, { useState } from 'react';
copy
El gancho useStateserá importado de react. A continuación, convierte ese componente de clase en un componente funcional.

import React, { useState } from 'react';
    
    
const Counter = props => {
    const [state, setState] = useState({
        clickCount: 0
    });
    
    return(
        <div>{ state.clickCount }</div>
    );
}
    
export default Counter;
copy
Acabamos de definir dos variables: statey setStatellamando al métodouseState. Se comportarán de la misma manera que el estado se comporta en un componente de clase. Podemos acceder al estado actual vía statey luego cambiar el estado vía setState. Si ampliáramos este ejemplo para incluir la configuración del estado:

import React, { useState } from 'react';
    
    
const Counter = props => {
    const [state, setState] = useState({
        clickCount: 0
    });
 
    const handleClick = () => {
        setState({
            clickCount: state.clickCount + 1
        });
    }
 
    return (
        <div>
            { state.clickCount }
            <button onClick={ handleClick }>Click Me</button>
        </div>
    );
}
    
export default Counter;
copy
Cada vez que hacemos clic en el botón, estamos evitando el comportamiento predeterminado y luego configurando el estado incrementando la propiedad clickCount. Ahora, podemos usar el estado dentro de un componente funcional.

NOTA: Al invocar  useState, no necesitamos pasar un objeto. Simplemente podemos pasar un valor primitivo y luego actualizarlo en consecuencia.

Más comúnmente verás useState implementado como en el siguiente ejemplo:

import React, { useState } from 'react';
    
    
const Counter = props => {
    const [count, setCount] = useState(0);
 
    const handleClick = () => {
        setCount(count + 1);
    }
 
    return (
        <div>
            { count }
            <button onClick={ handleClick }>Click Me</button>
        </div>
    );
}
    
export default Counter;

### Estado de elevación
Como se discutió anteriormente, el estado es esencialmente cualquier pieza de información modificable en una aplicación. Como tal, administrar el estado de manera eficiente y efectiva es fundamental para crear aplicaciones funcionales. La gestión del estado puede ser bastante simple si todo se hace desde un solo componente. Sin embargo, puedes encontrarse con situaciones en las que los componentes hermanos deben compartir el estado. Echemos un vistazo a tal situación.

Dependiendo de cómo elijas dividir la arquitectura de tu componente, puedes haber notado las siguientes tres unidades lógicas: (1) un contenedor para contener tanto la entrada como la lista filtrada, (2) un componente para la entrada y (3) un componente para representar la lista filtrada. El desafío surge cuando la entrada y la lista filtrada necesitan compartir algún estado. Como son hermanos, no pueden comunicarse directamente entre sí. Además de una solución de gestión de estado global, el único medio que tenemos para propagar el estado es pasarlo a través de propiedades. Como los hermanos no pueden comunicarse directamente, lo que sí podemos hacer es "levantar" el estado; es decir, podemos alojar el estado en el componente contenedor y pasarlo a cada uno de los dos hijos: la entrada y la lista filtrada.

Así es como podría verse esto en el código:

src / App.js

import React from 'react';
import Wrapper from './components/Wrapper';
function App() {
  return (
    <div className="App">
      <Wrapper items={['something', 'sombrero', 'wholesome', 'ransom', 'apple', 'react', 'javascript']}/>
    </div>
  );
}
export default App;copy
src/components/Wrapper.js

import React, { useState } from 'react';
 
import Input from './Input';
import FilteredList from './FilteredList';
 
const Wrapper = ({ items }) => {
    const [filter, setFilter] = useState('');
 
    return (
        <div>
            <h2>My Filtered List</h2>
            <Input
                filter={filter}
                setFilter={setFilter}
            />
            <FilteredList
                filter={filter}
                items={items.filter(item => item.indexOf(filter) > -1)}
            />
        </div>
    );
}
 
export default Wrapper;copy
src/components/Input.js

import React from 'react';
 
const Input = ({ filter, setFilter }) => (
    <input
        value={filter}
        onChange={e => setFilter(e.target.value)}
    />
)
 
export default Input;copy
src/components/FilteredList.js

import React from 'react';
 
const FilteredList = ({ filter, items }) => items
    .map((item, i) => {
        const start = item.indexOf(filter);
        const end = start + filter.length; 
 
        return (
            <p key={i}>
                {item.slice(0, start)}
                <em>{item.slice(start, end)}</em>
                {item.slice(end)}
            </p>
        );
    }
)
 
export default FilteredList;copy
Ten en cuenta que en cada uno de los tres componentes, utilizamos la desestructuración para analizar propiedades específicas que nos interesaban; recuerda que cada componente React recibirá un objeto de soporte cuando se cree. Por ejemplo, en Wrapper, seleccionamos los elementos de soporte para no tener que hacer referencia a ellos como elementos de soporte dentro de nuestro JSX. Del mismo modo, en el segundo componente, hemos desestructurado el filtro y los soportes setFilter directamente desde el parámetro props.

Al "levantar el estado", pudimos aislarlo a un solo componente y simplemente pasamos la función setFilter a la entrada para que pudiera actualizar el estado correctamente. Ten en cuenta el uso del método de filtro de matriz en el componente contenedor. El filtro toma una función de devolución de llamada, y la función de flecha que estamos suministrando devolverá verdadero si el índice de la primera aparición de la cadena de la variable del filtro es mayor que -1 (la cadena del filtro se encuentra en el elemento particular que se verifica). También utilizamos el método de mapa de matriz que se tratará en una lección posterior. Finalmente, usamos .slice() para rodear el texto relevante con etiquetas <em> para enfatizar la coincidencia.

El estado de elevación es un patrón de diseño común en muchos marcos reactivos y, por lo tanto, es un patrón importante para internalizar.

Otras lecturas:

https://reactjs.org/docs/lifting-state-up.html

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice

### Formularios
Por lo general, no llegamos muy lejos con nuestro sitio web antes de que eventualmente necesitemos escribir algunos formularios. Los formularios son nuestra oportunidad de conversar con nuestros usuarios y, por lo tanto, representan uno de los elementos más importantes de nuestra aplicación. Hay dos formas básicas de manejar formularios en React.

state: Realiza un seguimiento de los valores de entrada como parte de tu estado, actualizándolos en eventos de cambio y devolviéndolos a la interfaz de usuario. Estos se llaman componentes controlados.
refs: Adjunta un puntero a nodos del DOM como entradas y áreas de texto, y los acerca para inspeccionar sus valores una vez que se envíe nuestro formulario. Llamamos a estos  componentes no controlados .
Favoreceremos la estrategia de componentes controlados porque permite que React continúe interactuando entre nosotros y el DOMactual.

Veamos esto en acción.
UserForm.jsx


import React, { useState } from  'react';
    
    
const UserForm = (props) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");  
    
    const createUser = (e) => {
        e.preventDefault();
        const newUser = { username, email, password };
        console.log("Welcome", newUser);
    };
    
    return(
        <form onSubmit={ createUser }>
            <div>
                <label>Username: </label> 
                <input type="text" onChange={ (e) => setUsername(e.target.value) } />
            </div>
            <div>
                <label>Email Address: </label> 
                <input type="text" onChange={ (e) => setEmail(e.target.value) } />
            </div>
            <div>
                <label>Password: </label>
                <input type="text" onChange={ (e) => setPassword(e.target.value) } />
            </div>
            <input type="submit" value="Create User" />
        </form>
    );
};
    
export default UserForm;copy
Observa cómo ahora estamos usando dos nuevos eventos sintéticos, onChangey onSubmit.

onChange
Este evento se ejecuta cada vez que se cambia el valor en la entrada. Cuando lo usamos necesitamos aceptar un parámetro en nuestra función, el parámetro e. La variablee contiene todo tipo de información ingeniosa de eventos, donde e.target es el "objetivo" del evento, en otras palabras, el elemento<input />, y e.target.valuees la información actualmente ingresada en la entrada.

onSubmit
Este evento se ejecuta cuando el usuario envía el formulario haciendo clic en el botón Enviar. Al igual que el evento onChange, también deberá aceptar un parámetroe que también esté lleno de información de evento. Esta vez, queremos evitar el comportamiento de formulario predeterminado mediante el uso e.preventDefault(). El comportamiento predeterminado del formulario es enviar la información a la ruta en la "acción" que provoca una carga de página. Queremos manejar esta información nosotros mismos.

createUser
Cuando ocurre el eventoonSubmit, hemos escrito una función que maneja qué hacer con los datos del formulario. Los datos del formulario para cada entrada se mantienen en el estado utilizando ganchos separados. Si queremos unir todos los campos, podemos declarar un nuevo objeto y poner las variables en él. Para hacer esto un poco más conveniente, podemos hacer uso de Property Value Shorthand, una nueva notación ES6.

En lugar de escribir

const newUser = { username: username, email: email, password: password };
copy
podemos escribir solo

const newUser = { username, email, password };copy
si estamos contentos de que la clave reciba el mismo nombre que nuestras variables.

Limpieza
Observa cómo después de enviar este formulario, los valores actuales en las entradas del formulario simplemente se quedan. Debido a que no hemos permitido que la página se vuelva a cargar (evitamos el predeterminado), este es el comportamiento esperado. De hecho, esto es bueno, ya que cuando agreguemos validaciones a nuestro formulario más adelante, si el formulario no es válido, la información que escribió el usuario seguirá estando allí para que la corrija en lugar de tener que recordar lo que escribió antes de enviar el formulario.

Si queremos limpiar el formulario después de enviarlo, podemos hacerlo con algunas pequeñas modificaciones a nuestro código anterior.

En cada una de las entradas, ahora incluiremos un atributo de valor que establecemos igual a la variable useState correspondiente.

<input type="text" onchange={ (e) => setUsername(e.target.value) } value={ username } />
copy
Ahora hemos aplicado lo que se conoce como enlace de datos bidireccional, y cualquier valor que esté actualmente en el estadousername coincidirá con lo que está en el formulario.  

Lo que eso significa para nosotros es que dentro de la funcióncreateUser podemos volver a asignar a usernameun valor inicial apropiado.

// dentro de la función createUser
setUsername("");

### Renderizado Condicional
Digamos que queremos representar algo en el DOM que se base en algún otro valor. Usando el ejemplo anterior del formulario, obtendremos resultados después de enviar el formulario. En la parte superior, digamos que queremos tener un mensaje <h3>que diga "Bienvenido, por favor envía el formulario" si el formulario no ha sido enviado. Después de hacer clic en enviar, queremos cambiar el texto para decir "¡Gracias por enviar el formulario!". Podemos agregar algo de lógica en nuestro componente para encargarnos de esto. Tendremos que agregar un botón de envío y un método createUser.

import react, { useState } from  'react';
    
    
const UserForm = (props) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [hasBeenSubmitted, setHasBeenSubmitted] = useState(false);
    
    const createUser = (e) => {
        e.preventDefault();
        const newUser = { username, email, password };
        console.log("Welcome", newUser);
        setHasBeenSubmitted( true );
    };
    
    const formMessage = () => {
        if( hasBeenSubmitted ) {
	    return "Thank you for submitting the form!";
	} else {
	    return "Welcome, please submit the form";
	}
    };
    
    return (
        <form onsubmit={ createUser }>
            <h3>{ formMessage() }</h3>
	    <div>
                <label>Username: <label> 
                <input type="text" onchange={ (e) => setUsername(e.target.value) } />
            </div>
            <div>
                <label>Email Address: </label> 
                <input type="text" onchange={ (e) => setEmail(e.target.value) } />
            </div>
            <div>
                <label>Password: </label>
                <input type="text" onchange={ (e) => setPassword(e.target.value) } />
            </div>
            <input type="submit" value="Create User">
        </form>
    );
};
    
export default UserForm;copy
Por defecto, hasBeenSubmittedes false. Cuando se envía el formulario, este valor en el estado se cambiará a verdadero, lo que hará que el formulario se vuelva a procesar y la función formMessagese puede ejecutar nuevamente, lo que producirá un mensaje de agradecimiento al usuario por haber enviado el formulario.

Usar operadores ternarios
Los operadores ternarios ofrecen una mejor manera de representar condicionalmente un elemento. Para un repaso sobre los operadores ternarios, consulta la documentación de MDN . La mayor ventaja para nosotros al usar un operador ternario aquí, es que podemos reemplazar la función formMessage que escribimos con algún código que puede ir directamente a nuestro JSX.

{/*  resto del componente eliminado por brevedad */}
    
<form onSubmit={ createUser }>
    {
        hasBeenSubmitted ? 
        <h3>Thank you for submitting the form!</h3> :
        <h3>Welcome, please submit the form.</h3> 
    }
    <div>
        <label>Username: <label> 
        <input type="text" onChange={ (e) => setUsername(e.target.value) } />
    </div>
</form>
    
{/*  resto del componente eliminado por brevedad */}copy
Intenta usar operadores ternarios cuando puedas, ya que son muy útiles y pueden hacer que tu vida como desarrollador de React sea mucho más fácil.

Manejo de validaciones
También podríamos usar ternarios para mostrar posibles mensajes de validación a nuestros usuarios, incluso ofreciéndoles comentarios mientras completan el formulario.

Considera el siguiente componente.

const MovieForm = (props) => {
    const [title, setTitle] = useState("");
    const [titleError, setTitleError] = useState("");
    
    const handleTitle = (e) => {
        setTitle(e.target.value);
        if(e.target.value.length < 1) {
            setTitleError("Title is required!");
        } else if(e.target.value.length < 3) {
            setTitleError("Title must be 3 characters or longer!");
        } else {
            setTitleError('');
        }
    }
    
    {/*  resto del componente eliminado por brevedad */}
    
    return (
        <form onSubmit={ (e) => e.preventDefault() }>
            <div>
                <label>Title: </label>
                <input type="text" onChange={ handleTitle } />
                {
                    titleError ?
                    <p style={{color:'red'}}>{ titleError }</p> :
                    ''
                }
            </div>
            <input type="submit" value="Create Movie" />
        </form>
    );
}copy
Aquí podemos usar el hecho de que JavaScript tratará una cadena vacía como "falsa" para que nuestros ternarios sean más fáciles de escribir. 

### React Router
Objetivos
Aprender sobre React Router

Como hemos cubierto la idea de enrutamiento en SPA, veamos una forma de implementarlo en React. React tiene una variedad de bibliotecas de terceros que podemos usar para este propósito, como React Router DOM y Reach Router. Cubriremos React Router DOM, pero ten en cuenta que Reach Router también es una solución muy popular que se usa ampliamente (No obstante, Reach Router ya no es compatible con la nueva y más reciente versión de React v17). Ambos siguen convenciones de nomenclatura similares.

Entonces, veamos nuestro archivo App.js que actúa como un punto de entrada a nuestro proyecto React. Para usar React Router DOM en un proyecto, primero ejecuta npm install react-router-dom@5.3.0para instalarlo y agrégarlo a la lista de dependencias del proyecto. Queremos ajustar la parte de nuestro sitio web que se basa en el enrutamiento dentro de la etiqueta <BrowserRouter>. Esto creará un contenedor en el que vivirán todas nuestras rutas.

import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
        <div className="App">
            <Route path="/login" render={() => <LoginComponent />}/>
            <Route path="/dashboard" render={() => <DashboardComponent />}/>
        </div>
    </BrowserRouter>
  );
}
export default App;copy
Dentro del componente <BrowserRouter>, tenemos dos componentes más con un props path. Estos le dicen a React cuando vamos a la ruta /login, queremos actualizar el DOM para que muestre LoginComponentdentro del contenedor de componentes<Route>. Parece que está redirigiendo la página a una nueva url. En realidad, solo está cambiando lo que vemos en la página web, sin una verdadera actualización de la página. Las solicitudes de AJAX pueden estar disparando en segundo plano, pero el DOM está cambiando en función del Javascript de front-end.

Enlace
Ahora que tenemos un enrutador configurado, queremos poder enlazar a otras páginas. Tradicionalmente, esto se hace con una etiqueta a html y un atributohref. Sin embargo, un componente  <Link>no actualizará la página. Simplemente cambiará la url y cambiará el DOM.

Entonces, puedes tener una barra de navegación que se vea así:

import React from 'react';
import { Link } from 'react-router-dom';
const NavBar = (props) => {
  return (
      <div>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/login">Login</Link>
      </div>
  );
}copy
Es tan simple como eso. Ahora, tenemos la oportunidad de agregar enrutamiento front-end a nuestro proyecto.

Navegar
¿Qué sucede si quisiéramos redirigir a un usuario a otra página en nuestro proyecto React? Esto se puede hacer con routeProps o withRouter. Después de realizar alguna acción, podemos ejecutar un método como this.props.history.push('/ruta') y esto redirigirá programáticamente al usuario a esa ruta frontal.






### Acerca de Promises (promesas)
Hasta ahora, cuando hemos estado trabajando con JavaScript, hemos estado escribiendo código síncrono.



// un ejemplo de código que podrías escribir
const myArray = doSomething();
doSomethingToMyArray(myArray);
console.log("This message will wait until the above lines complete");copy
JavaScript ejecutará nuestro código línea por línea y también sabrá esperar a que termine lo que se está ejecutando antes de pasar a la siguiente línea. Esto es algo muy bueno, ya que si la función doSomething tarda un tiempo en ejecutarse, no tenemos que preocuparnos de si la variable myArray estará indefinida cuando pase a la función  doSomethingToMyArray.

Sin embargo, a medida que comenzamos a explorar la obtención de información, ya sea de fuentes externas o de nuestro propio servidor Back-End, necesitamos poder escribir código que reciba datos correctamente, que a menudo tardará un tiempo indeterminado en llegar, y no evitará que el usuario siga interactuando con la aplicación que hemos creado mientras la aplicación espera a que retornen los datos.

Con este fin, presentaremos un nuevo concepto, un patrón de diseño llamado Promesas. 

¿Qué es una promesa?
Una promesa es un patrón en el que no se conoce la respuesta eventual (ni el tiempo que se tardará en recibirla). 

Las promesas tienen 3 estados:

Pendiente	Resuelto	Rechazado
el resultado aún no está determinado	el resultado se completa con éxito	el resultado se completa con errores


Un ejemplo de cómo se ve una promesa es el siguiente:



const noMondays = new Promise( (resolve, reject) => {
    if(new Date().getDay() !== 1) {
        resolve("Good, it's not Monday!");
    } else {
        reject("Someone has a case of the Mondays!");
    }
});
noMondays
    .then( res => console.log(res) )
    .catch( err => console.log(err) );copy
Intenta cambiar el día en la declaración if anterior para que puedas ver cómo se ejecuta tanto el código de resolución como el código de rechazo. ¿Dónde se maneja cada uno de los siguientes?



Si bien la promesa no se cumple, cualquier código que venga después de esto es libre de ejecutarse. También tenemos dos métodos distintos que se llaman donde manejamos el caso en que: la promesa se resuelve .then()y el caso en que la promesa es rechazada .catch(). 



Ventajas de las promesas
Mejor control del flujo de código asíncrono.
Fácil de leer
Evitar el "infierno de devolución de llamada" (callback hell)
 
 
Recursos externos
Promesa - JavaScript | MDN
Promesas de JavaScript: una introducción | Fundamentos de la web


### Introducción a las API REST
¿Qué es una API? Técnicamente hablando, API significa Application Programming Interface (interfaz de programación de aplicaciones). Esto suena un poco misterioso, así que profundicemos un poco más. Si tienes un programa, es posible que desees que se comunique con otro programa que está escrito en una tecnología diferente, tech stack, etc. Entonces, en términos generales, una API es la interfaz que permite que un programa / aplicación se comunique con otro. Piensa en ello como un puente. Puedes tener dos superficies separadas, pero una API es el puente entre las dos.

Muchas veces escucharás el término "RESTful API" or "REST API.". Una API RESTful, específicamente, es una API que se comunica a través y entre los servicios web. Estas API siguen un cierto conjunto de reglas que aseguran que sea fácil para las personas poder implementarlas. Al seguir un conjunto consistente de convenciones, aprender diferentes APIs RESTful será bastante fácil y ágil.

### Consumo de API
El método incorporado para consumir datos de una API en Javascript es fetch, el mismo que utiliza promesas. Este método tiene la siguiente sintaxis:

fetch("http://www.example.com")
    .then(response =>{
        //do something
    }).catch(err => {
        console.log(err);
    })
copy
También podemos escribirlo usando async / await (ES7):

let response = await fetch("http://www.example.com");
copy
Sabiendo esto, creemos un archivo html simple en el que podamos comenzar a usar fetch.

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <div id = "root"></div>
    <script>
        fetch("https://pokeapi.co/api/v2/pokemon")
          .then(response => {
            return response.json();
        }).then(response => {
            console.log(response);
        }).catch(err=>{
            console.log(err);
        });
    </script>
</body>
</html>
copy
¿Qué acabamos de hacer? Primero, creamos una petición al endpoint "https://pokeapi.co/api/v2/pokemon" mediante fetch. Si tuvieras que copiar esto en un archivo html y luego abrirlo, verías la respuesta de Pokemon en la consola de Javascript. Usar fetches una manera muy fácil de obtener una solicitud simple en tu archivo html.

