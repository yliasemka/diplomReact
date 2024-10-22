import { Component, ErrorInfo } from "react"

class ErrorBoundary extends Component {

    state = {
        error: false
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        this.setState({error:true})
    }

    render() {
        if (this.state.error){
            return(
                <h2>Something went wrong</h2>
            )
        }
        return this.props.children
    }
}

export default ErrorBoundary