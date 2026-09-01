import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "image"; src: string; alt: string; aspectRatio: string };

type Post = {
  title: string;
  date: string;
  author: string;
  thumbnail: string;
  content: ContentBlock[];
};

const posts: Record<string, Post> = {
  "life-is-fun-actually": {
    title: "Life is fun, actually.",
    date: "September 1, 2026",
    author: "- Vishal",
    thumbnail: "/images/thumbnail.webp",
    content: [
      { type: "paragraph", text: "Life is fun. There's a lot to do, learn and experience. It's not all sunshine and rainbows though. There's hardships, and good times. There has to be. They are what add weight to life." },
      { type: "paragraph", text: "What do I mean by that? I believe there's that life is full of tough times as well as good ones. Obvious enough. But if we must face all of it inevitably, why do it with such existential dread? Always smiling and laughing is neither the answer nor what I'm suggesting either. If you were to do that not only would you look like you don't take life seriously enough, you might just slip into that mindset." },
      { type: "paragraph", text: "Life is hard and uncertain. But we needn't dread that fact. The uncertainty is what gives it weight, it's what gives life meaning. The kind of hurdles and even the amount people may face in their life may differ but the truth remains that we must all face those hurdles -  So why deter from having fun in the time given to us on this earth?" },
      { type: "image", src: "/images/first.webp", alt: "", aspectRatio: "1620/1080" },
      { type: "paragraph", text: "I state such seemingly obvious things as it is very surprising how often we humans forget them, and just how effective affirming these simple things in our minds can be in changing our outlook on life." },
      { type: "paragraph", text: "A lot has happened recently that has put life in perspective for me. Many plans have gone wrong, things have blown up in my face, relationships I have had faded away and some put in intense stress, and people have passed. And all of it has taught me to pay attention and appreciate my life more, and emphasized how much is truly in our control and how having fun lies in the center of it all." },
      { type: "paragraph", text: "Life isn't easy and is definitely needs seriousness to a degree, but way too often people over complicate it and dwell in their fear and despair." },
      { type: "image", src: "/images/second.webp", alt: "", aspectRatio: "4000/3000" },
      { type: "paragraph", text: "Another obvious thing that hit me in the face, that's key to having a fun and fulfilling life is to do things - Do things that are fun, thigs that are productive, things that are relaxing. Creating this website and this blog, and taking up all these projects alongside was one such endeavour I took on while taking a whole month as alone time. You don't need the most eventful life where everyday is an adventure, but people need something to look forward to - A simple workout, a long project, hobby time, an outing, or a day's rest. There's nothing wrong with being still and relaxing, a good rest day can be the highlight of a month, but not every month of the year." },
      { type: "image", src: "/images/third.webp", alt: "", aspectRatio: "1080/607" },
      { type: "paragraph", text: "If there's anything I want you to take away from me rambling on my first ever blog post, it's this:" },
      { type: "paragraph", text: "There's always benefit to be had from productivity, and planning your future and working towards is an absolute, and it is a given that there'll always be struggles that will knock you down. So have fun whenever you can. Take a soak in the rain, call up a friend and catch up, start a new hobby or get back to an old one, go out with no agenda and see where you end up." },
      { type: "paragraph", text: "If struggle is a certainty in life, then make joy and happiness just as certain - And carry that light with you." },
      { type: "image", src: "/images/fourth.webp", alt: "", aspectRatio: "4000/3000" },
      { type: "paragraph", text: "Thanks for reading my first ever post!! Hope you like it and I hope you'll look forward to what I do in the future 😋" },
    ],
  },
};

const allPosts = Object.entries(posts).map(([slug, post]) => ({
  slug,
  title: post.title,
  date: post.date,
  thumbnail: post.thumbnail,
}));

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) return notFound();

  // Includes the current post — sidebar always lists every post.
  // NOTE: not yet sorted by recency since dates are placeholder strings
  // ("month date, year") rather than real parseable dates. Once posts
  // have actual dates, sort allPosts by date descending here.
  const sidebarPosts = allPosts;

  return (
    <div className="bg-[#ded1b9] min-h-screen">
      {/* Hero banner — same image as thumbnail, with brown overlay + blur */}
      <div className="relative w-full h-[420px]">
        <Image
          src={post.thumbnail}
          alt={post.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#4a3728]/50 backdrop-blur-[6px]" />

        <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-16 pb-10">
          <h1 className="text-5xl md:text-6xl font-serif text-[#ede4d3] mb-2">
            {post.title}
          </h1>
          <p className="text-[#ede4d3]/90">{post.date}</p>
          <p className="text-[#ede4d3]/90">{post.author}</p>
        </div>
      </div>

      {/* Content + sidebar */}
      <div className="max-w-5xl mx-auto px-6 md:px-16 py-16 grid md:grid-cols-[1fr_260px] gap-12">
        {/* Post body */}
        <div className="space-y-6 max-w-xl">
          {post.content.map((block, i) =>
            block.type === "paragraph" ? (
              <p key={i} className="text-[#3a2f26] leading-relaxed">
                {block.text}
              </p>
            ) : (
              <div
                key={i}
                className="relative w-full rounded-md overflow-hidden"
                style={{ aspectRatio: block.aspectRatio }}
              >
                <Image src={block.src} alt={block.alt} fill className="object-cover" />
              </div>
            )
          )}
        </div>

        {/* Sidebar — sticky on desktop, normal flow on mobile. Lists every post including the current one. */}
        <aside className="md:sticky md:top-24 self-start bg-[#3a3225] rounded-md p-5 h-fit">
          <h2 className="text-2xl font-serif text-[#ede4d3] mb-4">Other Posts</h2>
          <div className="space-y-5">
            {sidebarPosts.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="block group">
                <div className="relative w-full aspect-[1620/1080] rounded overflow-hidden mb-2">
                  <Image
                    src={p.thumbnail}
                    alt={p.title}
                    fill
                    className="object-cover group-hover:opacity-90 transition"
                  />
                </div>
                <p className="text-[#ede4d3] font-serif">{p.title}</p>
                <p className="text-[#ede4d3]/70 text-sm">{p.date}</p>
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}