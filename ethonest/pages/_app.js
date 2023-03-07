import "../styles/stylle.css";
import Layout from "../components/Layout/Layout";
import "../styles/ravi.css";
// import "../.react-toastify/dist/ReactTaostify.css";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
