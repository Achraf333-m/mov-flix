import Banner from "@/components/Banner";
import BasicModal from "@/components/Modal";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Row from "@/components/Row";
import { Movie } from "@/typings";
import links from "@/utils/links";
import { GetServerSideProps } from "next";
import Head from "next/head";
import useFireAuth from "@/custom_hooks/useFireAuth";
import useLikedList from "@/custom_hooks/useLikedList";
import useSubStatus from "@/custom_hooks/useSubStatus";
import SubPlans from "@/components/SubPlans";
import { Product } from "@invertase/firestore-stripe-payments";
import { query, collection, where, getDocs } from "firebase/firestore";
import { db } from "@/firebase";

interface props {
  Trending: Movie[];
  Originals: Movie[];
  TopRated: Movie[];
  Action: Movie[];
  Comedy: Movie[];
  Horror: Movie[];
  Romance: Movie[];
  Documentaries: Movie[];
  products: Product[];
}

function Home({
  Trending,
  Originals,
  TopRated,
  Action,
  Comedy,
  Horror,
  Romance,
  Documentaries,
  products,
}: props) {
  const { user, loading } = useFireAuth();
  const list = useLikedList(user?.uid);
  const subscription = useSubStatus(user);

  if (!user) {
    return null;
  }
  console.log(subscription)

  if (loading || subscription === null) return null;
  if (!subscription) return <SubPlans products={products} user={user} />;

  return (
    <div className="relative !bg-gradient-to-b box-border ">
      <Head>
        <title>Home</title>
      </Head>
      <Header />
      <main className="px-4 lg:space-y-16 lg:px-8 relative pb-24">
        <Banner Trending={Trending} />
        <section className="md:pl-10">
          <Row title="MovieFLix Originals" Movies={Originals} />
          <Row title="Top Rated Movies" Movies={TopRated} />
          {list.length > 0 && <Row title="Movies I liked" Movies={list} />}
          <Row title="Action Movies" Movies={Action} />
          <Row title="Comedy Movies" Movies={Comedy} />
          <Row title="Horror Movies" Movies={Horror} />
          <Row title="Romance Movies" Movies={Romance} />
          <Row title="Documentaries" Movies={Documentaries} />
        </section>
        <BasicModal />
      </main>
      <Footer />
    </div>
  );
}

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  // getting products and their prices
  // create a query object
  const q = query(collection(db, "products"), where("active", "==", true));

  const querySnapshot = await getDocs(q);

  // for each product, get the product price info
  const productsPromises = querySnapshot.docs.map(async (productDoc) => {
    let productInfo = productDoc.data();

    // fetch prices subcollection per product
    const pricesCollection = collection(productDoc.ref, "prices");
    const priceQuerySnapshot = await getDocs(pricesCollection);

    // assume there is only one price per product
    const priceDoc = priceQuerySnapshot.docs[0];
    productInfo["priceId"] = priceDoc.id;
    productInfo["priceInfo"] = priceDoc.data();
    return productInfo;
  });

  // 'products' is an array of products (including price info)
  const products = await Promise.all(productsPromises);
  const [
    Trending,
    Originals,
    TopRated,
    Action,
    Comedy,
    Horror,
    Romance,
    Documentaries,
  ] = await Promise.all([
    fetch(links.Trending).then((res) => res?.json()),
    fetch(links.Originals).then((res) => res?.json()),
    fetch(links.TopRated).then((res) => res?.json()),
    fetch(links.Action).then((res) => res?.json()),
    fetch(links.Comedy).then((res) => res?.json()),
    fetch(links.Horror).then((res) => res?.json()),
    fetch(links.Romance).then((res) => res?.json()),
    fetch(links.Documentaries).then((res) => res?.json()),
  ]);

  return {
    props: {
      Trending: Trending.results || null,
      Originals: Originals.results || null,
      TopRated: TopRated.results || null,
      Action: Action.results || null,
      Comedy: Comedy.results || null,
      Horror: Horror.results || null,
      Romance: Romance.results || null,
      Documentaries: Documentaries.results || null,
      products: products || null,
    },
  };
};
