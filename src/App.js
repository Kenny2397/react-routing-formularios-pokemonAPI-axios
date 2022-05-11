import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import ComponenteAPI from "./Components/ComponenteAPI/ComponenteAPI";
import ComponenteParametros from "./Components/ComponenteParametros/ComponenteParametros";
import Formularios from "./Components/Formularios/Formularios";
import Home from "./Components/Home/Home";
import PokemonAPI from "./Components/PokemonAPI";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Link className="btn btn-success" to="/">Home</Link>
        <Link className="btn btn-danger" to="/api"> DogApi </Link>
        <Link className="btn btn-primary" to="/formularios"> formularios </Link>
        <Link className="btn btn-success" to="/:palabra"> palabra </Link>
        <Link className="btn btn-warning" to="/api/pokemon"> PokemonAPI </Link>
        
        <Switch>
          <Route path="/" exact render={() => <Home />}/>
          <Route path="/api" exact render={()=> <ComponenteAPI />} />
          <Route path="/formularios"  render={() => <Formularios />}/>
          <Route path="/api/pokemon" render={()=> <PokemonAPI />} />
          <Route path="/:palabra" exact render={() => <ComponenteParametros />}/>
          <Route path="/:palabra/:color/:bg" exact render={() => <ComponenteParametros />}/>
        </Switch>
      </BrowserRouter>
    </div>
    
    
  );
}

export default App;
