"use server";

import { User } from "@/lib/types";
import { AuthError } from "next-auth";
import { z } from "zod";
// import { kv } from "@vercel/kv";
import { ResultCode, getStringFromBuffer } from "@/lib/utils";
import sgMail from "@sendgrid/mail";
import { signIn } from "../../../../auth";

export async function getUser(email: string) {
  //   const user = await kv.hgetall<User>(`user:${email}`);
  //   return user;
  return;
}

interface Result {
  type: string;
  resultCode: ResultCode;
  formData?: any;
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export async function sendMagicLink(email: string, token: string) {
  const magicLink = `${process.env.NEXTAUTH_URL}/?token=${token}&email=${email}`;
  const msg = {
    to: email,
    from: "nori@cente.io",
    subject: "Your Magic Link",
    text: `Click the link to log in: ${magicLink}`,
    html: `<strong>Click the link to log in: <a href="${magicLink}">Login</a></strong>`,
  };

  console.log(" SEND MAGIC LINK :::: ", magicLink, " MSG ::: ", msg);

  await sgMail
    .send(msg)
    .then((response) => {
      console.log(" RESPONSE :::: ", response);
    })
    .catch((error) => {
      console.log(" ERROR :::: ", error);
    });
  console.log(" ENDDDDD : ");
}

export async function authenticate(
  _prevState: Result | undefined,
  formData: FormData
): Promise<Result | undefined> {
  console.log(" CALLED :::: ");

  try {
    const email = formData.get("email");
    const password = formData.get("password");

    console.log(" : email ; ", email, " : password : ", password);

    const parsedCredentials = z
      .object({
        email: z.string().email(),
        password: z.string().min(6),
      })
      .safeParse({
        email,
        password,
      });

    console.log(" : parsedCredentials : ", parsedCredentials);

    if (parsedCredentials.success) {
      await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      return {
        type: "success",
        resultCode: ResultCode.UserLoggedIn,
        formData: formData,
      };
    } else {
      return {
        type: "error",
        resultCode: ResultCode.InvalidCredentials,
      };
    }
  } catch (error) {
    if (error as AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            type: "error",
            resultCode: ResultCode.InvalidCredentials,
          };
        default:
          return {
            type: "error",
            resultCode: ResultCode.UnknownError,
          };
      }
    }
  }
}

export async function signup(
  _prevState: Result | undefined,
  formData: FormData
): Promise<Result | undefined> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  console.log(": email ; ", email, " passw :: ", password);

  const parsedCredentials = z
    .object({
      email: z.string().email(),
      password: z.string().min(6),
    })
    .safeParse({
      email,
      password,
    });

  if (parsedCredentials.success) {
    const salt = crypto.randomUUID();

    const encoder = new TextEncoder();
    const saltedPassword = encoder.encode(password + salt);
    const hashedPasswordBuffer = await crypto.subtle.digest(
      "SHA-256",
      saltedPassword
    );
    const hashedPassword = getStringFromBuffer(hashedPasswordBuffer);

    try {
      // const result = await createUser(email, hashedPassword, salt);
      // if (result.resultCode === ResultCode.UserCreated) {
      //   await signIn("credentials", {
      //     email,
      //     password,
      //     redirect: false,
      //   });
      // }
      // return result;
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case "CredentialsSignin":
            return {
              type: "error",
              resultCode: ResultCode.InvalidCredentials,
            };
          default:
            return {
              type: "error",
              resultCode: ResultCode.UnknownError,
            };
        }
      } else {
        return {
          type: "error",
          resultCode: ResultCode.UnknownError,
        };
      }
    }
  } else {
    return {
      type: "error",
      resultCode: ResultCode.InvalidCredentials,
    };
  }
}
