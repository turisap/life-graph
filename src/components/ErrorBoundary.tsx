import React from "react";

type ErrorState = {
  hasError: boolean;
  error: any;
  info: any;
};

type ErrorProps = {
  [key: string]: any;
};

class CustomError extends React.Component<ErrorProps, ErrorState> {
  /* tslint:disable */
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
  /* tslint:enable */
}

export { CustomError };
