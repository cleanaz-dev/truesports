interface Params {
  params: Promise<{
    tokenId: string;
  }>;
}
export default async function Page({ params }: Params) {
  const { tokenId } = await params;

  return <div>Token: {tokenId}</div>;
}
