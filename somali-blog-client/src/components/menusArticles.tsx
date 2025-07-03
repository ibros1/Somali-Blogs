// import { useState } from "react";
// import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
// import { useNavigate } from "react-router-dom";
// import type { RootState } from "@/redux/store";
// import { useSelector } from "react-redux";

// const MenusARticles = () => {
//   const articleState = useSelector((state: RootState) => state.getArticleSlice);
//   const sortedArticleState = (articleState?.data?.articles ?? [])
//     .slice()
//     .sort(
//       (a, b) =>
//         new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
//     );

//   const [openPopoverId, setOpenPopoverId] = useState<number | null>(null);
//   const navigate = useNavigate();
//   return (
//     <div>
//       {sortedArticleState.map((article) => (
//         <div className="">

//         </div>
//       ))}
//     </div>
//   );
// };

// export default MenusARticles;
