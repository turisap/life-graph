import React from "react";

type ErrorState = {
  hasError: boolean;
  error: any;
  info: any;
};

type ErrorProps = {
  [key: string]: any;
};

class ErrorBoundary extends React.Component<ErrorProps, ErrorState> {
  constructor(props: ErrorProps) {
    super(props);
    this.state = { hasError: false, error: {}, info: {} };
  }

  componentDidCatch(error: any, info: any) {
    this.setState({ hasError: true, error, info });
    console.log("Error:", error);
    console.log("============================");
    console.log("INfo:", info);
  }

  getInfo() {
    const { error, info } = this.state;
    const jsx = [];

    for (let key in info) {
      jsx.push(
        <p>
          {key}: {info[key]}
        </p>
      );
    }

    for (let key in error) {
      jsx.push(
        <p>
          {key}: {info[key]}
        </p>
      );
    }

    return jsx;
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <h1>Something went wrong.</h1>
          <div>{this.getInfo()}</div>
        </>
      );
    }
    return this.props.children;
  }
}

export { ErrorBoundary };
