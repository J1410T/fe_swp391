// import { PageLoading } from '@/components/ui/page-loading';
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { SectionCards } from "@/components/section-cards"


// const HomeComponent = () => {
//   const { data } = useLoaderData<HomeRouteData>();

//   return (
//     <div className="flex flex-col items-center justify-center min-h-[60vh]">
//       <Suspense fallback={
//         <>
//           <PageLoading />
//         </>
//       }>
//         <Await
//           resolve={data}
//           errorElement={
//             <p className="text-red-600">Error loading the data!</p>
//           }
//         >
//           {(resolve: HomeLoaderData) => (
//             <>
//               <h1 className="text-4xl font-bold mb-4">Welcome to Your App</h1>
//               <p className="text-lg text-gray-600 text-center max-w-2xl">
//                 This is a modern web application built with React, TypeScript, and Vite.
//                 Start building your amazing features!
//               </p>
//               <p className="text-sm text-gray-500 mt-4">
//                 {resolve.message}
//               </p>
//             </>
//           )}
//         </Await>
//       </Suspense>
//     </div>
//   );
// };

export const Home = () => {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards />
          <div className="px-4 lg:px-6">
            {/* <ChartAreaInteractive /> */}
          </div>

        </div>
      </div>
    </div>
  )
}; 