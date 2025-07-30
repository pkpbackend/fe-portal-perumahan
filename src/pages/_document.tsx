import React from "react";
import { createCache, extractStyle, StyleProvider } from "@ant-design/cssinjs";
import Document, { Head, Html, Main, NextScript } from "next/document";
import type { DocumentContext } from "next/document";
import { REACT_APP_NODE_ENV, GA_KEY } from "@config/envy";

const MyDocument = () => (
  <Html lang="en">
    <Head>
      {REACT_APP_NODE_ENV !== "development" && (
        <React.Fragment>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_KEY}`}
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                    function setupGA(){
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());
    
                      gtag('config', '${GA_KEY}');
                    }
                    setupGA();
                  `,
            }}
          />
        </React.Fragment>
      )}
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const cache = createCache();
  const originalRenderPage = ctx.renderPage;
  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) =>
        (
          <StyleProvider cache={cache} hashPriority="low">
            <App {...props} />
          </StyleProvider>
        ),
    });

  const initialProps = await Document.getInitialProps(ctx);
  const style = extractStyle(cache, true);
  return {
    ...initialProps,
    styles: (
      <>
        {initialProps.styles}
        <style dangerouslySetInnerHTML={{ __html: style }} />
      </>
    ),
  };
};

export default MyDocument;
