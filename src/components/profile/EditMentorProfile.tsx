// // eslint-disable

// import z from "zod";
// import { mentorProfileSchema, type MentorData } from "./EditProfile";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";

// type MentorProfileFormData = z.infer<typeof mentorProfileSchema>;

// export function EditMentorProfileForm({
//   mentorData,
// }: {
//   mentorData?: MentorData;
// }) {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm<MentorProfileFormData>({
//     resolver: zodResolver(mentorProfileSchema),
//   });

//   const onSubmit = (data: MentorProfileFormData) => {
//     console.log("VALID DATA:", data);
//   };
//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <div>
//         <label>Name</label>
//         <input {...register("name")} />
//         {errors.name && <p>{errors.name.message}</p>}
//       </div>

//       <div>
//         <label>Email</label>
//         <input {...register("email")} />
//         {errors.email && <p>{errors.email.message}</p>}
//       </div>

//       <div>
//         <label>Bio</label>
//         <textarea {...register("bio")} />
//         {errors.bio && <p>{errors.bio.message}</p>}
//       </div>

//       <button disabled={isSubmitting} type="submit">
//         Save
//       </button>
//     </form>
//   );
// }
