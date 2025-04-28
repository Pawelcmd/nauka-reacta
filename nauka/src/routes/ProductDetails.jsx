import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const ProductDetails = ({ id }) => {
    const { data, error, isLoading } = useSWR(
        `https://fakestoreapi.com/products/${id}`,
        fetcher
    );

    if (isLoading) return <span>Trwa pobieranie...</span>;
    if (error) return <span>Błąd przy ładowaniu produktu</span>;

    return (
        <div className="prod">
            <p>Szczegóły produktu</p>
            <h2>{data?.title}</h2>
            <p>{data?.description}</p>
            <p>Cena: ${data?.price}</p>
            <img src={data?.image} alt={data?.title} width="100" />
        </div>
    );
};

export default ProductDetails;