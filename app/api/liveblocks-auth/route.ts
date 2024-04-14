import { Liveblocks } from '@liveblocks/node';
import { NextRequest } from 'next/server';
import { kv } from '@vercel/kv';
import { randomInt } from 'crypto';
import { randomElem } from 'moderndash';

const API_KEY = 'sk_prod_nIw_ne-xz0XwejTMyjL6ZbNh1u7Ws5G2_YUBCmZIKH0E_SwJVG7W1XLIVt23iEpt';
const liveblocks = new Liveblocks({ secret: API_KEY! });

interface User {
  email: string;
  name: string;
  picture?: string;
  color?: string;
}

interface NextRequestWithJson extends NextRequest {
  json(): Promise<{ room: string; user: User }>;
}

export async function POST(request: NextRequestWithJson) {
  // Get the current user's info from your database
  // const user = await kv.hgetall('user:me');
  let { room, user: userInfo } = await request.json();
  let user: User;
  const userInDb = await kv.get<User>(`user:${userInfo.email}`);
  if (!userInDb) {
    userInfo.picture = `https://liveblocks.io/avatars/avatar-${randomInt(20) + 1}.png`;
    userInfo.color = randomElem(['#D583F0', '#F08385', '#F0D885', '#85EED6', '#85BBF0', '#85BBF0', '#85DBF0', '#87EE85']);
    await kv.set(`user:${userInfo.email}`, userInfo);
    user = userInfo;
  } else user = userInDb;

  // Create a session for the current user
  // userInfo is made available in Liveblocks presence hooks, e.g. useOthers
  const session = liveblocks.prepareSession(userInfo.email, { userInfo: { name: user.name, picture: user.picture, color: user.color } });
  // Give the user access to the room
  session.allow(room, session.FULL_ACCESS);

  // Authorize the user and return the result
  const { body, status } = await session.authorize();
  console.log('body', body);
  return new Response(body, { status });
}
