import { redirect } from "next/navigation";

export default async function Profile() {
  console.log(process.env.BASE_AUTH_URL);
  redirect(process.env.BASE_API_URL + "/login");
}
