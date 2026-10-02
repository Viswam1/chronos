import { NextRequest, NextResponse } from "next/server";
import { tools, type ToolName } from "@/lib/mcp/tools";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ tool: string }> },
) {
  const { tool } = await params;
  const entry = tools[tool as ToolName];

  if (!entry) {
    return NextResponse.json({ error: `Unknown tool: ${tool}` }, { status: 404 });
  }

  const body = await req.json().catch(() => ({}));
  const parsed = entry.schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid arguments", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const result = await entry.handler(parsed.data as never);
  return NextResponse.json(result);
}

export async function GET() {
  return NextResponse.json({
    tools: Object.entries(tools).map(([name, t]) => ({
      name,
      description: t.description,
    })),
  });
}
