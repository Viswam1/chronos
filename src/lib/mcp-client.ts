export async function callTool<T = unknown>(
  tool: string,
  args: Record<string, unknown>,
): Promise<T | null> {
  try {
    const res = await fetch(`/api/mcp/${tool}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(args),
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}
