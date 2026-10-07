import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// ১. ইউজারের সেভ করা বুকমার্ক তালিকা আনা
export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const bookmarks = await db
      .collection("bookmarks")
      .find({ userId: session.user.id })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ success: true, data: bookmarks });
  } catch (error) {
    console.error("Bookmarks GET error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

// ২. বুকমার্ক টগল (যোগ অথবা রিমুভ)
export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json(
        { error: "বুকমার্ক করতে সাইন ইন করুন" },
        { status: 401 },
      );
    }

    const body = await req.json();
    const { articleId, title, imageUrl, category, source, publishedAt } = body;

    if (!articleId || !title) {
      return NextResponse.json(
        { error: "Invalid article data" },
        { status: 400 },
      );
    }

    const collection = db.collection("bookmarks");
    const existing = await collection.findOne({
      userId: session.user.id,
      articleId,
    });

    if (existing) {
      // যদি আগে থেকেই থাকে, ডিলিট করবে (Unsave)
      await collection.deleteOne({ _id: existing._id });
      return NextResponse.json({
        success: true,
        bookmarked: false,
        message: "বুকমার্ক থেকে সরানো হয়েছে",
      });
    }

    // নতুন বুকমার্ক যোগ করবে
    await collection.insertOne({
      userId: session.user.id,
      articleId,
      title,
      imageUrl: imageUrl || null,
      category: category || null,
      source: source || "লাল খবর",
      publishedAt: publishedAt || null,
      createdAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      bookmarked: true,
      message: "সংবাদটি বুকমার্ক করা হয়েছে",
    });
  } catch (error) {
    console.error("Bookmarks POST error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

