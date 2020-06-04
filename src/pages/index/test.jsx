import React, {Component} from "react";
import ReactDom from "react-dom";

class App extends Component {
    handle = () => {
        console.log(2)
    }

    render() {
        return <div onClick={this.handle}>hello world</div>;
    }
}

ReactDom.render(<App/>, document.getElementById("root"));