import Image from "next/image";
import Link from "next/link";

const posts = [
  {
    slug: "life-is-fun-actually",
    title: "Life is fun, actually.",
    date: "September 1, 2026",
    author: "- By Vishal",
    excerpt: "Life is fun. There's a lot to do, learn and experience. It's not all sunshine and rainbows though. There's hardships, and good times. There has to be. They are what add weight to life…",
    thumbnail: "/images/thumbnail.webp",
  },
];

export default function Blog() {
  return (
    <div className="bg-[#ded1b9] min-h-screen">
      {/* Masthead — using the design image directly as background */}
      <div className="relative w-full">
        <Image
          src="/images/blog.header.webp"
          alt="Geosmin & Cigarettes — welcome to my blog"
          width={1920}
          height={640}
          priority
          className="w-full h-auto"
        />
      </div>

      {/* Posts section */}
      <div className="max-w-4xl mx-auto px-6 md:px-16 py-16">
        <div className="grid md:grid-cols-[180px_1fr] gap-8">
          <h2 className="text-4xl font-serif text-[#3a2f26]">Posts</h2>

          <div className="space-y-14">
            {posts.map((post) => (
              <div key={post.slug} className="group">
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="relative w-full max-w-sm h-64 rounded-md overflow-hidden mb-4 border border-[#3a2f26]/20">
                    <Image
                      src={post.thumbnail}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:opacity-90 transition"
                    />
                  </div>
                  <h3 className="text-2xl font-serif text-[#3a2f26] mb-1">
                    {post.title}
                  </h3>
                </Link>
                <p className="text-sm text-[#3a2f26]/70">{post.date}</p>
                <p className="text-sm text-[#3a2f26]/70 mb-2">{post.author}</p>
                <p className="text-[#3a2f26]/90 max-w-sm mb-2">{post.excerpt}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-sm underline text-[#3a2f26]"
                >
                  read more
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}