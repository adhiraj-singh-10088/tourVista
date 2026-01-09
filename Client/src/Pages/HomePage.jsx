import CardGrid from "../components/CardGrid";
import useTours from "../hooks/useTours";

function HomePage() {

  const { status, results, tours } = useTours();

  return (
    <>

      {status === "loading" ? (
        <p className="loading">Loading tours…</p>
      ) : (
        <CardGrid status={status} results={results} tours={tours} />
      )}
    </>
  );
}

export default HomePage
