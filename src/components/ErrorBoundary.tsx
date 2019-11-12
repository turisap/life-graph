import React from "react";

type ErrorState = {
  hasError: boolean;
};

type ErrorProps = {
  [key: string]: any;
};

class ErrorBoundary extends React.Component<ErrorProps, ErrorState> {
  constructor(props: ErrorProps) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: any, info: any) {
    this.setState({ hasError: true });
    console.log(error);
    console.log("============================");
    console.log(info);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

export { ErrorBoundary };
