import { Card, CardBody, CardFooter, Skeleton } from "@heroui/react";
import useHome from "./useHome";
import { IProduct } from "@/types/Product";
import { Fragment } from "react";
import CardProduct from "@/components/Ui/CardProduct";
import SearchWithCategory from "@/components/Ui/SearchWithCategory";
import Image from "next/image";

const Home = () => {
  const { dataProduct, isLoadingProduct, isRefetchingProduct, isErrorProduct } =
    useHome();

  return (
    <div className='w-full bg-white'>
      {/* KUNCI #1: Container relative untuk positioning search bar */}
      <div className='relative'>
        {/* Bagian Atas dengan Background Biru */}
        <div className='w-full h-64 bg-primary-600 flex flex-col justify-center items-center text-center'>
          <h1 className='text-4xl md:text-5xl font-bold text-white'>
            Jelajahi Produk Kami
          </h1>
          <p className='text-slate-200 mt-2 max-w-2xl'>
            Kami menyediakan berbagai produk berkualitas untuk memenuhi
            kebutuhan Anda
          </p>
        </div>

        {/* KUNCI #2: Wrapper untuk Search Bar yang diposisikan secara absolut.
       - `absolute`: Mengangkat elemen ini.
       - `top-64`: Menurunkannya sejauh tinggi background biru di atas.
       - `-translate-y-1/2`: Menariknya ke atas sebesar 50% dari tingginya sendiri, agar pas di tengah garis.
       - `left-1/2 -translate-x-1/2`: Menengahkan secara horizontal.
     */}
        <div className='absolute top-64 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 lg:px-40 z-10'>
          <SearchWithCategory />
        </div>

        {/* Bagian Bawah (Konten Produk) */}
        <div className='px-4 md:px-16 lg:px-40 py-2'>
          {/* KUNCI #3: Padding atas (pt-24) untuk memberi ruang agar konten tidak tertutup search bar */}
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-10 my-10'>
            {!isLoadingProduct && !isRefetchingProduct && !isErrorProduct
              ? dataProduct?.data.map((item: IProduct) => (
                  <CardProduct product={item} key={item.id} />
                ))
              : Array.from({ length: 8 }).map((_, index) => (
                  <Card key={index}>
                    <Fragment>
                      <CardBody>
                        <Skeleton className='aspect-video w-full rounded-lg bg-default-300' />
                      </CardBody>
                      <CardFooter className='flex flex-col items-start gap-2'>
                        <Skeleton className='h-4 w-3/5 rounded-lg bg-default-200' />
                        <Skeleton className='h-4 w-4/5 rounded-lg bg-default-200' />
                        <Skeleton className='h-4 w-2/5 rounded-lg bg-default-200' />
                      </CardFooter>
                    </Fragment>
                  </Card>
                ))}
          </div>
          {!isLoadingProduct &&
            !isRefetchingProduct &&
            dataProduct?.data.length === 0 && (
              <div className='flex flex-col items-center justify-center w-full'>
                <Image
                  src={"/image/notFound.jpg"}
                  alt='notFound'
                  width={500}
                  height={500}
                />
                <h1 className='text-2xl font-bold text-primary-600'>
                  Produk Tidak Ditemukan
                </h1>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Home;
