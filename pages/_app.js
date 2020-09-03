import React from "react";
import App from "next/app";
import "../css/tailwind.css";
import Header from "../components/Header";
import Layout from "../components/Layout";
import { slide as Menu } from "react-burger-menu";
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
          className="w-full bg-white"
          // onClose={() => this.setState({ open: false })}
          isOpen={open}
          customBurgerIcon={false}
          customCrossIcon={false}
          right
        >
          <Link href="/">
            <a
              className="block mt-4 text-grey hover:text-black text-center py-4"
              onClick={() => this.setState({ open: false })}
            >
              Home
            </a>
          </Link>
          <Link href="/blog">
            <a
              className="block mt-4 text-grey hover:text-black text-center py-4"
              onClick={() => this.setState({ open: false })}
            >
              Examples
            </a>
          </Link>
          <Link href="/blog">
            <a
              className="block mt-4 text-grey hover:text-black text-center py-4"
              onClick={() => this.setState({ open: false })}
            >
              Blog
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
