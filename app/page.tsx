import fetchItem from "./actions/fetch-item";
import { Auction } from "./components/auction";
import OrderBy from "./components/order-by";
import FilterBy from "./components/filter-by";
import NoAuctionScreen from "./components/no-auction-screen";

type Props = {
  searchParams: {
    query?: string;
    orderBy?: string;
    filterBy?: string;
    seller?: string;
    winner?: string;
  };
};

export default async function Home({ searchParams }: Props) {
  const query = searchParams.query || "";
  const orderBy = searchParams.orderBy || "";
  const filterBy = searchParams.filterBy || "";
  const seller = searchParams.seller || "";
  const winner = searchParams.winner || "";

  const { data, error } = await fetchItem({
    searchTerm: query,
    orderBy,
    filterBy,
    seller,
    winner,
  });

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <>
      <div className="flex flex-col gap-4 lg:flex-row">
        <FilterBy
          key={`$${query}-${orderBy}-${filterBy}-${seller}-${winner}-filterBy`}
        />
        <OrderBy
          key={`${query}-${orderBy}-${filterBy}-${seller}-${winner}-orderBy`}
        />
      </div>
      <div className="mt-5">
        {data.results.length === 0 ? (
          <NoAuctionScreen
            key={`${query}-${orderBy}-${filterBy}-${seller}-${winner}`}
          />
        ) : (
          <Auction
            data={data}
            key={`${query}-${orderBy}-${filterBy}-${seller}-${winner}-action`}
          />
        )}
      </div>
    </>
  );
}
