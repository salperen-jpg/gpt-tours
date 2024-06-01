import {
  Breadcrumb,
  BreadcrumbItem,
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
          <Link to="/dashboard">Home</Link>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem className="capitalize">
          {isSingleTourPage ? (
            <Link to={"/dashboard"}>Tours</Link>
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
