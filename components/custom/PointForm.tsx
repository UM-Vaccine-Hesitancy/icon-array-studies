// Switched to static frontend website implementation, so form is no longer need for backend resource creation purposes

// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";

// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import React, { useEffect, useState } from "react";
// import { Card } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";
// import { Point } from "@/types/types";

// const IconArray = z.object({
//   rows: z.coerce
//     .number()
//     .min(1, { message: "Number of rows must be at least 1" })
//     .max(30, { message: "Number of rows must be at most 30" }),

//   columns: z.coerce
//     .number()
//     .min(1, { message: "Number of columns must be at least 1" })
//     .max(30, { message: "Number of columns must be at most 30" }),
// });

// /*

//     highlighted: z.coerce
//       .number()
//       .min(0, { message: "Highlighted count must be at least 0" })
//       .max(900, { message: "Highlighted count must not exceed 900" }), // We will update this in superRefine
//   })
//   .refine(
//     (data) => {
//       const totalCells = data.rows * data.columns;
//       return !(data.highlighted > totalCells);
//     },
//     {
//       message: "Highlighted count must be less than row x col",
//       path: ["highlighted"], // path of error
//     }
//   );
//   */

// const PointForm = () => {
//   const [row, setRow] = useState(0);
//   const [column, setColumn] = useState(0);

//   // 1. Define your form.
//   const form = useForm<z.infer<typeof Point>>({
//     resolver: zodResolver(IconArray),
//     defaultValues: {
//       row: row,
//       column: column,
//       // highlighted: highlighted,
//     },
//   });

//   return (
//     <Form {...form}>
//       <form onSubmit={() => {}} className="space-y-2">
//         {/* Row Input */}
//         <FormField
//           control={form.control}
//           name="rows"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Rows</FormLabel>
//               <FormControl>
//                 <Input type="number" placeholder="Number of rows" {...field} />
//               </FormControl>
//               <FormDescription>Set the Row number of the point</FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* Column Input */}
//         <FormField
//           control={form.control}
//           name="columns"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Columns</FormLabel>
//               <FormControl>
//                 <Input
//                   type="number"
//                   placeholder="Number of columns"
//                   {...field}
//                 />
//               </FormControl>
//               <FormDescription>
//                 Set the column number of the poitn
//               </FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* Submit Button */}
//         <div className="flex justify-end">
//           <Button type="submit">Generate</Button>
//         </div>
//       </form>
//     </Form>
//   );
// };

// export default PointForm;
