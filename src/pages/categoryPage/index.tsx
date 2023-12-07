import { FC, useCallback, useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductComponent from "../../components/product";
import style from "./category.module.scss";
import MiniButton from "../../components/button";
import { useGetOutside } from "../../outsideServiceEx/useGetOutside";
import { ICatalogItem } from "../../catalog/abstract";
import { usePagination } from "../../hooks/usePagination";
import { IMiniShopCategories } from "../../catalog/IMiniShopCategories";
import useCartActions from "../../hooks/useCartAction";

const CategoryPage: FC = () => {
  const props = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!props?.name) navigate("/error");
  }, [navigate, props]);

  // GETTING DATA
  const { error, getOutsideData } = useGetOutside();
  const [currentPage, setCurrentPage] = useState<keyof IMiniShopCategories>();

  // FILTERING
  const [filterByName, setFilterByName] = useState<boolean>(false);

  // PAGINATION
  const initialLimit = 15;
  const paginationRef = useRef<HTMLDivElement | null>(null);
  const [catalogData, setCatalogData] = useState<ICatalogItem[]>();

  const updateCatalog = (data: ICatalogItem[]) => {
    setCatalogData((prev) => (prev ? [...prev, ...data] : [...data]));
  };

  const paginate = useCallback(
    (offset: number, limit: number) => {
      if (currentPage)
        updateCatalog(getOutsideData(currentPage, offset, limit, filterByName));
    },
    [currentPage, filterByName, getOutsideData]
  );

  const { resetOffset } = usePagination(
    paginate,
    {
      targetRef: paginationRef,
      pagination: {
        offset: 0,
        limit: initialLimit,
      },
    },
    [catalogData]
  );

  useEffect(() => {
    if (error) alert("oops something went wrong...");
  }, [error]);

  // ROUTING

  const updateRoute = useCallback(
    (page: keyof IMiniShopCategories) => {
      resetOffset();
      setCurrentPage(page);
      setCatalogData(getOutsideData(page, 0, initialLimit, filterByName));
    },
    [filterByName, getOutsideData, resetOffset]
  );

  useEffect(() => {
    switch (props.name) {
      case "food":
        updateRoute("clothes");
        break;
      case "clothes":
        updateRoute("food");
        break;
      case "electronics":
        updateRoute("electronics");
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props, filterByName]);

  // CART MOVEMENTS
  const { cartContains, toggleCartContains } = useCartActions();
  const handleCartMovements = (key: string | number) => {
    if (typeof key === "number") toggleCartContains(key);
  };

  return (
    <div className={`${style.categoryPage} row`} ref={paginationRef}>
      <h2>Category: {props.name}</h2>
      <h3
        style={{
          marginBottom: "5px",
        }}
      >
        Filters:
      </h3>
      <div className={style.filtersContainer}>
        <MiniButton
          onClick={() => setFilterByName(false)}
          inactiveClick={() => setFilterByName(true)}
          title="A - Z"
          style={{
            width: "120px",
          }}
          active={filterByName}
        />
      </div>
      <div className={style.prodList}>
        {catalogData?.map((el) => {
          return (
            <ProductComponent
              key={`${el.name}_${el.id}_product`}
              name={el.name}
              image={el.image}
              productKey={el.id}
              onAdd={handleCartMovements}
              onRemove={handleCartMovements}
              cartState={cartContains(el.id)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CategoryPage;
