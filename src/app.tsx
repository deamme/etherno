import { render } from "inferno";
import { BrowserRouter, Switch, Route } from "inferno-router";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

export default () => {
  const App = () => (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="*" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );

  render(<App />, document.getElementById("root"));
};
