const { Component } = require("react");
import "./ErrorBoundry.css";

class ErrorBoundry extends Component {
    constructor(props){
        super(props);

        this.state = {
            hasError: false
        };
    }
    static getDerivedStateFromError(error) {
        return {
            hasError: true
        }
    }

    componentDidCatch(error, errorInfo){
      //TODO log error
    }
    
    render() {
        if (this.state.hasError) {
            return <><h1 className="boundryError">404</h1></>
        }
        return (
           <>
             {this.props.children}
           </>
        );
    }
}

export default ErrorBoundry;
