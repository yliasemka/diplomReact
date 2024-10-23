import { Component} from "react"

interface Props {
    children: React.ReactNode; // Тип для дочерних элементов
}

class ErrorBoundary extends Component<Props> {

    state = {
        error: false
    }

    componentDidCatch(): void {
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