import { getAdminProfile } from "@/lib/auth";
import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

export async function POST() {
  const { profile } = await getAdminProfile();
  if (!profile) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const key = process.env.CLOUDINARY_API_KEY;
  const secret = process.env.CLOUDINARY_API_SECRET;
  if (!cloud || !key || !secret) {
    return NextResponse.json({ error: "Cloudinary not configured" }, { status: 503 });
  }
  cloudinary.config({
    cloud_name: cloud,
    api_key: key,
    api_secret: secret,
    secure: true,
  });
  const timestamp = Math.round(Date.now() / 1000);
  const paramsToSign = {
    timestamp,
    folder: "sterlingpeak",
  };
  const signature = cloudinary.utils.api_sign_request(paramsToSign, secret);
  return NextResponse.json({
    signature,
    timestamp,
    cloudName: cloud,
    apiKey: key,
    folder: "sterlingpeak",
  });
}
