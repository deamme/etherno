import { Component } from "inferno"

export default class Loadable extends Component<any, any> {
  state = {
    LazyComponent: null
  }

  componentWillReceiveProps(nextProps: any) {
    let name = nextProps.bundle
    if (name) {
      this.lazyLoad(name)
    }
  }

  componentDidMount() {
    this.componentWillReceiveProps(this.props)
  }

  renderLazyComponent() {
    if (this.state.LazyComponent) {
      const MyComponent = this.state.LazyComponent
      return <MyComponent />
    }
  }

  async lazyLoad(name) {
    let target
    
    if (name === "Home") { target = await import("../pages/Home") }
    if (name === "LatestEthereumBlocks") { target = await import("../pages/LatestEthereumBlocks") }
    if (name === "NotFound") { target = await import("../pages/NotFound") }
    
    this.setState({ LazyComponent: target.default })
  }
  render() {
    return <div>{this.renderLazyComponent()}</div>
  }
}
