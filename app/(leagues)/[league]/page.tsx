interface Params {
    params: Promise<{
        league: string
    }>
}

export default async function LeaguePage({ params }: Params) {
    const { league } = await params
    return (
        <div>
            <h1 className="text-3xl font-bold">{league}</h1>
        </div>
    )
}