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
  /* eslint-disable */
  constructor(props: ErrorProps) {
    super(props);
    this.state = { hasError: false, error: {}, info: {} };
  }

  componentDidCatch(error: any, info: any) {
    this.setState({ hasError: true, error, info });
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
          <h1>Something went wrong :(</h1>
          <div>{this.getInfo()}</div>
        </>
      );
    }
    return this.props.children;
  }
  /* eslint-enable */
}

export { CustomError };
