import React, { useEffect, useState } from "react";
import SidebarLayout from "../Layout/SidebarLayout";
import axios from "axios";
import { getBrandsApi } from "@/api/brandApis";
import { gmcAuthToken } from "@/constant";
import Cookies from "js-cookie";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from "@/components/ui/pagination";
import { brandItemType } from "@/types/brandType";
import { Skeleton } from "../ui/skeleton";

const AllBrandContent = () => {
  const token = Cookies.get(gmcAuthToken);
  const [loading, setLoading] = useState(true);
  const [brands, setBrands] = useState<brandItemType[]>([]);
  const [search, setSearch] = useState("");
  const [tempSearch, setTempSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchBrands = async () => {
    setLoading(true);
    try {
      const res = await axios.get(getBrandsApi(search, page.toString()), {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res?.data?.data);
      setBrands(res?.data?.data?.data);
      setTotalPages(res?.data?.data?.pagination?.totalPages);
    } catch (error) {
      console.error("Error fetching brands", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, [page, search]);

  return (
    <SidebarLayout>
      <div className="p-4">
        <div className="flex items-center mb-4 gap-2">
          <Input
            type="text"
            placeholder="Search brands..."
            value={tempSearch}
            onChange={(e) => setTempSearch(e.target.value)}
          />
          <Button
            onClick={() => {
              setPage(1);
              setSearch(tempSearch);
            }}
          >
            Search
          </Button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[...Array(6)].map((_, index) => (
              <Skeleton
                key={index}
                className="w-full h-40 object-cover rounded-md mb-2"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {brands?.map((brand) => (
              <Card key={brand.id}>
                <CardContent className="p-4">
                  {brand.logo ? (
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="w-full h-32 object-cover rounded-md mb-2"
                    />
                  ) : (
                    <div className="w-full h-32 bg-gray-200 flex items-center justify-center rounded-md mb-2">
                      No Image
                    </div>
                  )}
                  <p className="text-lg font-semibold">{brand.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <Pagination className="mt-5">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={
                  page === 1
                    ? undefined
                    : () => setPage((prev) => Math.max(prev - 1, 1))
                }
                className={page === 1 ? "opacity-50 pointer-events-none" : ""}
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink onClick={() => setPage(index + 1)}>
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  setPage((prev) => Math.min(prev + 1, totalPages))
                }
                // @ts-ignore
                disabled={page === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </SidebarLayout>
  );
};

export default AllBrandContent;
