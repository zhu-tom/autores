import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
          <script src="https://www.paypal.com/sdk/js?client-id=ARwk5QmVh7aLpwlsZ7J-RxcibLuzaJ_TSHoYp2xmiq8RGOVpo_S2ErYXrNRcM8h43JIp5O50UxcnG_vK"></script>
        </body>
      </Html>
    )
  }
}

export default MyDocument;