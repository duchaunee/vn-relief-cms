import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }
    const response = await fetch("https://api.qrcode-monkey.com/qr/custom", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: url,
        config: {
          body: "square",
          //post logo to https://api.qrcode-monkey.com/qr/uploadImage to get url
          logo: "ac7aaae042e5cd1df530c68997b8b642330b80a2.png",
        },
        size: 1000,
        download: false,
        file: "png",
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to generate QR code from external API");
    }

    const buffer = await response.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");
    const dataUrl = `data:image/png;base64,${base64}`;

    return NextResponse.json({
      qrCodeUrl: dataUrl,
    });
  } catch (error) {
    console.error("QR Code generation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
