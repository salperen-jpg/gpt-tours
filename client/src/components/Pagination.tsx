import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ToursDataWithParams } from "@/pages/Tours";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

const PaginationComp = () => {
  const { currentPage, totalPageNumber } =
    useLoaderData() as ToursDataWithParams;
  const navigate = useNavigate();
  const { search, pathname } = useLocation();

  //actual buttons
  const pageNumbers = Array.from({ length: totalPageNumber }, (_, i) => i + 1);

  const handlePage = (p: number) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", p.toString());
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  if (totalPageNumber === 1) {
    return;
  }
  return (
    <div className="mt-4">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => {
                let prevPage = currentPage - 1;
                if (prevPage === 0) prevPage = totalPageNumber;
                handlePage(prevPage);
              }}
            />
          </PaginationItem>
          {pageNumbers.map((p) => {
            return (
              <PaginationItem key={p} onClick={() => handlePage(p)}>
                <PaginationLink
                  className={`p-4 ${currentPage === p && "bg-primary"}`}
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            );
          })}
          <PaginationItem>
            <PaginationNext
              onClick={() => {
                let nextPage = currentPage + 1;
                if (nextPage > totalPageNumber) nextPage = 1;
                handlePage(nextPage);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
export default PaginationComp;
