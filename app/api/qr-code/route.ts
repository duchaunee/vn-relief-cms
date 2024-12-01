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
          logo: "4057f57666ee0ba8d359a2dea617475c7ba08166.png",
        },
        size: 500,
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
