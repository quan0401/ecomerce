import { Helmet, HelmetProvider } from "react-helmet-async";

function MetaComponent({ description = "Online shop", title = "Shop" }) {
  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
    </HelmetProvider>
  );
}

export default MetaComponent;
