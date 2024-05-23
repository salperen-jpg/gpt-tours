import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";

type BreadCrumb = {
  currentPage?: string;
  isSingleTourPage?: boolean;
  tourName?: string;
};

const BreadCrumb = ({
  currentPage,
  isSingleTourPage,
  tourName,
}: BreadCrumb) => {
  return (
    <Breadcrumb className="mb-8">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink>
            <Link to="/dashboard">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem className="capitalize">
          {isSingleTourPage ? (
            <BreadcrumbLink>
              <Link to={"/dashboard"}>Tours</Link>
            </BreadcrumbLink>
          ) : (
            <>{currentPage}</>
          )}
        </BreadcrumbItem>
        {isSingleTourPage && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{tourName}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
export default BreadCrumb;
