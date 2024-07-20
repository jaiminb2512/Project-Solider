"use server";

import { sessionOptions, SessionData, defaultSession } from '@/lib';
import { getIronSession } from 'iron-session';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const getSession = async () => {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
  }
  return session;
};

export const login = async (prevState, formData) => {
  const session = await getSession();

  const formUsername = formData.get("username");
  const formPassword = formData.get("password");

  // CHECK USER IN THE DB
  // const user = await db.getUser({username, password})

  if (formUsername !== "jaimin") {
    return { error: "Wrong Credentials!" };
  }

  session.userId = "1";
  session.username = formUsername;
  session.isPro = true; // Assume true for the sake of example
  session.isLoggedIn = true;

  await session.save();
  redirect("/");
};

export const logout = async () => {
  const session = await getSession();
  session.destroy();
  redirect("/");
};

export const changePremium = async () => {
  const session = await getSession();
  session.isPro = !session.isPro;
  await session.save();
  revalidatePath("/profile");
};

export const changeUsername = async (formData) => {
  const session = await getSession();
  const newUsername = formData.get("username");
  session.username = newUsername;
  await session.save();
  revalidatePath("/profile");
};
