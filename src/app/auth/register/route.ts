import bcrypt from "bcrypt";
import { register } from "@/services/auth/register";
import { getUserByEmail } from "@/services/user";
import { base64_encode, fileToBase64 } from "@/utils/conversion";

export async function POST(request: Request) {
  /**
   * get user data
   * check if required data exists
   * check if user exists
   * hash password
   * convert image to base64
   * save user to database
   * send verification email
   * return response
   */

  const formData = await request.formData();
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const isOrganization = formData.get("isOrganization") as unknown as boolean;
  const picture = formData.get("picture") as File;
  if (!name || !email || !password) {
    return new Response("Invalid data", { status: 400 });
  }

  try {
    const user = await getUserByEmail(email);
    if (user) {
      return new Response("User already exists", { status: 400 });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const base64Image = "/avatar.png";
    // //TODO: store picture in db
    // if (picture) {
    //   base64Image = await base64_encode(picture.name);
    // }
    const newUser = await register({
      name,
      email,
      password: hashPassword,
      picture: base64Image,
      isOrganization,
    });
    // //TODO: send verification email
    return new Response(JSON.stringify(newUser), { status: 201 });
  } catch (e: any) {
    return new Response(e.message, { status: 400 });
  }
}