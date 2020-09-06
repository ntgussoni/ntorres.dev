import React from "react";
import App from "next/app";
import "../css/tailwind.css";
import dynamic from "next/dynamic";
import Header from "../components/Header";
import Layout from "../components/Layout";

const Menu = dynamic(() =>
  import("react-burger-menu").then((mod) => mod.slide)
);

import { ContentWrapper } from "../components/ContentWrapper";
import Link from "next/link";

class MyApp extends App {
  state = {
    open: false,
  };

  render() {
    const { open } = this.state;
    const { Component, pageProps } = this.props;
    return (
      <Layout>
        <Header
          onMenuClose={() => this.setState({ open: false })}
          onMenuClick={() =>
            this.setState((prev) => {
              return { open: !prev.open };
            })
          }
        />
        <Menu
          width="100%"
          styles={{
            bmMenu: {
              width: "100%",
            },
            bmItemList: {
              display: "flex",
              flexDirection: "column",
            },
          }}
          className="w-full bg-white flex justify-center"
          onClose={() => this.setState({ open: false })}
          isOpen={open}
          customBurgerIcon={false}
          customCrossIcon={false}
          right
        >
          <Link href="/blog">
            <a
              onClick={() => this.setState({ open: false })}
              className="text-center anchor-highlight block mt-4 lg:inline-block lg:mt-0 text-grey hover:text-black p-8"
            >
              Blog
            </a>
          </Link>
          <Link href="/work">
            <a
              onClick={() => this.setState({ open: false })}
              className="text-center anchor-highlight block mt-4 lg:inline-block lg:mt-0 text-grey hover:text-black p-8"
            >
              Open Source
            </a>
          </Link>
          <Link href="/drop-me-a-line">
            <a
              onClick={() => this.setState({ open: false })}
              className="text-center button  px-2 py-2 border border-gray-600 rounded-md hover:bg-primary-lighter hover:text-white hover:border-transparent transition-colors duration-300 ease-in-out m-8"
            >
              Drop me a line
            </a>
          </Link>
        </Menu>
        <ContentWrapper>
          <Component {...pageProps} />
        </ContentWrapper>
      </Layout>
    );
  }
}

export default MyApp;
