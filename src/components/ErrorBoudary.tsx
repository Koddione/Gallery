import React, { Component, ReactNode } from 'react';

interface Props {
	children: ReactNode;
}

interface State {
	hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError() {
		return { hasError: true };
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		console.error('Caught by ErrorBoundary:', error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			return <h2>Error. Please try again</h2>;
		}

		return this.props.children;
	}
}
